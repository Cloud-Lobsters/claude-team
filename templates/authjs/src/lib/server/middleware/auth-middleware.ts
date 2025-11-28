// src/lib/server/middleware/auth.ts
import type { Handle } from "@sveltejs/kit";

/**
 * Authentication middleware
 * Handles session management, route protection, and user authorization
 */
export const authMiddleware: Handle = async ({ event, resolve }) => {
    // Get session from Auth.js
    const session = await event.locals.auth();

    // Populate locals.user for backwards compatibility
    if (session?.user) {
        event.locals.user = session.user;
    }

    // Initialize unlocked projects map from cookie
    event.locals.unlockedProjects = new Map<string, string>();

    // Load unlocked projects from cookie (stored as JSON)
    const unlockedCookie = event.cookies.get('unlocked_projects');
    if (unlockedCookie) {
        try {
            const data = JSON.parse(unlockedCookie);
            event.locals.unlockedProjects = new Map(Object.entries(data));
        } catch (e) {
            // Invalid cookie, ignore
        }
    }

    // Public routes that don't require authentication
    // const publicRoutes = ['/cockpit', '/signin', '/signup', '/api'];
    // const isPublicRoute = publicRoutes.some(route => event.url.pathname.startsWith(route));

    // Protect dashboard routes (but allow public routes)
    if (event.url.pathname.startsWith('/dashboard') && !session?.user) {
        return new Response(null, {
            status: 302,
            headers: { location: '/signin' }
        });
    }

    // Restrict external users to project routes only
    if (session?.user && (session.user as any).isExternal === true) {
        const pathname = event.url.pathname;

        // Allow only project-related and viewer routes for external users
        const allowedRoutes = [
            '/dashboard',
            '/dashboard/projects',
            '/dashboard/viewer',
            // Allow project detail routes like /dashboard/projects/[p_id]
            // and board detail routes like /dashboard/projects/[p_id]/[b_id]
        ];

        const isAllowedRoute =
            allowedRoutes.includes(pathname) ||
            pathname.startsWith('/dashboard/projects/') ||
            pathname.startsWith('/dashboard/viewer/') ||
            pathname.startsWith('/api/');

        if (!isAllowedRoute) {
            return new Response(null, {
                status: 302,
                headers: { location: '/dashboard/projects' }
            });
        }
    }

    // Redirect / to /dashboard for authenticated users, but allow /cockpit
    if (event.url.pathname === '/' && session?.user) {
        return new Response(null, {
            status: 302,
            headers: { location: '/dashboard' }
        });
    }

    return resolve(event);
};
