import { shape } from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Product extends Component {
  render() {
    const { product } = this.props;
    const { title, thumbnail, price, id } = product;
    return (
      <div data-testid="product">
        <span>{ title }</span>
        <img src={ thumbnail } alt={ title } />
        <span>{ price }</span>
        <Link
          to={ `/product/${id}` }
          data-testid="product-detail-link"
        >
          Mais detalhes

        </Link>
      </div>
    );
  }
}

Product.propTypes = {
  product: shape().isRequired,
};
