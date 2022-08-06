// import { func } from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  getCategories,
  getProductsFromCategory,
  getProductsFromCategoryAndQuery,
} from '../services/api';
import { getSavedCart } from '../services/localStorage';
import Product from './Product';

export default class Home extends Component {
    state = {
      item: [],
      categories: [],
      inputProduct: '',
      cart: [],
    }

    async componentDidMount() {
      const response = await getCategories();
      const cartItems = getSavedCart();
      this.setState({
        categories: response,
        cart: cartItems,
      });
    }

    // componentDidUpdate() {
    //   this.componentDidMount();
    //   console.log('uma palavra');
    // }

    handleChange = ({ target }) => {
      const { name, value } = target;
      this.setState({ [name]: value });
    }

    handleClickButton = async () => {
      const { inputProduct } = this.state;
      const response = await getProductsFromCategoryAndQuery('', inputProduct);
      this.setState({ item: response.results });
    }

    handleSelect = async ({ target }) => {
      const { value } = target;
      const { categories } = this.state;
      const category = categories.filter((cat) => cat.name === value);
      const response = await getProductsFromCategory(category[0].id);
      this.setState({
        item: response.results,
      });
    }

    render() {
      const { item, inputProduct, categories, cart } = this.state;
      return (
        <section>
          <div>
            <Link
              to="/cart/:id"
              data-testid="shopping-cart-button"
            >
              <p data-testid="shopping-cart-product-quantity">{ cart.length }</p>
              Cart
            </Link>
          </div>
          <section>
            { categories.map(({ id, name }) => (
              <label htmlFor={ id } key={ id } data-testid="category">
                <input
                  id={ id }
                  value={ name }
                  name="category"
                  type="radio"
                  onChange={ this.handleSelect }
                />
                { name }
              </label>
            ))}
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
              onClick={ this.handleClickButton }
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

// Home.propTypes = {
//   handleClick: func.isRequired,
// };
