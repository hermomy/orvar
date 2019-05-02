/**
 *
 * MaterialUiTesting
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Button from '@material-ui/core/Button';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { withStyles } from '@material-ui/core';
import styles from './ui';

import makeSelectMaterialUiTesting from './selectors';
import reducer from './reducer';
import saga from './saga';
import './style.scss';

export class MaterialUiTesting extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    render() {
        console.log(this.props);
        return (
            <div>
                <Button>1ST</Button>
                <Button>2ND</Button>
                <Button className={this.props.classes.btn}>3RD</Button>
            </div>
        );
    }
}

MaterialUiTesting.propTypes = {
    // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    materialUiTesting: makeSelectMaterialUiTesting(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'materialUiTesting', reducer });
const withSaga = injectSaga({ key: 'materialUiTesting', saga });

export default compose(
    withRouter,
    withReducer,
    withSaga,
    withConnect,
    withStyles(styles),
)(MaterialUiTesting);
