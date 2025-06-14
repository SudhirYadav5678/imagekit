import NextAuth,{DefaultSession} from "next-auth";


declare module "next-auth" {
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string; // Add role property
  }

  interface Session {
    user:{
      id: string;
    } & DefaultSession["user"];
  }
}