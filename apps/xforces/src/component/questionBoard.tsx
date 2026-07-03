import ReactMarkdown from "react-markdown";

export interface QuestionBoardSchema {
  question: string;
}

export default function QuestionBoard({ question }: QuestionBoardSchema) {
  const dedented = question
    .split("\n")
    .map((line) => line.replace(/^      /, ""))
    .join("\n")
    .trim();

  return (
    <div className="markdown-content">
      <ReactMarkdown>{dedented}</ReactMarkdown>
    </div>
  );
}
