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
                console.log(response.data);
                dispatch(authSuccess(response.data));
            })
            .catch(error => {
                dispatch(authFail(error));
            });
    };
}

const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

const authSuccess = authData => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    };
};

const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};