import noteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props)=>{
  const host = "http://localhost:5000";
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial);

//Get all notes
const getNotes = async() => {
    //API CALL
    const response = await fetch(`${host}/api/notes/fetchallnotes`,
      {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg1YjY3OGMxNDZiZDdkZGJkNjg5YWQyIn0sImlhdCI6MTc1MTA2ODMxMn0.semtRzpsobMYV6h_ObqXQT8nqrXHVf057DPANlPuCWs"
        },
      }
    );
    const json = await response.json()
    setNotes(json)
  };

  //Add Note
  const addNote = async(title, description, tag) => {
    //API CALL
    const response = await fetch(`${host}/api/notes/addnote`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg1YjY3OGMxNDZiZDdkZGJkNjg5YWQyIn0sImlhdCI6MTc1MTA2ODMxMn0.semtRzpsobMYV6h_ObqXQT8nqrXHVf057DPANlPuCWs"
        },
        body: JSON.stringify({title, description, tag}),
      }
    );
    const note = await response.json()
    setNotes(notes.concat(note));
  };

  //Delete Note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg1YjY3OGMxNDZiZDdkZGJkNjg5YWQyIn0sImlhdCI6MTc1MTA2ODMxMn0.semtRzpsobMYV6h_ObqXQT8nqrXHVf057DPANlPuCWs"
        },
      }  
    );
    const json = await response.json();
    
    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNote);
  };

  //Edit Note
  const editNote = async (id, title, description, tag) => {
    //API CALL
    const response = await fetch(`${host}/api/notes/updatenote/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg1YjY3OGMxNDZiZDdkZGJkNjg5YWQyIn0sImlhdCI6MTc1MTA2ODMxMn0.semtRzpsobMYV6h_ObqXQT8nqrXHVf057DPANlPuCWs"
        },
        body: JSON.stringify({title, description, tag}),
      }
    );
    
    const json = await response.json()
    
    let newNotes = JSON.parse(JSON.stringify(notes))
    
    //Logic to edit in client
    for (let i = 0; i < newNotes.length; i++) {
        const element = newNotes[i];
       
        if (element._id === id) {
        newNotes[i].title = title;
        newNotes[i].description = description;
        newNotes[i].tag = tag;
        break;
        }
    }
    setNotes(newNotes);
}
    
    return(
        <noteContext.Provider value={{notes , setNotes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </noteContext.Provider>
    ) 
}

export default NoteState;