import { number, func, bool } from 'prop-types';
import React, { Component } from 'react';

export default class RatingCheck extends Component {
  render() {
    const { value, onChange, checked } = this.props;
    return (
      <input
        type="radio"
        name="rating"
        value={ value }
        data-testid={ `${value}-rating` }
        onChange={ (event) => onChange(event) }
        checked={ checked }
      />
    );
  }
}
RatingCheck.propTypes = {
  value: number.isRequired,
  onChange: func.isRequired,
  checked: bool.isRequired,
};
