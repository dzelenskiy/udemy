import axios from 'axios';

import * as actionTypes from './actionTypes';

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true

        }
        const token = 'AIzaSyBNw5PEP8ixKXdrfY_pkaCIPAdZGMfQWQ4'
        const signupURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + token;
        const loginURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + token;
        axios.post(isSignup ? signupURL : loginURL, authData)
            .then(response => {
                console.log(response);
                dispatch(authSuccess(response.data.localId, response.data.idToken));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(error => {
                dispatch(authFail(error.response.data.error));
            });
    };
}

const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

const authSuccess = (localId, idToken) => {
    return {
        type: actionTypes.AUTH_SUCCESS,        
        localId: localId,
        idToken: idToken
    };
};

const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}

export const setAuthRedirectPath = path => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
};