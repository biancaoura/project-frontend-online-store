import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import ProductCard from './components/ProductCard';
import ShoppingCart from './components/ShoppingCart';

class App extends Component {
  state = {
    cartItems: [],
  }

  handleClick = (item) => {
    this.setState((prevState) => ({
      cartItems: [...prevState.cartItems, item],
    }));
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route exact path="/cart/:id" component={ ShoppingCart } />
          <Route exact path="/product/:id" component={ ProductCard } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
