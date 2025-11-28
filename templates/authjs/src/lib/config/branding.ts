// Branding configuration from environment variables
export const branding = {
  favicon: process.env.BRAND_FAVICON || "/favicon.png",
  logo: process.env.BRAND_LOGO || "",
  title: process.env.BRAND_TITLE || "CL Project Management",
  shortTitle: process.env.BRAND_SHORT_TITLE || "PM Platform",
};
