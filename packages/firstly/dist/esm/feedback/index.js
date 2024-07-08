import { FeedbackController } from './FeedbackController';
import { default as Feedback } from './ui/Feedback.svelte';
export { FeedbackController, Feedback };
export let FEEDBACK_OPTIONS = {
    GITHUB_API_TOKEN: '',
    repo: { owner: '', name: '' },
};
export const feedback = (o) => {
    FEEDBACK_OPTIONS = o;
    return {
        name: 'feedback',
        controllers: [FeedbackController],
    };
};
