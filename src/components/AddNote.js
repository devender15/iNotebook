import React from 'react'
import NoteContext from "../context/Notes/NoteContext";
import { useContext, useState } from "react";

export const AddNote = (props) => {
    const context = useContext(NoteContext);
    const { add_note } = context;
    
    const [note, setNote] = useState({title: "", description: "", tag: "default"})

    const handle_click = (e)=>{
        e.preventDefault();
        add_note(note.title, note.description, note.tag);
        setNote({title: "", description: "", tag: ""});
        props.show_alert("Note Added successfully", "success")
    }

    const onchange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value});
    }

  return (
    <div>
    <h1 className="my-3">Add a Note</h1>
      <div className="container my-3">
        <form>
          <div class="mb-3">
            <label htmlfor="title" class="form-label">
              Title
            </label>
            <input
              type="text"
              class="form-control"
              id="title"
              aria-describedby="emailHelp"
              name='title'
              onChange={onchange}
              minLength={5}
              required
              value={note.title}
            />
          </div>
          <div class="mb-3">
            <label htmlfor="description" class="form-label">
              Description
            </label>
            <input
              type="text"
              class="form-control"
              id="description"
              name='description'
              onChange={onchange}
              minLength={5}
              required
              value={note.description}
            />
          </div>
          
          <button disabled={note.title.length<5 || note.description.length<5} type="submit" class="btn btn-primary" onClick={handle_click}>
            Save
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddNote