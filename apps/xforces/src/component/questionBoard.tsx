
import ReactMarkdown from 'react-markdown'
export interface QuestionBoardSchema{
  question: string
}
export default  function QuestionBoard({question}:QuestionBoardSchema){
  return (
    <>
      <ReactMarkdown>
        {question}
      </ReactMarkdown>
    </>
  )
}