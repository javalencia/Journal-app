
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startNote, startLoadNotes, startSaveNote } from '../../actions/notes';
import { types } from '../../types/types';
import { db } from '../../firebase/firebase-config';

 
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {
        uid: 'TESTING'
    }
}

let store = mockStore( initState );

describe('Pruebas con las acciones de las notas', () => {

    beforeEach( () => {

    store = mockStore( initState );

    })
   
    test('Debe de crear una nueva nota con starNewnote', async () => {

        await store.dispatch( startNote() );

        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.notesActive,
            payload: {
                id: expect.any( String ),
                title: '',
                body: '',
                date: expect.any( Number )
            }
        });

        expect( actions[1] ).toEqual({
            type: types.notesAddNew,
            payload: {
                id: expect.any( String ),
                title: '',
                body: '',
                date: expect.any( Number )
            }
        });

        const id  = actions[0].payload.id;

        await db.collection('/TESTING/journal/notes').doc( id ).delete();
         
    });


    test('startLoadNotes debe cargar las notas', async () => {
       
        await store.dispatch( startLoadNotes('TESTING') );

        const actions  = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.notesLoad,
            payload: expect.any( Array )
        })

        const expected = {
            id: expect.any( String ),
            title: expect.any( String ),
            body: expect.any( String ),
            date: expect.any( Number )
        }

        expect( actions[0].payload[0] ).toMatchObject( expected )

    });

    test('startSaveNote debe de actualizar la nota ', async () => {
       
        const note = {
            id: 'S20WVsOkTAzoYvRcUoUO',
            title: 'titulo',
            body: 'body'
        }

        await store.dispatch( startSaveNote( note ) );
        const actions = store.getActions();

        expect( actions[0].type ).toBe( types.notesUpdate );

        const docRef = await db.doc(`/TESTING/journal/notes/${ note.id }`).get();

        expect( docRef.data().title ).toBe( note.title );



    });
    
    
});
