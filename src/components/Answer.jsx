import { useEffect, useState } from "react"


const Answer = ({ans,index,totalResult,type}) => {
const [heading,setHeading] = useState(false)
const [answer,setAnswer] = useState(ans)

  useEffect(()=>{
    if(checkHeading(ans)){
    setHeading(true)
    setAnswer(replaceCheckHeading(answer))
    }
    
  },[])

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
                  heading ? <span className="pt-2 text-lg block text-white">{answer}</span> : <span className={type=='q'?'p-1':'p-5'}>{answer}</span>

      }

        {
        }
    </div>
  )
}

export default Answer

