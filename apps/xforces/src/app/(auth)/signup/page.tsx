import { signIn, signOut } from "@/lib/auth";
import { prisma } from "@repo/db"
import argon2  from "argon2"
import Link from "next/link";
export default async function signupPage(){
  
  return(
    <div className="flex flex-col justify-evenly bg-green-900 min-h-screen min-w-100% py-10">
      <form action={async(FormData)=>{
        "use server"
        const pwHash = await argon2.hash(FormData.get("password") as string);
        await prisma.user.create({
          data:{
            name: FormData.get("name") as string,
            password: pwHash,
            email: FormData.get("email") as string
          }
        })
      }}>
        <div className="flex flex-col items-center justify-center gap-4 border-2 w-fit mx-auto p-10 rounded-3xl">
          <h1 className="font-bold text-2xl">Sign Up</h1>
        <input className="border-2 rounded-xl p-2" type="email" name="email" placeholder="Enter you email"/>
        <input className="border-2 rounded-xl p-2" type="password" name="password" placeholder="Enter you password"/>
        <input className="border-2 rounded-xl p-2" type="text" name="name" placeholder="Enter you name"/>
        <button  className="border-2 rounded-xl p-2" type="submit">signup</button>
        </div>
      </form>
      <div className=" border-2 w-fit mx-auto px-4  py-2  rounded-xl flex items-center justify-center  font-sans ">
        <Link href="/signin">Signin</Link>
      </div>
    </div>
  )
}