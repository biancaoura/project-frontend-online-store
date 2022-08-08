import { arrayOf, shape, string } from 'prop-types';
import React, { Component } from 'react';
import { addToCart } from '../services/localStorage';

export default class CartCard extends Component {
  removeCartItem = () => {
    console.log('oi');
  }

  handleIncrease = (product) => {
    console.log(product);
    const productObj = {
      ...product,
    };
    addToCart(productObj);
  }

  render() {
    const { id, items, item } = this.props;
    const { title, price, thumbnail } = item;
    const quantity = items.filter((element) => element.id === id).length;
    return (
      <div>
        <h3 data-testid="shopping-cart-product-name">{ title }</h3>
        <button type="button" onClick={ this.removeCartItem }>
          X
        </button>
        <img
          src={ thumbnail }
          alt={ title }
        />
        {/* <button type="button" onClick={}>-</button> */}
        <span>{quantity}</span>
        <button type="button" onClick={ () => this.handleIncrease(item) }>+</button>
        <span>{ price }</span>
      </div>
    );
  }
}

CartCard.propTypes = {
  item: shape.isRequired,
  id: string.isRequired,
  items: arrayOf(shape).isRequired,
};
