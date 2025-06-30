import {React, useContext} from 'react';
import noteContext from '../context/notes/NoteContext';

const NoteItem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note } = props;

  return (
    <div className="col-md-4">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="card-title mb-0">{note.title}</h5>
            <div>
              <i className="fa-solid fa-trash mx-2 text-danger" onClick={()=>{deleteNote(note._id)}}></i>
              <i className="fa-solid fa-edit mx-2 text-primary"></i>
            </div>
          </div>
          <p className="card-text mt-2">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
