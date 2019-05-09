/**
 *
 * ProductView
 *
 */
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import Slider from 'components/Slider';
import Accordion from 'components/Accordion';
import HashTag from 'components/HashTag';
import StatefulLink from 'components/StatefulLink';
import BreadCrumb from 'components/Breadcrumb';
import { dataChecking } from 'globalUtils';

import makeSelectProductView from './selectors';
import reducer from './reducer';
import saga from './saga';
import './style.scss';
import { getProductById, getProductReview, addToCart } from './actions';

export class ProductView extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

    componentWillMount() {
        const productId = dataChecking(this.props, 'match', 'params', 'productId');
        if (productId) {
            const id = _.split(productId, '-', 2)[0];
            this.props.dispatch(getProductById(id));
            this.props.dispatch(getProductReview(id));
        }
    }

    addToCart(id, param, qty, selections) {
        this.props.dispatch(addToCart({
            id, param, qty, selections,
        }));
    }

    buildRelatedItems(related) {
        if (related) {
            return (
                <div>

                </div>
            );
        }
        return (
            <i className="fas fa-spinner fa-2x fa-pulse"></i>
        );
    }

    buildFrequentlyBuy(frequently) {
        if (frequently) {
            return (
                <div>

                </div>
            );
        }
        return (
            <i className="fas fa-spinner fa-2x fa-pulse"></i>
        );
    }

    buildCustomerBought(bought) {
        if (bought) {
            return (
                <div>

                </div>
            );
        }
        return (
            <i className="fas fa-spinner fa-2x fa-pulse"></i>
        );
    }

    buildReview(reviews) {
        if (reviews) {
            return reviews.items.map((review) => (
                <div className="review" key={review.id}>
                    <div className="review-name">{review.username}</div>
                    <div>{review.rating} rating</div>
                    <div className="review-comment">{review.comment}</div>
                </div>
            ));
        }
        return (
            <i className="fas fa-spinner fa-2x fa-pulse"></i>
        );
    }

    buildMeta(meta) {
        if (meta) {
            return (
                <Helmet>
                    <title>{meta.title}</title>
                    <meta name="description" content={meta.description} />
                    <meta name="keywords" content={meta.keywords} />
                </Helmet>
            );
        }
        return null;
    }

    buildProduct(product) {
        if (product) {
            return (
                <div className="product-panel">
                    <div className="breadcrumb-panel">
                        <BreadCrumb paths={product.breadcrumbs} />
                    </div>
                    <div className="product-image-panel">
                        <img className="product-image" src={product.image.large} alt={product.extra_name} />
                    </div>
                    <div className="product-info-panel">
                        <div className="brand-info">
                            <img className="brand-logo" src={product.brand.logo} alt={product.brand.name} />
                            <div className="brand-rating">{product.review.count} reviews</div>
                        </div>
                        <div className="product-info">
                            <div className="price">{product.currency.symbol}{product.price.selling}</div >
                            <div className="brand">{product.brand.name}</div>
                            <div className="name">{product.name}</div>
                        </div>
                    </div>
                    <HashTag className="hashtags-panel" tags={product.hashtags} />
                    <div className="action-panel">
                        <div className="wishlist-btn">
                            <i className="far fa-heart" />
                        </div>
                        {
                            this.props.productview.adding ?
                                <div className="add-to-cart-button">
                                    Adding
                                </div>
                                :
                                <div onClick={() => this.addToCart(product.id)} className="add-to-cart-button">
                                    Add To Cart
                                </div>
                        }
                    </div>
                    <hr className="splitter" />
                </div>
            );
        }
        return (
            <i className="fas fa-spinner fa-pulse"></i>
        );
    }

    render() {
        if (dataChecking(this.props, 'productview', 'loading')) {
            return <h1>Loading</h1>;
        }

        const { product, reviews } = dataChecking(this.props, 'productview', 'data');
        if (!product) {
            return <h1>Product not found</h1>;
        }

        return (
            <div className="container">
                { this.buildMeta(product.meta) }
                { this.buildProduct(product) }

                <Accordion
                    className="accordion-panel"
                    active_icon={<i className="fas fa-minus"></i>}
                    inactive_icon={<i className="fas fa-plus"></i>}
                    height_threshold="220px"
                    contents={[
                        {
                            key: 'product-desc',
                            title: 'Production Information',
                            description: product.description,
                            togglable: true,
                        },
                        {
                            key: 'details-usage',
                            title: 'Details & Usage',
                            description: product.usage,
                            togglable: true,
                        },
                        {
                            key: 'delivery-info',
                            title: 'Delivery Info',
                            description: product.estimate_arrival,
                            togglable: true,
                        },
                        {
                            key: 'shop-more',
                            title: <StatefulLink className="accordion-title" state={product.brand} path={product.brand.url}>Shop More From {product.brand.name}</StatefulLink>,
                            togglable: false,
                        },
                    ]}
                />

                <div className="content-panel">
                    <hr className="splitter bold" />
                    <Slider
                        className="reviews-panel"
                        title="Top Reviews"
                        contents={this.buildReview(reviews)}
                    />

                    <hr className="splitter bold" />
                    <Slider
                        className="bought-together-panel"
                        title="Frequently Bought Together"
                        contents={this.buildFrequentlyBuy()}
                    />

                    <hr className="splitter bold" />
                    <Slider
                        className="related-items-panel"
                        title="Related to items you viewed"
                        contents={this.buildRelatedItems()}
                    />

                    <hr className="splitter bold" />
                    <Slider
                        className="customer-bought-panel"
                        title="Customers who bought this item also bought"
                        contents={this.buildCustomerBought()}
                    />
                </div>
            </div>
        );
    }
}

ProductView.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    productview: makeSelectProductView(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'productView', reducer });
const withSaga = injectSaga({ key: 'productView', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(ProductView);
