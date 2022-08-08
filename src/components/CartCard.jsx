import { arrayOf, number, shape, string } from 'prop-types';
import React, { Component } from 'react';

export default class CartCard extends Component {
  render() {
    const { title, price, thumbnail } = this.props;
    const { id, items } = this.props;
    const quantity = items.filter((item) => item.id === id).length;
    return (
      <div>
        <h3 data-testid="shopping-cart-product-name">{ title }</h3>
        <span>{quantity}</span>
        <img
          src={ thumbnail }
          alt={ title }
        />
        <span>{ price }</span>
      </div>
    );
  }
}

CartCard.propTypes = {
  title: string.isRequired,
  price: number.isRequired,
  thumbnail: string.isRequired,
  id: string.isRequired,
  items: arrayOf(shape).isRequired,
};
