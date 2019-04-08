/**
*
* ProductCard
*
*/


import { NavLink } from 'react-router-dom';
import React from 'react';
// import styled from 'styled-components';
import './style.scss';
import Price from '../Price';
import Rate from '../Rate';

class ProductCard extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    state = {
        wishlist: this.props.product._user.wishlisted,
    }

    render() {
        return (
            <NavLink to={`/mall/${this.props.product.id}`}>
                <div
                    className={`product-card ${this.props.listViewMode ? 'list-view-card' : 'grid-view-card'}`}
                    key={this.props.product.id}
                    onClick={() => this.passDataToProdView(this.props.product)}
                >
                    <div className={`product-card-content ${!this.props.product.instock ? '' : 'OOS'}`}>
                        <div className="product-card-images">
                            <div className="product-card-tag">
                                {
                                    this.props.product.features.map((feature) => (
                                        <div className="img-tag-div" key={this.props.product.id}><img src={feature.value} alt="" /></div>
                                    ))
                                }
                                {
                                    this.props.product.extra_features.map((extra_features) => (
                                        <div className="img-tag-div" key={this.props.product.id}><img src={extra_features.value} alt="" /></div>
                                    ))
                                }
                            </div>

                            {
                                !this.props.product.instock ?
                                    <div>
                                        <span className="OOS-word">Out Of Stock</span>
                                    </div>
                                    :
                                    null
                            }

                            <div className="product-card-img">
                                <img src={this.props.product.image.medium} alt="product.jpg" className="product-img" />
                            </div>

                        </div>
                        <div className="product-card-info">
                            <div className="product-card-wishlist">
                                <i
                                    className={`wishlist-btn fa fa-heart ${this.state.wishlist ? 'wishlist-btn-clicked' : ''}`}
                                    aria-hidden="true"
                                    onClick={() => { this.setState({ wishlist: !this.state.wishlist }); console.log(this.state.wishlist); }}
                                ></i>
                            </div>
                            <Price
                                currency={this.props.product.currency}
                                price={this.props.product.price}
                            />
                            <div className="product-card-name">
                                <p className="product-name">{this.props.product.brand.name}</p>
                                <p className="product-name">{this.props.product.plain_name}</p>
                            </div>
                            <div>
                                <Rate
                                    product={this.props.product}
                                />
                                <span className="product-review-count">({this.props.product.review.count})</span>
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
            </NavLink>
        );
    }
}

ProductCard.propTypes = {

};

export default ProductCard;
