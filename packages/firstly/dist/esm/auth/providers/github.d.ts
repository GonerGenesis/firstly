import { GitHub } from 'arctic';
import { type KitOAuth2Provider } from '../';
/**
 * GitHub OAuth2 provider
 *
 * In GitHub, set your callback url to
 * - dev: `http://localhost:5173/api/auth_callback`
 * - prod: `https://MY_SUPER_SITE/api/auth_callback`
 *
 * In your project add a `.env` file with the following:
 *
 * ```env
 * GITHUB_CLIENT_ID= 'your-client-id'
 * GITHUB_CLIENT_SECRET= 'your-client-secret'
 * ```
 *
 * _FYI: GITHUB_REDIRECT_URI is optional as auth module will default to "${origin}/api/auth_callback"._
 */
export declare function github(options?: {
    GITHUB_CLIENT_ID: string;
    GITHUB_CLIENT_SECRET: string;
    GITHUB_REDIRECT_URI?: string;
    authorizationURLOptions?: ReturnType<KitOAuth2Provider<'github', GitHub>['authorizationURLOptions']>;
    log?: boolean;
}): KitOAuth2Provider<'github', GitHub>;
