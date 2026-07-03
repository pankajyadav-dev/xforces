import { SignInCredential } from "@/actions/auth";
import { SubmitButton } from "@/component/button/signupbutton";
import SignInGoogle from "@/component/signingoogle";
import { auth } from "@/lib/auth";
import Link from "next/link";

export default async function signin() {
  const session = await auth();

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-sm bg-surface rounded-xl border border-border p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>

        <SignInGoogle />

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-border"></div>
          <span className="text-text-muted text-sm">OR</span>
          <div className="flex-1 h-px bg-border"></div>
        </div>

        <form action={SignInCredential} className="flex flex-col gap-4">
          <input
            className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-text placeholder-text-muted text-sm focus:outline-none focus:border-accent transition-colors"
            type="email"
            placeholder="Email"
            name="email"
          />
          <input
            className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-text placeholder-text-muted text-sm focus:outline-none focus:border-accent transition-colors"
            type="password"
            placeholder="Password"
            name="password"
          />
          <SubmitButton content="SignIn" loading="Signing...." />
          {/*<button
            className="w-full py-2.5 bg-accent text-background font-semibold rounded-lg hover:bg-accent-hover transition-colors text-sm cursor-pointer"
            type="submit"
          >
            Sign In
          </button>*/}
        </form>

        <p className="text-center text-text-muted text-sm mt-6">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-accent hover:text-accent-hover transition-colors"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
