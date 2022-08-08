import React from 'react';
import RatingCheck from './RatingCheck';
import Review from './Review';

export default class Rating extends React.Component {
  state ={
    email: '',
    textarea: '',
    invalid: false,
    rating: 0,
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleClick = (event) => {
    event.preventDefault();
    const { email, rating } = this.state;
    console.log(email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,3})$/i));
    if (!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,3})$/i) || rating <= 0) {
      return this.setState({
        // email: '',
        invalid: true,
        // textarea: '',
      });
    }
    return this.setState({
      email: '',
      invalid: false,
      textarea: '',
    });
  }

  render() {
    const ONE = 1;
    const TWO = 2;
    const THREE = 3;
    const FOUR = 4;
    const FIVE = 5;

    const arrayNumbers = [ONE, TWO, THREE, FOUR, FIVE];

    const { email, textarea, invalid, rating } = this.state;

    return (
      <>
        <form>
          <h1>Avaliação</h1>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={ email }
            data-testid="product-detail-email"
            onChange={ this.handleChange }
          />
          <div>
            {arrayNumbers.map((index) => (
              <section key={ index }>
                <RatingCheck
                  value={ index }
                  onChange={ this.handleChange }
                />
              </section>
            ))}
          </div>
          <textarea
            name="textarea"
            value={ textarea }
            cols="30"
            rows="5"
            placeholder="Mensagem(opcional)"
            data-testid="product-detail-evaluation"
            onChange={ this.handleChange }
          />
          <button
            type="submit"
            data-testid="submit-review-btn"
            onClick={ this.handleClick }
          >
            Avaliar

          </button>
          {invalid === true && <p data-testid="error-msg">Campos inválidos</p>}
        </form>
        { invalid === false
        && <Review
          email={ email }
          textarea={ textarea }
          rating={ rating }
        />}

      </>
    );
  }
}
