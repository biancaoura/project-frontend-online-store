import { string, number } from 'prop-types';
import React, { Component } from 'react';

export default class Review extends Component {
  render() {
    const { email, textarea, rating } = this.props;
    return (
      <div>
        <span data-testid="review-card-email">{ email }</span>
        <span>{ textarea }</span>
        <span>{ rating }</span>
      </div>
    );
  }
}

Review.propTypes = {
  email: string.isRequired,
  textarea: string.isRequired,
  rating: number.isRequired,
};
