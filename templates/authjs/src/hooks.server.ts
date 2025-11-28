// src/hooks.server.ts
import { handle as authHandle } from "$lib/server/auth";
import { authMiddleware } from "$lib/server/middleware/auth-middleware";
import { cockpitAuthMiddleware } from "$lib/server/middleware/cockpit-auth";
import { rateLimitMiddleware } from "$lib/server/middleware/rate-limit";
import { sequence } from "@sveltejs/kit/hooks";

// export const handle = sequence(authHandle, cockpitAuthMiddleware, rateLimitMiddleware, authMiddleware);
export const handle = sequence(authHandle, cockpitAuthMiddleware, authMiddleware);
