import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import Product from './Product';

export default class Home extends Component {
    state = {
      item: [],
      categories: [],
      inputProduct: '',
    }

    async componentDidMount() {
      const response = await getCategories();
      this.setState({
        categories: response,
      });
    }

    handleChange = ({ target }) => {
      const { name, value } = target;
      this.setState({ [name]: value });
    }

    handleClick = async () => {
      const { inputProduct } = this.state;
      const response = await getProductsFromCategoryAndQuery('', inputProduct);
      this.setState({ item: response.results });
    }

    render() {
      const { item, inputProduct, categories } = this.state;
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
              <input
                type="text"
                id="home"
                data-testid="query-input"
                onChange={ this.handleChange }
                name="inputProduct"
                value={ inputProduct }
              />
            </label>
            <button
              type="button"
              onClick={ this.handleClick }
              data-testid="query-button"
            >
              Pesquisar
            </button>
          </form>
          { !item.length && (
            <p data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>)}
          {!item.length ? <p>Nenhum produto foi encontrado</p>
            : (
              item.length && (
                item.map((product) => (
                  <Product
                    data-testid="product"
                    key={ product.id }
                    product={ product }
                  />
                )))
            )}
        </section>
      );
    }
}
