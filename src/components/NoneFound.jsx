import React, { Component } from 'react';
import * as MdIcons from 'react-icons/md';
import '../styles/none.css';

export default class NoneFound extends Component {
  render() {
    return (
      <div className="none-container">
        <MdIcons.MdOutlineSearchOff />
        <div>
          <h1>Nenhum produto encontrado</h1>
          <ul>
            <li>Revise a grafia da palavra</li>
            <li>Tente buscar por termos menos específicos</li>
          </ul>
        </div>
      </div>
    );
  }
}
