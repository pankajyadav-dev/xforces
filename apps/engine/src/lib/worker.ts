import convertToJson from "@/actions/tojson";
import { SubmissionPayload } from "@repo/types";
import redis from "./redis";
import test from "./tester";
export default async function startWorker({
  GROUP_NAME,
  CONSUMER_NAME,
  STREAM_KEY,
}: {
  GROUP_NAME: string;
  CONSUMER_NAME: string;
  STREAM_KEY: string;
}) {
  while (true) {
    try {
      const results = await redis.xreadgroup(
        "GROUP",
        GROUP_NAME,
        CONSUMER_NAME,
        "COUNT",
        1,
        "BLOCK",
        2000,
        "STREAMS",
        STREAM_KEY,
        ">",
      );

      if (!results) continue;
      const messages: any = results[0];
      const task = messages[1][0];
      const taskid = task[0];
      const taskcode = task[1];
      const jsonObject: SubmissionPayload = convertToJson(taskcode);
      // console.log("ubbmited to tester");
      await test(jsonObject, taskid);

      await redis.xack(STREAM_KEY, GROUP_NAME, taskid);
      await redis.xdel(STREAM_KEY, taskid);
    } catch (err) {
      console.error("Worker Error:", err);
    }
  }
}
