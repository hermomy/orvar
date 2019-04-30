/**
*
* Price
*
*/

import React from 'react';
// import styled from 'styled-components';
import PropTypes from 'prop-types';
import { dataChecking } from 'globalUtils';
import './style.scss';

class Price extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    render() {
        if (!dataChecking(this.props.price, 'retail') && !dataChecking(this.props.price, 'selling')) {
            return null;
        }
        return (
            <div>
                <span
                    className={`${this.props.price.retail === this.props.price.selling ?
                        'original-price-no-discount'
                        :
                        'original-price-discount'}`
                    }
                >
                    {this.props.currency.symbol}{this.props.price.retail}
                </span>

                <span className="discount-price">
                    {
                        this.props.price.retail === this.props.price.selling ?
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
