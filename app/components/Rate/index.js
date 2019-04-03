/**
*
* Rate
*
*/

import React from 'react';
// import styled from 'styled-components';

import './style.scss';

class Rate extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <div>
                <i className={`star-rating fa fa-star ${this.props.product.review.rating >= 2 ? '' : 'disabled'}`} aria-hidden="true"></i>
                <i className={`star-rating fa fa-star ${this.props.product.review.rating >= 4 ? '' : 'disabled'}`} aria-hidden="true"></i>
                <i className={`star-rating fa fa-star ${this.props.product.review.rating >= 6 ? '' : 'disabled'}`} aria-hidden="true"></i>
                <i className={`star-rating fa fa-star ${this.props.product.review.rating >= 8 ? '' : 'disabled'}`} aria-hidden="true"></i>
                <i className={`star-rating fa fa-star ${this.props.product.review.rating === 10 ? '' : 'disabled'}`} aria-hidden="true"></i>
            </div>
        );
    }
}

Rate.propTypes = {

};

export default Rate;
