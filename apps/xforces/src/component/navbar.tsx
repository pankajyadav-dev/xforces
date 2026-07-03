import { auth, signIn, signOut } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { SubmitButton } from "./button/signupbutton";

export default async function Navbar() {
  const session = await auth();
  if (!session) {
    return redirect("/signin");
  }

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-surface border-b border-border">
      <div className="flex items-center gap-8">
        <Link href="/" className="text-accent font-bold text-xl tracking-tight">
          XForces
        </Link>
        <Link
          href="/problem"
          className="text-text-muted hover:text-text text-sm font-medium transition-colors"
        >
          Problems
        </Link>
        <Link
          href="/submission"
          className="text-text-muted hover:text-text text-sm font-medium transition-colors"
        >
          Submission
        </Link>
      </div>
      <div className="flex items-center gap-4">
        {session && (
          <>
            <span className="text-text-muted text-sm">
              {session.user?.name || session.user?.email}
            </span>
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <SubmitButton
                className={
                  "px-4 py-1.5 text-sm rounded-md border border-border text-text-muted hover:text-text hover:border-text-muted transition-colors cursor-pointer"
                }
                content="Sign Out"
                loading="Signing Out..."
              />
              {/*<button
                type="submit"
                className="px-4 py-1.5 text-sm rounded-md border border-border text-text-muted hover:text-text hover:border-text-muted transition-colors cursor-pointer"
              >
                Sign Out
              </button>*/}
            </form>
          </>
        )}
        {!session && (
          <form
            action={async () => {
              "use server";
              await signIn();
            }}
          >
            <SubmitButton content="Sign In" loading="Signing..." />
            {/*<button
              type="submit"
              className="px-4 py-1.5 text-sm rounded-md bg-accent text-background font-medium hover:bg-accent-hover transition-colors cursor-pointer"
            >
              Sign In
            </button>*/}
          </form>
        )}
      </div>
    </nav>
  );
}
