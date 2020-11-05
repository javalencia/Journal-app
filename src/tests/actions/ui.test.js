import { setError, setRemoveError, uiStartLoading, uiFinishLoading } from "../../actions/ui";
import { types } from "../../types/types";

describe('Puebas en ui-action', () => {
    
    test('Todas las acciones deben de funcionar ', () => {
       
        const action = setError('HElP!!')

        expect( action  ).toEqual({
            type: types.uiSetError,
            payload: 'HElP!!'
        });

        const removeError = setRemoveError();
        const startLoading = uiStartLoading();
        const finishLoading = uiFinishLoading();

        expect( removeError ).toEqual({
            type: types.uiRemoveSetError
        });

        expect( startLoading ).toEqual({
            type: types.uiStartLoading
        });

        expect( finishLoading ).toEqual({
            type: types.uiFinishLoading
        });

    });   

});
