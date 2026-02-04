
import Editorpage from "@/component/editor"
import QuestionBoard from "@/component/questionBoard"
import { EditorLang } from "@/types/editor"
export default async function editorpage(){
  // const editRef = useRef<any>(null);
  const question = `### Problem 1: Two Sum\n\n\n**Question Number:** 1\nWrite a C++ code to print numbers from 1 to n.\n**Example:**\n\`\`\`cpp\nInput: n = 5\nOutput: 1 2 3 4 5\n\`\`\``;
  return (
    <>
      <div>
        <h1>XFroces</h1>
      </div>
      <div>
        <QuestionBoard question={question}/>
      </div>
      <Editorpage content={`#include<iostream>\n using namespace std; \n int main(){\nreturn 0;\n}`} language={EditorLang.cpp}/>
    </>
  )
}