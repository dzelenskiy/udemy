import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
};

let updatedState;

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_START:
            updatedState = {
                error: null,
                loading: true
            }            
            return updateObject(state, updatedState);
        case actionTypes.AUTH_SUCCESS:
            updatedState = {
                token: action.idToken,
                userId: action.localId,
                error: null,
                loading: false
            }
            return updateObject(state, updatedState);
        case actionTypes.AUTH_FAIL:
            updatedState = {
                error: action.error,
                loading: false
            }            
            return updateObject(state, updatedState);
        case actionTypes.AUTH_LOGOUT:
            updatedState = {
                token: null,
                userId: null,
                error: null,
                loading: false
            }            
            return updateObject(state, updatedState);
        case actionTypes.SET_AUTH_REDIRECT_PATH:
            updatedState = {
                authRedirectPath: action.path
            }   
            return updateObject(state, updatedState);             
        default:
            return state;    
    }
};

export default reducer;