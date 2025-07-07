import { useEffect, useState } from "react"
import SyntaxHighlighter from "react-syntax-highlighter"
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ReactMarkdown from 'react-markdown'

const Answer = ({ans,index,totalResult,type}) => {
const [heading,setHeading] = useState(false)
const [answer,setAnswer] = useState(ans)

  useEffect(()=>{
    if(checkHeading(ans)){
    setHeading(true)
    setAnswer(replaceCheckHeading(answer))
    }
    
  },[])

const renderer = {
  code({node,inline,className,children,...props}){
   const match = /language-(\w+)/.exec(className || "")
   return !inline && match ?(
    <SyntaxHighlighter {...props} children={String(children).replace(/\n$/,'')}
    language={match[1]}
    style={dark}
    PreTag="div"
    />
   ):(
            <code {...props} className={className}>
              {children}
            </code>    
   )
  }
}

   function checkHeading(str){
    return /^(\*)(\*)(.*)\*/.test(str)
}



 function replaceCheckHeading(str){
    return str.replace(/^(\*)(\*)|(\*)$/g,"")
}


  return (
    <div>

      {
        index == 0 && totalResult > 1 ?<span className="pt-2 text-lg block text-white">{answer}</span> :
                  heading ? <span className="pt-2 text-lg block text-white">{answer}</span> : 
                  <span className={type=='q'?'p-1':'p-5'}>
                    <ReactMarkdown components={renderer}>{answer}</ReactMarkdown></span>

      }

        {
        }
    </div>
  )
}

export default Answer

