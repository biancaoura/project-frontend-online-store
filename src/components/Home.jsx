/* eslint-disable complexity */
/* eslint-disable max-len */
/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable max-lines */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-max-depth */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BsIcons from 'react-icons/bs';
import * as BiIcons from 'react-icons/bi';
import * as MdIcons from 'react-icons/md';
import {
  getAtributesFromCategory,
  getCategories,
  getProductsFromCategory,
  getProductsFromCategoryAndQuery,
} from '../services/api';
import { addToCart, getSavedCart } from '../services/localStorage';
import Product from './Product';
import '../styles/home.css';
import Brands from './Brands';
import calculateRangeMin,
{ calculateRangeAverage, calculateRangeMax } from '../services/calculatePriceRange';
import NoneFound from './NoneFound';
import '../styles/header.css';
import Loading from './Loading';
import { phones } from '../services/const';
import BrandsGames from './BrandsGames';
import brandsCheck from '../services/brands';
import { checkIfHouse } from '../services/inprovements';
import getCategoriesTecno, { getCategoriesOthers } from '../services/categories';
import Footer from './Footer/Footer';

export default class Home extends Component {
    state = {
      item: [],
      categories: [],
      tecnology: [],
      catego: '',
      inputProduct: '',
      productName: {
        name: '',
        id: '',
        catego: '',
      },
      loading: false,
      searched: false,
      empty: false,
      emptyfilter: false,
      filterShipping: false,
      filterPriceMin: 0,
      filterPriceMax: 0,
      hoverTecno: false,
      hoverCatego: false,
    }

    async componentDidMount() {
      const { productName } = this.state;
      this.setState({ loading: true }, async () => {
        const response = await getCategories();
        const loadProduct = await getProductsFromCategoryAndQuery('', productName.name);
        this.setState({
          categories: [...getCategoriesOthers(response)],
          tecnology: [...getCategoriesTecno(response)],
          item: loadProduct.results,
          loading: false,
        });
      });
    }

    handleClickSort = ({ target: { name } }) => {
      const { item } = this.state;
      if (name === 'sortRelevant') {
        this.setState(({
          item: item.filter((e) => e.sold_quantity >= 0)
            .sort((a, b) => a.sold_quantity - b.sold_quantity).reverse(),
        }));
      }
      if (name === 'sortCreep') {
        this.setState({
          item: item.filter(({ price }) => price).sort((a, b) => a.price - b.price),
        });
      }
      if (name === 'sortPricy') {
        this.setState({
          item: item.filter(({ price }) => price)
            .sort((a, b) => a.price - b.price).reverse(),
        });
      }
    }

    handleChange = ({ target }) => {
      const { name, value } = target;
      this.setState({ [name]: value });
    }

    handleClickPricefilter = async ({ target }) => {
      const { name, value } = target;
      const { productName, categories } = this.state;
      const valueToNum = value.split('$');
      const searchByCategory = categories.some((e) => e.id === productName.id);
      const response = searchByCategory ? await getProductsFromCategory(productName.id)
        : await getProductsFromCategoryAndQuery('', productName.name);
      if (response.results.length === 0) {
        this.setState({});
      }
      if (name === 'up-until') {
        this.setState({
          item: response.results.filter(({ price }) => price <= Number(valueToNum[1])),
        });
      }
      if (name === 'from-to-average') {
        this.setState({
          item: response.results
            .filter(({ price }) => price >= Number(valueToNum[1].split('a')[0])
            && price <= Number(valueToNum[2])),
        });
      }
      if (name === 'from-to-max') {
        this.setState({
          item: response.results
            .filter(({ price }) => price >= Number(valueToNum[1].split('a')[0])
            && price <= Number(valueToNum[2])),
        });
      }
    }

    handleClickButton = async () => {
      const { inputProduct, productName } = this.state;
      if (!inputProduct) return this.setState({ searched: false });
      this.setState({ loading: true }, async () => {
        const response = await getProductsFromCategoryAndQuery('', inputProduct);
        if (response.results.length === 0) {
          return this.setState({
            empty: true,
            inputProduct: '',
            searched: true,
            loading: false,
          });
        }
        if (inputProduct.includes('elular') || inputProduct.includes('martphone')) {
          this.setState({ catego: 'Celulares e Telefones' });
        }
        if (!inputProduct.includes('elular') || !inputProduct.includes('martphone')) {
          this.setState({ catego: '' });
        }
        this.setState(({ searched: true }));
        this.setState({
          item: response.results,
          inputProduct: '',
          empty: false,
          loading: false,
          productName: { name: inputProduct, id: '', catego: '' },
        });
      });
    }

    handleSelect = ({ target }) => {
      this.setState({ loading: true }, async () => {
        const { value } = target;
        const { categories } = this.state;
        const category = categories.filter((cat) => cat.name === value);
        const response = await getProductsFromCategory(category[0].id);
        this.setState({
          hoverCatego: false,
          hoverTecno: false,
          item: response.results,
          catego: value,
          productName: { name: value, id: category[0].id, catego: value },
          searched: true,
          filterPriceMax: 0,
          filterPriceMin: 0,
          filterShipping: false,
          empty: false,
          loading: false,
        });
      });
    }

    handleClick = (product) => {
      const productObj = {
        ...product,
      };
      this.setState(({ loading: true }), () => {
        this.setState({
          loading: false,
        });
      });
      addToCart(productObj);
    }

    handleFilterCheckbox = ({ target }) => {
      this.setState({ filterShipping: target.checked });
    }

    handleClickCategory = (name, catego) => {
      this.setState({
        loading: true,
        productName: {
          id: '',
          name,
          catego,
        } }, async () => {
        const { productName } = this.state;
        const response = await getProductsFromCategoryAndQuery('', name);
        if (response.results.length === 0) {
          this.setState({
            empty: true,
            inputProduct: name,
          });
        }
        this.setState({
          catego: brandsCheck(productName.name,
            productName.catego, catego, name),
          item: response.results,
          empty: false,
          hoverTecno: false,
          hoverCatego: false,
          searched: true,
          loading: false,
        });
      });
    }

    handleEnter = (name) => {
      if (name === 'tecnology' || name === 'tecno-div') {
        this.setState({ hoverTecno: true, hoverCatego: true });
      }
      if (name !== 'tecnology') {
        this.setState({ hoverCatego: true });
      }
    }

    handleLeave = (name) => {
      if (name === 'tecnology' || name === 'tecno-div') {
        this.setState({ hoverTecno: false });
      }
      if (name !== 'tecnology' || name === 'tecno-div') {
        this.setState({ hoverCatego: false });
      }
    }

    handleKeyDown = (e) => {
      const ENTER_KEYCODE = 13;
      if (e.keyCode === ENTER_KEYCODE) {
        e.preventDefault();
        this.handleClickButton();
      }
    }

    render() {
      const {
        item,
        inputProduct,
        categories,
        tecnology,
        catego,
        loading,
        searched,
        empty,
        emptyfilter,
        filterShipping,
        filterPriceMax,
        filterPriceMin,
        productName,
        hoverCatego,
        hoverTecno,
      } = this.state;
      const MAX_CART_LENGTH = 9;
      return (
        <>
          <header className="header header-home">
            <div className="title-container">
              <BiIcons.BiShoppingBag className="shop-icon" />
              <h1>Online Shopping</h1>
            </div>
            <form>
              <div className="search-div">
                <input
                  type="text"
                  id="home"
                  onChange={ this.handleChange }
                  onKeyDown={ this.handleKeyDown }
                  name="inputProduct"
                  value={ inputProduct }
                  className={ searched ? 'placeholder-normal'
                    : 'placeholder-incorrect' }
                  placeholder=" Buscar produtos e mais..."
                />
                <button
                  type="button"
                  onClick={ this.handleClickButton }
                >
                  <BsIcons.BsSearch className="lupinha" />
                </button>
              </div>
              <div
                className="dropdown"
                onMouseEnter={ () => this.handleEnter('category') }
                onMouseLeave={ () => this.handleLeave('category') }
              >
                <p className="dropbtn">Categorias</p>
                <div
                  className="categories dropdown-content"
                  style={ { display: hoverCatego ? 'flex' : 'none' } }
                >
                  <div className="dropdown">
                    <button
                      type="button"
                      className="tecno-button"
                      onFocus={ this.onFocus }
                      name="tecnology"
                      onMouseEnter={ () => this.handleEnter('tecnology') }
                      onMouseLeave={ () => this.handleLeave('tecnology') }
                    >
                      Tecnologia
                      {' '}
                      <MdIcons.MdKeyboardArrowRight />
                    </button>
                  </div>
                  { categories.filter((e, index) => index > 0)
                    .map(({ name }, index) => (
                      <button
                        key={ index }
                        onClick={ this.handleSelect }
                        type="button"
                        value={ name }
                      >
                        {name}
                      </button>
                    ))}
                </div>
              </div>
            </form>
            <Link
              to="/cart/:id"
              className="cart-link"
            >
              <div className="cart-size">
                { getSavedCart().length > MAX_CART_LENGTH ? '9+' : getSavedCart().length }
              </div>
              <BsIcons.BsCart3 className="cart-icon" fill="white" />
            </Link>
          </header>
          <section className="home-page">
            <div
              className="nav-details-tecno"
              name="tecnology"
              onMouseEnter={ () => this.handleEnter('tecno-div') }
              onMouseLeave={ () => this.handleLeave('tecno-div') }
              style={ { visibility: hoverTecno ? 'visible' : 'hidden' } }
            >
              <h1>Tecnologia</h1>
              <hr />
              <div
                className="sub_categories"
              >
                <div className="sub_categories_div">
                  <span>Celulares</span>
                  <button
                    type="button"
                    onClick={ () => this.handleClickCategory('Smartphones') }
                  >
                    Smartphones

                  </button>
                  <button
                    type="button"
                    onClick={ () => this.handleClickCategory('Telefones') }
                  >
                    Telefones

                  </button>
                </div>
                <div className="sub_categories_div">
                  <span>Games</span>
                  <button
                    type="button"
                    onClick={ () => this.handleClickCategory('Consoles') }
                  >
                    Consoles

                  </button>
                  <button
                    type="button"
                    onClick={ () => this.handleClickCategory('Acessórios gamers') }
                  >
                    Acessórios

                  </button>
                </div>
                <div className="sub_categories_div">
                  <span>Eletronicos</span>
                  <button
                    type="button"
                    onClick={ () => this
                      .handleClickCategory('Acessórios para eletrônicos') }
                  >
                    Acessórios para eletrônicos

                  </button>
                  <button
                    type="button"
                    onClick={ () => this.handleClickCategory('Aúdio e vídeo') }
                  >
                    Aúdio e vídeo

                  </button>
                </div>
                <div className="sub_categories_div">
                  <span>Informatica</span>
                  <button
                    type="button"
                    onClick={ () => this.handleClickCategory('Periféricos') }
                  >
                    Periféricos

                  </button>
                  <button
                    type="button"
                    onClick={ () => this
                      .handleClickCategory('Acessórios para computador') }
                  >
                    Acessórios para computador

                  </button>
                </div>
                <div className="sub_categories_div">
                  <span>Câmeras</span>
                  <button
                    type="button"
                    onClick={ () => this.handleClickCategory('Câmeras') }
                  >
                    Câmeras

                  </button>
                  <button
                    type="button"
                    onClick={ () => this.handleClickCategory('Acessórios para câmeras') }
                  >
                    Acessórios para câmeras

                  </button>
                </div>
              </div>
            </div>
            {
              loading && <Loading />
            }
            {
              !loading && (
                <div className="searched">
                  {
                    empty && <NoneFound />
                  }
                  {!empty && (

                    <div className="home-page">
                      {
                        searched && (
                          <div className="filter-div">
                            <section className="results">
                              <h1>{productName.name}</h1>
                              <span>{`${item.length} resultado(s)`}</span>
                            </section>
                            <div>
                              <span>remover filtro(s)</span>
                              <button
                                type="button"
                                onClick={ this.handleClick }
                              >
                                X
                              </button>
                            </div>
                            {!checkIfHouse(productName.name) && (
                              <section className="free-shipping-filter">
                                <span className="free-ship-span">Frete grátis</span>
                                <label htmlFor="check" className="switch">
                                  <input
                                    type="checkbox"
                                    id="check"
                                    onChange={ this.handleFilterCheckbox }
                                  />
                                  <span className="slider round" />
                                </label>
                              </section>
                            )}
                            <section className="price-filter">
                              Preço
                              <ul className="price-filter-list">
                                <li>
                                  <button
                                    type="button"
                                    name="up-until"
                                    value={ calculateRangeMin(filterPriceMin) }
                                    onClick={ this.handleClickPricefilter }
                                  >
                                    {calculateRangeMin(filterPriceMin)}
                                  </button>
                                </li>
                                <li>
                                  <button
                                    type="button"
                                    name="from-to-average"
                                    value={
                                      calculateRangeAverage(filterPriceMin, filterPriceMax)
                                    }
                                    onClick={ this.handleClickPricefilter }
                                  >
                                    {calculateRangeAverage(filterPriceMin, filterPriceMax)}
                                  </button>
                                </li>
                                <li>
                                  <button
                                    type="button"
                                    name="from-to-max"
                                    value={
                                      calculateRangeMax(filterPriceMin, filterPriceMax)
                                    }
                                    onClick={ this.handleClickPricefilter }
                                  >
                                    {calculateRangeMax(filterPriceMin, filterPriceMax)}
                                  </button>
                                </li>
                              </ul>
                              <section className="desired-price">
                                <input
                                  type="number"
                                  name="filterPriceMin"
                                  placeholder="Mínimo"
                                  value={ filterPriceMin === 0 ? '' : filterPriceMin }
                                  onChange={ this.handleChange }
                                />
                                <input
                                  type="number"
                                  name="filterPriceMax"
                                  placeholder="Máximo"
                                  value={ filterPriceMax === 0 ? '' : filterPriceMax }
                                  onChange={ this.handleChange }
                                />
                              </section>
                            </section>
                          </div>
                        )
                      }
                      <section className="products-container">
                        <div className="top-div-products">
                          {
                            catego === 'Celulares e Telefones' && (
                              <Brands handleClick={ this.handleClickCategory } />)
                          }
                          {
                            catego === 'Consoles' && (
                              <BrandsGames handleClick={ this.handleClickCategory } />
                            )
                          }
                          {searched && (
                            <div className="sort-porducts-div dropdown-sort">
                              <p className="dropbtn-sort">
                                Ordenar por
                                <MdIcons.MdKeyboardArrowDown id="arrow-drop-icon" />
                              </p>
                              <div className="dropdown-content-sort">
                                <button
                                  type="button"
                                  name="sortRelevant"
                                  onClick={ this.handleClickSort }
                                >
                                  Mais vendidos
                                </button>
                                <button
                                  type="button"
                                  name="sortCreep"
                                  onClick={ this.handleClickSort }
                                >
                                  Menor preço
                                </button>
                                <button
                                  type="button"
                                  name="sortPricy"
                                  onClick={ this.handleClickSort }
                                >
                                  Maior preço
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                        <section className="products-div">
                          { item.filter(({ shipping }) => (filterShipping
                            ? shipping.free_shipping === filterShipping : true))
                            .map((product) => (
                              <Product
                                key={ product.id }
                                product={ product }
                                handleClick={ this.handleClick }
                              />
                            ))}
                        </section>
                      </section>
                    </div>
                  )}
                </div>
              )
            }
          </section>
          <Footer />
        </>
      );
    }
}
