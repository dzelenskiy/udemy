import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';
import PropTypes from 'prop-types';

const controls = [
    { label: 'Salad', type: 'salad'},
    { label: 'Bacon', type: 'bacon'},
    { label: 'Cheese', type: 'cheese'},
    { label: 'Meat', type: 'meat'}
];

const buildControls = props => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>${props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => (
            <BuildControl 
                key={ctrl.label} 
                label={ctrl.label}
                added={() => props.ingredientAdded(ctrl.type)}
                removed={() => props.ingredientRemoved(ctrl.type)}
                disabled={props.disabled[ctrl.type]}     
            />
        ))}
        <button 
            className={classes.OrderButton}
            disabled={!props.purchasable}  
            onClick={props.ordered}>
                {props.isAuth ? 'Order Now' : 'Login to Order'}
        </button>
    </div>
);

export default buildControls;

buildControls.propTypes = {
    purchasable: PropTypes.bool.isRequired,
    ordered: PropTypes.func.isRequired,
    price: PropTypes.number.isRequired,
    ingredientAdded: PropTypes.func,
    ingredientsRemoved: PropTypes.func,
    disabled: PropTypes.object.isRequired
};