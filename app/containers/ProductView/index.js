/**
 *
 * ProductView
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import Accordion from 'components/Accordion';
import HashTag from 'components/HashTag';
import { dataChecking } from 'globalUtils';

import makeSelectProductView from './selectors';
import reducer from './reducer';
import saga from './saga';
import './style.scss';
import { getProduct, getProductById } from './actions';

export class ProductView extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

    componentWillMount() {
        const product = dataChecking(this.props, 'location', 'state');
        if (product) {
            this.props.dispatch(getProduct(product._links.self.href));
        } else {
            const productId = dataChecking(this.props, 'match', 'params', 'productId');
            if (productId) {
                this.props.dispatch(getProductById(productId));
            }
        }
    }

    render() {
        if (dataChecking(this.props, 'productview', 'loading')) {
            return <h1>Loading</h1>;
        }

        const product = dataChecking(this.props, 'productview', 'data') || dataChecking(this.props, 'location', 'state');
        if (!product) {
            return <h1>Product not found</h1>;
        }
        return (
            <div>
                <div className="product-image-panel">
                    <img className="product-image" src={product.image.large} alt={product.extra_name} />
                </div>
                <div className="product-info-panel">
                    <div className="brand-info">
                        <img className="brand-logo" src={product.brand.logo} alt={product.brand.name} />
                        <div className="review">{product.review.count} reviews</div>
                    </div>
                    <div className="product-info">
                        <div className="price">{product.currency.symbol}{product.price.selling}</div >
                        <div className="brand">{product.brand.name}</div>
                        <div className="name">{product.name}</div>
                    </div>
                </div>
                <div className="hashtags-panel">
                    <HashTag className="hashtags" tags={product.hashtags || []} />
                </div>
                <hr className="splitter" />
                <div className="related-items-panel">
                    <div className="slider">
                        <div className="slide">ABC</div>
                        <div className="slide">ABC</div>
                        <div className="slide">ABC</div>
                        <div className="slide">ABC</div>
                    </div>
                </div>
                <hr className="splitter bold" />
                <Accordion
                    className="accordion-panel"
                    height_threshold="162px"
                    contents={[
                        {
                            key: 'product-desc',
                            title: 'Production Information',
                            description: product.description,
                        },
                        {
                            key: 'details-usage',
                            title: 'Details & Usage',
                            description: product.usage,
                        },
                    ]}
                />
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
