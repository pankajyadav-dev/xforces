export default async function verifyEmail({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email } = await searchParams;

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-sm bg-surface rounded-xl border border-border p-8 text-center">
        <div className="text-4xl mb-4">📧</div>
        <h1 className="text-xl font-bold mb-2">Check Your Email</h1>
        <p className="text-text-muted text-sm mb-2">
          We&apos;ve sent a verification link to:
        </p>
        {email && (
          <p className="text-accent font-medium text-sm mb-6">{email}</p>
        )}
        <p className="text-text-muted text-xs">
          Please check your inbox and click the link to verify your account.
        </p>
      </div>
    </div>
  );
}
