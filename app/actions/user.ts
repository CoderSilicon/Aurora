'use server'

import { checkUser } from "@/lib/checkUser";

export async function verifyUser() {
  try {
    const user = await checkUser();
    return { success: true, user };
  } catch (error) {
    console.error("[VERIFY_USER]", error);
    return { success: false, error: "Failed to verify user" };
  }
} 