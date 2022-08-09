import { shape } from 'prop-types';
import React, { Component } from 'react';
import { getSavedCart } from '../services/localStorage';

export default class Checkout extends Component {
  state = {
    cartItems: [],
    filteredCart: [],
    name: '',
    email: '',
    cpf: '',
    phone: '',
    cep: '',
    address: '',
    checked: false,
    isValid: true,
  }

  componentDidMount() {
    const cartItems = getSavedCart();
    const filteredCart = cartItems
      .filter((item, index, array) => index === array
        .findIndex((objt) => objt.id === item.id));
    this.setState({ cartItems, filteredCart });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    if (target.type === 'radio') this.setState({ checked: true });
    this.setState({ [name]: value });
  }

  handleClick = (e) => {
    e.preventDefault();
    const { name, email, cpf, phone, cep, address, checked } = this.state;
    const { history } = this.props;
    if (!name || !email || !cpf || !phone || !cep || !address || !checked) {
      return this.setState({ isValid: false });
    }
    localStorage.removeItem('cart_items');
    return history.push('/');
  }

  render() {
    const {
      cartItems, filteredCart, name, email, cpf, phone, cep, address, checked, isValid,
    } = this.state;
    const { handleChange, handleClick } = this;

    return (
      <div>
        { filteredCart.map((item, index) => (
          <section key={ index }>
            <p>{item.title}</p>
            <p>{item.price}</p>
          </section>
        )) }
        <span>
          {`Total: R$${cartItems.reduce((acc, { price }) => acc + price, 0).toFixed(2)}`}
        </span>
        <form>
          <input
            type="text"
            placeholder="Nome completo"
            name="name"
            value={ name }
            onChange={ handleChange }
            data-testid="checkout-fullname"
          />
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={ email }
            onChange={ handleChange }
            data-testid="checkout-email"
          />
          <input
            type="text"
            placeholder="CPF"
            name="cpf"
            value={ cpf }
            onChange={ handleChange }
            data-testid="checkout-cpf"
          />
          <input
            type="text"
            placeholder="Telefone"
            name="phone"
            value={ phone }
            onChange={ handleChange }
            data-testid="checkout-phone"
          />
          <input
            type="text"
            placeholder="CEP"
            name="cep"
            value={ cep }
            onChange={ handleChange }
            data-testid="checkout-cep"
          />
          <input
            type="text"
            placeholder="Endereço"
            name="address"
            value={ address }
            onChange={ handleChange }
            data-testid="checkout-address"
          />
          <div>
            <input
              type="radio"
              name="payment"
              checked={ checked }
              onChange={ handleChange }
              data-testid="ticket-payment"
            />
            <input
              type="radio"
              name="payment"
              checked={ checked }
              onChange={ handleChange }
              data-testid="visa-payment"
            />
            <input
              type="radio"
              name="payment"
              checked={ checked }
              onChange={ handleChange }
              data-testid="master-payment"
            />
            <input
              type="radio"
              name="payment"
              checked={ checked }
              onChange={ handleChange }
              data-testid="elo-payment"
            />
          </div>
          {
            !isValid && <p data-testid="error-msg">Campos inválidos</p>
          }
          <button
            type="submit"
            onClick={ handleClick }
            data-testid="checkout-btn"
          >
            Comprar
          </button>
        </form>
      </div>
    );
  }
}

Checkout.propTypes = {
  history: shape().isRequired,
};
