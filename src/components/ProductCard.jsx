import { shape } from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';
import { addToCart, getSavedCart } from '../services/localStorage';
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
    checked: false,
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const response = await getProductById(id);
    const reviews = getRatings(id);
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
    if (target.type === 'radio') this.setState({ checked: true });
    this.setState({ [name]: value });
  }

  handleClickSubmit = (event) => {
    event.preventDefault();
    const { email, rating, textarea, product } = this.state;
    const { id } = product;
    const ratingObj = {
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
    addRating(id, ratingObj);

    if (email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,3})$/i) || rating > 0) {
      const ratingsLocal = getRatings(id);
      return (
        this.setState({
          email: '',
          invalid: false,
          textarea: '',
          ratings: ratingsLocal,
          checked: false,
        })
      );
    }
  }

  render() {
    const { product, ratings, checked } = this.state;
    const { title, thumbnail, price, id } = product;

    return (
      <div>
        <div>
          <h3 data-testid="product-detail-name">{title}</h3>
          <img src={ thumbnail } alt={ title } data-testid="product-detail-image" />
          <span data-testid="product-detail-price">{price}</span>
          <Link to={ `/cart/${id}` } data-testid="shopping-cart-button">
            Carrinho
            <p data-testid="shopping-cart-size">{ getSavedCart().length }</p>
          </Link>
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
          checked={ checked }
          { ...this.state }
        />
        {/* {invalid === true && <p data-testid="error-msg">Campos inválidos</p>} */}
        {
          ratings.map((review, index) => (
            <Review key={ index } review={ review } checked={ checked } />
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
