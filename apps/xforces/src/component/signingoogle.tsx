"use client"

import { signIn, signOut } from "next-auth/react"
interface signInGoogleSchema{
  classname: string
}
export default function signInGoogle({classname}:signInGoogleSchema){
  const GoogleSign = async()=>{
    await signOut({redirect:false});
    await signIn("google",{redirectTo:"/"});
  }
  return (
    <div
      className={classname}
    >
      <button onClick={()=>GoogleSign()} type="button">
        Sign In With Google
      </button>
    </div>
  )
}