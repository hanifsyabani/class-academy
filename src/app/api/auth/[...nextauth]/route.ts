import { prisma } from "@/lib/prisma";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { NextResponse } from "next/server";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          console.log("No credentials provided");
          return null;
        }

        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const users = await prisma.teacher.findFirst({
          where: { email: email },
        });

        if (!users) {
          NextResponse.json({ message: "Users not found" });
          return null;
        }

        const user: any = {
          id: users.id,
          name: users.fullName,
          email: users.email,
          role: users.role,
        };

        if (email === users.email && password === users.password) {
          return user;
        } else {
          NextResponse.json({ message: "Invalid email or password" });
          return null;
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }: any) {
      if (account?.provider === "credentials") {
        token.id = user.id;
        token.email = user.email;
        token.fullname = user.fullname;
        token.role = user.role;
      }

      if (account?.provider === "google") {
        const googleUser = {
          fullname: profile.fullname,
          email: profile.email,
          type: "google",
        };

        const existingUser = await prisma.teacher.findFirst({
          where: { email: googleUser.email },
        });

        if (!existingUser) {
          const newUser = await prisma.teacher.create({
            data: {
              fullName: googleUser.fullname,
              email: googleUser.email,
              role: "teachers",
            },
          });

          token.email = newUser.email;
          token.fullname = newUser.fullName;
          token.role = newUser.role;
        } else {
          token.email = existingUser.email;
          token.fullname = existingUser.fullName;
          token.role = existingUser.role;
        }
      }
      return token;
    },

    async session({ session, token }: any) {
      if ("id" in token) {
        session.user.id = token.id;
      }
      if ("email" in token) {
        session.user.email = token.email;
      }
      if ("fullname" in token) {
        session.user.fullname = token.fullname;
      }
      if ("role" in token) {
        session.user.role = token.role;
      }

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
