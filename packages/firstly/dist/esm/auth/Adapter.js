import { remult } from 'remult';
import { getSafeOptions } from './index.js';
export class RemultLuciaAdapter {
    async getSessionAndUser(sessionId) {
        const oSafe = getSafeOptions();
        const session = await remult.repo(oSafe.Session).findId(sessionId);
        if (session) {
            const user = await remult.repo(oSafe.User).findId(session.userId);
            return [
                { ...session, attributes: {} },
                {
                    ...user,
                    attributes: {
                        ...user,
                        session: { id: session.id, expiresAt: session.expiresAt },
                    },
                },
            ];
        }
        return [null, null];
    }
    async getUserSessions(userId) {
        const oSafe = getSafeOptions();
        return (await remult.repo(oSafe.Session).find({ where: { userId } })).map((s) => {
            return { ...s, attributes: {} };
        });
    }
    async setSession(session) {
        const oSafe = getSafeOptions();
        await remult.repo(oSafe.Session).insert(session);
    }
    async updateSessionExpiration(sessionId, expiresAt) {
        const oSafe = getSafeOptions();
        await remult.repo(oSafe.Session).update(sessionId, { expiresAt });
    }
    async deleteSession(sessionId) {
        const oSafe = getSafeOptions();
        await remult.repo(oSafe.Session).delete(sessionId);
    }
    async deleteUserSessions(userId) {
        const oSafe = getSafeOptions();
        const all = await remult.repo(oSafe.Session).find({ where: { userId } });
        for (const s of all) {
            await remult.repo(oSafe.Session).delete(s);
        }
    }
    async deleteExpiredSessions() {
        const oSafe = getSafeOptions();
        const all = await remult.repo(oSafe.Session).find({ where: { expiresAt: { $lt: new Date() } } });
        for (const s of all) {
            await remult.repo(oSafe.Session).delete(s);
        }
    }
}
