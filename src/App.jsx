import { useEffect, useState } from "react"
import { url } from "./constant"
import Answer from "./components/Answer"

function App() {
 
  const [question,setQuestion] = useState('')

  const [result,setResult] = useState([])

  const [renderHistory,setRenderHistory] = useState(JSON.parse(localStorage.getItem('history')))

  let [selectedHistory,setSelectedHistory] = useState('')

  const isEnter = (event)=>{
if(event.key === 'Enter'){
  askQuestion()
}
  }


   let cleanHistory = ()=>{
    localStorage.clear()
    setRenderHistory([])
   }


   let askQuestion = async ()=>{

      if(!question && !selectedHistory){
        return false
      }

if (question) {

    if(localStorage.getItem('history')){
      let history = JSON.parse(localStorage.getItem('history'))
      history = [question,...history]

      localStorage.setItem('history',JSON.stringify(history))
      setRenderHistory(history)
    }else{
      localStorage.setItem('history',JSON.stringify([question]))
      setRenderHistory(question)
    }

  setQuestion('')
}

const payloadData = question ? question: selectedHistory

 const  payload = {
     "contents": [
      {
        "parts": [
          {
            "text": payloadData
          }
        ]
      }
    ]
   }



       let response = await fetch(url,{
        method:'POST',
        body:JSON.stringify(payload)
       } )         
       response = await response.json()

       let datastring = response.candidates[0].content.parts[0].text

       datastring = datastring.split("* ")
              datastring = datastring.map((item)=> item.trim() )

setResult([...result,{type:'q',text:question?question:selectedHistory},{type:"a",text:datastring}])




  }


useEffect(()=>{
    askQuestion()  
},[selectedHistory])


  return (
    <>


<div className="grid grid-cols-5 h-screen text-center"   >
  <div className="col-span-1 bg-zinc-800 pt-3"   >
  <h1 className="text-xl text-white flex justify-center">
    <span>Recent Search</span>

<button  onClick={cleanHistory} className="cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#FFFFFF"><path d="m400-325 80-80 80 80 51-51-80-80 80-80-51-51-80 80-80-80-51 51 80 80-80 80 51 51Zm-88 181q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480Zm-336 0v480-480Z"/></svg></button>

  </h1>
  
  <ul className="text-left overflow-auto  mt-2 px-5">
    {
      renderHistory && renderHistory.map((ques,i)=>(
           <li onClick={()=>{setSelectedHistory(ques)}} key={ques+i} className="p-1 pl-5 truncate text-zinc-400 cursor-pointer hover:bg-zinc-700 hover:text-zinc-200">{ques}</li>
      ))
    }
  </ul>
  </div>

     <div  className="col-span-4  p-10 overflow-auto">
             
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
   
    </div>
      </div>
<div className="bg-zinc-800 w-1/2 text-white m-auto rounded-4xl border-zinc-700 flex h-16  border     ">
  <input onKeyDown={isEnter}  type="text" placeholder="Ask me anything" value={question} onChange={(e)=>{setQuestion(e.target.value)}}   className="w-full h-full p-3 outline-none" />

<button onClick={askQuestion} >Ask</button>




</div>


     </div>




</div>

    </>
  )
}

export default App
