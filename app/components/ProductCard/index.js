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
            <div
                className={`product_card ${this.props.listViewMode ? 'list-view-card' : 'grid-view-card'}`}
                key={this.props.product.id}
                onClick={() => this.passDataToProdView(this.props.product)}
            >
                <div className="product-card-content">
                    <div className={`product-card-images ${this.props.product.instock ? '' : 'OOS'}`}>
                        <div className="product_card_tag">
                            {
                                this.props.product.features.map((feature) => (
                                    <div className="img-tag-div"><img src={feature.value} alt="" key={this.props.product.id} /></div>
                                ))
                            }
                            {
                                this.props.product.extra_features.map((extra_features) => (
                                    <div className="img-tag-div"><img src={extra_features.value} alt="" key={this.props.product.id} /></div>
                                ))
                            }
                        </div>

                        {
                            !this.props.product.instock ?
                                <div>
                                    <span className="OOS_word">Out Of Stock</span>
                                </div>
                                :
                                null
                        }

                        <div className="product_card_img">
                            <img src={this.props.product.image.medium} alt="product.jpg" className="product_img" />
                        </div>

                    </div>
                    <div className="product-card-info">
                        <div className="product-card-wishlist">
                            <i className={`wishlist_btn fa fa-heart ${this.props.product._user.wishlisted ? 'wishlist_btn_clicked' : ''}`} aria-hidden="true"></i>
                        </div>
                        <Price
                            currency={this.props.product.currency}
                            price={this.props.product.price}
                        />
                        <div className="product-card-name">
                            <p className="product_name">{this.props.product.brand.name}</p>
                            <p className="product_name">{this.props.product.plain_name}</p>
                        </div>
                        <div>
                            <i className={`star-rating fa fa-star ${this.props.product.review.rating >= 2 ? '' : 'disabled'}`} aria-hidden="true"></i>
                            <i className={`star-rating fa fa-star ${this.props.product.review.rating >= 4 ? '' : 'disabled'}`} aria-hidden="true"></i>
                            <i className={`star-rating fa fa-star ${this.props.product.review.rating >= 6 ? '' : 'disabled'}`} aria-hidden="true"></i>
                            <i className={`star-rating fa fa-star ${this.props.product.review.rating >= 8 ? '' : 'disabled'}`} aria-hidden="true"></i>
                            <i className={`star-rating fa fa-star ${this.props.product.review.rating === 10 ? '' : 'disabled'}`} aria-hidden="true"></i>
                            <span className="product_review_count">({this.props.product.review.count})</span>
                        </div>
                    </div>
                    {
                        this.props.listViewMode ?
                            <div className="product-card-list-view-actions">special action only show in list view mode</div>
                            :
                            null
                    }
                </div>
            </div>
        );
    }
}

ProductCard.propTypes = {

};

export default ProductCard;
