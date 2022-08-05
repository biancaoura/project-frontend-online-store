import React, { Component } from 'react';

export default class ShoppingCart extends Component {
  state = {
    cart: [],
  }

  render() {
    const { cart } = this.state;
    return (
      <div>
        {!cart.length && (
          <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>)}
      </div>
    );
  }
}
