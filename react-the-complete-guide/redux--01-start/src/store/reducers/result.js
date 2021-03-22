import * as actionTypes from '../actions/actionTypes';

const initialState = {
    results: []
}

const reducer = (state = initialState, action) => {

    switch(action.type) {
        case actionTypes.STORE_RESULT:
            return {
                ...state,
                // using concat b/c it returns a new arrray therefore updating immutably
                results: state.results.concat({id: new Date(), value: action.result})
            };
        case actionTypes.DELETE_RESULT:
            return {
                ...state,
                //using filter here b/c it returns a new arrray therefore updating immutably
                results: state.results.filter(result => result.id !== action.resultElId)
            };
        default:
            return state;
    }
}

export default reducer;