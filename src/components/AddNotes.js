import React, { useState, useContext } from 'react';
import noteContext from '../context/notes/NoteContext';

const AddNotes = () => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({ title: "", description: "", tag: "default" });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  }

  return (
    <div>
      <div className="container my-3">
        <h2>Add a Note</h2>
        <form className="my-3">
          <div className="mb-3">
            <label htmlFor="title">Title</label>
            <input type="text" className="form-control" id="title" name="title" placeholder="Title" onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="description">Description</label>
            <input type="text" className="form-control" id="description" name="description" placeholder="Description" onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="tag">Tag</label>
            <input type="text" className="form-control" id="tag" name="tag" placeholder="Tag" onChange={onChange} />
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Notes</button>
        </form>
      </div>
    </div>
  );
}

export default AddNotes;
