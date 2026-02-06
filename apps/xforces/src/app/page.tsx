import Navbar from "@/component/navbar";
import { auth, signIn, signOut } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";


export default async function Home() {
  return (
    <>
    <Navbar/>
    <div className="flex flex-col min-h-screen items-center justify-center bg-green-800 font-sans dark:bg-green-800">
      <div>Welcome to the Xforces</div>
     <Link href={'/compiler'}>Compiler</Link> 
     <Link href={'/problem'}>Problems</Link> 
    </div>
    </>
  );
}
