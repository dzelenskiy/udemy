import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.6
};

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
};

const reducer = (state = initialState, action) => {

    let updatedIngredient;
    let updatedIngredients;
    let updatedState;   

    switch(action.type) {
        case actionTypes.ADD_INGREDIENT:
            updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1};
            updatedIngredients = updateObject(state.ingredients, updatedIngredient);
            updatedState = {
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
                building: true
            };
            return updateObject(state, updatedState);
        case actionTypes.REMOVE_INGREDIENT:
            updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1};
            updatedIngredients = updateObject(state.ingredients, updatedIngredient);
            updatedState = {
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
                building: true
            };
            return updateObject(state, updatedState);
        case actionTypes.SET_INGREDIENTS:
            updatedState = {
                ingredients: action.ingredients,
                totalPrice: 4,
                error: false,
                building: false                
            };
            return updateObject(state, updatedState);
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            updatedState = {
                error: true
            };
            return updateObject(state, updatedState);
        default:
            return state;
    }
};

export default reducer;