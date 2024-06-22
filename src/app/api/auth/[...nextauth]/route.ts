import { prisma } from "@/lib/prisma";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

async function login(credentials: { email: string; password: string }) {
  const { email, password } = credentials;

  const user = await prisma.teacher.findFirst({
    where: {
      email,
    },
  });

  if (!user || !user.password) {
    return null;
  }

  const compare = await bcrypt.compare(password, user.password);
  if (!compare) return null;

  return user;
}

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge : 60 * 60 ,
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
          where: { email :email },
        });


        if (!users) {
          console.log("No users provided");
          return null;
        }

        const user: any = {
          id: users.id,
          name:  users.fullName,
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
  ],
  callbacks: {
    async jwt({ token, account, profile, user }: any) {
      if (account?.provider === "credentials") {
        token.email = user.email;
        token.fullname = user.fullname;
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }: any) {
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
