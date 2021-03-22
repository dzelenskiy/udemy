import React, { Component } from 'react';
import { connect } from 'react-redux';
import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
import * as actionCreators from '../../store/actions/index';


class Counter extends Component {

    render () {
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}  />
                <CounterControl label="Add 5" clicked={this.props.onAddCounter}  />
                <CounterControl label="Subtract 5" clicked={this.props.onSubtractCounter}  />
                <hr />
                <button onClick={() => this.props.onStoreResult(this.props.ctr)}>Store Result</button>
                <ul>
                    {this.props.storedResults.map(strResult => (
                        <li key={strResult.id} onClick={() => this.props.onDeleteResult(strResult.id)}>{strResult.value}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

// comes between class/function and export
// maps state managed by redux (passed in as a param) to this components props
// name of function can be anything but is typically mapStateToProps
const mapStateToProps = state => {
    return {
        ctr: state.ctr.counter,
        storedResults: state.res.results
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // onIncrementCounter: () => dispatch({type: actionTypes.INCREMENT}),
        onIncrementCounter: () => dispatch(actionCreators.increment()),
        // onDecrementCounter: () => dispatch({type: actionTypes.DECREMENT}),
        onDecrementCounter: () => dispatch(actionCreators.decrement()),
        // onAddCounter: () => dispatch({type: actionTypes.ADD, value: 5}),
        onAddCounter: () => dispatch(actionCreators.add(5)),
        // onSubtractCounter: () => dispatch({type: actionTypes.SUBTRACT, value: 5}),
        onSubtractCounter: () => dispatch(actionCreators.subtract(5)),
        // onStoreResult: (result) => dispatch({type: actionTypes.STORE_RESULT, result: result}),
        onStoreResult: (result) => dispatch(actionCreators.storeResultAsync(result)),
        // onDeleteResult: (id) => dispatch({type: actionTypes.DELETE_RESULT, resultElId: id})
        onDeleteResult: (id) => dispatch(actionCreators.deleteResult(id))
    };
};

// connect, injects our map functions into the component
// can take the mapping state as single param or if only mapping dispatch
// can pass null as first param
export default connect(mapStateToProps, mapDispatchToProps)(Counter);