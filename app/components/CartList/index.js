/**
*
* CartList
*
*/

import React from 'react';
// import styled from 'styled-components';
import {
    Typography,
    Grid,
    Divider,
} from '@material-ui/core';
import './style.scss';

class CartList extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    renderQuantity = (item) => {
        if (item.attribute.is_qty_adjustable && !this.props.noEditQuantity) {
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

    renderSummary = () => {
        const summary = this.props.merchant.summary;
        const cart = this.props.cart;
        return (
            <div>
                {console.log(cart)}
                {
                    <Grid
                        container={true}
                        direction="column"
                        justify="flex-start"
                    >
                        <Grid item={true}>
                            <Typography>Subtotal</Typography>
                            <Typography>{cart.currency.symbol}{Number(summary.subtotal).toFixed(2)}</Typography>
                        </Grid>
                        <Grid item={true}>
                            <Typography>{summary.shipping.label}</Typography>
                            <Typography>{cart.currency.symbol}{Number(summary.shipping.value).toFixed(2)}</Typography>
                        </Grid>
                        <Grid item={true}>
                            <Typography><b>Total</b></Typography>
                            <Typography>{cart.currency.symbol}{Number(summary.merchant_total).toFixed(2)}</Typography>
                        </Grid>
                    </Grid>
                }
            </div>
        );
    }
    render() {
        const merchant = this.props.merchant;
        const cart = this.props.cart;
        return (
            <div className="my-1">
                <div
                    className="p-half"
                    style={{
                        backgroundColor: 'black',
                        color: 'white',
                    }}
                >
                    Sold and shipped by
                    <div>
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
                            <div className="text-xs-center" style={{ width: '100px' }}>{cart.currency.symbol}{Number(item.price.selling).toFixed(2)}</div>
                            {this.renderQuantity(item)}
                            <div className="text-xs-center" style={{ width: '100px' }}>{cart.currency.symbol}{Number(item.total.selling).toFixed(2)}</div>
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
                <Divider />
                {!this.props.noSummary && this.renderSummary()}
            </div>
        );
    }
}

CartList.propTypes = {

};

export default CartList;
