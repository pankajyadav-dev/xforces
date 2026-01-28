import NextAuth, { CredentialsSignin } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import argon2 from "argon2";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Prisma, prisma } from "@repo/db";
import { v4 as uuid } from "uuid";
import { loginSchema } from "./validator/login";

const db_adapter = PrismaAdapter(prisma);
export const { handlers, signIn, signOut, auth } = NextAuth({
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
  },
  providers: [
    Google({
      allowDangerousEmailAccountLinking: true,
      authorization: {
        params: {
          prompt: "consent",
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
        const rawCredentials = 
            credentials instanceof FormData 
              ? Object.fromEntries(credentials.entries()) 
              : credentials;
        console.log("credential ------------------\n",rawCredentials);
        
        const userCredentials = loginSchema.safeParse(rawCredentials);
        if(!userCredentials.success){
          throw new CredentialsSignin("Invalid credentials parsign failed");
        }
        console.log(userCredentials.data);
        // const pwHash = await argon2.hash(credentials.password as string);
        let user = await prisma.user.findFirst({
          where: {
            email: userCredentials.data?.email as string,
          },
          select: {
            id: true,
            email: true,
            name: true,
            password: true,
            tokenVersion: true
          },
        });
        console.log(user);
        if (!user) {
          throw new CredentialsSignin("Invalid credentials");
          // return;
        }
        const isValidPassword = await argon2.verify(
          user?.password as string,
          userCredentials.data?.password as string,
        );
        if (!isValidPassword) {
          throw new CredentialsSignin("Invalid Password");
          // return;
        }
        return user;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
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
      if (user) {
        const isUser = await prisma.user.findFirst({
          where: {
            id: user.id,
          },
          select: {
            id: true,
          },
        });
        if (isUser) {
          const newVerison = uuid();
          await prisma.user.update({
            where: {
              id: user.id,
            },
            data: {
              tokenVersion: newVerison,
            },
          });
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        console.log("jwt----------------user---------------\n", user);
        const dbUser = await prisma.user.findFirst({
          where: {
            id: user.id,
          },
          select: {
            tokenVersion: true,
            id: true,
          },
        });
        token.id = dbUser?.id;
        token.tokenVersion = dbUser?.tokenVersion;
      }
      console.log(token);
      return token;
    },
    async session({ session, token }) {
      console.log(token);

      if (!token.tokenVersion && !token.id) {
        return null as any;
      }

      const dbUser = await prisma.user.findFirst({
        where: {
          id: token.id as string,
        },
        select: {
          tokenVersion: true,
        },
      });
      if (!dbUser || token.tokenVersion !== dbUser.tokenVersion) {
        return null as any;
      }
      console.log(session);
      return session;
    },
  },
  pages: {
    // signIn: "/signin",
    error: "/auth-error",
    // newUser: "/dashboard",
  },
});
