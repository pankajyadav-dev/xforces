import { NextResponse } from "next/server";
import redis from "@/lib/redis";
export async function POST(request:Request&{body:{code:string}}){
  const body = await request.json() ;
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