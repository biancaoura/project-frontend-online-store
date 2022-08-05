import { shape } from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';

export default class ProductCard extends Component {
  state = {
    product: {},
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const response = await getProductById(id);
    this.setState({
      product: response,
    });
  }

  render() {
    const { product } = this.state;
    const { title, thumbnail, price, id } = product;

    return (
      <div>
        <h3 data-testid="product-detail-name">{ title}</h3>
        <img src={ thumbnail } alt={ title } data-testid="product-detail-image" />
        <span data-testid="product-detail-price">{price}</span>
        <Link to={ `/cart/${id}` } data-testid="shopping-cart-button">Carrinho</Link>
      </div>
    );
  }
}

ProductCard.propTypes = {
  match: shape().isRequired,
};
