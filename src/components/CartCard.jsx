/* eslint-disable react/jsx-max-depth */
import { arrayOf, func, shape } from 'prop-types';
import React, { Component } from 'react';
import * as AiIcons from 'react-icons/ai';
import imgToHD, { numberWithCommas } from '../services/inprovements';
import '../styles/cartcard.css';

export default class CartCard extends Component {
  render() {
    const { items, item, handleIncrease, removeCartItem, handleDecrease } = this.props;
    const { title, price, thumbnail, id } = item;
    const quantity = items.filter((element) => element.id === id).length;
    return (
      <>
        <div className="cartcard-items">
          <section className="cartcard-remove-img">
            <button
              type="button"
              onClick={ () => removeCartItem(item) }
            >
              <AiIcons.AiFillCloseSquare />
            </button>
            <img
              src={ imgToHD(thumbnail) }
              alt={ title }
            />
          </section>
          <section className="cartcard-details">
            <h3>{ title }</h3>
            {item.original_price !== null
              ? (
                <span
                  className="original_price"
                >
                  {`R$ ${numberWithCommas(item.original_price)}`}

                </span>)
              : ''}

            <span>{ `R$ ${numberWithCommas(price)}` }</span>
            <div className="add-remove-item">
              <button
                type="button"
                onClick={ () => handleDecrease(item) }
                disabled={ quantity < 2 }
              >
                <AiIcons.AiOutlineMinus />
              </button>
              <span>{quantity}</span>
              <button
                type="button"
                onClick={ () => handleIncrease(item) }
                disabled={ quantity === item.available_quantity }
              >
                <AiIcons.AiOutlinePlus />
              </button>
            </div>
          </section>
        </div>
        <hr />
      </>
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
