/**
*
* ProductCard
*
*/

import React from 'react';
// import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import messages from './messages';
import './style.scss';

class ProductCard extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <div>
                <FormattedMessage {...messages.header} />
            </div>
        );
    }
}

ProductCard.propTypes = {

};

export default ProductCard;
