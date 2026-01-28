
export default async function auth_error({searchParams}:{searchParams:Promise<{error?:string}>}){
  const {error}= await searchParams;
  return(
    <>
      <div>Error page</div>
      <p>{error}</p>
    </>
  );
}