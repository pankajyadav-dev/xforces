import { SubmissionPayload } from "@repo/types";
import { docker } from "./docker";
import { CONTAINER_NAME } from "..";
import { PassThrough, Writable } from "stream";
import Dockerode from "dockerode";
import { prisma } from "@repo/db";

const MAX_OUTPUT_SIZE = 100 * 1024;

export default async function test(
  payload: SubmissionPayload,
  taskid: string,
): Promise<void> {
  let container: Dockerode.Container | undefined;
  let stream: NodeJS.ReadWriteStream | undefined;
  let timerId: NodeJS.Timeout | undefined;
  let finaloutput: { userid: string; message: string } = {
    userid: payload.userId,
    message: "",
  };
  try {
    const inputBase64 = Buffer.from(payload.input || "").toString("base64");
    const codeBase64 = Buffer.from(payload.code).toString("base64");
    const cmd = [
      "/bin/sh",
      "-c",
      `echo "${codeBase64}" | base64 -d > main.cpp && echo "${inputBase64}" | base64 -d > input.txt && g++ -o app main.cpp && ./app < input.txt`,
    ];
    container = await docker.createContainer({
      Image: CONTAINER_NAME,
      Cmd: cmd,
      Tty: false,
      // OpenStdin: true,
      // StdinOnce: true,
      // AttachStdin: true,
      HostConfig: {
        Memory: Number(payload.memory) * 1024 * 1024,
        NetworkMode: "none",
      },
    });
    stream = await container.attach({
      // hijack: true,
      stream: true,
      // stdin: true,
      stdout: true,
      stderr: true,
    });
    let output = "";
    let errorOutput = "";
    let isOOM = false;
    const stdoutStream = new Writable({
      write(chunk, encoding, callback) {
        if (output.length < MAX_OUTPUT_SIZE) {
          output += chunk.toString();
        } else if (!isOOM) {
          isOOM = true;
          output += "\n[Output Truncated]";
        }
        callback();
      },
    });

    const stderrStream = new Writable({
      write(chunk, encoding, callback) {
        if (errorOutput.length < MAX_OUTPUT_SIZE) {
          errorOutput += chunk.toString();
        }
        callback();
      },
    });
    container.modem.demuxStream(stream, stdoutStream, stderrStream);

    const timeLimit = () =>
      new Promise(
        (_, reject) =>
          (timerId = setTimeout(
            () => reject(new Error("TLE")),
            Number(payload.timelimit) + 500,
          )),
      );

    await container.start();

    const ContainerPromise = container.wait();
    const exicutionresult: { StatusCode: number } = await Promise.race([
      ContainerPromise,
      timeLimit(),
    ]);
    clearTimeout(timerId);
    // console.log(output);
    // console.log(errorOutput);
    // console.log(exicutionresult);
    if (exicutionresult.StatusCode === 0) {
      let status = output.trim() === payload.output;
      finaloutput = status
        ? { userid: payload.userId, message: "successfull" }
        : { userid: payload.userId, message: "Test case failed" };
    } else {
      finaloutput = { userid: payload.userId, message: "failed" };
    }
  } catch (err: any) {
    if (err.message === "TLE") {
      finaloutput = { userid: payload.userId, message: "Time Limit exceeded" };
    } else {
      finaloutput = { userid: payload.userId, message: "Execution Error" };
    }
  } finally {
    if (container) {
      await container.remove({ force: true });
    }
    const redispipeline = redis.pipeline();
    redispipeline.hset(`status:${taskid}`, {
      state: "completed",
      remark: finaloutput.message,
    });
    // redispipeline.expire(`status:${taskid}`, 300);
    await redispipeline.exec();
    await prisma.submission.create({
      data: {
        userId: payload.userId,
        status: "completed",
        problemid: payload.problemid,
        remark: finaloutput.message,
      },
    });
    return;
  }
}
