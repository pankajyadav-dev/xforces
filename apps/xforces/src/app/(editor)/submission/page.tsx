import { auth } from "@/lib/auth";
import { prisma } from "@repo/db";
import Navbar from "@/component/navbar";
import { getVisiblePages } from "@/lib/pagination/getpages";
import { PageIndex } from "@/component/pageindex";

export default async function SubmissionPage({
  searchParams,
}: {
  searchParams: Promise<{ page: number }>;
}) {
  const param = await searchParams;
  const { page } = param;
  const user = await auth();
  const userid = user?.user?.id;
  const currentpage = Number(page) || 1;
  const pageSize = 50;
  const [submissions, totalsubmissions] = await Promise.all([
    prisma.submission.findMany({
      where: {
        userId: userid,
      },
      select: {
        id: true,
        problemid: true,
        status: true,
        remark: true,
        submitedAt: true,
      },
      orderBy: {
        submitedAt: "desc",
      },
      take: pageSize,
      skip: (currentpage - 1) * pageSize,
    }),
    prisma.submission.count({ where: { userId: userid } }),
  ]);
  const totalPages = Math.ceil(totalsubmissions / pageSize);

  const visiblePages = getVisiblePages(currentpage, totalPages);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">My Submissions</h1>
        <div className="bg-surface rounded-xl border border-border overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-text-muted font-medium w-16">
                  Id
                </th>
                <th className="px-4 py-3 text-text-muted font-medium w-16">
                  Problem Id
                </th>
                <th className="px-4 py-3 text-text-muted font-medium">
                  Status
                </th>
                <th className="px-4 py-3 text-text-muted font-medium">
                  Remark
                </th>
                <th className="px-4 py-3 text-text-muted font-medium">
                  Submitted At
                </th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((entry, idx) => (
                <tr
                  key={entry.id}
                  className="border-b border-border last:border-b-0 hover:bg-surface-hover transition-colors"
                >
                  <th className="px-4 py-3 text-text-muted">
                    {(currentpage - 1) * pageSize + idx + 1}
                  </th>
                  <td className="px-4 py-3 text-text-muted">
                    {entry.problemid}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        entry.status === "AC"
                          ? "text-success font-medium"
                          : entry.status === "WA"
                            ? "text-danger font-medium"
                            : "text-text"
                      }
                    >
                      {entry.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-text-muted">
                    {entry.remark ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-text-muted">
                    {entry.submitedAt.toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {submissions.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-8 text-center text-text-muted"
                  >
                    No submissions yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <PageIndex
        currentpage={currentpage}
        totalPages={totalPages}
        visiblePages={visiblePages}
      />
    </div>
  );
}
