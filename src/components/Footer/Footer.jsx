/* eslint-disable react/jsx-max-depth */
import React, { Component } from 'react';
import * as MdIcons from 'react-icons/md';
import './footer.css';

export default class Footer extends Component {
  state = {
    moreInfo: false,
  }

  handleClick = () => {
    const { moreInfo } = this.state;
    if (moreInfo === false) {
      this.setState({ moreInfo: true }, () => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      });
    }
    if (moreInfo === true) {
      this.setState({ moreInfo: false }, () => {
        window.scrollTo({ top: document.body.scrollHeight,
          behavior: 'smooth' });
      });
    }
  }

  render() {
    const { moreInfo } = this.state;
    return (
      <div className="footer-div">
        <div className="more-info">
          <button
            type="button"
            onClick={ this.handleClick }
          >
            Mais informações
            <MdIcons.MdKeyboardArrowUp />
          </button>
        </div>
        <div
          className="contact"
          style={ { display: moreInfo ? 'flex' : 'none' } }
        >
          <div className="devs">
            <h4>Desenvolvido por </h4>
            <ul>
              <li>
                <div>
                  <a
                    href="https://github.com/biancaoura"
                    rel="norferrer noreferrer"
                    target="_blank"
                  >
                    <span>Bianca Oura</span>
                  </a>
                </div>
              </li>
              <li>
                <div>
                  <a
                    href="https://github.com/vargazz"
                    rel="norferrer noreferrer"
                    target="_blank"
                  >
                    <span>Guilherme</span>
                  </a>
                </div>
              </li>
              <li>
                <div>
                  <a
                    href="https://github.com/Leholive"
                    rel="norferrer noreferrer"
                    target="_blank"
                  >
                    <span>Leticía</span>
                  </a>
                </div>
              </li>
              <li>
                <div>
                  <a
                    href="https://github.com/opabloaraujo"
                    rel="norferrer noreferrer"
                    target="_blank"
                  >
                    <span>Pablo</span>
                  </a>
                </div>
              </li>
              <li>
                <div>
                  <a
                    href="https://github.com/WayneNtkM"
                    rel="norferrer noreferrer"
                    target="_blank"
                  >
                    <span>Wayne</span>
                  </a>
                </div>
              </li>
            </ul>
          </div>
          <div className="resources">
            <h4>Recursos utilizados</h4>
            <ul>
              <li>
                <span>React</span>
              </li>
              <li>
                <span>React-icons</span>
              </li>
              <li>
                <a
                  href="https://developers.mercadolivre.com.br/pt_br/api-docs-pt-br"
                  rel="norferrer noreferrer"
                  target="_blank"
                >
                  <span>API - Mercado Livre</span>
                </a>
              </li>
              <li />
            </ul>
          </div>
        </div>
        <footer className="footer">
          <h4>Site modelo</h4>
          <a
            href="https://www.mercadolivre.com.br/"
            rel="norferrer noreferrer"
            target="_blank"
          >
            Mercado Livre

          </a>
        </footer>
      </div>
    );
  }
}
