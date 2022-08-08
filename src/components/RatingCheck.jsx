import { number, func } from 'prop-types';
import React, { Component } from 'react';

export default class RatingCheck extends Component {
  render() {
    const { value, onChange } = this.props;
    return (
      <input
        type="radio"
        name="rating"
        value={ value }
        data-testid={ `${value}-rating` }
        onChange={ (event) => onChange(event) }
      />
    );
  }
}
RatingCheck.propTypes = {
  value: number.isRequired,
  onChange: func.isRequired,
};
