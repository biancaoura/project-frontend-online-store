import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../services/api';

export default class Home extends Component {
    state = {
      item: [],
      categories: [],
    }

    async componentDidMount() {
      const response = await getCategories();
      this.setState({
        categories: response,
      });
    }

    render() {
      const { item, categories } = this.state;
      return (
        <section>
          <div>
            <Link to="/cart" data-testid="shopping-cart-button">Cart</Link>
          </div>
          <section>
            <select name="category">
              { categories.map(({ id, name }) => (
                <option name="category" key={ id } data-testid="category">
                  {name}
                </option>
              ))}
            </select>
          </section>
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
