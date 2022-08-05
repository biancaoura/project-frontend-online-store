import { shape } from 'prop-types';
import React, { Component } from 'react';

export default class Product extends Component {
  render() {
    const { product } = this.props;
    const { title, thumbnail, price } = product;
    return (
      <div data-testid="product">
        <span>{ title }</span>
        <img src={ thumbnail } alt={ title } />
        <span>{ price }</span>
      </div>
    );
  }
}

Product.propTypes = {
  product: shape().isRequired,
};
