/**
*
* CartPage
*
*/

import React from 'react';
import { dataChecking } from 'globalUtils';

import './style.scss';

class CartPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

    cartList = () => (
        <div>
            {
                dataChecking(this.props, 'data', 'merchants').map((merchant) => (
                    <div key={merchant.id}>
                        <div
                            className="p-half"
                            style={{
                                backgroundColor: 'black',
                                color: 'white',
                            }}
                        >
                            Sold and shipped by
                            <div className="text-uppercase">
                                <b>{merchant.name}</b>
                            </div>
                        </div>
                        <div
                            className="text-xs-center mt-1"
                            style={{ display: 'flex' }}
                        >
                            <div className="text-uppercase" style={{ width: '400px' }}>cart item</div>
                            <div className="text-uppercase" style={{ width: '100px' }}>unit price</div>
                            <div className="text-uppercase" style={{ width: '100px' }}>qty</div>
                            <div className="text-uppercase" style={{ width: '100px' }}>total</div>
                        </div>
                        {
                            merchant.items.map((item) => (
                                <div
                                    className="mb-1"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                    key={item.id}
                                >
                                    <div style={{ width: '100px' }}>
                                        <img src={item.product.image.small} alt="prod img"width="80px" />
                                    </div>
                                    <div className="line-elips" style={{ width: '300px' }}>{item.product.name}</div>
                                    <div className="text-xs-center" style={{ width: '100px' }}>RM {item.price.selling}</div>
                                    {this.renderQuantityEditor(item)}
                                    <div className="text-xs-center" style={{ width: '100px' }}>RM {item.total.selling}</div>
                                    <div className="text-xs-center" style={{ width: '100px' }}>
                                        <span
                                            className="px-quater"
                                            onClick={() => this.props.deleteCart(item.id)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <i className="far fa-times-circle"></i>
                                        </span>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    )
                )
            }
        </div>
    )

    renderQuantityEditor = (item) => {
        if (item.attribute.is_qty_adjustable) {
            return (
                <div className="text-xs-center" style={{ width: '100px' }}>
                    <span
                        className="px-quater"
                        style={{ cursor: 'pointer' }}
                        onClick={() => this.props.changeQuantity('remove', item.qty, item.id)}
                    >
                        <i className="fa fa-caret-left hermo-pink"></i>
                    </span>
                    <span>
                        {item.qty}
                    </span>
                    <span
                        className="px-quater"
                        style={{ cursor: 'pointer' }}
                        onClick={() => this.props.changeQuantity('add', item.qty, item.id)}
                    >
                        <i className="fa fa-caret-right hermo-pink"></i>
                    </span>
                </div>
            );
        }
        return (
            <div className="text-xs-center" style={{ width: '100px' }}>
                <span>
                    {item.qty}
                </span>
            </div>
        );
    }

    render() {
        return (
            <div>
                {
                   dataChecking(this.props, 'data', 'merchants') ?
                   this.cartList()
                   :
                   <div>no item added..</div>
                }
            </div>
        );
    }
}

CartPage.propTypes = {

};

export default CartPage;