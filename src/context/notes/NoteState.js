import noteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props)=>{
    const notesInitial = [
    {
        "_id": "68607d0bf0a134c5609de26a",
        "user": "685b678c146bd7ddbd689ad2",
        "title": "Helloo me hun don",
        "description": "THis is khan baba don hun me",
        "tag": "Personal",
        "data": "2025-06-28T23:38:51.416Z",
        "__v": 0
    },
    {
        "_id": "68607e0f5df3b5e394d1abf7",
        "user": "685b678c146bd7ddbd689ad2",
        "title": "Title",
        "description": "My Description",
        "tag": "Work",
        "data": "2025-06-28T23:43:11.084Z",
        "__v": 0
    },
    {
        "_id": "68607e0f5df343b5e394d1abf9",
        "user": "685b678c146bd7ddbd689ad2",
        "title": "Title",
        "description": "My Description",
        "tag": "Work",
        "data": "2025-06-28T23:43:11.233Z",
        "__v": 0
    },
    {
        "_id": "68607e0f5df323b5e394d1abf9",
        "user": "685b678c146bd7ddbd689ad2",
        "title": "Title",
        "description": "My Description",
        "tag": "Work",
        "data": "2025-06-28T23:43:11.233Z",
        "__v": 0
    },
    {
        "_id": "68607e120f5df3b5e394d1abf9",
        "user": "685b678c146bd7ddbd689ad2",
        "title": "Title",
        "description": "My Description",
        "tag": "Work",
        "data": "2025-06-28T23:43:11.233Z",
        "__v": 0
    },
    ]

    const [notes, setNotes] = useState(notesInitial)
    return(
        <noteContext.Provider value={{notes , setNotes}}>
            {props.children}
        </noteContext.Provider>
    ) 
}

export default NoteState;