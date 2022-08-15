/* eslint-disable react/jsx-max-depth */
import { arrayOf, bool, func, number, shape, string } from 'prop-types';
import React, { Component } from 'react';
import StarRatings from 'react-star-ratings';
import { getRatings } from '../services/localStorageRating';
import '../styles/rating.css';

export default class Rating extends Component {
  render() {
    const {
      handleClick,
      invalid,
      handleChange,
      email,
      textarea,
      rating,
      ratingChanged,
      ratings,
      product,
    } = this.props;
    const THREE_STARS = 3;
    const FOUR_STARS = 4;
    const FIVE_STARS = 5;
    const { id } = product;

    return (
      <div className="rating">
        <form className="rating-form">
          <h2>Avaliação</h2>
          <section className="rating-form-inner">
            <div className="star-rating">
              <StarRatings
                rating={ rating }
                starRatedColor="gold"
                starHoverColor="gold"
                starDimension="25px"
                changeRating={ (event) => ratingChanged(event) }
                numberOfStars={ 5 }
                name="rating"
              />
            </div>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={ email }
              data-testid="product-detail-email"
              onChange={ (event) => handleChange(event) }
            />
            <textarea
              name="textarea"
              value={ textarea }
              cols="30"
              rows="5"
              placeholder="Mensagem(opcional)"
              data-testid="product-detail-evaluation"
              className="textarea-evaluation"
              onChange={ (event) => handleChange(event) }
            />
            <button
              type="submit"
              data-testid="submit-review-btn"
              className="submit-btn"
              onClick={ (event) => handleClick(event) }
            >
              Avaliar
            </button>
            {invalid && <p data-testid="error-msg">Campos inválidos</p>}
          </section>
        </form>
        <section className="evaluations">
          <div className="user-rating">
            <h2>Opiniões</h2>
            <div>
              <span className="heading">Notas dos usuários</span>
              <span className="fa fa-star checked" />
              <span className="fa fa-star checked" />
              <span className="fa fa-star checked" />
              <span className="fa fa-star checked" />
              <span className="fa fa-star" />
              <p className="average">
                {getRatings(id).length > 0
                  ? `Média ${getRatings(id).length !== 0 ? (getRatings(id)
                    .reduce((acc, e) => (acc + e.rating), 0)
                  / getRatings(id).length).toFixed(2)
                    : rating} baseada em ${ratings.length} avaliações`
                  : 'Nenhuma avaliação'}
              </p>
              <div className="row">
                <div className="side">
                  <div>5 estrelas</div>
                </div>
                <div className="middle">
                  <div className="bar-container">
                    <div
                      className="bar-5"
                      style={ { width: `${ratings.length !== 0 ? (ratings
                        .filter((e) => e.rating === FIVE_STARS)
                        .length * 100) / ratings.length : 0}%` } }
                    />
                  </div>
                </div>
                <div className="side right">
                  <div>{ratings.filter((e) => e.rating === FIVE_STARS).length}</div>
                </div>
                <div className="side">
                  <div>4 estrelas</div>
                </div>
                <div className="middle">
                  <div className="bar-container">
                    <div
                      className="bar-4"
                      style={ { width: `${ratings.length !== 0 ? (ratings
                        .filter((e) => e.rating === FOUR_STARS)
                        .length * 100) / ratings.length : 0}%` } }
                    />
                  </div>
                </div>
                <div className="side right">
                  <div>{ratings.filter((e) => e.rating === FOUR_STARS).length}</div>
                </div>
                <div className="side">
                  <div>3 estrelas</div>
                </div>
                <div className="middle">
                  <div className="bar-container">
                    <div
                      className="bar-3"
                      style={ { width: `${ratings.length !== 0 ? (ratings
                        .filter((e) => e.rating === THREE_STARS)
                        .length * 100) / ratings.length : 0}%` } }
                    />
                  </div>
                </div>
                <div className="side right">
                  <div>{ratings.filter((e) => e.rating === THREE_STARS).length}</div>
                </div>
                <div className="side">
                  <div>2 estrelas</div>
                </div>
                <div className="middle">
                  <div className="bar-container">
                    <div
                      className="bar-2"
                      style={ { width: `${ratings.length !== 0 ? (ratings
                        .filter((e) => e.rating === 2)
                        .length * 100) / ratings.length : 0}%` } }
                    />
                  </div>
                </div>
                <div className="side right">
                  <div>{ratings.filter((e) => e.rating === 2).length}</div>
                </div>
                <div className="side">
                  <div>1 estrela</div>
                </div>
                <div className="middle">
                  <div className="bar-container">
                    <div
                      className="bar-1"
                      style={ { width: `${ratings.length !== 0 ? (ratings
                        .filter((e) => e.rating === 1)
                        .length * 100) / ratings.length : 0}%` } }
                    />
                  </div>
                </div>
                <div className="side right">
                  <div>{ratings.filter((e) => e.rating === 1).length}</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

Rating.propTypes = {
  handleClick: func.isRequired,
  handleChange: func.isRequired,
  invalid: bool.isRequired,
  email: string.isRequired,
  textarea: string.isRequired,
  rating: number.isRequired,
  ratingChanged: func.isRequired,
  ratings: arrayOf(shape).isRequired,
  product: shape().isRequired,
};
