// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			student: import('$lib/server/auth').SessionValidationResult['student'];
			session: import('$lib/server/auth').SessionValidationResult['session'];
		}
	}
}

export {};
