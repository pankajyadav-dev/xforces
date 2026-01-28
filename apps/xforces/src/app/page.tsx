import { auth, signIn, signOut } from "@/lib/auth";
import Image from "next/image";

export default async function Home() {
  const session = await auth();
  console.log("application session\n",session);
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div>{session?"user is signed in":"no user found"}</div>
      <form action={async()=>{
        "use server"
        await signOut();
      }}>
        <button type="submit">sign out</button>
      </form>
     <form action={async()=>{
       "use server"
       await signIn();
     }}>
       <button type="submit">sign in</button>
     </form>
    </div>
  );
}
