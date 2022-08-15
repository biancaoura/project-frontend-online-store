import { func } from 'prop-types';
import React, { Component } from 'react';
import { brands } from '../brands_data';

export default class Brands extends Component {
  render() {
    const { handleClick } = this.props;
    return (
      <div className="brands">
        {
          brands.map(({ name, icon, catego }, index) => (
            <button
              className="brands-container"
              key={ index }
              type="button"
              onClick={ () => handleClick(name, catego) }
              value={ name }
            >
              { icon }
            </button>
          ))
        }
      </div>
    );
  }
}

Brands.propTypes = {
  handleClick: func.isRequired,
};
