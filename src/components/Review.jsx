import { shape } from 'prop-types';
import React, { Component } from 'react';
import StarRatings from 'react-star-ratings';
import '../styles/review.css';

export default class Review extends Component {
  render() {
    const { review } = this.props;
    const { email, textarea, rating } = review;
    return (
      <div className="review">
        <StarRatings
          rating={ rating }
          starDimension="15px"
          starSpacing="3px"
          starRatedColor="gold"
        />
        <section className="email-text">
          <span className="review-textarea">
            { textarea }
          </span>
          <span className="review-email">
            { email }
          </span>
        </section>
      </div>
    );
  }
}

Review.propTypes = {
  review: shape({}).isRequired,
};
