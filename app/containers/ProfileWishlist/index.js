/**
 *
 * ProfileWishlist
 *
 */

import React from 'react';
import { dataChecking } from 'globalUtils';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { NavLink } from 'react-router-dom';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { notifySuccess, notifyError } from 'containers/Notify';

import PopupDialog from 'components/PopupDialog';
import ProductCard from 'components/ProductCard';

import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    Grid,
    IconButton,
    Toolbar,
    Typography,
} from '@material-ui/core';

import {
    ChevronLeft,
} from '@material-ui/icons';

import makeSelectProfileWishlist from './selectors';
import * as actions from './actions';
import reducer from './reducer';
import saga from './saga';
import './style.scss';

export class ProfileWishlist extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    state = {
        popup: false,
        orderID: null,
    }

    componentWillMount() {
        this.props.dispatch(actions.getWishlist());
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.profileWishlist.notification !== nextProps.profileWishlist.notification) {
            if (nextProps.profileWishlist.notification.type === 'fail' || nextProps.profileWishlist.notification.type === 'error') {
                notifyError(nextProps.profileWishlist.notification.message);
            } else {
                notifySuccess(nextProps.profileWishlist.notification.message);

                if (nextProps.profileWishlist.notification.category === 'deleteItem') {
                    this.props.dispatch(actions.getWishlist());
                }
            }
        }
    }

    renderProductCard = () => {
        if (!this.props.profileWishlist.wishlist) {
            return null;
        }

        return (
            <Container>
                <Typography variant="h6">My Wishlist</Typography>
                <Grid container={true} spacing={2}>
                    {
                        dataChecking(this.props.profileWishlist, 'wishlist') &&
                            this.props.profileWishlist.wishlist.map((item, index) => (
                                <Grid key={index} item={true} xs={6} md={3}>
                                    <ProductCard
                                        product={item.product}
                                        url={item.product.url}
                                        removeFromWishlist={() => {
                                            this.setState({ popup: !this.state.popup, orderID: item.id });
                                        }}
                                        addToCart={() => {
                                            this.props.dispatch(actions.addToCart({
                                                orderID: item.product.id,
                                            }));
                                        }}
                                    />
                                </Grid>
                            ))
                    }
                </Grid>
            </Container>
        );
    };

    render() {
        return (
            <div>
                {
                    this.props.profileWishlist.loading ?
                        <div style={{ textAlign: 'center' }}><CircularProgress /></div>
                        :
                        <div>
                            <AppBar color="default" position="static" style={{ marginBottom: 15 }}>
                                <Toolbar>
                                    <NavLink to="/profile">
                                        <IconButton edge="start">
                                            <ChevronLeft fontSize="large" />
                                        </IconButton>
                                    </NavLink>
                                    <Typography color="primary">Wishlist</Typography>
                                    <div style={{ backgroundColor: '#FF4081', width: 20, height: 20, marginLeft: 10, textAlign: 'center', borderRadius: 5 }}>
                                        <Typography style={{ color: '#FFFFFF' }}>{dataChecking(this.props.profileWishlist, 'wishlist', 'length')}</Typography>
                                    </div>
                                </Toolbar>
                            </AppBar>
                            {this.renderProductCard()}
                        </div>
                }
                <PopupDialog
                    display={this.state.popup}
                    onClose={() => {
                        this.setState({ popup: false });
                    }}
                >
                    <form style={{ textAlign: 'center', padding: 50 }}>
                        <Typography variant="h6" display="block" className="mb-2">Confirm remove this wishlist item?</Typography>
                        <Grid container={true} justify="center" spacing={2}>
                            <Grid item={true}>
                                <Button
                                    variant="outlined"
                                    onClick={() => {
                                        this.setState({ popup: false });
                                    }}
                                    style={{ width: 130 }}
                                >
                                    CANCEL
                                </Button>
                            </Grid>
                            <Grid item={true}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => {
                                        this.props.dispatch(actions.deleteWishlistItem({
                                            orderID: this.state.orderID,
                                            successCallback: setTimeout(() => this.setState({ popup: false })),
                                        }));
                                    }}
                                    style={{ width: 130 }}
                                >
                                    CONFIRM
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </PopupDialog>
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
