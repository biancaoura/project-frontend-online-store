import { number, func } from 'prop-types';
import React, { Component } from 'react';
import StarRatings from 'react-star-ratings';

export default class RatingCheck extends Component {
  render() {
    const { value, onChange } = this.props;
    return (
      <StarRatings
        rating={ value }
        starRatedColor="gold"
        changeRating={ (event) => onChange(event) }
        numberOfStars={ 5 }
        name="rating"
      />
    );
  }
}
RatingCheck.propTypes = {
  value: number.isRequired,
  onChange: func.isRequired,
};
