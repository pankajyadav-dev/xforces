import NextAuth, { CredentialsSignin, NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import argon2 from "argon2";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@repo/db";
import { v4 as uuid } from "uuid";
import { loginSchema } from "./validator/login";
import type { NextAuthResult } from "next-auth";



const db_adapter = PrismaAdapter(prisma);
const AuthConfig : NextAuthConfig = {
    adapter: {
      ...db_adapter,
      createUser(user) {
        user.emailVerified = null;
        if (user.isGoogleVerified) {
          user.emailVerified = new Date();
        }
        delete user.isGoogleVerified;
        return prisma.user.create({
          data: {
            ...user,
          },
        });
      },
    },
    session: {
      strategy: "jwt",
      maxAge: 15 * 24 * 60 * 60,
      updateAge: 5 * 24 * 60 * 60
    },
    jwt: {
      maxAge: 7 * 24 * 60 * 60
    },
    providers: [
      Google({
        allowDangerousEmailAccountLinking: true,
        authorization: {
          params: {
            prompt: "select_account",
            access_type: "offline",
            response_type: "code",
          },
        },
        profile(profile) {
          return {
            id: profile.sub,
            name: profile.name,
            email: profile.email,
            image: profile.picture,
            isGoogleVerified: profile.email_verified,
          };
        },
      }),
      Credentials({
        name: "email",
        credentials: {
          email: {
            label: "email",
            placeholder: "enter you email",
          },
          password: {
            label: "password",
            placeholder: "enter your password",
          },
        },
        authorize: async (credentials) => {
          
          const userCredentials = loginSchema.safeParse(credentials);
          if (!userCredentials.success) {
            throw new Error("Invalid credentials parsign failed");
          }
          let user = await prisma.user.findFirst({
            where: {
              email: userCredentials.data.email,
            },
            select: {
              id: true,
              email: true,
              name: true,
              password: true,
              tokenVersion: true
            },
          });
          if (!user) {
            return null;
            // throw new Error("Invalid credentials");
          }
          if (!user.password) {
            return null;
            // throw new Error("Reset the Pasword");
          }
          try{
          const isValidPassword = await argon2.verify(
            user.password as string,
            userCredentials.data.password
          );
          if(!isValidPassword){
            return null;
            // throw new Error("invclaid password");
          }
          }catch(err){
            return null
            // throw new Error("Invalid password");
          }
          return user;
        },
      }),
    ],
    callbacks: {
      async signIn({ user, account }) {
        if (account?.provider == "google") {
          const existedUser = await prisma.user.findFirst({
            where: {
              email: user?.email as string,
            },
          });
          if (existedUser && !existedUser.emailVerified && existedUser.password) {
            return `/verifyEmail?email=${user.email}`;
          }
        }
        return true;
      },
      async jwt({ token, user, trigger }) {
        if (user && trigger == "signIn") {
          const newVerison = uuid();
          await prisma.user.update({
            where: {
              id: user.id,
            },
            data: {
              tokenVersion: newVerison,
            },
          });
          token.id = user?.id;
          token.tokenVersion = newVerison;
        }
        if (!token.id) {
          return null;
        }
        const dbUser = await prisma.user.findUnique({
          where: {
            id: token.id as string
          },
          select: {
            tokenVersion: true,
          }
        })
        if (token.tokenVersion !== dbUser?.tokenVersion) {
          return null;
        }
        return token;
      },
      
      async session({ session, token }) {
        if (!token.tokenVersion || !token.id) {
          return null as any;
        }
        return session;
      },
      async redirect({ url, baseUrl }) {
            if (url.startsWith("/")) return `${baseUrl}${url}`;
            else if (new URL(url).origin === baseUrl) return url;
            return baseUrl;
          },
    },
    pages: {
      signIn: "/signin",
      error: "/auth-error",
      // newUser: "/dashboard,
}};


export const { handlers, signIn, signOut, auth }: NextAuthResult = NextAuth(AuthConfig);
