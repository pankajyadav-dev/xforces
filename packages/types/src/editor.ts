export enum EditorLang {
  cpp = "cpp",
  java = "java",
  javascript = "js",
  typescript = "ts",
  python = "py",
  rust = "rust",
}

export type TestCases = {
  id: number;
  input: string;
  output: string;
};

export type TaskPayload = {
  code: string | undefined;
  testcases: TestCases[] | undefined;
  timelimit: number | undefined;
  memorylimit: number | undefined;
  language: EditorLang | undefined;
};

export type SubmissionPayload = {
  language: EditorLang;
  code: string;
  problemid: number;
};

export type GetBoilerplateSchema = {
  problemid: number;
  language: EditorLang;
};

export type TestRequestResponse = {
  submissionid: string;
};

export interface CodeEditorSchema {
  content: {
    problemid: number;
  };
}
export interface CodeSchema {
  language: EditorLang;
  content: string | "";
  editorRef: React.RefObject<any>;
}