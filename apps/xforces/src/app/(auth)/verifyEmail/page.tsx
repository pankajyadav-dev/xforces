export default async function verifyEmail({searchParams}:{searchParams:Promise<{email?: string}>}){
  const {email} = await searchParams;
  return (
    <>
      <div>{email}</div>
    </>
  );
}