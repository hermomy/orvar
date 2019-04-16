/**
 *
 * ProfileReview
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import makeSelectProfileReview from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import './style.scss';

export class ProfileReview extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <div>
                <Helmet>
                    <title>ProfileReview</title>
                    <meta name="description" content="Description of ProfileReview" />
                </Helmet>
                <FormattedMessage {...messages.header} />
            </div>
        );
    }
}

ProfileReview.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    profileReview: makeSelectProfileReview(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'profileReview', reducer });
const withSaga = injectSaga({ key: 'profileReview', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(ProfileReview);
