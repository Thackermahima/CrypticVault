import { Button, CircularProgress } from '@mui/material';
import React from 'react';
import { NoteContext } from '../context/CreateNoteContext';

const TakeNote = ( ) => {
  const notContext = React.useContext(NoteContext);
  const {visible,handleClick,note,handleChangeTitle ,handleChangeNote,addToNotes , loading} = notContext;
    return(
        <div>
        {
             visible === false
            ?
            <div className="take-notes1">
              <input type="text" placeholder="Take a note..." onClick={handleClick} className="initial" value={ note.title} onChange={()=>null}/>
            </div>
            :
            <div className="take-notes2">
              <input type="text" value={ note.title} placeholder="Title" className="title" onChange={(e)=> handleChangeTitle(e.target.value )}/><br></br>
              <input type="text" value={ note.input} placeholder="Take a note..." onChange={(e)=> handleChangeNote(e.target.value)} className="take-note" autoFocus="autofocus " /> 
             
              <Button variant="contained" onClick={addToNotes}>{
          loading === true ? <CircularProgress/> : "Save"
        }</Button>
              
            </div>
        }
        </div>
    );
}

export default TakeNote;