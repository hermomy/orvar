/**
*
* Rate
*
*/

import React from 'react';
import PropType from 'prop-types';

import './style.scss';

class Rate extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    state = {
        rating: this.props.rating,
    }

    clickToChangeRate = (props) => {
        if (!this.props.rating === -1) {
            return null;
        }
        this.props.giveRate({ mark: props });
        this.setState({ rating: props });
        return null;
    }

    render() {
        return (
            this.props.rating > -2 &&
                <div>
                    <i className={`star-rating fa fa-star ${this.state.rating >= 2 ? '' : 'disabled'}`} aria-hidden="true" onClick={() => this.clickToChangeRate(2)}></i>
                    <i className={`star-rating fa fa-star ${this.state.rating >= 4 ? '' : 'disabled'}`} aria-hidden="true" onClick={() => this.clickToChangeRate(4)}></i>
                    <i className={`star-rating fa fa-star ${this.state.rating >= 6 ? '' : 'disabled'}`} aria-hidden="true" onClick={() => this.clickToChangeRate(6)}></i>
                    <i className={`star-rating fa fa-star ${this.state.rating >= 8 ? '' : 'disabled'}`} aria-hidden="true" onClick={() => this.clickToChangeRate(8)}></i>
                    <i className={`star-rating fa fa-star ${this.state.rating === 10 ? '' : 'disabled'}`} aria-hidden="true" onClick={() => this.clickToChangeRate(10)}></i>
                </div>
        );
    }
}

Rate.propTypes = {
    rating: PropType.number.isRequired,
};

export default Rate;
