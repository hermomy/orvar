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
import { withStyles, Typography } from '@material-ui/core';
import styles from './ui';

import makeSelectMaterialUiTesting from './selectors';
import reducer from './reducer';
import saga from './saga';
import './style.scss';

const internalstyle = {
    background: 'linear-gradient(45deg, #bcd999 30%, #125538 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 80,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
};
// ---------------------
const styledBy = (property, mapping) => (props) => mapping[props[property]];

const StyledButton = withStyles({
    root: {
        background: styledBy('color', {
            blue: 'linear-gradient(45deg, #FCCC 30%, #FF8C 90%)',
            primary: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        }),
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
})(({ classes, color, ...other }) => <Button className={classes.root} {...other} />);

export class MaterialUiTesting extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    render() {
        console.log(this.props);
        return (
            <div>
                <Button>1ST</Button>
                <Button color="primary">2ND</Button>
                <Button><Typography variant="h3" color="error">3RD</Typography></Button>
                <Button style={internalstyle}>4RD</Button>
                <Button className={this.props.classes.btn}>5RD</Button>
                <Button
                    disabled={true}
                    classes={{
                        root: this.props.classes.dollarrule, // class name, e.g. `root-x`
                        disabled: this.props.classes.disabled, // class name, e.g. `disabled-x`
                    }}
                >
                    6RD
                </Button>
                <Button
                    disabled={true}
                    classes={{
                        root: this.props.classes.btn, // class name, e.g. `root-x`
                        disabled: this.props.classes.disabled, // class name, e.g. `disabled-x`
                    }}
                >
                    7ND
                </Button>
                <StyledButton color="primary">8ND</StyledButton>
                <div>
                    <span>leee</span>
                </div>
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
