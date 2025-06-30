import noteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props)=>{
   
    const [state, setState] = useState({
        "name" : "saad",
        "class" : "BsAI"
    })

    const update = ()=>{
        setTimeout(() => {
            setState({
        "name" : "hamza",
        "class" : "BsCS"
    })
        }, 1000);
    }

    

    return(
        <noteContext.Provider value={{state , update}}>
            {props.children}
        </noteContext.Provider>
    ) 
}

export default NoteState;