import { SignInCredential, SignInGoogle } from "@/actions/auth";
import { auth } from "@/lib/auth";

export default async function signin() {
  const session = await auth();
  console.log("sign in page session");
  console.log(session);
  return (
    <>
      <div>Signin Page</div>
      <div>
        <form action={SignInGoogle}>
          <button type="submit">Signin with google</button>
        </form>
        <form action={SignInCredential}>
          <input type="email" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <button type="submit">Signin with email</button>
        </form>
      </div>
    </>
  );
}
