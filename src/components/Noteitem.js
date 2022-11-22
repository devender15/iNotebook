import React, { useContext } from 'react' 
import NoteContext from "../context/Notes/NoteContext";


export default function Noteitem(props) {
    const context = useContext(NoteContext);
    const { delete_note } = context;

    const {note, update_note} = props;

    return (
        <div className='col-md-3'>
            <div class="card my-3">
                <div class="card-body">
                    <h5 class="card-title">{note.title}</h5>
                    <p class="card-text">{note.description}</p>
                    <i class="fa-solid fa-trash-can mx-2" onClick={()=>{delete_note(note._id); props.show_alert("Note has been deleted", "success")}}></i>
                    <i class="fa-solid fa-pen-to-square mx-2" onClick={()=>{update_note(note)}}></i>
                </div>
            </div>
        </div>
    )
}
