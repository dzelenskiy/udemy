import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

const initState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
};

describe('auth reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initState);
    });

    it('should store the', () => {
        expect(reducer(
            initState, 
            {
                type: actionTypes.AUTH_SUCCESS,
                localId: 'test-user-id',
                idToken: 'test-token'
            }))
            .toEqual({
                ...initState,
                userId: 'test-user-id',
                token: 'test-token'
            });
    });    
});
