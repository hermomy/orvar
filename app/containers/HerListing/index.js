/**
 *
 * HerListing
 *
 */

import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import React from 'react';
import PropTypes from 'prop-types';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { dataChecking } from 'globalUtils';

import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import makeSelectHerListing from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import './style.scss';
import { getData,
         getPage,
} from './actions';
import NewPagination from '../../components/NewPagination';
// import ProductCard from '../../components/ProductCard';

export class HerListing extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    componentWillMount() {
        this.props.dispatch(getData());
    }

    Paging = () => {
        const data = dataChecking(this.props, 'herlisting', 'data', 'product', 'result');
        console.log(this.props);
        if (!data || !data._meta) {
            return <div style={{ backgroundColor: 'yellow' }}>nigga</div>;
        }
        return (
            <NewPagination
                dpatch={(page) => {
                    this.props.dispatch(getPage(page));
                }}
                meta={data._meta}
                link={data._links}
            />
        );
    }
    // prodPage = () => {
    //     dataChecking(this.props, 'herlisting', 'data', 'product', 'result', 'items') ?
    //         this.props.herlisting.data.product.result.items.map((product, index) =>
    //         {
    //             return (
    //                 <ProductCard
    //                     product={product}
    //                     index={index}
    //                 />
    //             );
    //         }
    //         )
    //     :
    // }

    render() {
        return (
            <div>
                <Helmet>
                    <title>HerListing</title>
                    <meta name="description" content="Description of HerListing" />
                </Helmet>
                <FormattedMessage {...messages.header} />
                <img alt="topPicture" />
                <div>
                    <p>xinshanlinzhixuan</p>
                    <p>ydsajondfsfdjjgjgjfjgjgjffdkfdkg</p>
                </div>
                <p><span className="foundItemNumber"></span>items found</p>
                <div className="itemList">
                    {this.Paging()}
                    {this.prodPage()}
                </div>
            </div>
        );
    }
}
// <i class="fa fa-heart-o" aria-hidden="true"></i>

HerListing.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    herlisting: makeSelectHerListing(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'herListing', reducer });
const withSaga = injectSaga({ key: 'herListing', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(HerListing);
