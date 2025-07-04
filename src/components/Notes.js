import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';
import AddNotes from './AddNotes';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
    const context = useContext(noteContext)
    const {notes, getNotes, editNote} = context;
    const ref = useRef(null)
    const refClose = useRef(null)
    let navigate = useNavigate()
    const [note, setNote] = useState({id : "", etitle: "", edescription: "", etag: "" });

    useEffect(() => {
      if(localStorage.getItem('token')){
        getNotes()
        // eslint-disable-next-line
      }
    else{
      navigate('/login')
    }
    // eslint-disable-next-line
    }, []
  )

    const updateNote = (currentNote)=>{
      ref.current.click();
      setNote({
        id: currentNote._id,
        etitle: currentNote.title,
        edescription: currentNote.description,
        etag: currentNote.tag
      });
    }

    const handleClick = (e) => {
      refClose.current.click();
      editNote(note.id, note.etitle, note.edescription, note.etag)
      props.ShowAlert("Note Updated Successfully", "success");
    }

    const onChange = (e) => {
      setNote({ ...note, [e.target.name]: e.target.value });
    }

    return (
    <>
        <AddNotes ShowAlert={props.ShowAlert}/>
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
                    <input type="text" className="form-control" value={note.etitle} id="etitle" name="etitle" placeholder="Title" onChange={onChange} minLength={5} required/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description">Description</label>
                    <input type="text" className="form-control" value={note.edescription} id="edescription" name="edescription" placeholder="Description" minLength={5} required onChange={onChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tag">Tag</label>
                    <input type="text" className="form-control" value={note.etag} id="etag" name="etag" placeholder="Tag" onChange={onChange} required/>
                  </div>                  
                </form>
              </div>
              <div className="modal-footer">
                <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button disabled={note.etitle.length<5 || note.edescription.length<5} type="button" onClick={handleClick} className="btn btn-primary">Update Note</button>
              </div>
            </div>
          </div>
        </div>
        <div className="row my-3">
        
            <h2 className="text-center">Your Notes</h2>
            {notes.length === 0 ? 
              (<div className="container">
                <h6>{'No notes to display'}</h6>
              </div>)
             : 
              (
              notes.map((note) => (
                <NoteItem key={note._id} ShowAlert={props.ShowAlert} updateNote={updateNote} note={note} />
              ))
            )}
        </div>
    </>
  )
}

export default Notes
