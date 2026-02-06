import Navbar from "@/component/navbar";
import { prisma } from "@repo/db"

export default async function Problems(){
  const problems = await prisma.questions.findMany(
    {
      select:{
        id: true,
        title: true
      }
    }
  );
  console.log(problems);
    return(
      <div 
        className="bg-green-800 min-h-screen"
      >
        <Navbar/>
        <div className="ps-10 flex flex-col w-full min-h-screen  items-left bg-black">
        {problems.map((problem,idx)=>(
          <div key={idx} className="flex gap-6">
            <h1>{problem.id}</h1>
            <h1>{problem.title}</h1>
          </div>
        ))}
        </div>
      </div>
    )
}