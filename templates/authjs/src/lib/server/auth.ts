// src/lib/server/auth.ts
import { SvelteKitAuth } from "@auth/sveltekit";
import Credentials from "@auth/sveltekit/providers/credentials";
import { AuthService } from "../services/authentication.service";
import type { Provider } from "@auth/sveltekit/providers";
import { hash } from "@node-rs/bcrypt";
import { dev } from "$app/environment";

export const { handle } = SvelteKitAuth(async () => {
    const authOptions = {
        session: {
            strategy: "jwt" as const,
            maxAge: 7 * 24 * 60 * 60, // 7 days
        },
        providers: [
            Credentials({
                id: "credentials",
                name: "Credentials",
                credentials: {
                    username: { label: "Username", type: "email" },
                    password: { label: "Password", type: "password" }
                },
                authorize: async (credentials) => {
                    try {
                        const authCredentials = {
                            email: credentials?.username,
                            password: credentials?.password
                        };

                        const user = await AuthService.authenticateUser(authCredentials);

                        if (user) {
                            return {
                                id: user.id,
                                email: user.email,
                                name: user.name,
                                isAdmin: user.isAdmin,
                                isExternal: user.isExternal
                            };
                        } else {
                            return null;
                        }
                    } catch (error) {
                        return null;
                    }
                }
            }) as Provider
        ],
        callbacks: {
            redirect({ baseUrl, url }: any) {
                // If url is provided and is a full URL starting with baseUrl
                if (url?.startsWith(baseUrl)) {
                    return url;
                }
                // If url is a relative path starting with /
                if (url?.startsWith('/')) {
                    return `${baseUrl}${url}`;
                }
                // If url is empty/undefined, just return baseUrl (don't force redirect on every request)
                return baseUrl;
            },
            async jwt(params: any) {
                const { token, user } = params;

                if (user) {
                    token.id = (user as any).id;
                    token.isAdmin = (user as any).isAdmin;
                    token.isExternal = (user as any).isExternal;
                }

                return token;
            },
            async session({ session, token }: any) {
                if (session?.user && token?.id) {
                    (session.user as any).id = token.id as string;
                    (session.user as any).isAdmin = token.isAdmin as boolean;
                    (session.user as any).isExternal = token.isExternal as boolean;
                }

                return session;
            },
        },
        pages: {
            signIn: "/signin"
        },
        secret: process.env.AUTH_SECRET,
        trustHost: true,
        debug: dev,
        // Use the request URL for proper origin detection
        useSecureCookies: !dev,
    };

    return authOptions;
});

export async function hashPassword(password: string): Promise<string> {
    return hash(password, 10);
}
