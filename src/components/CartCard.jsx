import { arrayOf, func, shape } from 'prop-types';
import React, { Component } from 'react';

export default class CartCard extends Component {
  render() {
    const { items, item, handleIncrease, removeCartItem, handleDecrease } = this.props;
    const { title, price, thumbnail, id } = item;
    const quantity = items.filter((element) => element.id === id).length;
    return (
      <div>
        <h3 data-testid="shopping-cart-product-name">{ title }</h3>
        <button
          type="button"
          data-testid="remove-product"
          onClick={ () => removeCartItem(item) }
        >
          X
        </button>
        <img
          src={ thumbnail }
          alt={ title }
        />
        <button
          type="button"
          data-testid="product-decrease-quantity"
          onClick={ () => handleDecrease(item) }
          disabled={ quantity < 2 }
        >
          -

        </button>
        <span data-testid="shopping-cart-product-quantity">{quantity}</span>
        <button
          type="button"
          data-testid="product-increase-quantity"
          onClick={ () => handleIncrease(item) }
          disabled={ quantity === item.available_quantity }
        >
          +

        </button>
        <span>{ price }</span>
      </div>
    );
  }
}

CartCard.propTypes = {
  item: shape({}).isRequired,
  removeCartItem: func.isRequired,
  handleIncrease: func.isRequired,
  handleDecrease: func.isRequired,
  items: arrayOf(shape).isRequired,
};
