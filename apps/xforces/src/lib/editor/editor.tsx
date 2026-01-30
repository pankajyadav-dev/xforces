'use client'

import React, { useRef } from 'react'
import Editor, { OnChange, Monaco } from '@monaco-editor/react'

export default function CodeEditor() {
  const handleEditorChange: OnChange = (value, event) => {
    console.log('Current code:', value)
  }

  const editorRef = useRef<any>(null)

  function handleEditorDidMount(editor: any, monaco: Monaco) {
    editorRef.current = editor
  }

  return (
    <div className="h-[500px] w-full border border-gray-700 rounded-lg overflow-hidden">
      <Editor
        height="100%"
        defaultLanguage="javascript"
        defaultValue="// Write your code here"
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