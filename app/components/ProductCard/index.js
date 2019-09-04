/**
*
* ProductCard
*
*/
import React from 'react';
import { dataChecking } from 'globalUtils';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import
{
    Button,
    Card,
    CardContent,
    CardHeader,
    Grid,
    IconButton,
    Typography,
} from '@material-ui/core';
import
{
    AddShoppingCart,
    Cancel,
    KeyboardArrowRight,
    NotificationImportant,
    Star,
    StarBorder,
} from '@material-ui/icons';

import './style.scss';

class ProductCard extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    renderImage = () => (
        <div className="product-img text-xs-center mb-1">
            <NavLink to={this.props.url}>
                <img
                    src={dataChecking(this.props.product, 'image', 'small')}
                    alt="product_image"
                    width="100%"
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

        return (
            <Grid container={true} justify="center" className="product-feature">
                {
                    features.length > 0 &&
                    features.map((feature, key) => (
                        <Grid item={true} key={`${this.props.product.id}-${key}`}>
                            <img
                                src={feature.value}
                                alt="product_feature"
                                className="feature-tag"
                            />
                        </Grid>
                    ))
                }
                {
                    discount !== null &&
                    <Grid item={true} className="discount-tag">
                        <Typography variant="caption">{discount}</Typography>
                    </Grid>
                }
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
                <Typography variant="h6" style={{ paddingRight: `${discountText === null ? 0 : '10px'}`, fontWeight: 'bold' }}>
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
        <div className="product-brand pb-half">
            <NavLink to={dataChecking(this.props.product, 'brand', 'url')} style={{ textDecoration: 'none' }}>
                <Typography
                    color="primary"
                    variant="button"
                    style={{ fontWeight: 'bold' }}
                >
                    {dataChecking(this.props.product, 'brand', 'name')}
                </Typography>
                <IconButton size="small" style={{ padding: '0 0 2px 3px' }}>
                    <KeyboardArrowRight color="primary" />
                </IconButton>
            </NavLink>
        </div>
    )

    renderDescription = () => (
        <div>
            <Typography className="product-description mb-half">{this.props.product.display_name}</Typography>
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
                rateArr.push(<Star key={`${this.props.product.id}-${i}`} style={{ color: '#FFD700' }} />);
            } else {
                rateArr.push(<StarBorder key={`${this.props.product.id}-${i}`} style={{ color: '#FFD700' }} />);
            }
        }

        return (
            <div style={{ display: 'flex', flexDirection: 'row' }} className="product-rating">
                <div style={{ justifyContent: 'flex-start', display: 'flex', flexDirection: 'row' }}>
                    {rateArr}
                </div>
                <Typography variant="overline" style={{ marginLeft: 5, alignSelf: 'center' }}> ({count})</Typography>
            </div>
        );
    }

    render() {
        return (
            <Card className={`product-container ${this.props.disableElevation ? 'no-box-shadow' : ''}`}>
                <CardContent>
                    {
                        this.props.allowDelete &&
                        <CardHeader
                            action={
                                <IconButton
                                    onClick={() => this.props.allowDelete()}
                                    style={{ float: 'right', padding: 0 }}
                                >
                                    <Cancel />
                                </IconButton>
                            }
                            style={{ display: 'block' }}
                        />
                    }
                    {this.props.image && this.renderImage()}
                    {this.props.feature && this.renderFeature()}
                    {this.renderPrice()}
                    {this.renderBrand()}
                    {this.renderDescription()}
                    {this.props.rating && this.renderRating()}
                </CardContent>
                {
                    this.props.addToCart &&
                    <Button
                        variant="contained"
                        color={dataChecking(this.props.product, 'instock') ? 'secondary' : 'primary'}
                        fullWidth={true}
                        className="add-to-cart-button"
                        onClick={dataChecking(this.props.product, 'instock') ? () => this.props.addToCart() : () => this.props.notifyMe()}
                    >
                        {dataChecking(this.props.product, 'instock') ? <AddShoppingCart /> : <NotificationImportant />}
                        <Typography variant="overline" className="pl-1">
                            {dataChecking(this.props.product, 'instock') ? 'Add to cart' : 'Notify Me'}
                        </Typography>
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
