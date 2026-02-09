"use server" 
import redis from "@/lib/redis";
import {SubmissionPayload} from "@repo/types";

export const SubmitCode = async(submission:SubmissionPayload)=>{
  const taskId = await redis.xadd(
    "tasks", "*", 
    "userId", JSON.stringify(submission.userid), 
    "code", JSON.stringify(submission.code),
    "input", JSON.stringify(submission.input),
    "output", JSON.stringify(submission.output),
    "timelimit", JSON.stringify(submission.timelimit),
    "memory", JSON.stringify(submission.memory)
  );

  await redis.hset(`status:${taskId}`, {
    state: "queued",
    result: {}
  });
  
  return {taskId};
}


