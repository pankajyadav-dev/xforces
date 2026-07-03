import Navbar from "@/component/navbar";
import Link from "next/link";

export default async function Home() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-56px)] px-4">
        <h1 className="text-5xl font-bold text-text mb-4 tracking-tight">
          X<span className="text-accent">Forces</span>
        </h1>
        <p className="text-text-muted text-lg mb-8 text-center max-w-md">
          Sharpen your coding skills. Solve problems, write code, and get better
          every day.
        </p>
        <Link
          href="/problem"
          className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-background font-semibold rounded-lg hover:bg-accent-hover transition-colors text-base"
        >
          Start Solving
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </>
  );
}
