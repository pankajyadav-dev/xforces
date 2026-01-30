"use server"

import { signIn, signOut } from "@/lib/auth"



export  const SignInGoogle = async():Promise<void>=>{
  await signOut({redirect: false});
  await signIn("google",{redirectTo:"/"});
}


export  const SignInCredential = async(credentials:FormData):Promise<void>=>{
  await signOut({redirect: false});
  const email = credentials.get("email");
  const password = credentials.get("password");
  await signIn("credentials",{email,password,redirectTo:"/"});
}