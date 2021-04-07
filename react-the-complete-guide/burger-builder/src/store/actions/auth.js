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
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('userId', response.data.localId);
                localStorage.setItem('token', response.data.idToken);              
                localStorage.setItem('expirationDate', expirationDate);
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
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
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

export const checkAuthState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate > new Date()) {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(userId, token));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            } else {
                dispatch(logout());
            }
        }
    };
};