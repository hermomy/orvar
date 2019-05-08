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

const getApi = (path, type, body, baseUrl, headerParams) => apiRequest(path, type, body, baseUrl, headerParams);

const ProductCardApi = async (postpath, posttype, firsttimechecking, getpath, gettype) => {
    if (!firsttimechecking) {
        await apiRequest(postpath, posttype);
    }
    const data = await getApi(getpath, gettype);
    return data;
};

export class ProfileWishlist extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    state = {
        page: 1,
        deleteId: {
            id: -1,
            firsttime: true,
        },
    }

    renderPageChanger = (data) => (
        <PageChanger
            productData={data.data}
            pagenum={1}
            changePage={(link, pageNum) => {
                this.setState({ page: pageNum });
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
                            this.setState({ deleteId: { id: item.id, firsttime: false } });
                        }
                    }
                />
            </div>
        ))
    );

    render() {
        return (
            <div>
                <Async promise={getApi(`/wishlist?page=${this.state.page}`, 'get')}>
                    <Async.Loading>Loading... PageChanger</Async.Loading>
                    <Async.Resolved>
                        {(data) => (
                            <div>
                                {this.renderPageChanger(data)}
                            </div>
                        )}
                    </Async.Resolved>
                    <Async.Rejected>
                        Error PageChanger
                    </Async.Rejected>
                </Async>
                <Async promise={ProductCardApi(`/wishlist/${this.state.deleteId.id}`, 'delete', this.state.deleteId.firsttime, `/wishlist?page=${this.state.page}`, 'get')}>
                    <Async.Loading>Loading... ProductCard</Async.Loading>
                    <Async.Resolved>
                        {(data) => (
                            <div className="grid-view">
                                {this.renderProductCard(data)}
                            </div>
                        )}
                    </Async.Resolved>
                    <Async.Rejected>
                        Error ProductCard
                    </Async.Rejected>
                </Async>
            </div>
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
