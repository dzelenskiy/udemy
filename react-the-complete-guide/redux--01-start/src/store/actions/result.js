import * as actionTypes from './actionTypes';

export const storeResult = result => {
    return {
        type: actionTypes.STORE_RESULT,
        result: result
    };
};

// able to run async here thanks to redux thunk
export const storeResultAsync = result => {
    // getState is provided by redux thunk
    return (dispatch, getState) => {
        // const oldCounter = getState().ctr.counter;
        // console.log(oldCounter);
        setTimeout(() => {
            dispatch(storeResult(result));
        }, 2000);
    }
}

export const deleteResult = id => {
    return {
        type: actionTypes.DELETE_RESULT,
        resultElId: id
    };
};