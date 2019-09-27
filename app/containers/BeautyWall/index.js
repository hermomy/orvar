/**
 *
 * BeautyWall
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import InfiniteScroll from 'react-infinite-scroller';
import { dataChecking } from 'globalUtils';
import {
    Button,
    Card,
    CardActionArea,
    CardContent,
    CardHeader,
    Container,
    Divider,
    FormControl,
    Grid,
    Hidden,
    IconButton,
    InputLabel,
    OutlinedInput,
    Select,
    Typography,
} from '@material-ui/core';
import {
    Favorite,
} from '@material-ui/icons';
import globalScope from 'globalScope';
import { NavLink } from 'react-router-dom';
import InputForm from 'components/InputForm';
import PopupDialog from 'components/PopupDialog';
import {
    getReview,
    getReviewDetails,
    getOrder,
    postLike,
    postShowOff,
} from './actions';
import makeSelectBeautyWall from './selectors';
import reducer from './reducer';
import saga from './saga';
import './style.scss';

export class BeautyWall extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            reviews: [],
            comment: '',
            order_id: '',
            image: null,
            nextHref: null,
            hasMoreItems: true,
            popup: false,
        };
    }
    componentDidMount() {
        this.props.dispatch(getReview());
        this.props.dispatch(getOrder());
    }

    componentWillReceiveProps(nextProps) {
        if (dataChecking(nextProps, 'beautyWall', 'data', 'items') && nextProps.beautyWall.data !== this.props.beautyWall.data) {
            const reviews = [...this.state.reviews];
            nextProps.beautyWall.data.items.map((review) => {
                reviews.push(review);
                return null;
            });
            if (nextProps.beautyWall.data._links.next.href) {
                this.setState({ reviews, hasMoreItems: true, nextHref: nextProps.beautyWall.data._links.next.href });
            } else {
                this.setState({ reviews });
            }
        }
        if (globalScope.token && dataChecking(nextProps, 'beautyWall', 'order', 'data') && nextProps.beautyWall.order.data !== this.props.beautyWall.order.data) {
            if (nextProps.beautyWall.order.data.items.length !== 0) {
                this.setState({ order_id: nextProps.beautyWall.order.data.items[0].id });
            }
        }
        if (nextProps.beautyWall.showOff.success !== this.props.beautyWall.showOff.success) {
            this.props.dispatch(getOrder());
            this.onClose();
        }
    }
    /**
     *  onClick action to handle popup
     */
    onActionButtonClick = (type) => {
        let dialogTitle = null;
        switch (type) {
            case 'show_off':
                dialogTitle = 'Show Off Your Purchase!';
                this.setState({ popup: !this.state.popup });
                break;
            case 'review':
                dialogTitle = '';
                this.setState({ popup: !this.state.popup });
                break;
            default:
                break;
        }
        this.setState({
            dialogTitle,
            dialogType: type,
        });
    }
    onClose = () => {
        this.setState({
            popup: false,
            comment: '',
            order_id: '',
            image: '',
        });
    }
    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    };
    handleSubmit = (event) => {
        const showOffData = {
            comment: this.state.comment,
            order_id: this.state.order_id,
            image: this.state.image,
        };
        this.props.dispatch(postShowOff(showOffData));
        event.preventDefault();
    }
    /**
     *  fetch api for infinite loop
     */
    loadItems = () => {
        let url = '/beauty-wall';
        if (this.state.nextHref) {
            url = this.state.nextHref;
        }
        this.props.dispatch(getReview(url));
        this.setState({ hasMoreItems: false });
    }

    renderShowOff = () => {
        const order = dataChecking(this.props, 'beautyWall', 'order', 'success') && this.props.beautyWall.order;
        const orderList = dataChecking(this.props, 'beautyWall', 'order', 'success') && dataChecking(order, 'data', 'items').map((item) => (
            <option key={item.id} value={item.id}>
                {item.number}
            </option>
        ));
        if (globalScope.token) {
            return (
                <form onSubmit={this.handleSubmit}>
                    <Typography variant="caption">At least one order must be created before writing a review.</Typography>
                    <InputLabel className="text-capitalize pb-half">Choose an order to show off. <NavLink to="/profile/order">See All Orders</NavLink></InputLabel>
                    <FormControl variant="outlined" fullWidth={true}>
                        <Select
                            native={true}
                            id="order_id"
                            value={this.state.order_id}
                            onChange={this.handleChange}
                            input={
                                <OutlinedInput />
                            }
                            required={true}
                        >
                            {orderList}
                        </Select>
                    </FormControl>
                    <InputLabel className="text-capitalize pb-half">Upload an image of the package we sent.</InputLabel>
                    <FormControl fullWidth={true}>
                        <div className="image-review-uploader files">
                            <input
                                id="image"
                                accept="image/*"
                                type="file"
                                required={true}
                                className="form-control"
                                onChange={(event) => {
                                    const file = event.target.files[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.readAsDataURL(file);
                                        reader.onload = () => {
                                            const result = reader.result;
                                            const fileString = (result.split(';base64,')[1]) || null;
                                            this.setState({ image: fileString });
                                        };
                                        reader.onerror = (error) => {
                                            console.log('Error: ', error);
                                        };
                                    }
                                }}
                            />
                        </div>
                    </FormControl>
                    <InputLabel className="text-capitalize pb-half">What do you think of the package?</InputLabel>
                    <FormControl fullWidth={true}>
                        <InputForm
                            id="comment"
                            type="text"
                            multiline={true}
                            onClear={() => {
                                this.setState({ comment: '' });
                            }}
                            value={this.state.comment}
                            handleChange={this.handleChange}
                        />
                    </FormControl>
                    <FormControl fullWidth={true} className="py-1">
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Submit My Review
                        </Button>
                    </FormControl>
                </form>
            );
        }
        return null;
    }
    /**
     *  POPUP
     *  NEED EDIT ON DATA HANDLING AND SUBMISSION
     */
    renderDialogContent = () => {
        switch (this.state.dialogType) {
            case 'show_off':
                return (
                    <div>
                        {dataChecking(this.props, 'beautyWall', 'order', 'success') && dataChecking(this.props, 'beautyWall', 'order', 'data', 'items') && this.renderShowOff()}
                    </div>
                );
            case 'review':
                if (dataChecking(this.props, 'beautyWall', 'reviewDetails', 'data')) {
                    const reviewDetails = dataChecking(this.props, 'beautyWall', 'reviewDetails', 'data');
                    return (
                        <div>
                            <img src={dataChecking(reviewDetails, 'image', 'square') || null} alt="product review" />
                            <Typography>{reviewDetails.username}</Typography>
                            <IconButton style={{ alignItem: 'right' }} onClick={() => this.props.dispatch(postLike(reviewDetails.id))}>
                                <Favorite />
                            </IconButton>
                            <Typography>{reviewDetails.created_at}</Typography>
                            <Typography>{reviewDetails.created_text}</Typography>
                            <Typography>{reviewDetails.comment}</Typography>
                            <Divider />
                            <Typography>{reviewDetails.username} has bought these products:</Typography>
                            {
                                reviewDetails.products.map((product) => (
                                    <NavLink key={product.id} to={product.url}>
                                        <img src={dataChecking(product, 'image', 'small') || null} alt="product" />
                                    </NavLink>
                                ))
                            }
                            {
                                reviewDetails.hashtags.map((hashtag) => (
                                    <NavLink key={hashtag.id} to={hashtag.url}>
                                        <Typography>#{hashtag.name}</Typography>
                                    </NavLink>
                                ))
                            }
                        </div>
                    );
                }
                break;
            default:
                break;
        }
        return null;
    }

    /**
     *  BEAUTYWALL BANNER - display image banner
     */
    renderBeautyWallBanner = () => {
        if (!dataChecking(this.props, 'beautyWall', 'data', 'banner')) {
            return null;
        }

        return (
            <div className="div wall-beauty-top-banner">
                <Hidden className="wall-beauty-banner-desktop" smDown={true}>
                    <div className="img-banner-desktop" style={{ width: '100%' }}>
                        <img src={dataChecking(this.props.beautyWall, 'data', 'banner', 'image', 'desktop') || null} alt={this.props.beautyWall.data.banner.name} />
                    </div>
                    {
                        globalScope.token &&
                        <div style={{ textAlign: 'center' }}>
                            <Button variant="contained" color="primary" onClick={() => this.onActionButtonClick('show_off')}>Show off your purchase!</Button>
                        </div>
                    }
                </Hidden>
                <Hidden className="wall-beauty-banner-mobile" mdUp={true}>
                    <div className="img-banner-mobile" style={{ width: '100%' }}>
                        <img src={dataChecking(this.props.beautyWall, 'data', 'banner', 'image', 'mobile') || null} alt={this.props.beautyWall.data.banner.name} />
                    </div>
                    <Button onClick={() => this.onActionButtonClick('show_off')}>Show off your purchase!</Button>
                </Hidden>
            </div>
        );
    }
    /**
     *  BEAUTYWALL - container
     */
    renderBeautyWall = () => (
        <Grid container={true} direction="row" justify="space-around" alignItems="flex-start" spacing={2}>
            {
                this.state.reviews.map((review, index) => (
                    <Grid key={index} item={true} xs={12} md={3}>
                        <Card>
                            <CardActionArea onClick={() => { this.onActionButtonClick('review'); this.props.dispatch(getReviewDetails(review.id)); }}>
                                <img src={dataChecking(review, 'image', 'square') || null} alt="product review" />
                            </CardActionArea>
                            <CardHeader
                                title={review.username}
                                subheader={<div>{review.created_at}<br />{review.created_text}</div>}
                                action={
                                    <div>
                                        <IconButton onClick={() => this.props.dispatch(postLike(review.id))}>
                                            <Favorite />
                                        </IconButton>
                                    </div>
                                }
                            />
                            <CardContent>
                                <Typography>{review.comment}</Typography>
                            </CardContent>
                            <CardActionArea onClick={() => { this.onActionButtonClick('review'); this.props.dispatch(getReviewDetails(review.id)); }}>
                                <Typography className="action view-more p-half"style={{ float: 'right' }}>View More</Typography>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))
            }
        </Grid>
    )

    render() {
        const loader = <div className="loader" key={0}>Loading ....</div>;
        return (
            <div>
                {
                    dataChecking(this.props.beautyWall, 'review', 'success') &&
                    <div>
                        {this.renderBeautyWallBanner()}
                        <Container>
                            <div style={{ textAlign: 'center' }}>
                                <Typography variant="h3">Beauty Wall</Typography>
                            </div>
                            <Divider />
                            <InfiniteScroll
                                pageStart={0}
                                loadMore={(this.loadItems)}
                                hasMore={this.state.hasMoreItems}
                                loader={loader}
                            >
                                <div className="review-cards py-1">
                                    {this.renderBeautyWall()}
                                </div>
                            </InfiniteScroll>
                            <PopupDialog
                                display={this.state.popup}
                                title={this.state.dialogTitle}
                                onClose={() => this.onClose()}
                            >
                                {this.renderDialogContent()}
                            </PopupDialog>
                        </Container>
                    </div>
                }
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
