import React from 'react';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends React.Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();

        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Chewie Hamburgler',
                address: {
                    street: '123 Sesame Drive',
                    zipCode: '48103',
                    country: 'United States'
                },
                email: 'chewie_hamburgler@fakemail.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('orders.json', order)
            .then(response => {
                this.setState({loading: false});
                this.props.history.push('/');               
            })
            .catch(error => {
                this.setState({loading: false});
            });        
    }

    render() {
        let form = (
            <form>
                <input type="text" name="name" placeholder="your name" />
                <input type="text" name="email" placeholder="your email" />
                <input type="text" name="street" placeholder="street name" />
                <input type="text" name="postal" placeholder="postal code" />
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>            
        );

        // if(this.state.loading) {
        //     form = <Spinner />;
        // } 
        this.state.loading &&(form = <Spinner />);

        return(
            <div className={classes.ContactData}>
                <h4>Please Enter Your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;