import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    results: []
}

const deleteResult = (state, action) => {
    const updatedArray = state.results.filter(result => result.id !== action.resultElId);
    return updateObject(state, { results: updatedArray });
}

const reducer = (state = initialState, action) => {

    switch(action.type) {
        case actionTypes.STORE_RESULT:
            return updateObject(state, { results: state.results.concat({ id: new Date(), value: action.result }) });
            // return {
            //     ...state,
            //     // using concat b/c it returns a new arrray therefore updating immutably
            //     results: state.results.concat({id: new Date(), value: action.result})
            // };
        case actionTypes.DELETE_RESULT:
            return deleteResult(state, action);
            // return {
            //     ...state,
            //     //using filter here b/c it returns a new arrray therefore updating immutably
            //     results: state.results.filter(result => result.id !== action.resultElId)
            // };
        default:
            return state;
    }
}

export default reducer;