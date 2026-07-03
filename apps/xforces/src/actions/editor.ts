"use server";
import { auth } from "@/lib/auth";
import {
  GetBoilerplateSchema,
  SubmissionPayload,
  TaskPayload,
  TestRequestResponse,
  TestCases,
} from "@repo/types";
import { prisma } from "@repo/db";
import { redirect } from "next/navigation";

export const GetBoilerplate = async (problem: GetBoilerplateSchema) => {
  console.log("getting boilerpalte: ", problem);
  const totaltestcases = await prisma.testCase.count({
    where: { problemId: problem.problemid },
  });
  const questioncontent = await prisma.problemCode.findFirst({
    where: { problemId: problem.problemid, language: problem.language },
    select: {
      classcode: true,
    },
  });
  console.log("questioncontent: ", questioncontent);
  return { questioncontent: questioncontent?.classcode ?? "//Write your code here", totaltestcases };
};

export const PollSubmissionStatus = async (taskId: string) => {
  const user = await auth();
  if (!user?.user?.id) {
    return redirect("/signin");
  }
  const header = new Headers();
  header.append("x-user-id", user.user.id);
  header.append("Content-Type", "application/json");
  const pollstatus = await fetch(
    `${process.env.IRONJUDGE_URL}/status/${taskId}`,
    {
      method: "GET",
      headers: header,
    },
  );
  const result = await pollstatus.json();
  console.log("result:", result);
  return result;
};

export const SubmitCode = async (submission: SubmissionPayload) => {
  const user = await auth();
  if (!user?.user?.id) return { taskId: null };
  const questioncontent = await prisma.problems.findFirst({
    where: { id: submission.problemid },
    select: {
      memorylimit: true,
      timelimit: true,
      testcases: {
        select: {
          input: true,
          output: true,
        },
      },
    },
  });

  const finalPayload: Omit<TaskPayload, "code" | "language"> = {
    timelimit: questioncontent?.timelimit ?? 1000,
    memorylimit: questioncontent?.memorylimit ?? 128,
    testcases: questioncontent?.testcases.map((tc, idx) => ({
      id: idx + 1,
      input: tc.input,
      output: tc.output,
    })),
  };

  console.log("final paylaod", finalPayload);

  const main = await prisma.problemCode.findFirst({
    where: { problemId: submission.problemid, language: submission.language },
    select: {
      maincode: true,
    },
  });

  const finalcodepaylaod = main?.maincode.replace(
    "{{classcode}}",
    submission.code,
  );
  const header = new Headers();
  header.append("x-user-id", user.user.id);
  header.append("Content-Type", "application/json");

  console.log("final code", finalcodepaylaod);
  console.log("submission", submission);

  const Payload: TaskPayload = {
    code: finalcodepaylaod,
    testcases: finalPayload.testcases,
    timelimit: finalPayload.timelimit,
    memorylimit: finalPayload.memorylimit,
    language: submission.language,
  };

  console.log("payload", Payload);

  const response = await fetch(`${process.env.IRONJUDGE_URL}/test`, {
    method: "POST",
    headers: header,
    body: JSON.stringify(Payload),
  });

  if (!response.ok) {
    const requesterror = await response.text();
    console.log(requesterror);
    return { taskId: null };
  }
  console.log(response);
  const result: TestRequestResponse = await response.json();
  console.log(result);
  return { taskId: result.submissionid };
};
