import NextAuth, { Session, User } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import credentials from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import client from "./lib/prismadb";
import bcrypt from "bcryptjs";

const prisma = client;

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    credentials({
      credentials: {
        email: { label: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials.email || !credentials?.password) {
          throw new Error("invalid credentials");
        }

        const user = await prisma.user.findUnique({
          where: {
            // @ts-ignore
            email: credentials.email,
          },
        });
        if (!user || !user?.hashedPassword) {
          throw new Error("invalid credentials");
        }

        const isCorrectPassword = await bcrypt.compare(
          // @ts-ignore
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error("invalid credentials");
        }

        return user;
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    jwt({ token, user }) {
      return { ...token, ...user };
    },
    session({ session, token }: { session: Session; token: JWT & User }) {
      session.user = token;
      return session;
    },
  },
});
