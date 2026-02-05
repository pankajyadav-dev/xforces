"use client"
import { SubmitCode } from '@/actions/editor';
import { CodeEditorSchema } from '@/lib/editor/editor';
import { EditorLang } from '@/types/editor';
import dynamic from 'next/dynamic'
import { useRef } from 'react';

const MonacoEditor = dynamic(() => import('@/lib/editor/editor'), {
  ssr: false,
})
 
 

 export default function editorpage(codeEditorParam:Omit<CodeEditorSchema,"editorRef">){
   const editorRef = useRef<any>(null);
   return (
     <>
       <MonacoEditor content={codeEditorParam.content} editorRef={editorRef} language={codeEditorParam.language} />
       <button onClick={async()=>{
        const id = await  SubmitCode({code:editorRef.current.getValue()});
        console.log("id");
        console.log(id);
       }}>submit</button>
     </>
   )
 }