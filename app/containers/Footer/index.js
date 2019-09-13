/**
 *
 * Footer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import makeSelectFooter from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import './style.scss';

export class Footer extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <div>
                <FormattedMessage {...messages.header} />
            </div>
        );
    }
}

Footer.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    footer: makeSelectFooter(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'footer', reducer });
const withSaga = injectSaga({ key: 'footer', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(Footer);
