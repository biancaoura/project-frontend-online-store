import React, { Component } from 'react';
// import { shape } from 'prop-types';
import { getSavedCart } from '../services/localStorage';
import CartCard from './CartCard';
// import { getProductById } from '../services/api';

export default class ShoppingCart extends Component {
  state = {
    cart: [],
  }

  // async componentDidMount() {
  //   const { match: { params: { id } } } = this.props;
  //   const response = await getProductById(id);
  //   this.setState((prevState) => ({
  //     cart: [...prevState.cart, response],
  //   }));
  // }

  componentDidMount() {
    const cartItems = getSavedCart();
    this.setState({ cart: cartItems });
  }

  render() {
    const { cart } = this.state;
    return (
      <div>
        <p data-testid="shopping-cart-product-quantity">{ cart.length }</p>
        {!cart.length && (
          <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>)}
        {cart.length && (
          cart.map((item) => (
            <CartCard key={ item.id } { ...item } />
          ))
        )}
      </div>
    );
  }
}

// ShoppingCart.propTypes = {
//   match: shape().isRequired,
// };
