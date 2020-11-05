import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";

describe('Prueba para el authReducer', () => {
    
    test('debe de retonrnar el estado original ', () => {
        
        const state = authReducer( {}, {} )
        expect( state ).toEqual( {} )
    });
    
    test('debe de retornar el usuario logueado', () => {

        const action = {
          type: types.login, 
          payload: { 
              uid: '123456', 
              displayName: 'Jhonatan' 
          } 
        }
        const state = authReducer({}, action )
        expect( state ).toEqual( {uid: '123456', name: 'Jhonatan'} )
    });

    test('debe de retornar el estado vacio al hacer logout', () => {
        const initialState = {
            uid: '123456', 
            name: 'Jhonatan' 
        }

        const action = {
          type: types.logout
        }
        
        const state = authReducer( initialState, action );
        expect( state ).toEqual( {} )
    });


    test('No debe de realizar cambios en el state', () => {
        const initialState = {
            uid: '123456', 
            name: 'Jhonatan' 
        }

        const action = {
          type: 'asdfasdf'
        }
        
        const state = authReducer( initialState, action );
        expect( state ).toEqual( initialState )
    });

});
