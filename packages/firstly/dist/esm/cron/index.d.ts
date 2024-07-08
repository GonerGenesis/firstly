import { CronJob } from 'cron';
import type { Module } from '../api';
export declare const jobs: Record<string, {
    job: CronJob<null, unknown> | null;
    concurrentInProgress: number;
}>;
/**
 * Link to a nice Cheatsheet TODO
 */
export declare const cronTime: {
    /**
     * Every morning is actually at 4 am and 7 minutes. (because I like this number!)
     */
    every_morning: string;
    /**
     * Every second
     */
    every_second: string;
    /**
     * Every minute
     */
    every_minute: string;
    /**
     * Every 10 minute
     */
    every_10_minute: string;
    /**
     * Every friday at 5:11 am
     */
    every_friday_morning: string;
};
/**
 * usage:
 *
 * ```ts
 * import { cron, cronTime } from 'firstly/cron'
 *
 * export const api = firstly({
 *   modules: [
 *     cron([{
 *       topic: 'first_cron',
 *       cronTime: cronTime.every_second,
 *       onTick: () => { console.log('hello') },
 *       start: !dev, // Start in production
 *       // runOnInit: dev, // nice in dev environement
 *     }])
 *   ]
 * })
 * ```
 *
 * using [cron](https://www.npmjs.com/package/cron) library under the hood
 */
export declare const cron: (jobsInfos: (Parameters<typeof CronJob.from>[0] & {
    topic: string;
    concurrent?: number;
    logs?: {
        starting?: boolean;
        ended?: boolean;
    };
})[]) => Module;
