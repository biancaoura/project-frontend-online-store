import { func } from 'prop-types';
import React, { Component } from 'react';
import { gamesBrands } from '../brands_data';

export default class BrandsGames extends Component {
  render() {
    const { handleClick } = this.props;
    return (
      <div className="brands">
        {
          gamesBrands.map(({ name, icon, categoGames }, index) => (
            <button
              className="brands-container"
              key={ index }
              type="button"
              onClick={ () => handleClick(name, categoGames) }
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

BrandsGames.propTypes = {
  handleClick: func.isRequired,
};
