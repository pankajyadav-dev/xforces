"use client"
import { SignInCredential, SignInGoogle } from "@/actions/auth";

export default function signin(){
  
  return (
    <>
      <div>Signin Page</div>
      <div>
        <form action={SignInGoogle}>
          <button type="submit">Signin with google</button>
        </form>
        <form action={SignInCredential}>
          <input type="email" placeholder="Email" name="email"/>
          <input type="password" placeholder="Password" name="password"/>
          <button type="submit">Signin with email</button>
        </form>
      </div>
    </>
  );
};