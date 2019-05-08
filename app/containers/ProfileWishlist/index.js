/**
 *
 * ProfileWishlist
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { apiRequest } from 'globalUtils';
import Async from 'react-async';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import ProductCard from 'components/ProductCard';
import PageChanger from 'components/PageChanger';

import makeSelectProfileWishlist from './selectors';
import reducer from './reducer';
import saga from './saga';
import './style.scss';

const ProductCardApi = async (API) => {
    if (!API.deleteProduct.firsttime) {
        await apiRequest(API.deleteProduct.URL, API.deleteProduct.Method);
    }
    return apiRequest(API.getProduct.URL, API.getProduct.Method);
};

export class ProfileWishlist extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    state = {
        page: 1,
        API: {
            getProduct: {
                URL: '/wishlist?page=1',
                Method: 'get',
            },
            deleteProduct: {
                URL: '/wishlist/-1',
                Method: 'delete',
                firsttime: true,
            },
        },
    }

    renderPageChanger = (data) => (
        <PageChanger
            productData={data.data}
            pagenum={1}
            changePage={(link, pageNum) => {
                this.setState(Object.assign(this.state.API.getProduct, { URL: `/wishlist?page=${pageNum}` }));
            }}
        />
    );

    renderProductCard = (data) => (
        data.data.items.map((item, index) => (
            <div
                className="product-card-div"
                key={index}
            >
                <ProductCard
                    product={item.product}
                    review={false}
                    price={false}
                    url={item.product.brand.url}
                    listViewMode={true}
                    allowDelete={true}
                    allowWishlistButton={false}
                    deleteFromWishlist={
                        () => {
                            this.setState(
                                Object.assign(
                                    this.state.API.deleteProduct, {
                                        URL: `/wishlist/${item.id}`,
                                        firsttime: false,
                                    }
                                )
                            );
                        }
                    }
                />
            </div>
        ))
    );

    render() {
        return (
            <Async promise={ProductCardApi(this.state.API)}>
                <Async.Loading>Loading... ProductCard</Async.Loading>
                <Async.Resolved>
                    {(data) => (
                        <div>
                            {this.renderPageChanger(data)}
                            <div className="grid-view">
                                {this.renderProductCard(data)}
                            </div>
                        </div>
                    )}
                </Async.Resolved>
                <Async.Rejected>
                    { console.error }
                </Async.Rejected>
            </Async>
        );
    }
}

ProfileWishlist.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    profileWishlist: makeSelectProfileWishlist(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'profileWishlist', reducer });
const withSaga = injectSaga({ key: 'profileWishlist', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(ProfileWishlist);
