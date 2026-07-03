import { prisma } from "@repo/db";
import { redirect } from "next/navigation";
import Editorpage from "@/component/editor";
import QuestionBoard from "@/component/questionBoard";
import { auth } from "@/lib/auth";
import Navbar from "@/component/navbar";

export default async function ProblemPage({
  params,
}: {
  params: Promise<{ problemid: number }>;
}) {
  const param = await params;
  const { problemid } = param;

  const problem = await prisma.problems.findUnique({
    where: {
      id: Number(problemid),
    },
    select: {
      id: true,
      statement: true,
      title: true,
    },
  });
  if (!problem) {
    return redirect("/error?message=wrongproblemid");
  }

  const user = await auth();

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex items-center justify-between px-4 py-2 bg-surface border-b border-border shrink-0">
        <div className="flex items-center gap-4">
          <h1 className="text-sm font-medium text-text">
            {problem.id}. {problem.title}
          </h1>
        </div>
      </div>
      <div className="flex flex-1 min-h-0">
        <div className="w-2/5 border-r border-border overflow-y-auto p-6">
          <QuestionBoard question={problem.statement || ""} />
        </div>

        <div className="w-3/5 min-h-0 flex flex-col">
          <Editorpage
            codeEditorParam={{
              content: {
                problemid: problem.id,
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
