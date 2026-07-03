"use client";
import {
  GetBoilerplate,
  PollSubmissionStatus,
  SubmitCode,
} from "@/actions/editor";
// import { PollSubmissionStatus } from "@/actions/pollStatus";
import { CodeEditorSchema, EditorLang } from "@repo/types";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const MonacoEditor = dynamic(() => import("@repo/ui/editor/editor"), {
  ssr: false,
});

export default function Editorpage({
  codeEditorParam,
}: {
  codeEditorParam: CodeEditorSchema;
}) {
  const editorRef = useRef<any>(null);
  const [lang, setLang] = useState<EditorLang>(EditorLang.cpp);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [boilerplate, setBoilerplate] = useState<string>(
    "//write you code here",
  );
  const [testcasepassed, setTestcasepassed] = useState<number | null>(null);
  const [totaltestcases, setTotaltestcases] = useState<number>(0);

  const handleLangChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // console.log("Lang change: ", event.target.value as EditorLang);
    setLang(event.target.value as EditorLang);
  };
  const pollForResult = async (taskId: string) => {
    console.log("Start polling for submissionid: ", taskId);
    const MAX_ATTEMPTS = 30;
    let attempts = 0;

    while (attempts < MAX_ATTEMPTS) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      attempts++;

      try {
        const status = await PollSubmissionStatus(taskId);

        if (status && status.status === "completed") {
          setResult(`Result: ${status.message}`);
          setTestcasepassed(Number(status.ttpassed));
          setSubmitting(false);
          return;
        }
        if (status && status.status === "processing") {
          setResult(`${status.status}...`);
        } else {
          setResult(`Judging... (${attempts / 2}s)`);
        }
      } catch {
        setResult("Error checking status. Please try again.");
        setSubmitting(false);
        return;
      }
    }
    setResult("Judging timed out. Please check back later.");
    setSubmitting(false);
  };

  useEffect(() => {
    
    const fetchBoilerplate = async () => {
      const questiondetails = await GetBoilerplate({
        problemid: codeEditorParam.content.problemid,
        language: lang,
      });
      // console.log(lang);
      // console.log(boilerplate);
      setBoilerplate(questiondetails.questioncontent);
      setTotaltestcases(questiondetails.totaltestcases);
      if (editorRef.current) {
        editorRef.current.setValue(questiondetails.questioncontent);
      }
    };
    fetchBoilerplate();
  }, [lang, codeEditorParam?.content?.problemid]);

  return (
    <div className="flex flex-col h-full">
      {/* Editor toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-surface border-b border-border shrink-0">
        <span className="text-xs font-medium text-text-muted uppercase tracking-wide">
          Code Editor
        </span>
        <select id="langauge-select" value={lang} onChange={handleLangChange}>
          {Object.values(EditorLang).map((l) => (
            <option key={l} value={l}>
              {l.toLowerCase()}
            </option>
          ))}
        </select>
        {/*<span className="text-xs text-text-muted">{lang}</span>*/}
      </div>

      <div className="h-3/4 min-h-0">
        <MonacoEditor
          content={boilerplate}
          editorRef={editorRef}
          language={lang}
        />
      </div>

      {/* Submit bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-surface border-t border-border shrink-0">
        {result && <span className="text-xs text-text-muted">{result}</span>}
        {!result && <span></span>}
        <button
          disabled={submitting}
          onClick={async () => {
            setSubmitting(true);
            setTestcasepassed(null);
            setResult(null);
            try {
              const id = await SubmitCode({
                language: lang,
                code: editorRef.current.getValue(),
                problemid: codeEditorParam.content.problemid,
              });
              setResult(`Submitted! Judging...`);
              if (!id.taskId) {
                throw new Error(
                  "Rate limit exceed. PLease try after some time",
                );
              }
              pollForResult(id.taskId as string);
            } catch (e: any) {
              setResult("Submission failed. " + e.message);
              setSubmitting(false);
            }
          }}
          className="px-6 py-2 bg-success text-white font-semibold text-sm rounded-lg hover:bg-success-hover transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
        >
          {submitting ? "Submitting..." : "Submit"}
        </button>
      </div>
      <div>
        <p>{testcasepassed !== null && `Test cases passed: ${testcasepassed}/${totaltestcases}`}</p>
      </div>
    </div>
  );
}
