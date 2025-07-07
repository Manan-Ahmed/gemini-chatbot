
import Answer from "./Answer"

export default function QuestionAnswer({item,index}){
    return(
        <>
            <div key={index+Math.random()}  className={item.type === 'q'?"flex justify-end":""}>
                      {
                                     item.type ==='q'?
                            <li key={index+Math.random()} className="text-right p-1 border-5 dark:bg-zinc-700 dark:border-zinc-700
                            bg-red-100 border-red-100 rounded-tl-3xl rounded-bl-3xl rounded-br-3xl w-fit">
              <Answer className="text-left p-1"  ans={item.text} index={index} totalResult={1} type={item.type} />
        
                  </li>
                  :item.text.map((ansItem,ansIndex)=>(
                      <li key={index+Math.random()} className="text-left p-1">
              <Answer className="text-left p-1"  ans={ansItem} index={ansIndex} totalResult={item.length} type={item.type} />
                  </li>
                  ))
                      }
        
                    </div>
        
        </>
    )
}