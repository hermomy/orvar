/**
*
* ProductCard
*
*/

import React from 'react';
// import styled from 'styled-components';
import './style.scss';
import StatefulLink from '../StatefulLink';
import Price from '../Price';

class ProductCard extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    passDataToProdView = (items) => {
        StatefulLink(items, (`/mall/${items.id}`));
    }

    render() {
        return (
            <div className="product_card" key={`mall_item_${this.props.index}`} onClick={() => this.passDataToProdView(this.props.product)}>
                <div className={`${this.props.instock === true ? 'product_card_upper' : 'product_card_upper_OOS'}`}>
                    <div className="product_card_tag">
                        {this.props.product.features.map((a) => (
                            <img src={a.value} alt="" />
                        ))}
                        {this.props.product.extra_features.map((a) => (
                            <img src={a.value} alt="" />
                        ))}
                        {this.props.product.extra_features ? <img src={this.props.product.extra_features.value} alt="" /> : null}
                    </div>
                    <div className="product_card_img">
                        <img src={this.props.product.image.medium} alt="product.jpg" className="product_img" />
                    </div>
                </div>
                <div>
                    <Price
                        currency={this.props.product.currency}
                        price={this.props.product.price}
                    />
                    <i className="fa fa-heart" aria-hidden="true"></i>
                </div>
                <div>
                    <span>{this.props.product.brand.name}</span>
                    <span>{this.props.product.plain_name}</span>
                    <div>
                        <i className={`star-rating fa fa-star ${this.props.product.review.rating >= 2 ? '' : 'disabled'}`} aria-hidden="true"></i>
                        <i className={`star-rating fa fa-star ${this.props.product.review.rating >= 4 ? '' : 'disabled'}`} aria-hidden="true"></i>
                        <i className={`star-rating fa fa-star ${this.props.product.review.rating >= 6 ? '' : 'disabled'}`} aria-hidden="true"></i>
                        <i className={`star-rating fa fa-star ${this.props.product.review.rating >= 8 ? '' : 'disabled'}`} aria-hidden="true"></i>
                        <i className={`star-rating fa fa-star ${this.props.product.review.rating === 10 ? '' : 'disabled'}`} aria-hidden="true"></i>
                    </div>
                </div>
            </div>
        );
    }
}

ProductCard.propTypes = {

};

export default ProductCard;
