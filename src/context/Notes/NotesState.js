import NoteContext from "./NoteContext";
import { useState } from "react";

const NotesState = (props)=>{
  
  const host = "http://localhost:5000";

    const notes_initial = [
        {
          "_id": "621f3101de5eb0909988a358",
          "user": "621f2607defac5a5ad3b0526",
          "title": "my title2",
          "description": "Stay connected online",
          "tag": "general",
          "date": "2022-03-02T08:55:29.243Z",
          "__v": 0
        },

      ]
    
    const [notes, setNotes] = useState(notes_initial);
    
    // getting  notes
    const get_notes = async ()=>{
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
      }) 
      const json =  await response.json();
      setNotes(json);
    }
      
    // Add a note
    const add_note = async (title, description, tag)=>{

      const response = await fetch(`${host}/api/notes/addnote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({title, description, tag})
      }) 
      
      const note = await response.json();
      setNotes(notes.concat(note));

    }


    // Delete a note
    const delete_note = async (id)=>{
        await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
      }) 

      const new_notes = notes.filter((note)=>{return note._id!==id});
      setNotes(new_notes);
    }


    // Edit a note
    const edit_note = async (id, title, description, tag)=>{

      await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({title, description, tag})
      }) 

      let new_notes = JSON.parse(JSON.stringify(notes));
      for(let i=0; i<notes.length; i++){
        const element = new_notes[i];
        if(element._id === id){
          new_notes[i].title = title;
          new_notes[i].description = description;
          new_notes[i].tag = tag;
          break;
        }
      }
      setNotes(new_notes);
    }

    return (
        <NoteContext.Provider value={{notes, add_note, delete_note, edit_note, get_notes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NotesState;