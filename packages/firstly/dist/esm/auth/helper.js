import { remult } from 'remult';
import { lucia } from '.';
export async function createSession(userId) {
    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    remult.context.setCookie(sessionCookie.name, sessionCookie.value, { path: '/' });
}
