import Link from "next/link";

export default async function auth_error({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <div className="bg-green-900 min-h-screen flex flex-col justify-start items-center gap-20 py-30 ">
      <h1 className="border-2 border-red-900 text-red-900 rounded-xl font-bold p-3">
        Authentication Error
      </h1>
      <p>{error}</p>
      <div className="flex gap-4">
        <Link className="border-2 px-2 py-1 rounded-xl" href={"/signin"}>
          signin
        </Link>
        <Link className="border-2 px-2 py-1 rounded-xl" href={"/signup"}>
          signup
        </Link>
      </div>
    </div>
  );
}
