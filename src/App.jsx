import { useState } from "react"
import { url } from "./constant"
import Answer from "./components/Answer"

function App() {
 
  const [question,setQuestion] = useState('')

  const [result,setResult] = useState([])

 const  payload = {
     "contents": [
      {
        "parts": [
          {
            "text": question
          }
        ]
      }
    ]
   }
  let askQuestion =async ()=>{
       let response = await fetch(url,{
        method:'POST',
        body:JSON.stringify(payload)
       } )         
       response = await response.json()

       let datastring = response.candidates[0].content.parts[0].text

       datastring = datastring.split("* ")
              datastring = datastring.map((item)=> item.trim() )

setResult([...result,{type:'q',text:question},{type:"a",text:datastring}])




  }

console.log(result);

  return (
    <>


<div className="grid grid-cols-5 h-screen"   >
  <div className="col-span-1 bg-zinc-800"   >
  </div>

     <div  className="col-span-4  p-10 overflow-scroll "   >
             
      <div className="container h-110  ">
    <div className="text-zinc-300">

      <ul>

        {
          result.map((item,index)=>(
            <div key={index+Math.random()}  className={item.type === 'q'?"flex justify-end":""}>
              {
                             item.type ==='q'?
                    <li key={index+Math.random()} className="text-right p-1 border-5 bg-zinc-700 border-zinc-700 rounded-tl-3xl rounded-bl-3xl rounded-br-3xl w-fit">
      <Answer className="text-left p-1"  ans={item.text} index={index} totalResult={1} type={item.type} />

          </li>
          :item.text.map((ansItem,ansIndex)=>(
              <li key={index+Math.random()} className="text-left p-1">
      <Answer className="text-left p-1"  ans={ansItem} index={ansIndex} totalResult={item.length} type={item.type} />
          </li>
          ))
              }

            </div>
     

          ))
        }


      </ul>
    {/* </div> */}
   
    </div>
      </div>
<div className="bg-zinc-800 w-1/2 text-white m-auto rounded-4xl border-zinc-700 flex h-16  border     ">
  <input type="text" placeholder="Ask me anything" value={question} onChange={(e)=>{setQuestion(e.target.value)}}   className="w-full h-full p-3 outline-none" />

<button onClick={askQuestion} >Ask</button>




</div>


     </div>




</div>

    </>
  )
}

export default App
