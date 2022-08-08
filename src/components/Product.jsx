import { func, shape } from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Product extends Component {
  render() {
    const { product, handleClick } = this.props;
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
        <button
          data-testid="product-add-to-cart"
          type="button"
          onClick={ () => handleClick(product) }
        >
          Adicionar ao carrinho

        </button>
      </div>
    );
  }
}

Product.propTypes = {
  product: shape().isRequired,
  handleClick: func.isRequired,
};
