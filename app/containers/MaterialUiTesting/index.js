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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Switch from '@material-ui/core/Switch';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import styles from './ui';

import makeSelectMaterialUiTesting from './selectors';
import reducer from './reducer';
import saga from './saga';
import './style.scss';

const internalstyle = {
    background: 'linear-gradient(to right, rgb(179, 255, 171), rgb(18, 255, 247))',
    borderRadius: 5,
    border: 0,
    color: 'green',
    height: 50,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
};
// ---------------------
const StyledButton = withStyles({
    root: {
        background: 'linear-gradient(to right, rgb(179, 255, 171), rgb(18, 255, 247))',
        borderRadius: 5,
        border: 0,
        color: 'white',
        height: 50,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
})(({ classes, color, ...other }) => <Button className={classes.root} {...other} />);

export class MaterialUiTesting extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    state = {
        variant: 'headline',
        clicked: false,
        checked: true,
        dialog: false,
        snackbar: false,
    };

    renderDialog = () => (
        <Dialog
            open={this.state.dialog}
            onClose={() => this.setState({ dialog: !this.state.dialog })}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To subscribe to this website, please enter your email address here. We will send
                    updates occasionally.
                </DialogContentText>
                <TextField
                    autoFocus={true}
                    margin="dense"
                    id="name"
                    label="Email Address"
                    type="email"
                    fullWidth={true}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => this.setState({ dialog: false })} color="secondary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );

    renderSnackbar = () => (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={this.state.snackbar}
            autoHideDuration={6000}
            onClose={() => this.setState({ snackbar: !this.state.snackbar })}
            message={<span id="message-id">I am snackbar</span>}
            action={[
                <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    onClick={() => this.setState({ snackbar: !this.state.snackbar })}
                >
                    <CloseIcon />
                </IconButton>,
            ]}
        />
    );

    render() {
        console.log(this.props);
        return (
            <div>
                <List>
                    <ListItem>
                        <Button onClick={() => this.setState({ variant: this.state.variant === 'headline' ? 'subheading' : 'headline' })}>1ST</Button>
                        <Typography variant={this.state.variant}>Follow theme</Typography>
                    </ListItem>
                    <ListItem>
                        <Button color="primary" onClick={() => this.setState({ dialog: !this.state.dialog })}>2ND</Button>
                        <Typography >Follow palette primary</Typography>
                    </ListItem>
                    <ListItem>
                        <Button><Typography variant="h4" color="error" onClick={() => this.setState({ snackbar: !this.state.snackbar })}>3RD</Typography></Button>
                        <Typography>Follow palette error color</Typography>
                    </ListItem>
                    <ListItem>
                        <Button style={internalstyle}>4RD</Button>
                        <Typography>Follow internal style</Typography>
                    </ListItem>
                    <ListItem>
                        <Button className={this.props.classes.btntrue}>5RD</Button>
                        <Typography>Follow other page style</Typography>
                    </ListItem>
                    <ListItem>
                        <Button
                            disabled={true}
                            classes={{
                                root: this.props.classes.dollarrule, // class name, e.g. `root-x`
                                disabled: this.props.classes.disabled, // class name, e.g. `disabled-x`
                            }}
                        >
                        6RD
                        </Button>
                        <Typography>Follow other page style(but will use style inside classes to override default one)</Typography>
                    </ListItem>
                    <ListItem>
                        <StyledButton color="primary">7ND</StyledButton>
                        <Typography>Follow internal style(using withStyles)</Typography>
                    </ListItem>
                    <ListItem>
                        <Button
                            className={`${this.state.clicked ? this.props.classes.btntrue : this.props.classes.btnfalse}`}
                            onClick={() => this.setState({ clicked: !this.state.clicked })}
                        >
                            8ND
                        </Button>
                        <Typography>click me!</Typography>
                    </ListItem>
                    <ListItem>
                        <Button onClick={() => this.setState({ clicked: !this.state.clicked })}>9ND</Button>
                        <Typography>Click me to change color</Typography>
                    </ListItem>
                    <ListItem>
                        <Switch
                            defaultChecked={this.state.checked}
                            onChange={(event) => this.setState({ clicked: event.target.checked })}
                            value={this.state.checked}
                            classes={{
                                switchBase: this.props.classes.colorSwitchBase,
                                checked: this.props.classes.colorChecked,
                                bar: this.props.classes.colorBar,
                            }}
                        />
                        <Typography>Click me to change color</Typography>
                    </ListItem>
                </List>
                {this.renderDialog()}
                {this.renderSnackbar()}
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
