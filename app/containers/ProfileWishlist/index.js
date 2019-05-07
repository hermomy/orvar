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

export class ProfileWishlist extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    componentWillMount() {
        getApi('/wishlist?page=1', 'get').then((data) => this.setState({ wishlist: data, pageData: data }));
    }

    satate = {
        wishlist: null,
        page: 1,
        pageData: null,
    }

    renderPageChanger = () => (
        <PageChanger
            productData={this.state.pageData.data}
            pagenum={1}
            changePage={(link, pageNum) => {
                getApi(`/wishlist?page=${pageNum}`, 'get')
                .then((lalala) => this.setState({ wishlist: lalala, page: pageNum }));
            }}
        />
    );

    renderProductCard = () => (
        this.state.wishlist.data.items.map((item, index) => (
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
                            getApi(`/wishlist/${item.product.id}`, 'post')
                            .then((lalala) => this.setState({ wishlist: lalala }));
                        }
                    }
                />
            </div>
        ))
    );

    render() {
        return (
            <Async promise={getApi('/wishlist?page=1', 'get')}>
                <Async.Loading>Loading... Product Card</Async.Loading>
                <Async.Resolved>
                    {() => (
                        <div>
                            {this.renderPageChanger()}
                            <div className="grid-view">
                                {this.renderProductCard()}
                            </div>
                        </div>
                    )}
                </Async.Resolved>
                <Async.Rejected>
                    BBBB
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
