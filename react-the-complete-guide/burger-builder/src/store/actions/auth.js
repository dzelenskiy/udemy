import axios from 'axios';

import * as actionTypes from './actionTypes';

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true

        }
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBNw5PEP8ixKXdrfY_pkaCIPAdZGMfQWQ4', authData)
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