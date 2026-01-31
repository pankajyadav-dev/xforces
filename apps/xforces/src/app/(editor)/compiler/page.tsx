"use client"
import { SubmitCode } from "@/actions/editor";
import MonacoEditor from "@/component/editor";
import { EditorLang } from "@/types/editor";
import { useRef } from "react";

export default function editorpage(){
  const editorRef = useRef<any>(null);
  return (
    <>
      <MonacoEditor content={`#include<iostream>\nint main(){}`} editorRef={editorRef} language={EditorLang.cpp}/>
      <button onClick={()=>SubmitCode({code:editorRef.current.getValue()})}>submit</button>
    </>
  )
}