import { auth, signIn, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Navbar() {
  const session = await auth();
  if (!session) {
    return redirect("/signup");
  }
  console.log(session);

  return (
    <>
      <div className="flex justify-between px-7 py-4 bg-green-900">
        <div>
          <h1>XForces</h1>
        </div>
        <div className="flex">
          {session && <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button type="submit">sign out</button>
          </form>
          }
          {!session &&
          <form
            action={async () => {
              "use server";
              await signIn();
            }}
          >
            <button type="submit">sign in</button>
          </form>
          }
        </div>
      </div>
    </>
  );
}
