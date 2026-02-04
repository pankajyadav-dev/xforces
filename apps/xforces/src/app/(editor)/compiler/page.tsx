"use client"
import Editorpage from "@/component/editor"
import { EditorLang } from "@/types/editor"
import { useRef } from "react"
export default function editorpage(){
  const editRef = useRef<any>(null);
  return (
    <>
      <div>
        <h1>XFroces</h1>
      </div>
      <Editorpage content={`#include<iostream>\n using namespace std; \n int main(){\nreturn 0;\n}`} language={EditorLang.cpp} editorRef={editRef}/>
    </>
  )
}