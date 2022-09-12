/* eslint-disable react/jsx-max-depth */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BiIcons from 'react-icons/bi';
import {
  addToCart,
  getSavedCart,
  removeCartItems,
  removeOneItem } from '../services/localStorage';
import CartCard from './CartCard';
import '../styles/shoppingcart.css';
import { numberWithCommas } from '../services/inprovements';
import EmptyCart from './EmptyCart';

export default class ShoppingCart extends Component {
  state = {
    cart: [],
    cartFiltered: [],
  }

  async componentDidMount() {
    const cartItems = getSavedCart();
    const cartfilterSmall = cartItems
      .sort((a, b) => a.title.localeCompare(b.title))
      .filter((item, index, array) => index === array
        .findIndex((obj) => obj.id === item.id));

    this.setState({ cart: cartItems }, () => {
      this.setState({ cartFiltered: cartfilterSmall });
    });
  }

  handleIncrease = (product) => {
    const obj = {
      ...product,
    };
    addToCart(obj);
    const cartItems = getSavedCart()
      .sort((a, b) => a.title.localeCompare(b.title));
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
    const cartItems = getSavedCart()
      .sort((a, b) => a.title.localeCompare(b.title));
      // ordena o array por titulo, impedindo que troque de index
    const cartfilterSmall = cartItems
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
    this.setState({ cart: cartItems, cartFiltered: cartfilterSmall });
  }

  render() {
    const { cart, cartFiltered } = this.state;
    return (
      <section className="cart-section-all">
        <header className="header-cart">
          <div className="title-container-cart">
            <BiIcons.BiShoppingBag className="shop-icon" />
            <h1>Online Shopping</h1>
          </div>
          <div className="back-home">
            {cart.length > 0 && (
              <Link
                to="/"
              >
                <BiIcons.BiHomeAlt />
                <span>Home</span>
              </Link>)}
          </div>
        </header>
        <div className="cart-page">
          {cart.length === 0 && (
            <EmptyCart />)}
          {cart.length !== 0 && (
            <div className="cart">
              <div className="cart-items">
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
              </div>
              <div className="checkout">
                <h2>Carrinho</h2>
                <span>{`(${cart.length}) no carrinho`}</span>
                <span className="total-price-cart">
                  {`Total R$${numberWithCommas(cart
                    .reduce((acc, { price }) => acc + price, 0).toFixed(2))}`}

                </span>
                {cart.filter((e) => e.original_price !== null).length !== 0
                && (
                  <span className="original-price">
                    {`R$ ${numberWithCommas((cart
                      .reduce((acc, e) => acc + e.original_price, 0)
                      + cart.filter((e) => e.original_price === null)
                        .reduce((acc, { price }) => acc + price, 0)).toFixed(2))}`}
                  </span>)}
                <span className="off-price">
                  {cart.filter((e) => e.original_price !== null).length !== 0
                    ? `Você economizou ${Math.round(((cart
                      .reduce((acc, e) => acc + e.original_price, 0) - cart
                      .filter((e) => e.original_price !== null)
                      .reduce((acc, { price }) => acc + price, 0))
                    * 100) / cart
                      .reduce((acc, e) => acc
                  + e.original_price,
                      0))}%` : ''}
                </span>
                <div className="free-shipping free-shiping-cart">
                  {cartFiltered
                    .every(({ shipping }) => shipping
                      .free_shipping === false)
                      && 'Não há produtos com frete grátis'}
                  {cartFiltered
                    .every(({ shipping }) => shipping
                      .free_shipping === true)
                    && 'Todos os itens possuem frete grátis'}
                  {(cartFiltered.some(({ shipping }) => shipping
                    .free_shipping === false) && cartFiltered
                    .some(({ shipping }) => shipping
                      .free_shipping === true))
                      && 'Nem todos os produtos possuem frete grátis'}
                </div>
                <div className="checkout-button">
                  <Link to="/checkout">
                    Finalizar compra
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }
}
