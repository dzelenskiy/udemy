import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState =  {
    orders: [],
    loading: false,
    purchased: false
};

const reducer = (state = initialState, action) => {

    let updatedState;

    switch(action.type) {
        case actionTypes.PURCHASE_INIT:
            updatedState = { purchased: false };
            return updateObject(state, updatedState);
        case actionTypes.PURCHASE_BURGER_START:
            updatedState = { loading: true };
            return updateObject(state, updatedState);
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = updateObject(action.orderData, { id: action.orderId });
            updatedState = {
                loading: false,
                purchased: true,
                orders: state.orders.concat(newOrder)
            };
            return updateObject(state, updatedState);
        case actionTypes.PURCHASE_BURGER_FAIL:
            updatedState = { loading: false };
            return updateObject(state, updatedState);
        case actionTypes.FETCH_ORDERS_START:
            updatedState = { loading: true };
            return updateObject(state, updatedState);
        case actionTypes.FETCH_ORDERS_SUCCESS:
            updatedState = {
                orders: action.orders,
                loading: false                
            }
            return updateObject(state, updatedState);
        case actionTypes.FETCH_ORDERS_FAIL:
            updatedState = { loading: false };
            return updateObject(state, updatedState);
        default:
            return state;
    }
};

export default reducer;