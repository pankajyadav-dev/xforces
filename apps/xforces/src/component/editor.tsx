"use client"
import { SubmitCode } from '@/actions/editor';
import { CodeEditorSchema } from '@/lib/editor/editor';
import { EditorLang } from '@/types/editor';
import dynamic from 'next/dynamic'
import { useRef } from 'react';

const MonacoEditor = dynamic(() => import('@/lib/editor/editor'), {
  ssr: false,
})
 
 

 export default function editorpage(codeEditorParam:CodeEditorSchema){
   const editorRef = useRef<any>(null);
   return (
     <>
       <MonacoEditor content={codeEditorParam.content} editorRef={codeEditorParam.editorRef} language={codeEditorParam.language}/>
       <button onClick={()=>SubmitCode({code:editorRef.current.getValue()})}>submit</button>
     </>
   )
 }