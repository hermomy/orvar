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
import Pagination from '../../components/Pagination';
import ProductCard from '../../components/ProductCard';

export class HerListing extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    componentWillMount() {
        this.props.dispatch(getData());
    }

    Paging = () => {
        const data = dataChecking(this.props, 'herlisting', 'data', 'product', 'result');
        if (!data || !data._meta) {
            return null;
        }
        return (
            <Pagination
                dpatch={(page) => {
                    this.props.dispatch(getPage(page));
                }}
                meta={data._meta}
                link={data._links}
            />
        );
    }

    render() {
        console.log(this.props);
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
                    {
                        dataChecking(this.props, 'herlisting', 'data', 'product', 'result', 'items') ?
                        this.props.herlisting.data.product.result.items.map((product, index) =>
                            (<ProductCard
                                product={product}
                                index={index}
                            />)
                        ) : null
                    }
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
