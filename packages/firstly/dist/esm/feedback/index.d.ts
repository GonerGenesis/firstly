import type { Module } from '../api';
import { FeedbackController } from './FeedbackController';
import { default as Feedback } from './ui/Feedback.svelte';
export { FeedbackController, Feedback };
type FeedbackOptions = {
    GITHUB_API_TOKEN: string;
    repo: {
        owner: string;
        name: string;
    };
    milestones?: {
        title_filter?: string;
        labels_filters?: string[];
    };
    create_label?: string;
};
export declare let FEEDBACK_OPTIONS: FeedbackOptions;
export declare const feedback: (o: FeedbackOptions) => Module;
