import { cookies } from "next/headers";
import { NextResponse } from "next/server"

export async function  GET(request:Request){
  const cookie = await cookies();
  cookieStore.delete("authjs.session-token");
    cookieStore.delete("__Secure-authjs.session-token");
    cookieStore.delete("next-auth.session-token");
    const {searchParams} = new URL(request.url);
    const callbackurl = searchParams.get("callbackurl") || "/";
  return NextResponse.redirect(new URL(callbackurl,request.url));
};