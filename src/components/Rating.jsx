import { bool, func, string } from 'prop-types';
import React from 'react';
// import { addRating } from '../services/localStorageRating';
import RatingCheck from './RatingCheck';
// import Review from './Review';

export default class Rating extends React.Component {
  // state ={
  //   email: '',
  //   textarea: '',
  //   rating: 0,
  // }

  // handleChange = ({ target }) => {
  //   const { name, value } = target;
  //   if (target.type === 'radio') this.setState({ checked: true });
  //   this.setState({ [name]: value });
  // }

  // handleClick = (event) => {
  //   event.preventDefault();
  //   const { email, rating, textarea } = this.state;
  //   const ratingObj = {
  //     email,
  //     rating,
  //     textarea,
  //   };

  //   if (!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,3})$/i) || rating <= 0) {
  //     return this.setState({
  //       // email: '',
  //       // invalid: true,
  //       // textarea: '',
  //     });
  //   }
  //   addRating(ratingObj);
  //   return (
  //     this.setState({
  //       email: '',
  //       // invalid: false,
  //       textarea: '',
  //       rating: 0,
  //     })
  //   );
  // }

  render() {
    const ONE = 1;
    const TWO = 2;
    const THREE = 3;
    const FOUR = 4;
    const FIVE = 5;

    const arrayNumbers = [ONE, TWO, THREE, FOUR, FIVE];
    const { handleClick, invalid, handleChange, email, textarea, checked } = this.props;
    // const { email, textarea } = this.state;

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
            onChange={ (event) => handleChange(event) }
          />
          <div>
            {arrayNumbers.map((index) => (
              <section key={ index }>
                <RatingCheck
                  value={ index }
                  onChange={ (event) => handleChange(event) }
                  checked={ checked }
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
            onChange={ (event) => handleChange(event) }
          />
          <button
            type="submit"
            data-testid="submit-review-btn"
            onClick={ (event) => handleClick(event) }
          >
            Avaliar

          </button>
          {invalid && <p data-testid="error-msg">Campos inválidos</p>}
        </form>
        {/* { invalid === false
        && <Review
          email={ email }
          textarea={ textarea }
          rating={ rating }
        />} */}

      </>
    );
  }
}

Rating.propTypes = {
  handleClick: func.isRequired,
  handleChange: func.isRequired,
  invalid: bool.isRequired,
  email: string.isRequired,
  textarea: string.isRequired,
  checked: bool.isRequired,
  // rating: number.isRequired,
};
