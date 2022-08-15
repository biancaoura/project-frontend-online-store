import React, { Component } from 'react';
import * as AiIcons from 'react-icons/ai';
import '../styles/loading.css';

export default class Loading extends Component {
  render() {
    return (
      <div className="loading">
        <AiIcons.AiOutlineLoading3Quarters />
      </div>
    );
  }
}
