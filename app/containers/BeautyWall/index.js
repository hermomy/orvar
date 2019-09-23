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
    Grid,
    Hidden,
    IconButton,
    Typography,
} from '@material-ui/core';
import {
    Favorite,
} from '@material-ui/icons';
import {
    getReview,
} from './actions';
import makeSelectBeautyWall from './selectors';
import reducer from './reducer';
import saga from './saga';
import './style.scss';

export class BeautyWall extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            hasMoreItems: true,
            reviews: [],
            nextHref: null,
        };
    }
    componentDidMount() {
        this.props.dispatch(getReview());
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
    }

    loadItems = () => {
        let url = '/beauty-wall';
        if (this.state.nextHref) {
            url = this.state.nextHref;
        }
        this.props.dispatch(getReview(url));
        this.setState({ hasMoreItems: false });
    }
    /**
     *  POPUP SHOW OFF YOUR PURCHASE - form for submit review
     */
    renderPopup = () => {}

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
                    <div className="img-banner-desktop">
                        <img src={this.props.beautyWall.data.banner.image.desktop} alt={this.props.beautyWall.data.banner.name} />
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <Button>Show off your purchase!</Button>
                    </div>
                </Hidden>
                <Hidden className="wall-beauty-banner-mobile" mdUp={true}>
                    <div className="img-banner-mobile">
                        <img src={this.props.beautyWall.data.banner.image.mobile} alt={this.props.beautyWall.data.banner.name} />
                    </div>
                    <Button>Show off your purchase!</Button>
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
                            <CardActionArea>
                                <img src={dataChecking(review, 'image', 'square')} alt="product review" />
                            </CardActionArea>
                            <CardHeader
                                title={review.username}
                                subheader={<div>{review.created_at}<br />{review.created_text}</div>}
                                action={
                                    <div>
                                        <IconButton>
                                            <Favorite />
                                        </IconButton>
                                    </div>
                                }
                            />
                            <CardContent>
                                <Typography>{review.comment}</Typography>
                            </CardContent>
                            <CardActionArea>
                                <Typography className="action view-more p-half"style={{ float: 'right' }}>View More</Typography>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))
            }
        </Grid>
    )

    render() {
        const loader = <div className="loader">Loading ....</div>;
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
