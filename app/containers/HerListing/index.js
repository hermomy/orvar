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

import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { dataChecking } from 'globalUtils';
import makeSelectHerListing from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import './style.scss';
import { getData } from './actions';

export class HerListing extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    componentWillMount() {
        this.props.dispatch(getData());
        const data = dataChecking(this.props, 'mallpage', 'data', 'product', 'result');
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
                    {
                    dataChecking(this.props, 'herlisting', 'data', 'product', 'result', 'items') ?
                    this.props.herlisting.data.product.result.items.map((b) => (
                        (<p>{b.name}</p>)
                    )) : 'aaa'
                }
                </div>
            </div>
        );
    }
}

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
