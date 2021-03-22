import React, {Component} from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {

    state = {
        purchasing: false,
        loading: false,
        error: false 
    }

    componentDidMount() {
        console.log(this.props);
        // axios.get('ingredients.json')
        //     .then(response => {
        //         this.setState({ingredients: response.data});
        //     })
        //     .catch(error => {
        //         this.setState({error: true});
        //     });
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});       
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {
            ...this.props.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
        
        if(this.props.ingredients) {
            burger = (
                <React.Fragment>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls 
                        ingredientAdded={this.props.onAddIngredient}
                        ingredientRemoved={this.props.onRemoveIngredient}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.ingredients)}
                        ordered={this.purchaseHandler}
                        price={this.props.totalPrice} 
                    />
                </React.Fragment>
            ); 
            
            orderSummary = <OrderSummary 
                ingredients={this.props.ingredients}
                price={this.props.totalPrice}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} />;
        }

        if(this.state.loading) {
            orderSummary = <Spinner />;
        }         

        return(
            <React.Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>    
                {burger}
            </React.Fragment>
        );
    };
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    };
};

const mapDipatchToProps = dispatch => {
    return {
        onAddIngredient: ingredientName => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingredientName}),
        onRemoveIngredient: ingredientName => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingredientName})
    };
};

export default connect(mapStateToProps, mapDipatchToProps)(withErrorHandler(BurgerBuilder, axios));