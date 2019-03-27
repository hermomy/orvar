/**
*
* ProductCard
*
*/

import React from 'react';
// import styled from 'styled-components';
import './style.scss';
// ask fc checking when put in component (checking tag)
class ProductCard extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <div className="product" key={`mall_item_${this.props.index}`}>
                <img src={this.props.product.features.value} alt="product features" />
                <img src={this.props.product.extra_features.value} alt="product extra feature" />
                <img src={this.props.product.image.medium} alt="product.jpg" />
                <span>{this.props.product.currency.symbol}{this.props.product.price.retail}</span>
                <span>{this.props.product.currency.symbol}{this.props.product.price.selling}</span>
                <i className="fa fa-heart" aria-hidden="true"></i>
                <span>{this.props.product.brand.name}</span>
                <span>{this.props.product.plain_name}</span>
                <div>
                    <i className="fa fa-star-o" aria-hidden="true"></i>
                    <i className="fa fa-star-o" aria-hidden="true"></i>
                    <i className="fa fa-star-o" aria-hidden="true"></i>
                    <i className="fa fa-star-o" aria-hidden="true"></i>
                    <i className="fa fa-star-o" aria-hidden="true"></i>
                </div>
            </div>
        );
    }
}

ProductCard.propTypes = {

};

export default ProductCard;
