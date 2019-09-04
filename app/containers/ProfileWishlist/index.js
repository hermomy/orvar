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
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    Grid,
    IconButton,
    Toolbar,
    Typography,
} from '@material-ui/core';

import {
    AddCircleOutline,
    ChevronLeft,
    Close,
    ExpandMore,
    RemoveCircleOutline,
} from '@material-ui/icons';

import makeSelectProfileWishlist from './selectors';
import * as actions from './actions';
import reducer from './reducer';
import saga from './saga';
import './style.scss';

export class ProfileWishlist extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    state = {
        popup: false,
        addToCartPopup: false,
        orderID: null,

        isExpanded: false,
        selection: [],
        selectionName: [],
        quantity: 1,
    }

    componentWillMount() {
        this.props.dispatch(actions.getWishlist());
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.profileWishlist.notification !== nextProps.profileWishlist.notification) {
            if (nextProps.profileWishlist.notification.type === 'fail' || nextProps.profileWishlist.notification.type === 'error') {
                notifyError(nextProps.profileWishlist.notification.message);
            } else {
                this.onCloseModal();
                notifySuccess(nextProps.profileWishlist.notification.message);
                if (nextProps.profileWishlist.notification.category === 'deleteItem') {
                    this.props.dispatch(actions.getWishlist());
                }
            }
        }
    }

    onSelectionChange = (dropdownIndex, item) => {
        const selected = { ...this.state.selection };
        selected[dropdownIndex] = item.id;

        const selectedName = { ...this.state.selectionName };
        selectedName[dropdownIndex] = item.name;

        this.setState({ selection: selected, selectionName: selectedName, isExpanded: 1 });
    }

    onCloseModal = () => {
        setTimeout(() => {
            this.setState({ addToCartPopup: !this.state.addToCartPopup, selectionName: [], selection: [], isExpanded: false, quantity: 1 });
        }, 100);
    }

    renderDialogContent = () => {
        const product = dataChecking(this.props.profileWishlist, 'productData');

        switch (this.state.dialogType) {
            case 'remove_item':
                return (
                    <form style={{ textAlign: 'center', padding: 20 }}>
                        <Typography display="block" className="mb-2">Confirm remove this wishlist item?</Typography>
                        <Grid container={true} justify="center" spacing={2}>
                            <Grid item={true}>
                                <Button
                                    variant="outlined"
                                    onClick={() => {
                                        this.setState({ popup: false });
                                    }}
                                    style={{ width: 100 }}
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
                                    style={{ width: 100 }}
                                >
                                    CONFIRM
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                );
            case 'add_to_cart':
                if (!product) {
                    return null;
                }

                return (
                    <form>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <div style={{ flex: 3, textAlign: 'center', minHeight: '0 !important' }}>
                                <img
                                    src={dataChecking(product, 'image', 'small')}
                                    alt="product_image"
                                    className="add-to-cart-image"
                                />
                            </div>
                            <div style={{ flex: 7 }}>
                                <ProductCard
                                    product={product}
                                    url={product.url}
                                    disableElevation={true}
                                />
                            </div>
                        </div>
                        {
                            product.selections.length > 0 &&
                                product.selections.map((selection, sIndex) => (
                                    <div key={sIndex} style={{ maxHeight: 200, overflow: 'scroll' }}>
                                        <ExpansionPanel
                                            expanded={this.state.isExpanded === sIndex}
                                            onChange={(event, expanded) => {
                                                this.setState({ isExpanded: expanded ? sIndex : false });
                                            }}
                                            style={{ boxShadow: 'none' }}
                                        >
                                            <ExpansionPanelSummary expandIcon={<ExpandMore />}>
                                                {
                                                    this.state.selectionName[sIndex] ?
                                                        <Typography color="secondary">{this.state.selectionName[sIndex]}</Typography>
                                                        :
                                                        <Typography>Please select <span style={{ color: '#FF4081' }}>*</span></Typography>
                                                }
                                            </ExpansionPanelSummary>
                                            <ExpansionPanelDetails>
                                                <div>
                                                    {
                                                        selection.map((item, iIndex) => (
                                                            <Button
                                                                key={iIndex}
                                                                onClick={() => {
                                                                    this.onSelectionChange(sIndex, item);
                                                                    this.setState({ isExpanded: false });
                                                                    setTimeout(() => {
                                                                        this.setState({ isExpanded: sIndex + 1 });
                                                                    }, 100);
                                                                }}
                                                                disabled={!item.instock}
                                                                style={{
                                                                    border: this.state.selection[sIndex] === item.id ? '1px solid #FF4081' : '',
                                                                    color: this.state.selection[sIndex] === item.id ? '#FF4081' : '',
                                                                }}
                                                            >
                                                                {item.name}
                                                            </Button>
                                                        ))
                                                    }
                                                </div>
                                            </ExpansionPanelDetails>
                                        </ExpansionPanel>
                                        <Divider />
                                    </div>
                                ))
                        }
                        {
                            product.selections.length === 0 && <Divider />
                        }
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '0 24px', margin: '12px 0' }}>
                            <div>
                                <Typography>Quantity <span style={{ color: '#FF4081' }}>*</span></Typography>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <div>
                                    <IconButton
                                        size="small"
                                        onClick={() => {
                                            this.setState({ quantity: this.state.quantity - 1 });
                                        }}
                                        disabled={this.state.quantity === 1}
                                    >
                                        <RemoveCircleOutline />
                                    </IconButton>
                                </div>
                                <div style={{ alignSelf: 'center' }}>
                                    <Typography style={{ padding: '0 10px' }}>{this.state.quantity}</Typography>
                                </div>
                                <div>
                                    <IconButton
                                        size="small"
                                        color="secondary"
                                        onClick={() => {
                                            this.setState({ quantity: this.state.quantity + 1 });
                                        }}
                                    >
                                        <AddCircleOutline />
                                    </IconButton>
                                </div>
                            </div>
                        </div>
                    </form>
                );
            default:
                break;
        }

        return null;
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
                                        image={true}
                                        feature={true}
                                        rating={true}
                                        allowDelete={() => {
                                            this.setState({ popup: !this.state.popup, orderID: item.id, dialogType: 'remove_item' });
                                        }}
                                        addToCart={() => {
                                            this.setState({ addToCartPopup: !this.state.addToCartPopup, dialogType: 'add_to_cart' });
                                            this.props.dispatch(actions.getProductData({
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
        const product = dataChecking(this.props.profileWishlist, 'productData');

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
                                    <div className="wishlist-quantity">
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
                        this.setState({ popup: false, quantity: 1 });
                    }}
                >
                    {this.renderDialogContent()}
                </PopupDialog>
                {
                    this.state.dialogType === 'add_to_cart' && product &&
                        <Dialog open={this.state.addToCartPopup}>
                            <DialogTitle>
                                <IconButton
                                    onClick={() => this.onCloseModal()}
                                    style={{
                                        position: 'absolute',
                                        right: '0rem',
                                        top: '0.8rem',
                                    }}
                                >
                                    <Close />
                                </IconButton>
                            </DialogTitle>
                            <DialogContent className="add-to-cart-content">
                                {this.renderDialogContent()}
                            </DialogContent>
                            <Button
                                variant="contained"
                                color="secondary"
                                style={{ borderRadius: 2, height: 40 }}
                                fullWidth={true}
                                onClick={() => {
                                    this.props.dispatch(actions.addToCart({
                                        orderID: product.id,
                                        urlParam: 'mall',
                                        quantity: this.state.quantity,
                                        selections: this.state.selection,
                                        successCallback: () => this.onCloseModal(),
                                    }));
                                }}
                            >
                                <Typography variant="overline">Confirm</Typography>
                            </Button>
                        </Dialog>
                }
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
