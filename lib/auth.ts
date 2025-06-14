import { connect } from "http2";
import { NextAuthOptions } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import { connectionToDatabase } from "./db";
import User from "@/model/User";
import bcrypt from "bcryptjs";

export const authOptions:NextAuthOptions = {
    providers: [
        CredentialProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Enter your email" },
                password: { label: "Password", type: "password", placeholder: "Enter your password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Invalid credentials");
                }
                try {
                    await connectionToDatabase();
                    const user = await User.findOne({ email: credentials.email });
                    if (!user) {
                        throw new Error("User not found");
                    }

                    await bcrypt.compare(credentials.password, user.password)
                        .then((isMatch) => {
                            if (!isMatch) {
                                throw new Error("Invalid password");
                            }
                            return {
                                id: user._id.toString(),                 
                                email: user.email,
                            };
                        });
                } catch (error) {
                    console.error("Error authorizing user:", error);
                    throw new Error("Error authorizing user");
                }
                return null;
            }
        })
    ],
    
    // callabcks must be defined in the same file as authOptions
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                
            }
            return session;
        }
    },
    pages: {
        signIn: "/login",
        error: "/login"
    },
    session:{
        strategy:"jwt",
        maxAge: 30*24*60*60
    },
    secret:process.env.NEXTAUTH_SECRET
}