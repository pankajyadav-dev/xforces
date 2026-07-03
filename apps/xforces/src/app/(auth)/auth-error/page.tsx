import Link from "next/link";

export default async function auth_error({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-sm bg-surface rounded-xl border border-danger/30 p-8 text-center">
        <div className="text-4xl mb-4">⚠️</div>
        <h1 className="text-xl font-bold text-danger mb-3">
          Authentication Error
        </h1>
        {error && (
          <p className="text-text-muted text-sm mb-6 bg-background rounded-lg p-3 border border-border">
            {error}
          </p>
        )}
        <div className="flex gap-3 justify-center">
          <Link
            href="/signin"
            className="px-5 py-2 bg-accent text-background font-semibold rounded-lg hover:bg-accent-hover transition-colors text-sm"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="px-5 py-2 border border-border text-text-muted rounded-lg hover:text-text hover:border-text-muted transition-colors text-sm"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
