import { types } from "../types/types";


const initialState =  {
    uid:'',
    name:'',
    verifyEmail:false
}
export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.login:
            return {
                uid: action.payload.uid,
                name: action.payload.displayName,
                verifyEmail: action.payload.verifyEmail
            }
        case types.logout:
            return {}

        default:
            return state;
    }

}