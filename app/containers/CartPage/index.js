/**
 *
 * CartPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import makeSelectCartPage, { makeSelectCartData } from './selectors';
import reducer from './reducer';
import saga from './saga';
import './style.scss';
import { getCheckoutData } from './actions';

export class CartPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

    componentDidMount() {
        this.props.dispatch(getCheckoutData());
    }

    render() {
        console.log(this.props.cartData);

        return (
            <div>
                <h1>My Cart</h1>
                {
                    this.props.cartData ?
                        <div>
                            {this.props.cartData.length}
                        </div>
                        :
                        null
                }
            </div>
        );
    }
}

CartPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    cartpage: makeSelectCartPage(),
    cartData: makeSelectCartData(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'cartPage', reducer });
const withSaga = injectSaga({ key: 'cartPage', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(CartPage);
