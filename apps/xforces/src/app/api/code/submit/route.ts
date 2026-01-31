import { NextResponse } from "next/server";

export async function POST(request:Request&{body:{code:string}}){
  const body = await request.json() ;
  console.log(body);
  const {code } = body;
  console.log(code);
  return NextResponse.json({code});
}