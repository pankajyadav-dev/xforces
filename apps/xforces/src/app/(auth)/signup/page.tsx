import { SignupUser } from "@/actions/auth";
import { SubmitButton } from "@/component/button/signupbutton";
import Link from "next/link";

export default async function signupPage() {
  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-sm bg-surface rounded-xl border border-border p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Create Account</h1>

        <form action={SignupUser} className="flex flex-col gap-4">
          <input
            className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-text placeholder-text-muted text-sm focus:outline-none focus:border-accent transition-colors"
            type="text"
            name="name"
            placeholder="Full Name"
          />
          <input
            className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-text placeholder-text-muted text-sm focus:outline-none focus:border-accent transition-colors"
            type="email"
            name="email"
            placeholder="Email"
          />
          <input
            className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-text placeholder-text-muted text-sm focus:outline-none focus:border-accent transition-colors"
            type="password"
            name="password"
            placeholder="Password"
          />
          <input
            className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-text placeholder-text-muted text-sm focus:outline-none focus:border-accent transition-colors"
            type="password"
            name="confirmpassword"
            placeholder="Enter Password again"
          />
          <SubmitButton content="SignUp" loading="Signing Up..." />
        </form>

        <p className="text-center text-text-muted text-sm mt-6">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="text-accent hover:text-accent-hover transition-colors"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
