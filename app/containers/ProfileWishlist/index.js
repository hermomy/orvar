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

const getApi = (path, type, body, baseUrl, headerParams) => apiRequest(path, type, body, baseUrl, headerParams);

const getProductCard = async (path, type, body, baseUrl, headerParams) => {
    const data = apiRequest(path, type, body, baseUrl, headerParams);
    return data;
};

const MainUI = () => (
    <Async promise={getApi('/wishlist?page=1', 'get')}>
        <Async.Loading>Loading... Product Card</Async.Loading>
        <Async.Resolved>
            {(data) => (
                <div>
                    {renderPageChanger(data)}
                    <div className="grid-view">
                        {renderProductCard(data)}
                    </div>
                </div>
            )}
        </Async.Resolved>
        <Async.Rejected>
            BBBB
        </Async.Rejected>
    </Async>
);

const renderPageChanger = (data) => (
    <PageChanger
        productData={data.data}
        pagenum={dataChecking(this.props, 'match', 'params', 'pageNum') ? this.props.match.params.pageNum : 1}
        changePage={(link, pageNum) => {
            getApi(`/wishlist?page=${pageNum}`, 'get')
            .then((lalala) => renderProductCard(lalala));
        }}
    />
);

const renderProductCard = (data) => (
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
                        renderProductCard(getProductCard(`/wishlist/${item.id}`, 'delete'));
                    }
                }
            />
        </div>
    ))
);

export class ProfileWishlist extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <MainUI />
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
