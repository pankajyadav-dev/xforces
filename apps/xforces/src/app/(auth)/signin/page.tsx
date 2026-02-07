import { SignInCredential } from "@/actions/auth";
import SignInGoogle from "@/component/signingoogle";
export default async function signin() {
  return (
    <div className="flex flex-col justify-center bg-green-900 min-h-screen">
      <div className="flex flex-col w-fit mx-auto justify-center items-center gap-6 border-2 rounded-3xl p-25 ">
        <div className="font-bold text-xl">Signin Page</div>
        <SignInGoogle classname="border-2 rounded-xl p-2"/>
        <div className="border-1 w-full"></div>
        <form action={SignInCredential} className="flex flex-col gap-2">
          <h1 className="font-bold mx-auto ">Sign in with email</h1>
          <input className="border-2 rounded-xl px-2 py-1" type="email" placeholder="Email" name="email" />
          <input className="border-2 rounded-xl px-2 py-1" type="password" placeholder="Password" name="password" />
          <button className="border-2 rounded-xl px-2 py-1 " type="submit">Signin </button>
        </form>
      </div>
    </div>
  );
}
