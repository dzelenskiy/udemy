import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';

class Auth extends React.Component {

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignup: false
    }

    checkValidity(value, rules) {
        let isValid = true;
        if(rules) {
            if(rules.required) {
                isValid = value.trim() !== '';
            }
            if(isValid && rules.minLength) {
                isValid = value.length >= rules.minLength;
            }
            if(isValid && rules.maxLength) {
                isValid = value.length <= rules.maxLength;
            }
            if(isValid && rules.isNumeric) {
                const pattern = /^\d+$/; 
                isValid = pattern.test(value);
            }
            if(isValid && rules.isEmail) {
                const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                isValid = pattern.test(value);
            }
        }
        return isValid;
    }  
    
    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({controls: updatedControls});
    }

    submitHandler = event => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup}
        });
    }

    componentDidMount() {
        if(!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }

    render() {

        const formElementsArray = [];
        for(let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id} 
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={event => this.inputChangedHandler(event, formElement.id)}
            />
        ));

        if(this.props.loading) {
            form = <Spinner />
        }

        let errorMessage = null;

        if(this.props.error) {
            errorMessage = (
                <p className={classes.error}>{this.props.error.message}</p>
            );
        }

        // let redirect = null;       
        // if(this.props.isAuth) {
        //     redirect = <Redirect to={this.props.authRedirectPath} />
        // }

        return (          
            <div className={classes.Auth}>
                {/* {redirect} */}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">{this.state.isSignup ? 'Signup' : 'Login'}</Button>
                </form>
                <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
                    Switch to {this.state.isSignup ? 'Login' : 'Signup'}
                </Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);