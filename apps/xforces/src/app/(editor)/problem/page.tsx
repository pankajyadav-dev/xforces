import Navbar from "@/component/navbar";
import { PageIndex } from "@/component/pageindex";
import { getVisiblePages } from "@/lib/pagination/getpages";
import { prisma } from "@repo/db";
import Link from "next/link";

export default async function Problems({
  searchParams,
}: {
  searchParams: Promise<{ page: number }>;
}) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const pageSize = 50;
  const [problems, problemCount] = await Promise.all([
    prisma.problems.findMany({
      select: {
        id: true,
        title: true,
      },
      orderBy: {
        id: "asc",
      },
      take: pageSize,
      skip: (currentPage - 1) * pageSize,
    }),
    prisma.problems.count(),
  ]);
  const totalPages = Math.ceil(problemCount / pageSize);
  const visiblePages = getVisiblePages(problemCount, totalPages);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Problems</h1>
        <div className="bg-surface rounded-xl border border-border overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-text-muted font-medium w-16">
                  #
                </th>
                <th className="px-4 py-3 text-text-muted font-medium">Title</th>
              </tr>
            </thead>
            <tbody>
              {problems.map((problem) => (
                <tr
                  key={problem.id}
                  className="border-b border-border last:border-b-0 hover:bg-surface-hover transition-colors"
                >
                  <td className="px-4 py-3 text-text-muted">{problem.id}</td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/problem/${problem.id}`}
                      className="text-text hover:text-accent transition-colors"
                    >
                      {problem.title}
                    </Link>
                  </td>
                </tr>
              ))}
              {problems.length === 0 && (
                <tr>
                  <td
                    colSpan={2}
                    className="px-4 py-8 text-center text-text-muted"
                  >
                    No problems available yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <PageIndex
        currentpage={currentPage}
        visiblePages={visiblePages}
        totalPages={totalPages}
      />
    </div>
  );
}
