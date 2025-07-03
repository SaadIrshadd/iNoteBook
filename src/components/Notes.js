import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';
import AddNotes from './AddNotes';
const Notes = () => {

    const context = useContext(noteContext)
    const {notes, getNotes} = context;
    const [note, setNote] = useState({ etitle: "", edescription: "", etag: "" });

    useEffect(() => {
      getNotes()
      // eslint-disable-next-line
    }, [])
    
    const ref = useRef(null)

    const updateNote = (currentNote)=>{
      ref.current.click();
      setNote({
        etitle: currentNote.title,
        edescription: currentNote.description,
        etag: currentNote.tag
      });
    }

    const handleClick = (e) => {
      e.preventDefault();
    }

    const onChange = (e) => {
      setNote({ ...note, [e.target.name]: e.target.value });
    }

    return (
    <>
        <AddNotes/>
        <button type="button" className="d-none btn btn-primary" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
          Launch demo modal
        </button>
        <div className="modal fade" id="exampleModal"  tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form className="my-3">
                  <div className="mb-3">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" value={note.etitle} id="etitle" name="etitle" placeholder="Title" onChange={onChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description">Description</label>
                    <input type="text" className="form-control" value={note.edescription} id="edescription" name="edescription" placeholder="Description" onChange={onChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tag">Tag</label>
                    <input type="text" className="form-control" value={note.etag} id="etag" name="etag" placeholder="Tag" onChange={onChange} />
                  </div>                  
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" onClick={handleClick} className="btn btn-primary">Update Note</button>
              </div>
            </div>
          </div>
        </div>
        <div className="row my-3">
        
            <h2>Your Notes</h2>
        
            {notes.map((note)=>{
            return <NoteItem key={note._id} updateNote={updateNote} note={note}/>
            })}
        
        </div>
    </>
  )
}

export default Notes
