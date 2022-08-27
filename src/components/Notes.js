import React , {useContext} from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem'

function Notes() {
    const {note , setNote} = useContext(noteContext)
    return (
        <>
            <div className="  row" >
                <h3>Your Notes</h3>
                {note.map((note) => {
                    return <Noteitem note={note} />
                })}
            </div>
        </>
    )
}

export default Notes
