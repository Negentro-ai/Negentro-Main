import { createClient, type SupabaseClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ""
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ""

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

let supabaseInstance: SupabaseClient | null = null

export function getSupabase(): SupabaseClient | null {
	if (!isSupabaseConfigured) return null
	if (!supabaseInstance) {
		supabaseInstance = createClient(supabaseUrl, supabaseAnonKey)
	}
	return supabaseInstance
}

export interface WaitlistResult {
	success: boolean
	message: string
	isDuplicate?: boolean
}

/**
 * Inserts an email into the Supabase waitlist table.
 * Table schema expectation:
 *   CREATE TABLE waitlist (
 *     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
 *     email TEXT UNIQUE NOT NULL,
 *     created_at TIMESTAMPTZ DEFAULT NOW()
 *   );
 */
export async function submitWaitlistEmail(
	rawEmail: string,
): Promise<WaitlistResult> {
	const email = rawEmail.trim().toLowerCase()

	// Email validation
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	if (!email || !emailRegex.test(email)) {
		return {
			success: false,
			message: "Please enter a valid email address.",
		}
	}

	const client = getSupabase()

	// If environment variables are not yet configured in local environment
	if (!client) {
		console.info(
			"[Supabase Waitlist] Supabase credentials not set. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env.local file.",
		)
		return {
			success: true,
			message: "Thank you for joining our waitlist!",
		}
	}

	try {
		const { error } = await client.from("waitlist").insert([{ email }])

		if (error) {
			// Postgres unique constraint violation error code
			if (error.code === "23505") {
				return {
					success: true,
					isDuplicate: true,
					message: "You are already on the waitlist!",
				}
			}
			console.error("[Supabase Waitlist Error]", error.message)
			return {
				success: false,
				message: error.message || "Failed to join waitlist. Please try again.",
			}
		}

		return {
			success: true,
			message: "You have been added to the waitlist!",
		}
	} catch (err: unknown) {
		const errorMsg =
			err instanceof Error ? err.message : "An unexpected error occurred"
		console.error("[Supabase Waitlist Exception]", errorMsg)
		return {
			success: false,
			message: errorMsg,
		}
	}
}
