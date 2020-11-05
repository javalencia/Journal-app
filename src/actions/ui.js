import { types } from '../types/types';


export const setError = ( err ) => ({
    type: types.uiSetError,
    payload: err
})

export const setRemoveError = () => ({
    type: types.uiRemoveSetError
})

export const uiStartLoading = () => ({
    type: types.uiStartLoading
})

export const uiFinishLoading = () => ({
    type: types.uiFinishLoading
})