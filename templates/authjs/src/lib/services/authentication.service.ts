import { db } from '../server/db';
import { hash, verify } from '@node-rs/bcrypt';
import { z } from 'zod';

const signInSchema = z.object({
    email: z.string({ required_error: "Email is required" })
        .min(1, "Email is required")
        .email("Invalid email"),
    password: z.string({ required_error: "Password is required" })
        .min(1, "Password is required")
});

export interface AuthUser {
    id: string;
    email: string;
    name: string;
    isAdmin: boolean;
    isExternal: boolean;
}

export class AuthService {
    static async authenticateUser(credentials: any): Promise<AuthUser | null> {
        try {
            console.log('[AuthService] Starting authentication for credentials:', {
                hasEmail: !!credentials?.email,
                hasPassword: !!credentials?.password
            });

            const { email, password } = await signInSchema.parseAsync(credentials);

            console.log('[AuthService] Looking up user:', email.toLowerCase());

            const user = await db.user.findUnique({
                where: { email: email.toLowerCase() },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    passwordHash: true,
                    isAdmin: true,
                    isExternal: true
                }
            });

            if (!user || !user.passwordHash) {
                console.log('[AuthService] User not found or no password hash');
                return null;
            }

            console.log('[AuthService] User found, verifying password');

            const isValidPassword = await verify(password, user.passwordHash);

            if (!isValidPassword) {
                console.log('[AuthService] Invalid password');
                return null;
            }

            console.log('[AuthService] Authentication successful for user:', user.email);

            return {
                id: user.id,
                email: user.email,
                name: user.name || '',
                isAdmin: user.isAdmin,
                isExternal: user.isExternal
            };
        } catch (error) {
            console.error('[AuthService] Authentication error:', error);
            return null;
        }
    }

    static async createUser(userData: {
        email: string;
        password: string;
        name?: string;
    }): Promise<AuthUser | null> {
        try {
            const hashedPassword = await hash(userData.password, 12);

            const user = await db.user.create({
                data: {
                    email: userData.email.toLowerCase(),
                    passwordHash: hashedPassword,
                    name: userData.name || '',
                },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    isAdmin: true,
                    isExternal: true
                }
            });

            return {
                id: user.id,
                email: user.email,
                name: user.name || '',
                isAdmin: user.isAdmin,
                isExternal: user.isExternal
            };
        } catch (error) {
            return null;
        }
    }
}