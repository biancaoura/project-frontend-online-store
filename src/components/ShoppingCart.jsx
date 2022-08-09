import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  addToCart,
  getSavedCart,
  removeCartItems,
  removeOneItem } from '../services/localStorage';
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

  handleIncrease = (product) => {
    const obj = {
      ...product,
    };
    addToCart(obj);
    const cartItems = getSavedCart();
    const cartfilterSmall = cartItems
      .filter((item, index, array) => index === array
        .findIndex((objt) => objt.id === item.id));
    this.setState({ cart: cartItems, cartFiltered: cartfilterSmall });
  }

  handleDecrease = (product) => {
    const obj = {
      ...product,
    };
    removeOneItem(obj);
    const cartItems = getSavedCart();
    const reversed = cartItems.slice();
    const cartfilterSmall = reversed
      .filter((item, index, array) => index === array
        .findIndex((objt) => objt.id === item.id));
    this.setState({ cart: cartItems, cartFiltered: cartfilterSmall });
  }

  removeCartItem = (product) => {
    const obj = {
      ...product,
    };
    removeCartItems(obj);
    const cartItems = getSavedCart();
    const cartfilterSmall = cartItems
      .filter((item, index, array) => index === array
        .findIndex((objt) => objt.id === item.id));
    console.log(cartfilterSmall);
    this.setState({ cart: cartItems, cartFiltered: cartfilterSmall });
  }

  render() {
    const { cart, cartFiltered } = this.state;
    return (
      <div>
        <p>
          { cart.length }
        </p>
        {cart.length === 0 && (
          <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>)}
        {cart.length > 0 && (
          cartFiltered.map((item, index) => (
            <CartCard
              key={ index }
              item={ item }
              items={ cart }
              handleIncrease={ this.handleIncrease }
              removeCartItem={ this.removeCartItem }
              handleDecrease={ this.handleDecrease }
            />
          ))
        )}
        <Link to="/checkout" data-testid="checkout-products">Finalizar compra</Link>
      </div>
    );
  }
}
