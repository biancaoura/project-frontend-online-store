import { func, shape } from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import imgToHD, {
  areaWithCommas,
  calculateOffer,
  checkDomainId,
  imgToHDBigger,
  numberWithCommas,
} from '../services/inprovements';

export default class Product extends Component {
  render() {
    const { product, handleClick } = this.props;
    const { title, thumbnail, price, id, shipping, attributes } = product;
    const bedrooms = attributes.find((e) => e.id.match(/bedroom/i));
    const area = attributes.find((e) => e.id.match(/total_area/i));
    const area2 = attributes.find((e) => e.id.match(/covered_area/i));
    return (
      <div
        className={ `product ${checkDomainId(product.domain_id) ? 'properties' : ''}` }
      >
        <Link
          to={ `/product/${id}` }
          className="link_product_card"
        >
          <img
            src={ checkDomainId(product.domain_id)
              ? imgToHDBigger(thumbnail)
              : imgToHD(thumbnail) }
            alt={ title }
          />
          <section className="details">
            <hr />
            <div className="bedroom_et_area">
              {
                checkDomainId(product.domain_id)
                && area !== undefined
                && (
                  <div className="area_total">
                    <span>
                      {`${areaWithCommas(area2.value_name)}
                    construídos`}

                    </span>
                  </div>
                )
              }
              {
                checkDomainId(product.domain_id)
                && bedrooms !== undefined
                && (
                  <div className="bedrooms">
                    <span>{`${bedrooms.value_name} quartos`}</span>
                  </div>
                )
              }
            </div>
            {
              product.original_price !== null && (
                <span className="original-price">
                  { `R$ 
                ${numberWithCommas(product.original_price)}` }

                </span>
              )
            }
            <div className="price-off-price">
              <span className="product-price">
                { `R$ ${numberWithCommas(price)}` }

              </span>
              {
                product.original_price !== null && (
                  <span className="off">
                    { `${calculateOffer(price, product)}% OFF` }

                  </span>
                )
              }
            </div>
            { shipping.free_shipping && (
              <section className="shipp-details">
                <p className="free-shipping">
                  Frete Grátis
                </p>
              </section>
            ) }
            <span className="title">{ title }</span>
            {
              checkDomainId(product.domain_id) && (
                <span className="address">
                  {product.location.address_line !== ''
                    ? product.location.address_line
                    : `${product.location.neighborhood.name} -
                    ${product.location.city.name},
                    ${product.location.state.name}`}

                </span>
              )
            }
          </section>
        </Link>
        {!checkDomainId(product.domain_id) && (
          <div className="product-buttons-div">
            <Link
              to="/checkout"
              className="buy-it-now"
            >
              Comprar agora
            </Link>
            <button
              type="button"
              onClick={ () => handleClick(product) }
            >
              Adicionar ao carrinho
            </button>
          </div>
        )}
      </div>
    );
  }
}

Product.propTypes = {
  product: shape().isRequired,
  handleClick: func.isRequired,
};
