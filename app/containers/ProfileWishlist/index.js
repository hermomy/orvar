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
import { apiRequest, combineObject } from 'globalUtils';
import Async from 'assets/react-async';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import ProductCard from 'components/ProductCard';
import PageChanger from 'components/PageChanger';

import makeSelectProfileWishlist from './selectors';
import reducer from './reducer';
import saga from './saga';
import './style.scss';

const wishlistData = async (API) => {
    if (API.b.runpermit) {
        await apiRequest(API.b.URL, 'delete');
    }
    return apiRequest(API.a.URL, 'get');
};

export class ProfileWishlist extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    state = {
        page: 1,
        getProductURL: {
            URL: '/wishlist?page=1',
        },
        deleteProduct: {
            URL: '/wishlist/-1',
            runpermit: false,
        },
    }

    renderPageChanger = (data) => (
        <div>
            <PageChanger
                productData={data.data}
                pagenum={1}
                changePage={(link, pageNum) => {
                    this.setState({ getProductURL: { URL: `/wishlist?page=${pageNum}` } });
                }}
            />
        </div>
    );

    renderProductCard = (data) => {
        Object.assign(this.state.deleteProduct, { runpermit: false });
        return data.data.items.map((item, index) => (
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
                            this.setState({ deleteProduct: { URL: `/wishlist/${item.id}`, runpermit: true } });
                        }
                    }
                />
            </div>
        ));
    };

    render() {
        return (
            <Async promise={wishlistData(combineObject(this.state.getProductURL, this.state.deleteProduct))}>
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
