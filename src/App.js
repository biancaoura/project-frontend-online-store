import React, { Component } from 'react';
import { Route, Switch, HashRouter as Router } from 'react-router-dom';
import Home from './components/Home';
import ProductCard from './components/ProductCard';
import ShoppingCart from './components/ShoppingCart';
import Checkout from './components/Checkout';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route exact path="/cart/:id" component={ ShoppingCart } />
          <Route exact path="/product/:id" component={ ProductCard } />
          <Route exact path="/checkout" component={ Checkout } />
        </Switch>
      </Router>
    );
  }
}

export default App;
