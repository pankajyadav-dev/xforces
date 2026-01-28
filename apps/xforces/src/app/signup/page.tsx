import { prisma } from "@repo/db"

export default function signupPage(){
  
  return(
    <>
      <form action={async(FormData)=>{
        "use server"
        await prisma.user.create({
          data:{
            name: FormData.get("name") as string,
            password: FormData.get("password") as string,
            email: FormData.get("email") as string
          }
        })
      }}>
        <input type="text" name="name" placeholder="Enter you name"/>
        <input type="email" name="email" placeholder="Enter you email"/>
        <input type="password" name="password" placeholder="Enter you password"/>
        <button type="submit">signup</button>
      </form>
    </>
  )
}