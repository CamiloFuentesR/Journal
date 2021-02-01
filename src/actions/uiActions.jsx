import { types } from "../types/types";

export const setError = (error) => ({
    type: types.uiSetError,
    payload: error
})

export const unsetError = () => ({
    type: types.uiRemoveError,
    payload: null
})

export const startLoading = () => ({
    type: types.uiStartLoading
})

export const finishLoading = () => ({
    type: types.uiFinishLoading
})
