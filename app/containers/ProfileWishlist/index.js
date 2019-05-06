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
// import { getWishlist, deleteWishlist } from './actions';
import './style.scss';

const loadJson = (path, type, body, baseUrl, headerParams) => apiRequest(path, type, body, baseUrl, headerParams);

export class ProfileWishlist extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    state = {
        wishlist: null,
    }

    renderPagination = () => {
        if (!dataChecking(this.props, 'profileWishlist', 'data')) {
            return null;
        }
        return (
            <PageChanger
                productData={this.state.wishlist}
                pagenum={dataChecking(this.props, 'match', 'params', 'pageNum') ? this.props.match.params.pageNum : 1}
                changePage={(link, pageNum) => { loadJson(`/wishlist?page=${pageNum}`, 'get'); }}
            />
        );
    }

    renderProductCard = () => (
        <Async promise={loadJson('/wishlist?page=1', 'get')}>
            <Async.Loading>Loading...</Async.Loading>
            <Async.Resolved>
                {
                    (data) => data.data.items.map((item, index) => (
                        <div
                            className="product-card-div"
                            key={index}
                        >
                            <ProductCard
                                product={item.product}
                                review={false}
                                // price={false}
                                url={item.product.brand.url}
                                listViewMode={true}
                                allowDelete={true}
                                allowWishlistButton={false}
                                // deleteFromWishlist={() => { this.props.dispatch(deleteWishlist(item.id)); }}
                            />
                        </div>
                    ))
                }
                {
                    (data) => this.setState({ wishlist: data })
                }
            </Async.Resolved>
            <Async.Rejected>
                BBBB
            </Async.Rejected>
        </Async>
    );

    render() {
        return (
            <div>
                {this.renderPagination()}
                <div className="grid-view">
                    {this.renderProductCard()}
                </div>
            </div>
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
