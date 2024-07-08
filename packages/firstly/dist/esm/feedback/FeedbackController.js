var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Allow, BackendMethod, remult } from 'remult';
import { stry } from '@kitql/helpers';
import { FEEDBACK_OPTIONS } from '.';
const GITHUB_GRAPHQL_ENDPOINT = 'https://api.github.com/graphql';
async function getGitHub(query, variables) {
    if (!FEEDBACK_OPTIONS.GITHUB_API_TOKEN) {
        throw new Error('GITHUB_API_TOKEN not found in .env');
    }
    try {
        const headers = new Headers({
            Authorization: 'Bearer ' + FEEDBACK_OPTIONS.GITHUB_API_TOKEN,
            'Content-Type': 'application/json',
        });
        const body = stry({ query, variables }, 0);
        const response = await fetch(GITHUB_GRAPHQL_ENDPOINT, { method: 'POST', headers, body });
        const result = await response.json();
        if (result.errors) {
            /* eslint-disable */
            console.error(`result ERRORS`, body, stry(result));
        }
        return result.data;
    }
    catch (error) {
        /* eslint-disable */
        console.error(`error`, error);
    }
    return null;
}
async function addMetaData(issueId, author, page) {
    const commentToMinimize = await getGitHub(`mutation AddComment($input: AddCommentInput!) {
			addComment(input: $input) {
				commentEdge {
					node {
						id
					}
				}
			}
		}
		`, {
        input: {
            subjectId: issueId,
            body: `<pre>\n${JSON.stringify({ author, page }, null, 2)}\n</pre>`,
        },
    });
    await getGitHub(`mutation MinimizeComment($input: MinimizeCommentInput!) {
			minimizeComment(input: $input) {
				minimizedComment {
					isMinimized
				}
			}
		}
		`, {
        input: {
            subjectId: commentToMinimize.addComment.commentEdge.node.id,
            classifier: 'OFF_TOPIC',
        },
    });
}
export class FeedbackController {
    static async getMilestones() {
        const data = await getGitHub(`query Milestones(
			$repository: String!
			$owner: String!
			$filter: String
			$take: Int = 25
			$cursor: String
		) {
			repository(name: $repository, owner: $owner) {
				milestones(query: $filter, last: $take, after: $cursor, states: OPEN) {
					pageInfo {
						endCursor
					}
					nodes {
						id
						number
						title
					}
				}
			}
		}
		`, {
            repository: FEEDBACK_OPTIONS.repo.name,
            owner: FEEDBACK_OPTIONS.repo.owner,
            filter: FEEDBACK_OPTIONS.milestones?.title_filter ?? '',
        });
        return data.repository.milestones.nodes.map((c) => {
            return {
                ...c,
                title: c.title.replaceAll(FEEDBACK_OPTIONS.milestones?.title_filter ?? '', '').trim(),
            };
        });
    }
    static async getIssues(milestoneNumber, issueState) {
        const issueOrder = issueState === 'CLOSED'
            ? { field: 'UPDATED_AT', direction: 'DESC' } // When close, the last issue updated.
            : null; // When open take milestone order
        const data = await getGitHub(`query Issues(
				$repository: String!
				$owner: String!
				$filters: IssueFilters
				$milestoneNumber: Int!
				$take: Int = 25
				$cursor: String
				$issueOrder: IssueOrder
			) {
				repository(name: $repository, owner: $owner) {
					milestone(number: $milestoneNumber) {
						issues(first: $take, after: $cursor, filterBy: $filters, orderBy: $issueOrder) {
							nodes {
								id
								number
								titleHTML
								state
							}
						}
					}
				}
			}			
		`, {
            repository: FEEDBACK_OPTIONS.repo.name,
            owner: FEEDBACK_OPTIONS.repo.owner,
            milestoneNumber,
            filters: {
                labels: FEEDBACK_OPTIONS.milestones?.labels_filters ?? [],
                states: [issueState],
            },
            issueOrder,
        });
        return data.repository.milestone.issues.nodes;
    }
    static async getIssue(issueNumber) {
        const data = await getGitHub(`query Issue($repository: String!, $owner: String!, $issueNumber: Int!) {
				repository(name: $repository, owner: $owner) {
					issue(number: $issueNumber) {
						id
						createdAt
						bodyHTML
						state
						comments(first: 100) {
							nodes {
								id
								isMinimized
								createdAt
								body
								bodyHTML
								reactionGroups {
									content
									reactors(first: 1) {
										totalCount
									}
								}
							}
						}
					}
				}
			}
		`, {
            repository: FEEDBACK_OPTIONS.repo.name,
            owner: FEEDBACK_OPTIONS.repo.owner,
            issueNumber,
        });
        const items = [];
        const firstItem = {
            bodyHTML: data.repository.issue.bodyHTML,
            createdAt: data.repository.issue.createdAt,
            public: true,
        };
        items.push(firstItem);
        const comments = data.repository.issue.comments.nodes;
        for (let i = 0; i < comments.length; i++) {
            if (comments[i].isMinimized) {
                const parsed = JSON.parse(comments[i].body.replaceAll('<pre>\n', '').replaceAll('\n</pre>', ''));
                items[items.length - 1].who = parsed.author;
                items[items.length - 1].public = true;
            }
            else {
                const nbEye = comments[i].reactionGroups.find((c) => c.content === 'EYES')?.reactors
                    .totalCount;
                items.push({
                    bodyHTML: comments[i].bodyHTML,
                    createdAt: new Date(comments[i].createdAt),
                    public: nbEye && nbEye > 0 ? true : false,
                });
            }
        }
        const toRet = {
            id: data.repository.issue.id,
            state: data.repository.issue.state,
            items: items.filter((c) => c.public),
        };
        return toRet;
    }
    static async createIssue(milestoneId, title, body, page) {
        const repoInfo = await getGitHub(`query RepoInfo(
				$repository: String!
				$owner: String!
			) {
				repository(name: $repository, owner: $owner) {
					id
          labels(first: 25){
            nodes{
              id
              name
            }
          }
				}
			}`, {
            repository: FEEDBACK_OPTIONS.repo.name,
            owner: FEEDBACK_OPTIONS.repo.owner,
        });
        const repoInfoData = repoInfo.repository;
        const create_label = repoInfoData.labels.nodes.find((c) => c.name === FEEDBACK_OPTIONS.create_label);
        const newIssue = await getGitHub(`mutation CreateIssue($input: CreateIssueInput!) {
			createIssue(input: $input) {
				issue {
					id
					number
				}
			}
		}
		`, {
            input: {
                repositoryId: repoInfoData.id,
                milestoneId: milestoneId,
                labelIds: [create_label?.id],
                title: title ?? 'New Feedback (wo title...)',
                body: body,
            },
        });
        const toRet = newIssue.createIssue.issue;
        await addMetaData(toRet.id, remult.user?.name, page);
        return toRet;
    }
    static async addCommentOnIssue(issueId, body, page) {
        const input = {
            subjectId: issueId,
            body,
        };
        await getGitHub(`mutation AddComment($input: AddCommentInput!) {
				addComment(input: $input) {
					commentEdge {
						node {
							id
						}
					}
				}
			}
			`, {
            input,
        });
        await addMetaData(issueId, remult.user?.name, page);
        return 'done';
    }
    static async close(issueId) {
        const input = {
            issueId,
        };
        await getGitHub(`mutation CloseIssue($input: CloseIssueInput!) {
				closeIssue(input: $input) {
					issue {
						id
					}
				}
			}
			`, {
            input,
        });
        return 'done';
    }
    static async reOpen(issueId) {
        const input = {
            issueId,
        };
        await getGitHub(`mutation ReOpenIssue($input: ReopenIssueInput!) {
				reopenIssue(input: $input) {
					issue {
						id
					}
				}
			}
			`, {
            input,
        });
        return 'done';
    }
}
__decorate([
    BackendMethod({ allowed: Allow.authenticated })
], FeedbackController, "getMilestones", null);
__decorate([
    BackendMethod({ allowed: Allow.authenticated })
], FeedbackController, "getIssues", null);
__decorate([
    BackendMethod({ allowed: Allow.authenticated })
], FeedbackController, "getIssue", null);
__decorate([
    BackendMethod({ allowed: Allow.authenticated })
], FeedbackController, "createIssue", null);
__decorate([
    BackendMethod({ allowed: Allow.authenticated })
], FeedbackController, "addCommentOnIssue", null);
__decorate([
    BackendMethod({ allowed: Allow.authenticated })
], FeedbackController, "close", null);
__decorate([
    BackendMethod({ allowed: Allow.authenticated })
], FeedbackController, "reOpen", null);
