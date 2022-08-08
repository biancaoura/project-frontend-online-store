import { shape } from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';
import { addToCart } from '../services/localStorage';
import { addRating, getRatings } from '../services/localStorageRating';
import Rating from './Rating';
import Review from './Review';

export default class ProductCard extends Component {
  state = {
    product: {},
    email: '',
    textarea: '',
    rating: 0,
    ratings: [],
    invalid: false,
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const response = await getProductById(id);
    const reviews = getRatings();
    this.setState({
      product: response,
      ratings: reviews,
    });
  }

  handleClick = (product) => {
    const productObj = {
      ...product,
    };
    addToCart(productObj);
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleClickSubmit = (event) => {
    event.preventDefault();
    const { email, rating, textarea, product } = this.state;
    const { id } = product;
    const ratingObj = {
      productID: id,
      email,
      rating,
      textarea,
    };

    if (!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,3})$/i) || rating <= 0) {
      return this.setState({
        // email: '',
        invalid: true,
        // textarea: '',
      });
    }
    addRating(ratingObj);

    if (email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,3})$/i) || rating > 0) {
      const ratingsLocal = getRatings();
      console.log(ratingsLocal);
      return (
        this.setState({
          email: '',
          invalid: false,
          textarea: '',
          ratings: ratingsLocal,
        })
      );
    }
  }

  render() {
    const { product, ratings } = this.state;
    const { title, thumbnail, price, id } = product;

    return (
      <div>
        <div>
          <h3 data-testid="product-detail-name">{title}</h3>
          <img src={ thumbnail } alt={ title } data-testid="product-detail-image" />
          <span data-testid="product-detail-price">{price}</span>
          <Link to={ `/cart/${id}` } data-testid="shopping-cart-button">Carrinho</Link>
        </div>
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ () => this.handleClick(product) }
        >
          Adicionar ao carrinho

        </button>

        <Rating
          handleClick={ this.handleClickSubmit }
          handleChange={ this.handleChange }
          { ...this.state }
        />
        {/* {invalid === true && <p data-testid="error-msg">Campos inválidos</p>} */}
        {
          ratings.filter(({ productID }) => productID === id).map((review, index) => (
            <Review key={ index } review={ review } />
            // <div key={ index }>
            //   <span data-testid="review-card-email">{ review.email }</span>
            //   <span>{ review.textarea }</span>
            //   <span>{ review.rating }</span>
            // </div>
          ))
        }
      </div>
    );
  }
}

ProductCard.propTypes = {
  match: shape().isRequired,
};
