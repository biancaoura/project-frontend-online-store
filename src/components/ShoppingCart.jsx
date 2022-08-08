import React, { Component } from 'react';
import { getSavedCart } from '../services/localStorage';
import CartCard from './CartCard';

export default class ShoppingCart extends Component {
  state = {
    cart: [],
    cartFiltered: [],
  }

  async componentDidMount() {
    const cartItems = getSavedCart();
    const cartfilterSmall = cartItems
      .filter((item, index, array) => index === array
        .findIndex((obj) => obj.id === item.id));
    // Solução com o fetch, não deve ser usada até que complete 100%
    // const testFilter = [...new Set(cartItems
    //   .reduce((acc, { id }) => [...acc, id], []))];
    // const filter = Promise.all(testFilter
    //   .map((id) => getProductById(id))).then((values) => values);
    this.setState({ cart: cartItems }, () => {
      this.setState({ cartFiltered: cartfilterSmall });
    });
  }

  render() {
    const { cart, cartFiltered } = this.state;
    return (
      <div>
        <p
          data-testid="shopping-cart-product-quantity"
        >
          { cart.length }

        </p>
        {!cart.length && (
          <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>)}
        {cart.length && (
          cartFiltered.map((item, index) => (
            <CartCard key={ index } { ...item } items={ cart } />
          ))
        )}
      </div>
    );
  }
}
