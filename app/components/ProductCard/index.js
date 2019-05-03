/**
*
* ProductCard
*
*/

import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import { dataChecking } from 'globalUtils';
import './style.scss';
import Price from '../Price';
import Rate from '../Rate';

class ProductCard extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    renderFeatures() {
        const features = dataChecking(this.props, 'features');
        const extra_features = dataChecking(this.props, 'extra_feature');
        if (features || extra_features) {
            return (
                <div className="product-card-tag">
                    {
                        features.length > 0 && this.props.product.features.map((feature) => (
                            <div className="img-tag-div" key={this.props.product.id}><img src={feature.value} alt="" /></div>
                        ))
                    }
                    {
                        extra_features.length > 0 && this.props.product.extra_features.map((extra_feature) => (
                            <div className="img-tag-div" key={this.props.product.id}><img src={extra_feature.value} alt="" /></div>
                        ))
                    }
                </div>
            );
        }
        return null;
    }

    renderPrice = () => {
        if (!dataChecking(this.props.product, 'currency') && !dataChecking(this.props.price)) {
            return null;
        }
        return (
            <Price
                currency={this.props.product.currency}
                price={this.props.price}
            />
        );
    }

    renderCross = () => {
        if (!this.props.allowDelete) {
            return null;
        }
        return (
            <div onClick={() => this.props.deleteFromWishlist()}>
                <i className="fa fa-times cross-icon" aria-hidden="true"></i>
            </div>
        );
    }

    render() {
        return (
            <div
                className={`product-card ${this.props.listViewMode ? 'grid-view-card' : 'list-view-card'}`}
                key={this.props.product.id}
            >
                <div className={`product-card-content ${!this.props.product.instock ? '' : 'OOS'}`}>
                    <div className="product-card-images">
                        {this.props.allowDelete &&
                            <div onClick={() => this.props.deleteFromWishlist()}>
                                <i className="fa fa-times cross-icon" aria-hidden="true"></i>
                            </div>
                        }
                        {this.renderFeatures()}
                        <NavLink to={this.props.url}>
                            {
                                !this.props.product.instock &&
                                    <div>
                                        <span className="OOS-word">Out Of Stock</span>
                                    </div>
                            }
                            {
                                dataChecking(this.props.product, 'image', 'medium') ?
                                    <div className="product-card-img">
                                        <img src={this.props.product.image.medium} alt="product.jpg" className="product-img" />
                                    </div>
                                    :
                                    null
                            }
                        </NavLink>
                    </div>
                    <div className="product-card-info">
                        <div className="product-card-wishlist">
                            {
                                this.props.allowWishlistButton &&
                                <i
                                    className={`wishlist-btn fa fa-heart ${this.props.product._user.wishlisted ? 'wishlist-btn-clicked' : ''}`}
                                    aria-hidden="true"
                                    onClick={() => this.props.addOrDeleteWishlist()}
                                ></i>
                            }

                        </div>
                        <NavLink to={this.props.url}>
                            {this.renderPrice()}
                            <div className="product-card-name">
                                {dataChecking(this.props.product, 'brand', 'name') ? <p className="product-name">{this.props.product.brand.name}</p> : null}
                                {dataChecking(this.props.product, 'brand', 'plain_name') ? <p className="product-name">{this.props.product.plain_name}</p> : null}
                            </div>
                            <div>
                                <Rate rating={dataChecking(this.props.review, 'count') || 0} />
                                {
                                    dataChecking(this.props.review, 'count') ?
                                        <span className="product-review-count">({this.props.product.review.count})</span>
                                        :
                                        null
                                }
                            </div>
                        </NavLink>
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
    product: PropTypes.object.isRequired,
    listViewMode: PropTypes.bool.isRequired,
};

export default ProductCard;
