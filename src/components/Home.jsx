import React, { Component } from 'react';

export default class Home extends Component {
    state = {
      item: [],
    }

    render() {
      const { item } = this.state;
      return (
        <section>
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
