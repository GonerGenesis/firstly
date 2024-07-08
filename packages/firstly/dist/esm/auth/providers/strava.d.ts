import { Strava } from 'arctic';
import { type KitOAuth2Provider } from '../';
/**
 * Strava OAuth2 provider
 *
 * In Strava, set your callback url to
 * - dev: `http://localhost:5173/api/auth_callback`
 * - prod: `https://MY_SUPER_SITE/api/auth_callback`
 *
 * In your project add a `.env` file with the following:
 *
 * ```env
 * STRAVA_CLIENT_ID= 'your-client-id'
 * STRAVA_CLIENT_SECRET= 'your-client-secret'
 * ```
 *
 * _FYI: STRAVA_REDIRECT_URI is optional as auth module will default to "${origin}/api/auth_callback"._
 */
export declare function strava(options?: {
    STRAVA_CLIENT_ID: string;
    STRAVA_CLIENT_SECRET: string;
    STRAVA_REDIRECT_URI?: string;
    authorizationURLOptions?: ReturnType<KitOAuth2Provider<'strava', Strava>['authorizationURLOptions']>;
    log?: boolean;
}): KitOAuth2Provider<'strava', Strava>;
