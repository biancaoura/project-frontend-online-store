import React, { Component } from 'react';
import * as BsIcons from 'react-icons/bs';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import '../styles/emptycart.css';

export default class EmptyCart extends Component {
  render() {
    return (
      <div className="empty-cart">
        <BsIcons.BsFillBagXFill />
        <div>
          <h1>Seu carrinho está vazio</h1>
          <div className="back-to-home">
            <Link to="/">Voltar à home</Link>
            <AiIcons.AiFillHome />
          </div>
        </div>
      </div>
    );
  }
}
