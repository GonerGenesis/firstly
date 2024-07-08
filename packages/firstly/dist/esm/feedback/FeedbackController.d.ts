export declare class FeedbackController {
    static getMilestones(): Promise<{
        title: string;
        id: string;
        number: number;
    }[]>;
    static getIssues(milestoneNumber: number, issueState: 'OPEN' | 'CLOSED'): Promise<{
        id: string;
        number: number;
        titleHTML: string;
        state: "OPEN" | "CLOSED";
    }[]>;
    static getIssue(issueNumber: number): Promise<{
        id: any;
        state: any;
        items: {
            bodyHTML: string;
            who?: string;
            createdAt: Date;
            public: boolean;
        }[];
    }>;
    static createIssue(milestoneId: string, title: string, body: string, page: string): Promise<{
        id: string;
        number: number;
    }>;
    static addCommentOnIssue(issueId: string, body: string, page: string): Promise<string>;
    static close(issueId: string): Promise<string>;
    static reOpen(issueId: string): Promise<string>;
}
