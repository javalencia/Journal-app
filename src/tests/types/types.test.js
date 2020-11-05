import { types } from "../../types/types"

describe('Pruebas con nuestros tipos', () => {


    const typesTest =  {
        login: '[Auth] Login',
        logout: '[Auth] Logout',
    
        uiSetError: '[UI] Set Error',
        uiRemoveSetError: '[UI] Set Remove Error',
    
        uiStartLoading: '[UI] Start loading',
        uiFinishLoading: '[UI] Finish loading',
    
        notesAddNew: '[Notes] New note',
        notesActive: '[Notes] Set active note',
        notesLoad: '[Notes] Load notes',
        notesUpdate: '[Notes] Updated note',
        notesDelete: '[Notes] Delete note',
        notesLogoutCleaning: '[Notes] Logout Cleaning', 
    }

    test('debe de tener los tipos', () => {

        expect( types ).toEqual( typesTest )
        
    })
    
    
})
