


export default function RecentHistory({renderHistory,setSelectedHistory,setRenderHistory}){


    
   let cleanHistory = ()=>{
    localStorage.clear()
    setRenderHistory([])
   }

   
return(
    <>
     <div className="col-span-1 dark:bg-zinc-800 bg-red-100 pt-3"   >
  <h1 className="text-xl dark:text-white text-zinc-800 flex justify-center">
    <span>Recent Search</span>

<button  onClick={cleanHistory} className="cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#FFFFFF"><path d="m400-325 80-80 80 80 51-51-80-80 80-80-51-51-80 80-80-80-51 51 80 80-80 80 51 51Zm-88 181q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480Zm-336 0v480-480Z"/></svg></button>

  </h1>
  
  <ul className="text-left overflow-auto  mt-2 px-5">
    {
      renderHistory && renderHistory.map((ques,i)=>(
           <li onClick={()=>{setSelectedHistory(ques)}} key={ques+i} className="p-1 pl-5 truncate dark:text-zinc-400 text-zinc-700 cursor-pointer dark:hover:bg-zinc-700 dark:hover:text-zinc-200 hover:bg-red-200 hover:text-zinc-800 ">{ques}</li>
      ))
    }
  </ul>
  </div>
    
    </>
)
}