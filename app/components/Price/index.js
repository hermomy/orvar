/**
*
* Price
*
*/

import React from 'react';
// import styled from 'styled-components';
import PropTypes from 'prop-types';
import './style.scss';

class Price extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <div>
                <span className="original_price">{this.props.currency.symbol}{this.props.price.retail}</span>
                <span className="discount_price">{this.props.price.retail === this.props.price.selling ?
                    null
                    :
                    this.props.currency.symbol + this.props.price.selling
                    }
                </span>
            </div>
        );
    }
}

Price.propTypes = {
    price: PropTypes.object.isRequired,
    currency: PropTypes.object.isRequired,
};

export default Price;
