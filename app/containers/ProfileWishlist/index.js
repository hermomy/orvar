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
import { dataChecking } from 'globalUtils';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import ProductCard from 'components/ProductCard';
import Pagination from 'components/Pagination';

import makeSelectProfileWishlist from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getWishlist, deleteWishlist } from './actions';
import './style.scss';

export class ProfileWishlist extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    componentWillMount() {
        this.props.dispatch(getWishlist());
    }

    renderPagination = () => {
        if (!dataChecking(this.props, 'profileWishlist', 'data')) {
            return null;
        }
        return (
            <Pagination
                parentProps={this.props}
                meta={this.props.profileWishlist.data._meta}
                link={this.props.profileWishlist.data._links}
                goToPage={1}
                isHerlisting={false}
                callBack={(targetpage) => { this.props.dispatch(getWishlist(targetpage)); }}
            />
        );
    }

    renderProductCard = () => {
        if (!dataChecking(this.props, 'profileWishlist', 'data', 'items')) {
            return null;
        }
        return this.props.profileWishlist.data.items.map((item, index) => (
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
                    deleteFromWishlist={() => { this.props.dispatch(deleteWishlist(item.id)); }}
                />
            </div>
        ));
    }

    render() {
        console.log(this.props);
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
