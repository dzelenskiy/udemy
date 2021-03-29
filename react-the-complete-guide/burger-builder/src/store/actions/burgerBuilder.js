import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = name => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    };
};

export const removeIngredient = name => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    };
};

export const initIngredients = () => {
    return dispatch => {
        axios.get('ingredients.json')
            .then(response => {
                // this.setState({ingredients: response.data});
                dispatch(setIngredients(response.data));
            })
            .catch(error => {
                // this.setState({error: true});
                dispatch(fetchIngredientsFailed());
            });        
    };
};

const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    };
};

const setIngredients = ingredients => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    };
};