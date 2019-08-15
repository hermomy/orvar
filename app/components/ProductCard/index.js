/**
*
* ProductCard
*
*/
import React from 'react';
import { dataChecking } from 'globalUtils';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Grid,
    IconButton,
    Typography,
} from '@material-ui/core';
import {
    AddShoppingCart,
    Cancel,
    KeyboardArrowRight,
    Star,
    StarBorder,
} from '@material-ui/icons';

import './style.scss';

class ProductCard extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    renderImage = () => (
        <div className="product-img" style={{ textAlign: 'center' }}>
            <NavLink to={this.props.url}>
                <img
                    src={dataChecking(this.props.product, 'image', 'small')}
                    alt="product_image"
                    style={{ width: '60%' }}
                />
                {
                    dataChecking(this.props.product, 'instock') ?
                        ''
                        :
                        <div className="out-of-stock">
                            <Typography variant="overline" className="oos-text">out of stock</Typography>
                        </div>
                }
            </NavLink>
        </div>
    )

    renderFeature = () => {
        const features = dataChecking(this.props.product, 'features');
        const discount = dataChecking(this.props.product, 'price', 'discount_text');
        const featureArr = [];

        features.map((feature) => featureArr.push(
            <Grid item={true}>
                <img
                    src={feature.value}
                    alt="product_feature"
                    className="feature-tag"
                />
            </Grid>
        ));

        if (discount !== null) {
            featureArr.push(
                <Grid item={true} className="discount-tag">
                    <Typography>{discount}</Typography>
                </Grid>
            );
        }

        return (
            <Grid
                container={true}
                justify="center"
                style={{ padding: `${(featureArr.length > 0) ? '10px 0' : '35px 0'}` }}
                // style={{ padding: '10px 0' }}
            >
                {featureArr}
            </Grid>
        );
    }

    renderPrice = () => {
        const retailPrice = dataChecking(this.props.product, 'price', 'retail');
        const sellingPrice = dataChecking(this.props.product, 'price', 'selling');
        const discountText = dataChecking(this.props.product, 'price', 'discount_text');
        const symbol = dataChecking(this.props.product, 'currency', 'symbol');

        if (!retailPrice && !sellingPrice && !discountText) {
            return null;
        }

        return (
            <div className="product-price">
                <Typography variant="h6" style={{ paddingRight: `${discountText === null ? 0 : '10px'}` }}>
                    {symbol}{sellingPrice.toFixed(2)}
                </Typography>
                {
                    discountText === null ?
                        ''
                        :
                        <Typography color="textSecondary" style={{ textDecoration: 'line-through' }}>
                            {symbol}{retailPrice.toFixed(2)}
                        </Typography>
                }
            </div>
        );
    }

    renderBrand = () => (
        <div className="product-brand">
            <NavLink to={dataChecking(this.props.product, 'brand', 'url')} style={{ textDecoration: 'none' }}>
                <Typography color="primary" variant="h6">
                    {dataChecking(this.props.product, 'brand', 'name')}
                </Typography>
                <IconButton size="small" style={{ padding: '0 0 2px 3px' }}>
                    <KeyboardArrowRight color="primary" />
                </IconButton>
            </NavLink>
        </div>
    )

    renderDescription = () => (
        <div className="product-description">
            <Typography variant="subtitle1">{this.props.product.display_name}</Typography>
        </div>
    )

    renderRating = () => {
        const count = dataChecking(this.props.product, 'review', 'count');
        const rating = dataChecking(this.props.product, 'review', 'rating');
        const rate = Math.round(rating / 2);
        const rateArr = [];

        if (count < 0 && rating < 0) {
            return null;
        }

        for (let i = 0; i < 5; i++) {
            if ((i + 1) <= rate) {
                rateArr.push(<Star style={{ color: '#FFD700' }} />);
            } else {
                rateArr.push(<StarBorder style={{ color: '#FFD700' }} />);
            }
        }

        return (
            <div className="product-rating" style={{ paddingLeft: 5 }}>
                {rateArr}
                <Typography variant="caption"> ({count})</Typography>
            </div>
        );
    }

    render() {
        return (
            <Card style={{ boxShadow: 'none' }}>
                {
                    this.props.removeFromWishlist &&
                    <CardHeader
                        action={
                            <IconButton
                                size="small"
                                onClick={() => this.props.removeFromWishlist()}
                            >
                                <Cancel />
                            </IconButton>
                        }
                        style={{ paddingBottom: 0 }}
                    />
                }
                <CardContent className="product-content">
                    {this.renderImage()}
                    {this.renderFeature()}
                    {this.renderPrice()}
                    {this.renderBrand()}
                    {this.renderDescription()}
                    {this.renderRating()}
                </CardContent>
                {
                    this.props.addToCart &&
                    <Button
                        variant="contained"
                        color="secondary"
                        fullWidth={true}
                        style={{ borderRadius: 2, height: 50 }}
                        onClick={() => this.props.addToCart()}
                    >
                        <AddShoppingCart />
                        <Typography variant="overline" className="pl-1">Add to cart</Typography>
                    </Button>
                }
            </Card>
        );
    }
}

ProductCard.propTypes = {
    product: PropTypes.object.isRequired,
};

export default ProductCard;
