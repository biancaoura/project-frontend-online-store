import { number, string } from 'prop-types';
import React, { Component } from 'react';

export default class CartCard extends Component {
  render() {
    const { title, price, thumbnail } = this.props;
    return (
      <div>
        <h3 data-testid="shopping-cart-product-name">{ title }</h3>
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
};
