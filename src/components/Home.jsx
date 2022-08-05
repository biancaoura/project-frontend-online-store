import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Home extends Component {
    state = {
      item: [],
    }

    render() {
      const { item } = this.state;
      return (
        <section>
          <div>
            <Link to="/cart" data-testid="shopping-cart-button">Cart</Link>
          </div>
          <form>
            <label htmlFor="home">
              <input type="text" id="home" />
            </label>
          </form>
          { !item.length && (
            <p data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>)}
        </section>
      );
    }
}
