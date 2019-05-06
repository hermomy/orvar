/**
 *
 * ProfileWishlist
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { dataChecking, apiRequest } from 'globalUtils';
import Async from 'react-async';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import ProductCard from 'components/ProductCard';
import PageChanger from 'components/PageChanger';

import makeSelectProfileWishlist from './selectors';
import reducer from './reducer';
import saga from './saga';
import './style.scss';

const loadJson = (path, type, body, baseUrl, headerParams) => apiRequest(path, type, body, baseUrl, headerParams);

export class ProfileWishlist extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    renderPagination = (data) => (
        <PageChanger
            productData={data.data}
            pagenum={dataChecking(this.props, 'match', 'params', 'pageNum') ? this.props.match.params.pageNum : 1}
            changePage={(link, pageNum) => { loadJson(`/wishlist?page=${pageNum}`, 'get'); }}
        />
    )

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
                            loadJson(`/wishlist/${item.id}`, 'delete');
                        }
                    }
                />
            </div>
        ))
    );

    // promise can all
    render() {
        return (
            <Async promise={loadJson('/wishlist?page=1', 'get')}>
                <Async.Loading>Loading... Product Card</Async.Loading>
                <Async.Resolved>
                    {(data) => (
                        <div>
                            {this.renderPagination(data)}
                            <div className="grid-view">
                                {this.renderProductCard(data)}
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
    // dispatch: PropTypes.func.isRequired,
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
