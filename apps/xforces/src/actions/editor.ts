"use server" 

export const SubmitCode = async({code}:{code:string})=>{
  const data = await fetch("https://localhost:3002/api/code/submit",{
    method:"post",
    headers:{
      "Content-Type":"application/json"
    },
    body: JSON.stringify({code:code})
  });;
  const res = await data.json();
  console.log(res);
}