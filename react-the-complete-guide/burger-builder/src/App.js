import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';

class App extends Component {

  render() {
    return (
      <div>
        <Layout>
          <BrowserRouter>
            <Switch>
              <Route path="/checkout" component={Checkout} />
              <Route path="/orders" component={Orders} />
              <Route path="/" exact component={BurgerBuilder} />
            </Switch>  
          </BrowserRouter>
        </Layout>
      </div>
    );
  }
}

export default App;