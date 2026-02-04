'use client'

import  { useRef } from 'react'
import Editor, { OnChange, Monaco } from '@monaco-editor/react'
import { EditorLang } from '@/types/editor'
export interface CodeEditorSchema{
  language: EditorLang,
  content: string,
  editorRef: React.RefObject<any>
}
export default function CodeEditor({language,content,editorRef}:CodeEditorSchema) {
  const handleEditorChange: OnChange = (value, event) => {
    console.log('Current code:', value)
  }
  function handleEditorDidMount(editor: any, monaco: Monaco) {
    editorRef.current = editor
  }

  return (
    <div className="h-[500px] w-full border border-gray-700 rounded-lg overflow-hidden">
      <Editor
        height="100%"
        defaultLanguage={language}
        defaultValue={content}
        theme="vs-dark"
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          roundedSelection: false,
          scrollBeyondLastLine: false,
          readOnly: false,
          automaticLayout: true,
        }}
      />
    </div>
  )
}