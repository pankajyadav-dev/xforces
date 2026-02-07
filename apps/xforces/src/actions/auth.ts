"use server"

import { signIn, signOut } from "@/lib/auth"
import { AuthError } from "next-auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";



export  const SignInGoogle = async():Promise<void>=>{
  try{
  await signOut({redirect:false});
  await signIn("google",{redirect: true,redirectTo:"/"});
  }catch(err){
    if(err instanceof AuthError){
    return redirect(`/auth-error?error=${err}`);
    }
    throw err;
  }
}


export  const SignInCredential = async(credentials:FormData):Promise<void>=>{
 try{
  await signOut();
  const email = credentials.get("email");
  const password = credentials.get("password");
  await signIn("credentials",{email,password,redirectTo:"/"});
  
  }catch(err){
    if(err instanceof AuthError){
    return redirect(`/auth-error?error=${err}`);
    }
    throw err;
  }
}

