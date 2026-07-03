import Editor, { OnChange, Monaco } from "@monaco-editor/react";
import type { CodeSchema } from "@repo/types";

export default function CodeEditor({
  language,
  content,
  editorRef,
}: CodeSchema) {
  // const handleEditorChange: OnChange = (value, event) => {
  //   // console.log("Current code:", value);
  // };
  function handleEditorDidMount(editor: any, monaco: Monaco) {
    editorRef.current = editor;
  }

  return (
    <div className="h-full w-full border border-border rounded-lg overflow-hidden">
      <Editor
        height="100%"
        language={language}
        defaultValue={content || ""}
        theme="vs-dark"
        // onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: "on",
          roundedSelection: false,
          scrollBeyondLastLine: false,
          readOnly: false,
          automaticLayout: true,
          tabCompletion: "on",
        }}
      />
    </div>
  );
}
