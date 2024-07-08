import type { Adapter, DatabaseSession, DatabaseUser } from 'lucia';
export declare class RemultLuciaAdapter implements Adapter {
    getSessionAndUser(sessionId: string): Promise<[session: DatabaseSession | null, user: DatabaseUser | null]>;
    getUserSessions(userId: string): Promise<DatabaseSession[]>;
    setSession(session: DatabaseSession): Promise<void>;
    updateSessionExpiration(sessionId: string, expiresAt: Date): Promise<void>;
    deleteSession(sessionId: string): Promise<void>;
    deleteUserSessions(userId: string): Promise<void>;
    deleteExpiredSessions(): Promise<void>;
}
