import React, { useEffect, useRef } from 'react'
import { NotesAppBar } from './NotesAppBar'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from '../../hooks/useForm'
import { activeNote, startDeleting  } from '../../actions/notes'

export const NoteScreen = () => {
    
    const dispatch = useDispatch();
    
    const { active:note } = useSelector(state => state.notes);
    const [ formValues, handleInputChange, reset ]  = useForm( note );
    const { title, body, id } = formValues;
    const activeId = useRef( note.id )

    const handleDelete = () => {
        dispatch( startDeleting( id ) )
    }

    useEffect(() => {
        
        if( note.id !== activeId.current ){
            reset( note );
            activeId.current = note.id;
        }

    }, [ note, reset ])

    useEffect(() => {
        dispatch( activeNote( formValues.id , { ...formValues } ) );
    }, [ formValues, dispatch ])

    return (
        <div className="notes__main-content">
            
            <NotesAppBar />

            <div className="notes__content">

                <input 
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    name="title"
                    defaultValue={ title }
                    onChange={ handleInputChange }
                />

                <textarea
                    placeholder="what happened today"
                    className="notes__textarea"
                    defaultValue={ body }
                    name="body"
                    onChange={ handleInputChange }
                >
                </textarea>
                
                {
                    ( note.url )
                        && (
                            <div className="notes__image">
                                <img
                                    src={ note.url }
                                    alt="imagen"
                                />
                            </div>
                            )
                }
            </div>

            <button
                className="btn-danger"
                onClick={ handleDelete }
            >
                Delete
            </button>

        </div>
    )
}
