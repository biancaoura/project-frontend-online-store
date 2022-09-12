/* eslint-disable complexity */
/* eslint-disable no-magic-numbers */
/* eslint-disable max-lines */
/* eslint-disable react/jsx-max-depth */
import { shape } from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BsIcons from 'react-icons/bs';
import * as BiIcons from 'react-icons/bi';
import * as GiIcons from 'react-icons/gi';
import * as MdIcons from 'react-icons/md';
import StarRatings from 'react-star-ratings';
import { getProductById } from '../services/api';
import imgToHD, {
  calculateOffer,
  checkDomainId,
  numberWithCommas,
} from '../services/inprovements';
import { addToCart, getSavedCart } from '../services/localStorage';
import { addRating, getRatings } from '../services/localStorageRating';
import Rating from './Rating';
import Review from './Review';
import '../styles/header.css';
import '../styles/productcard.css';
import Loading from './Loading';

export default class ProductCard extends Component {
  state = {
    product: {},
    email: '',
    textarea: '',
    rating: 0,
    ratingAVG: 0,
    ratings: [],
    invalid: false,
    checked: false,
    loading: false,
    thumbnailHD: '',
    priceWithCommas: 0,
    originalPrice: 0,
    freeShipping: false,
    pictures: [],
    dealOfTheDay: false,
    savedCart: [],
    warranty: '',
    stock: {
      avaliable: 0,
      onCart: 0,
    },
    domain: '',
  }

  async componentDidMount() {
    this.setState({ loading: true }, async () => {
      const { match: { params: { id } } } = this.props;
      const response = await getProductById(id);
      const reviews = getRatings(id);
      const ratingsAVG = reviews
        .reduce((acc, { rating }) => (acc + rating), 0) / reviews.length;
      this.setState({
        savedCart: getSavedCart(),
        product: response,
        ratings: reviews,
        ratingAVG: Number.isNaN(ratingsAVG) ? 0 : ratingsAVG,
        thumbnailHD: imgToHD(response.thumbnail),
        priceWithCommas: numberWithCommas(response.price),
        originalPrice: response.original_price !== null
          ? numberWithCommas(response.original_price) : null,
        freeShipping: response.shipping.free_shipping,
        pictures: response.pictures,
        dealOfTheDay: response.tags.some((e) => e === 'deal_of_the_day'),
        warranty: response.warranty,
        domain: response.domain_id,
        stock: {
          avaliable: response.available_quantity,
          onCart: getSavedCart().filter((e) => e.id === id).length,
        },
      });
      this.setState({ loading: false });
    });
  }

  handleClick = (product) => {
    const { match: { params: { id } } } = this.props;
    const productObj = {
      ...product,
    };
    addToCart(productObj);
    this.setState((prevSate) => ({
      savedCart: getSavedCart(),
      stock: {
        avaliable: prevSate.stock.avaliable - 1,
        onCart: getSavedCart().filter((e) => e.id === id).length,
      },
    }));
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    if (target.type === 'radio') this.setState({ checked: true });
    this.setState({ [name]: value });
  }

  ratingChanged = (newRating) => {
    this.setState({
      rating: newRating,
    });
  };

  handleClickSubmit = (event) => {
    event.preventDefault();
    const { email, rating, textarea, product } = this.state;
    const { id } = product;
    const reviews = getRatings(id);
    const ratingsAVG = reviews.length !== 0 ? (reviews
      .reduce((acc, e) => (acc + e.rating), 0) / reviews.length).toFixed(2)
      : rating;
    const ratingObj = {
      email,
      rating,
      textarea,
      ratingAVG: Number.isNaN(ratingsAVG) ? rating : ratingsAVG,
    };

    if (!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,3})$/i) || rating <= 0) {
      return this.setState({
        invalid: true,
      });
    }
    addRating(id, ratingObj);

    if (email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,3})$/i) || rating > 0) {
      const ratingsLocal = getRatings(id);
      return (
        this.setState({
          email: '',
          invalid: false,
          textarea: '',
          ratings: ratingsLocal,
          rating: 0,
          checked: false,
        })
      );
    }
  }

  setImage = (url) => {
    this.setState({
      thumbnailHD: imgToHD(url),
    });
  }

  handleCartAddClick = ({ target }, product) => {
    const { value } = target;
    const { match: { params: { id } } } = this.props;
    for (let i = 0; i < value; i += 1) {
      addToCart(product);
    }
    this.setState((prevSate) => ({
      savedCart: getSavedCart(),
      stock: {
        avaliable: prevSate.stock.avaliable - value,
        onCart: getSavedCart().filter((e) => e.id === id).length,
      },
    }));
  }

  render() {
    const {
      product,
      ratings,
      ratingAVG,
      checked,
      loading,
      thumbnailHD,
      priceWithCommas,
      originalPrice,
      freeShipping,
      dealOfTheDay,
      pictures,
      savedCart,
      warranty,
      domain,
      stock,
    } = this.state;
    const { title, price, condition } = product;
    const isDisabled = stock.avaliable === 0;

    return (
      <div className="product-page">
        <header className="header product-card-header">
          <div className="title-container">
            <BiIcons.BiShoppingBag className="shop-icon" />
            <h1>Online Shopping</h1>
          </div>
          <Link
            to="/cart/:id"
            className="cart-link"
          >
            <div className="cart-size">
              { savedCart.length > 9 ? '9+' : savedCart.length }
            </div>
            <BsIcons.BsCart3 className="cart-icon" fill="white" />
          </Link>
        </header>
        {loading && <Loading />}
        {!loading && (
          <div>
            {!checkDomainId(domain)
             && (
               <div>
                 <div className="product-card">
                   <div className="name-img-div">
                     <figure className="img">
                       <div className="side-img">
                         {pictures.map((e, { id }) => (
                           <div
                             key={ `${Math.random() * 100}` }
                             className="side-img-div"
                           >
                             <img
                               src={ e.secure_url }
                               alt={ id }
                               className="img-side"
                               onFocus={ this.onFocus }
                               onMouseEnter={ () => this.setImage(e.secure_url) }
                             />
                           </div>
                         ))}
                       </div>
                       <img
                         src={ thumbnailHD }
                         alt={ title }
                       />
                     </figure>
                     <section className="details-card-pdt">
                       <div className="condition">
                         <span>{`${condition} | ${product.sold_quantity} vendidos`}</span>
                         <h3
                           className="product-name"
                         >
                           {title}
                         </h3>
                       </div>
                       <div className="rating-star">
                         <StarRatings
                           rating={ ratingAVG }
                           starDimension="20px"
                           starSpacing="5px"
                           starRatedColor="gold"
                         />
                         {`(${ratings.length})`}
                       </div>
                       <div className="price-div">
                         <div className="price-original">
                           {
                             product.original_price !== null && (
                               <span
                                 className="original-price"
                               >
                                 { `R$ ${numberWithCommas(originalPrice)}` }
                               </span>
                             )
                           }
                           <div className="price-main">
                             <span className="price">R$</span>
                             <span className="price">
                               {`${priceWithCommas}`}
                             </span>
                           </div>
                         </div>
                         <span>
                           {
                             product.original_price !== null && (
                               <span className="off-prd-card">
                                 { `${calculateOffer(price, product)}% OFF` }
                               </span>
                             )
                           }
                         </span>
                       </div>
                       {dealOfTheDay && (
                         <div className="deal-of-the-day">
                           <span>Oferta do dia</span>
                         </div>
                       )}
                     </section>
                   </div>
                   <div className="buy-it">
                     <section className="buy-it-in">
                       {freeShipping && (
                         <div className="shipping">
                           <BsIcons.BsTruck />
                           <span>Frete grátis</span>
                         </div>
                       )}
                       <div className="stock">
                         <span>
                           { stock.avaliable > stock.onCart
                        && stock.avaliable > 0
                        && stock.avaliable !== 1 && 'Produto disponível'}
                           { stock.avaliable === 0
                        || stock.avaliable === stock.onCart ? 'Produto indisponível' : ''}
                           { stock.avaliable - stock.onCart === 1 && 'Último disponível' }
                         </span>
                         <span type="button" className="dropdown-quan">
                           <p className="dropbtn-quan">
                             Quantidade
                             <MdIcons.MdKeyboardArrowDown id="arrow-drop-icon" />
                           </p>
                           <div className="dropdown-content-quan">
                             <button
                               type="button"
                               value={ 1 }
                               onClick={ (event) => this
                                 .handleCartAddClick(event, product) }
                               disabled={ stock.avaliable === 0
                            || stock.avaliable === stock.onCart }
                             >
                               1 unidade

                             </button>
                             <button
                               type="button"
                               value={ 2 }
                               onClick={ (event) => this
                                 .handleCartAddClick(event, product) }
                               disabled={ stock.avaliable < 2 }
                             >
                               2 unidades

                             </button>
                             <button
                               type="button"
                               value={ 3 }
                               onClick={ (event) => this
                                 .handleCartAddClick(event, product) }
                               disabled={ stock.avaliable < 3 }
                             >
                               3 unidades

                             </button>
                             <button
                               type="button"
                               value={ 4 }
                               onClick={ (event) => this
                                 .handleCartAddClick(event, product) }
                               disabled={ stock.avaliable < 4 }
                             >
                               4 unidades

                             </button>
                             <button
                               type="button"
                               value={ 5 }
                               onClick={ (event) => this
                                 .handleCartAddClick(event, product) }
                               disabled={ stock.avaliable < 5 }
                             >
                               5 unidades

                             </button>
                           </div>
                         </span>
                       </div>
                       <div className="buy-it-buttons">
                         <Link
                           to="/checkout"
                           className="buy-it-now"
                         >
                           <span>Comprar agora</span>
                         </Link>
                         <button
                           type="button"
                           onClick={ () => this.handleClick(product) }
                           disabled={ isDisabled }
                         >
                           <span>Adicionar ao carrinho</span>
                         </button>
                       </div>
                       {warranty !== null && (
                         <div className="warranty">
                           <GiIcons.GiRibbonMedal />
                           <span>{warranty}</span>
                         </div>
                       )}
                     </section>
                   </div>
                 </div>
                 <Rating
                   handleClick={ this.handleClickSubmit }
                   handleChange={ this.handleChange }
                   ratingChanged={ this.ratingChanged }
                   checked={ checked }
                   product={ product }
                   { ...this.state }
                 />
                 <section className="reviews">
                   <div>
                     <h1 className="options-title">Opiniões</h1>
                     <hr />
                   </div>
                   <div className="reviews-div">
                     {
                       ratings.length > 0
                         ? ratings.map((review, index) => (
                           <Review key={ index } review={ review } checked={ checked } />
                         )) : 'Nenhuma avaliação para este produto'
                     }
                   </div>
                 </section>
               </div>
             )}
          </div>
        )}
      </div>
    );
  }
}

ProductCard.propTypes = {
  match: shape().isRequired,
};
