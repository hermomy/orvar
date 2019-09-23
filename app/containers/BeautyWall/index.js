/**
 *
 * BeautyWall
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

import makeSelectBeautyWall from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import './style.scss';

export class BeautyWall extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <div>
                <FormattedMessage {...messages.header} />
            </div>
        );
    }
}

BeautyWall.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    beautyWall: makeSelectBeautyWall(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'beautyWall', reducer });
const withSaga = injectSaga({ key: 'beautyWall', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(BeautyWall);
