import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { db } from "$lib/server/db";

const getErrorMessage = (errorType: string | null): string | null => {
  if (!errorType) return null;

  switch (errorType) {
    case "CredentialsSignin":
      return "Invalid email or password";
    case "Configuration":
      return "Authentication system error. Please contact support.";
    case "AccessDenied":
      return "Access denied. Please contact your administrator.";
    case "Verification":
      return "Account verification required.";
    default:
      return "Sign in failed. Please try again.";
  }
};

export const load: PageServerLoad = async ({ locals, url }) => {
  const session = await locals.auth();
  if (session?.user) {
    throw redirect(302, "/dashboard");
  }

  // Check for Auth.js error in URL params
  const error = url.searchParams.get("error");
  const errorMessage = getErrorMessage(error);

  // Load quick users for avatar selection

  return {
    error: errorMessage,
  };
};
