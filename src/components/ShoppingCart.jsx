import React, { Component } from 'react';
import { shape } from 'prop-types';
import { getProductById } from '../services/api';

export default class ShoppingCart extends Component {
  state = {
    cart: [],
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const response = await getProductById(id);
    this.setState((prevState) => ({
      cart: [...prevState.cart, response],
    }));
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

ShoppingCart.propTypes = {
  match: shape().isRequired,
};
