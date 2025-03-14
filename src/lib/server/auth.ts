import type { RequestEvent } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { sha256 } from '@oslojs/crypto/sha2';
import { encodeBase64url, encodeHexLowerCase } from '@oslojs/encoding';
import { db } from '$lib/server/db';
import { studentSession, type StudentSession } from '$lib/server/db/schema/session';
import { student as studentTable } from './db/schema/student';


const DAY_IN_MS = 1000 * 60 * 60 * 24;

export const sessionCookieName = 'auth-session';

export function generateSessionToken() {
	const bytes = crypto.getRandomValues(new Uint8Array(18));
	const token = encodeBase64url(bytes);
	return token;
}

export async function createSession(token: string, studentId: string) {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const session: StudentSession = {
		id: sessionId,
		studentId,
		expiresAt: new Date(Date.now() + DAY_IN_MS * 30)
	};
	await db.insert(studentSession).values(session);
	return session;
}

export async function validateSessionToken(token: string) {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const result = await db
		.select({ student: studentTable, session: studentSession})
		.from(studentSession)
		.innerJoin(studentTable, eq(studentSession.studentId, studentTable.id))
		.where(eq(studentSession.id, sessionId));

	if (result.length == 0) {
		return { session: null, admin: null };
	}
	const { session, student } = result[0];

	const sessionExpired = Date.now() >= session.expiresAt.getTime();
	if (sessionExpired) {
		await db.delete(studentSession).where(eq(studentSession.id, session.id));
		return { session: null, admin: null };
	}

	const renewSession = Date.now() >= session.expiresAt.getTime() - DAY_IN_MS * 15;
	if (renewSession) {
		session.expiresAt = new Date(Date.now() + DAY_IN_MS * 30);
		await db
			.update(studentSession)
			.set({ expiresAt: session.expiresAt })
			.where(eq(studentSession.id, session.id));
	}

	return { session, student };
}

export type SessionValidationResult = Awaited<ReturnType<typeof validateSessionToken>>;

export async function invalidateSession(sessionId: string) {
	await db.delete(studentSession).where(eq(studentSession.id, sessionId));
}

export function setSessionTokenCookie(event: RequestEvent, token: string, expiresAt: Date) {
	event.cookies.set(sessionCookieName, token, {
		expires: expiresAt,
		path: '/'
	});
}

export function deleteSessionTokenCookie(event: RequestEvent) {
	event.cookies.delete(sessionCookieName, {
		path: '/'
	});
}
