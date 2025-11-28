import type { LayoutServerLoad } from "./$types";
import { branding } from "$lib/config/branding";

export const ssr = false;

export const load: LayoutServerLoad = async ({ locals }) => {
  return {
    user: locals.user,
    breadcrumb: [{ label: "Dashboard", href: "/dashboard" }],
    branding,
  };
};
