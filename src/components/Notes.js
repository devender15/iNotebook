import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/Notes/NoteContext";
import { useNavigate } from 'react-router-dom';


export default function Notes(props) {
  let navigate = useNavigate();
  const context = useContext(NoteContext);
  const { notes, get_notes, edit_note } = context;

  useEffect(() => {
    if(localStorage.getItem('token')){
      get_notes();
    }
    else{
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: ""})

  const handle_click = (e)=>{
    edit_note(note.id, note.etitle, note.edescription);
    ref_close.current.click();
    props.show_alert("Note updated successfully", "success")
  }

  const onchange = (e)=>{
      setNote({...note, [e.target.name]: e.target.value});
  }

  const update_note = (current_note) => {
    ref.current.click();
    setNote({id: current_note._id, etitle: current_note.title, edescription: current_note.description});
  };
  
  const ref = useRef(null);
  const ref_close = useRef(null);

  return (
    <>
      <AddNote show_alert={props.show_alert} />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      ></button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlfor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    aria-describedby="emailHelp"
                    name="etitle"
                    onChange={onchange}
                    value={note.etitle}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlfor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    onChange={onchange}
                    value={note.edescription}
                    minLength={5}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={ref_close}
              >
                Close
              </button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handle_click} type="button" className="btn btn-primary">
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container">
          {notes.length===0 && 'No notes to display !'}
        </div>
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} show_alert={props.show_alert} update_note={update_note} note={note} />
          );
        })}
      </div>
    </>
  );
}