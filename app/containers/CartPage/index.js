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

    deleteCart = (id) => {
        console.log('prod id: ', id);
    }

    render() {
        return (
            <div>
                {
                    this.props.cartData ?
                        <div>
                           {
                               this.props.cartData.merchants.map((merchant) => (
                                       <div key={merchant.id}>
                                            <div
                                                style={{
                                                    backgroundColor: 'black',
                                                    color: 'white',
                                                    padding: '.25rem .75rem',
                                                }}
                                            >
                                                {merchant.name}
                                            </div>
                                            <div>
                                                {
                                                    merchant.items.map((item) => {
                                                        console.log('list item', item);
                                                        return (
                                                            <div
                                                                key={item.id}
                                                                style={{
                                                                    display: 'flex',
                                                                }}
                                                            >
                                                                <div style={{ paddingRight: '1rem' }}>
                                                                    <img src={item.product.image.small} alt="prod img"width="80px" />
                                                                </div>
                                                                <div style={{ paddingRight: '1rem' }}>{item.product.name}</div>
                                                                <div style={{ paddingRight: '1rem' }}>{item.price.selling}</div>
                                                                <div style={{ paddingRight: '1rem' }}>
                                                                    <a onClick={() => this.deleteCart(item.id)}>
                                                                        <i className="far fa-times-circle"></i>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        );
                                                    })
                                                }
                                            </div>
                                        </div>
                                   ))
                           }
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
