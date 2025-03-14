import { hash, verify } from '@node-rs/argon2';
import { encodeBase32LowerCase } from '@oslojs/encoding';
import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import * as auth from '$lib/server/auth';
import { db } from '$lib/server/db';
import { student as studentTable, type Student } from '$lib/server/db/schema/student';
import type { Actions, PageServerLoad } from './$types';
import { validateEmail, validatePassword } from '$lib/server/validation';
import { center as centerTable, type Center } from '$lib/server/db/schema/center';

export const load: PageServerLoad = async (event) => {
    if (event.locals.student) {
        return redirect(302, '/dashboard');
    }
    return {};
};

export const actions: Actions = {
    login: async (event) => {
        const formData = await event.request.formData();
        const username = formData.get('username') as string;
        const password = formData.get('password') as string;

        // if (!validateEmail(username)) {
        //     return fail(400, { message: 'Invalid email.' });
        // }
        if (!validatePassword(password)) {
            return fail(400, { message: 'Invalid password.' });
        }

        const results = await db.select().from(studentTable).where(eq(studentTable.userName, username));

        const existingStudent = results.at(0);
        if (!existingStudent) {
            return fail(400, { message: 'Incorrect email or password.' });
        }

        const validPassword = await verify(existingStudent.passwordHash, password, {
            memoryCost: 19456,
            timeCost: 2,
            outputLen: 32,
            parallelism: 1
        });
        if (!validPassword) {
            return fail(400, { message: 'Incorrect email or password.'});
        }


        const sessionToken = auth.generateSessionToken();
        const session = await auth.createSession(sessionToken, existingStudent.id);
        auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);

        return redirect(302, '/dashboard');
    },
    /**
    register: async (event) => {
        const formData = await event.request.formData();

        const email = formData.get('email');
        const password = formData.get('password');
        const firstName = formData.get('firstName');
        const lastName = formData.get('lastName');
        const centerLocation = formData.get('center');

        if (!validateEmail(email)) {
            return fail(400, { message: 'Invalid email' });
        }
        if (!validatePassword(password)) {
            return fail(400, { message: 'Invalid password' });
        }

        //const userId = generateUserId();
        const passwordHash = await hash(password, {
            // recommended minimum parameters
            memoryCost: 19456,
            timeCost: 2,
            outputLen: 32,
            parallelism: 1
        });

        try {

            const newCenter: Center[] = await db.insert(centerTable).values({
                location: centerLocation
            } as Center).returning()

            const newAdmin: Admin[] = await db.insert(adminTable).values({ email, firstName, lastName, passwordHash, center: centerLocation } as Admin).returning();

            const sessionToken = auth.generateSessionToken();
            const session = await auth.createSession(sessionToken, newAdmin[0].id);
            auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
        } catch (e) {
            return fail(500, { message: 'An error has occurred. ' + e });
        }
        return redirect(302, '/dashboard');
    }
    **/
};