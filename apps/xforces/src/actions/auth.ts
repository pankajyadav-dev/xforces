"use server";

import { signIn, signOut } from "@/lib/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { prisma, Prisma } from "@repo/db";
import { SignupSchema } from "@/lib/validator/login";

export const SignupUser = async (credentials: FormData): Promise<void> => {
  const parsedCredentials = SignupSchema.safeParse({
    name: credentials.get("name"),
    email: credentials.get("email"),
    password: credentials.get("password"),
    confirmpassword: credentials.get("confirmpassword"),
  });
  if (!parsedCredentials.success) {
    return redirect(`/auth-error?error=invalidcredentails`);
  }
  // console.log(parsedCredentials.data);
  if (
    parsedCredentials.data.password !== parsedCredentials.data.confirmpassword
  ) {
    return redirect("/auth-error?error=passwordmismatch");
  }
  try {
    const pwHash = await Bun.password.hash(
      parsedCredentials.data.password as string,
    );
    await prisma.user.create({
      data: {
        name: parsedCredentials.data.name,
        password: pwHash,
        email: parsedCredentials.data.email,
      },
    });
  } catch (err: any) {
    console.log(err);
    if (err?.code as string) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err?.code === "P2002") {
          redirect(`/auth-error?error=emailexists`);
        }
      }
    }
    return redirect(`/auth-error?error=signupfailed`);
  }
  return redirect("/signin");
};

// export  const SignInGoogle = async():Promise<void>=>{
//   try{
//   await signOut({redirect:false});
//   await signIn("google",{redirect: true,redirectTo:"/"});
//   }catch(err){
//     if(err instanceof AuthError){
//     return redirect(`/auth-error?error=${err}`);
//     }
//     throw err;
//   }
// }

export const SignInCredential = async (
  credentials: FormData,
): Promise<void> => {
  try {
    await signOut({ redirect: false });
    const email = credentials.get("email");
    const password = credentials.get("password");
    await signIn("credentials", { email, password, redirectTo: "/" });
  } catch (err) {
    if (err instanceof AuthError) {
      return redirect(`/auth-error?error=${err}`);
    }
    throw err;
  }
};
