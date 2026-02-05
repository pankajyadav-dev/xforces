"use server" 
import redis from "@/lib/redis";

interface submitSchema{
  code: string
}
export const SubmitCode = async({code}:submitSchema)=>{
  const taskId = await redis.xadd(
    "tasks", "*", 
    "userId", "123123", 
    "data", JSON.stringify(code),
    "status", "pending"
  );

  await redis.hset(`status:${taskId}`, {
    state: "queued",
    result: {}
  });
  
  return {taskId};
}


