import { NextRequest, NextResponse } from "next/server";
import redis from "@/lib/redis";
interface submitSchema{
  code: string
}
export async function POST(request:NextRequest){
  const body: submitSchema = await request.json() ;
  const {code } = body;
  const taskId = await redis.xadd(
    "tasks", "*", 
    "userId", "123123", 
    "data", JSON.stringify(body),
    "status", "pending"
  );

  await redis.hset(`status:${taskId}`, {
    state: "queued",
    result: ""
  });
  
  return NextResponse.json({taskId});
}