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
    console.log(json)
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
    
    const note = {
      _id: "68607e120f5df3b5e394d1abf9",
      user: "685b678c146bd7ddbd689ad2",
      title: title,
      description: description,
      tag: tag,
      data: "2025-06-28T23:43:11.233Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };

  //Delete Note
  const deleteNote = (id) => {
    console.log("deleted with " + id);
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
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg1YjY3OGMxNDZiZDdkZGJkNjg5YWQyIn0sImlhdCI6MTc1MTA2ODMxMn0.semtRzpsobMYV6h_ObqXQT8nqrXHVf057DPANlPuCWs"
        },
        body: JSON.stringify({title, description, tag}),
      }
    );
    
    //Logic to edit in client
    for (let i = 0; i < notes.length; i++) {
        const element = notes[i];
        if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
        }
    }
}
    
    return(
        <noteContext.Provider value={{notes , setNotes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </noteContext.Provider>
    ) 
}

export default NoteState;