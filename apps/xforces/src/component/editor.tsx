"use client"
import { SubmitCode } from '@/actions/editor';
import { EditorLang } from '@/types/editor';
import dynamic from 'next/dynamic'
import { useRef } from 'react';

const MonacoEditor = dynamic(() => import('@/lib/editor/editor'), {
  ssr: false,
})
 
 

 export default function editorpage(){
   const editorRef = useRef<any>(null);
   return (
     <>
       <MonacoEditor content={`#include<iostream>\nint main(){}`} editorRef={editorRef} language={EditorLang.cpp}/>
       <button onClick={()=>SubmitCode({code:editorRef.current.getValue()})}>submit</button>
     </>
   )
 }