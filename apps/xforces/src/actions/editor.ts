"use server" 

export const SubmitCode = async({code}:{code:string})=>{
  const data = await fetch("https://localhost:3002/api/code/submit",{
    method:"post",
    headers:{
      "Content-Type":"application/json"
    },
    body: JSON.stringify({code:code,input:"1 \n3\n 4\n 2\n",output:`1 \n 1  2 3 \n 1 2 3 4 \n 1 2\n`})
  });;
  const res = await data.json();
  console.log(res);
}