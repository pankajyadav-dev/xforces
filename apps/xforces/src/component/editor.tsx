"use client"
import dynamic from 'next/dynamic'

 const MonacoEditor = dynamic(() => import('@/lib/editor/editor'), {
  ssr: false,
})
 
 
 export default MonacoEditor;