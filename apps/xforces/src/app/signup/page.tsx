
import { signIn, signOut } from "@/lib/auth";
import { prisma } from "@repo/db"
import argon2  from "argon2"
export default async function signupPage(){
  
  return(
    <>
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
        <input type="text" name="name" placeholder="Enter you name"/>
        <input type="email" name="email" placeholder="Enter you email"/>
        <input type="password" name="password" placeholder="Enter you password"/>
        <button type="submit">signup</button>
      </form>
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
         
            <form action={async()=>{
              "use server"
              await signOut();
            }}>
              <button type="submit">sign out</button>
            </form>
           <form action={async()=>{
             "use server"
             // await signOut({redirect: false});
             await signIn();
           }}>
             <button type="submit">sign in</button>
           </form>
          </div>
    </>
  )
}