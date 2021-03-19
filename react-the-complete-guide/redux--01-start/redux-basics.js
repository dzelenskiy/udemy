// this is node js only example, w/o react
// can be run by running "node <filename>" in terminal

// summary...
// STORE:  stores state information 
// SUBSCRIPTION:  informs when state has been updated
// DISPATCH:  sends commands w parameters (aka actions) 
// REDUCER:  defines logic to be executed for the commands/actions

// importing redux w node.js syntax for imports
const redux = require('redux');


// Reducer ================================================================================
const initialState = {
    counter: 0
};
// created first b/c its closely linked to Store and used in Store creation
// need to initialize state here, otherwise will be undefined
const rootReducer = (state = initialState, action) => {
    if(action.type === 'INC_COUNTER') {
        // state needs to always be updated immutably
        // copy state first, then update copy and set it as state
        return {
            ...state,
            counter: state.counter + 1
        };
    }
    if(action.type === 'ADD_COUNTER') {
        return {
            ...state,
            counter: state.counter + action.value
        };
    }
    return state;
};


// Store ===================================================================================
const createStore = redux.createStore;
const store = createStore(rootReducer);
console.log(store.getState());


// Subsciption =============================================================================
// subsciption is to inform when state is updated
// subscribe method takes function as param which will execute when state is updated
store.subscribe(() => {
    console.log('[Subscription]', store.getState());
});


// Dispatching Action ======================================================================
// 1st param type is expected, conventionally all caps and unique 
store.dispatch({type: 'INC_COUNTER'});
// 2nd+ params optional, named anything, can be put into one js obj typically called payload
store.dispatch({type: 'ADD_COUNTER', value: 10});
console.log(store.getState());