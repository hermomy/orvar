/**
*
* Rate
*
*/

import React from 'react';
import PropType from 'prop-types';

import './style.scss';

class Rate extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            this.props.rating > 0 &&
                <div>
                    <i className={`star-rating fa fa-star ${this.props.rating >= 2 ? '' : 'disabled'}`} aria-hidden="true"></i>
                    <i className={`star-rating fa fa-star ${this.props.rating >= 4 ? '' : 'disabled'}`} aria-hidden="true"></i>
                    <i className={`star-rating fa fa-star ${this.props.rating >= 6 ? '' : 'disabled'}`} aria-hidden="true"></i>
                    <i className={`star-rating fa fa-star ${this.props.rating >= 8 ? '' : 'disabled'}`} aria-hidden="true"></i>
                    <i className={`star-rating fa fa-star ${this.props.rating === 10 ? '' : 'disabled'}`} aria-hidden="true"></i>
                </div>
        );
    }
}

Rate.propTypes = {
    rating: PropType.number.isRequired,
};

export default Rate;
