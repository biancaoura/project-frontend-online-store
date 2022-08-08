import { shape } from 'prop-types';
import React, { Component } from 'react';

export default class Review extends Component {
  render() {
    const { review } = this.props;
    const { email, textarea, rating } = review;
    return (
      <div>
        <span data-testid="review-card-email">{ email }</span>
        <span data-testid="review-card-rating">{ textarea }</span>
        <span data-testid="review-card-evaluation">{ rating }</span>
      </div>
    );
  }
}

Review.propTypes = {
  review: shape({}).isRequired,
};
