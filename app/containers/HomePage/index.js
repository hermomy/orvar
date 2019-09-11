/**
 *
 * HomePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { NavLink } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel2';
import 'assets/react-owl-carousel2.style.scss';
import { withStyles } from '@material-ui/core/styles';
// import ProductCard from 'components/ProductCard';

import {
    Avatar,
    Box,
    Button,
    Card,
    CardActionArea,
    CardContent,
    CardHeader,
    Container,
    Divider,
    Grid,
    Hidden,
    Paper,
    Typography,
} from '@material-ui/core';
import {
    Favorite,
} from '@material-ui/icons';

import { dataChecking } from 'globalUtils';
import {
    getHomeBanner,
    getFlagship,
} from './actions';
import makeSelectHomePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import './style.scss';
import styles from './materialStyle';


export class HomePage extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            a: true,
        };
    }
    componentDidMount() {
        this.props.dispatch(getHomeBanner());
        this.props.dispatch(getFlagship());
    }

    /**
     * Slider component
     */
    slider = () => {}

    sectionHeader = (title, description) => (
        <Container className="container section-header"style={{ textAlign: 'center' }}>
            <Box className="text-uppercase">
                <Typography variant="h5">
                    {title}
                </Typography><br />
                <Typography variant="subtitle1">
                    {description}
                </Typography>
            </Box>
        </Container>
    )
    /**
     * Display slider of images
     */
    renderHomeBanner = () => (
        <div className="div home-top-banner">
            {
                dataChecking(this.props.homePage, 'banner', 'data', 'data', 'result', 'items') &&
                    <div>
                        <Hidden className=" carousel home-banner-desktop" smDown={true}>
                            <OwlCarousel
                                options={{
                                    items: 1,
                                    loop: true,
                                    nav: true,
                                    dots: true,
                                    navText: ['&lt;', '&gt;'],
                                    autoplay: true,
                                    autoplayHoverPause: true,
                                    center: true,
                                }}
                            >
                                {
                                    dataChecking(this.props.homePage, 'banner', 'data', 'data', 'result', 'items').map((banner) => (
                                        (banner.visibility.desktop) &&
                                            <NavLink key={banner.id} to={banner.url}>
                                                <img src={banner.image.desktop} alt={`banner ${banner.caption}`} />
                                            </NavLink>
                                    ))
                                }
                            </OwlCarousel>
                        </Hidden>
                        <Hidden className="carousel home-banner-mobile" mdUp={true}>
                            <OwlCarousel
                                options={{
                                    items: 1,
                                    loop: true,
                                    autoplay: true,
                                    dots: true,
                                    autoplayHoverPause: true,
                                }}
                            >
                                {
                                    dataChecking(this.props.homePage, 'banner', 'data', 'data', 'result', 'items').map((banner) => (
                                        (banner.visibility.mobile) &&
                                            <NavLink key={banner.id} to={banner.url}>
                                                <img src={banner.image.mobile} alt={`banner ${banner.caption}`} />
                                            </NavLink>
                                    ))
                                }
                            </OwlCarousel>
                        </Hidden>
                    </div>
            }
        </div>
    )

    /**
     * Display flagship store (images) with button
     */
    renderFlagship = () => (
        <Container className="container home-flagship py-1"style={{ textAlign: 'center' }}>
            {this.sectionHeader('official flagships stores', 'authorised & authentic')}
            {dataChecking(this.props.homePage, 'flagship', 'data', 'data', 'items') &&
                <div>
                    <OwlCarousel
                        options={{
                            items: 2,
                            loop: true,
                            center: true,
                            navText: ['&lt;', '&gt;'],
                            stagePadding: 50,
                            responsive: {
                                700: {
                                    items: 6,
                                    nav: true,
                                },
                            },
                        }}
                    >
                        {
                            dataChecking(this.props.homePage, 'flagship', 'data', 'data', 'items').map((flagship) => (
                                <NavLink key={flagship.id} to={flagship.url}>
                                    <img src={flagship.brand.logo} alt={`flagship brand ${flagship.brand.name} logo`} />
                                </NavLink>
                            ))
                        }
                    </OwlCarousel>
                    {/* BUTTON NAVLINK TO FLAGSHIP PAGE */}
                    <Button variant="contained">
                        View All Flagships
                    </Button>
                </div>
            }
        </Container>
    )

    /**
     * Display cards of images and text
     */
    renderTwoh = () => (
        <div className="twoh p-1">
            <Grid container={true}>
                {this.sectionHeader('this week on hermo')}
                <Grid item={true} xs={6}>
                    <Card className={this.props.classes.card}>
                        <CardActionArea>
                            <img src={require('images/hermo.png')} alt="logo" />
                            <CardContent>
                                <Typography className="text-uppercase" variant="body2">
                                    gift with purchase
                                </Typography><br />
                                <Typography className="text-uppercase" variant="caption">
                                    Lorem ipsum dolor sit amet
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )

    /**
     * Display slider of new arrival product cards
     */
    renderNewArrivals = () => (
        <div className="carousel-newArrival py-1">
            {this.sectionHeader('new arrivals', 'checkout the latest and hottest')}
            <OwlCarousel
                options={{
                    items: 3,
                    loop: true,
                    nav: true,
                    navText: ['&lt;', '&gt;'],
                    stagePadding: 50,
                }}
            >
                {
                    /* Product Card here */
                }
                UNAVAILABLE
            </OwlCarousel>
        </div>
    )

    /**
     * Display images of event
     */
    renderEventView= () => (
        <div className="banner-event p-1">
            <Grid container={true}>
                <Grid item={true} xs={12} md={6}>
                    <img src={require('images/profile-top-banner-bg.png')} alt="banner" />
                </Grid>
                <Grid item={true} xs={12} md={6}>
                    <img src={require('images/hermo-logo-image.png')} alt="logo" />
                </Grid>
            </Grid>
        </div>
    )

    /**
     * Display slider of back in stock
     */
    renderBackInStock = () => (
        <Card className={this.props.classes.card1}>
            {this.sectionHeader('back in stock', 'we just cant get enough!')}
            <Divider />
            <CardContent>
                <OwlCarousel
                    options={{
                        items: 2,
                        loop: true,
                        nav: true,
                        navText: ['&lt;', '&gt;'],
                    }}
                >
                    {
                        /* Product Card here */
                    }
                    UNAVAILABLE
                </OwlCarousel>
            </CardContent>
        </Card>
    )

    /**
     * Display slider of highly rated
     */
    renderHighlyRated = () => {}

    /**
     * Display featured brands
     */
    renderFeaturedBrand = () => (
        <div className="my-2">
            <Container style={{ textAlign: 'center' }}>
                {this.sectionHeader('featured brands')}
                <Paper className="py-1 my-1">
                    <OwlCarousel
                        options={{
                            items: 3,
                            loop: true,
                            nav: true,
                            navText: ['&lt;', '&gt;'],
                            responsive: {
                                320: {
                                    items: 1,
                                },
                                700: {
                                    items: 3,
                                },
                            },
                        }}
                    >
                        {
                            /* Product Card here */
                        }
                        UNAVAILABLE
                    </OwlCarousel>
                </Paper>
                <Button variant="contained">
                    shop now
                </Button>
            </Container>
        </div>
    )

    /**
     * Display slider of recommended product
     */
    renderRecommend = () => (
        <div>
            {this.sectionHeader('recommend for you')}
            <OwlCarousel
                options={{
                    items: 3,
                    loop: true,
                    nav: true,
                    navText: ['&lt;', '&gt;'],
                    stagePadding: 50,
                }}
            >
                {
                    /* Product Card here */
                }
                UNAVAILABLE
            </OwlCarousel>
        </div>
    )

    /**
     * Display slider of reviews
     */
    renderReview = () => (
        <div style={{ textAlign: 'center' }}>
            {this.sectionHeader('beauty reviews', 'share your beauty stories')}
            <OwlCarousel
                options={{
                    items: 3,
                    loop: true,
                    nav: true,
                    navText: ['&lt;', '&gt;'],
                    stagePadding: 50,
                }}
            >
                <Card>
                    <CardHeader
                        avatar={
                            <Avatar>
                                R
                            </Avatar>
                        }
                        title="maimunah"
                        subheader="3 hours ago"
                        action={
                            <Favorite />
                        }
                    />
                    <Divider />
                    <CardContent>
                        <Grid container={true}>
                            <Grid item={true} xs={3}>
                                <img src={require('images/hermo.png')} alt="logo" />
                            </Grid>
                            <Grid item={true} xs={9}>
                                <Typography>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis omnis vel, tenetur nesciunt laudantium incidunt in veniam! Vitae expedita beatae voluptates facere, quo reprehenderit laudantium consectetur harum aspernatur dolores ad!
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </OwlCarousel>
            <Button variant="contained">
                see all reviews
            </Button>
        </div>
    )

    render() {
        return (
            <div>
                {this.renderHomeBanner()}
                {/* <Hidden mdUp={true}>
                    <Container>
                        <Grid container={true}>
                            <Grid item={true} xs={3}>
                                <Button>
                                    Attendance
                                </Button>
                            </Grid>
                            <Grid item={true} xs={3}>
                                <Button>
                                    Flagship Stores
                                </Button>
                            </Grid>
                            <Grid item={true} xs={3}>
                                <Button>
                                    Hermo Global
                                </Button>
                            </Grid>
                            <Grid item={true} xs={3}>
                                <Button>
                                    Mask box
                                </Button>
                            </Grid>
                        </Grid>
                    </Container>
                </Hidden> */}
                {this.renderFlagship()}
                {/* {this.renderTwoh()}
                {this.renderNewArrivals()}
                {this.renderEventView()}
                <Grid container={true}>
                    <Grid item={true} xs={12} md={6}>
                        {this.renderBackInStock()}
                    </Grid>
                    <Grid item={true} xs={12} md={6}>
                        {this.renderBackInStock()}
                    </Grid>
                </Grid>
                {this.renderFeaturedBrand()}
                {this.renderRecommend()}
                {this.renderReview()} */}
            </div>
        );
    }
}

HomePage.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    homePage: makeSelectHomePage(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'homePage', reducer });
const withSaga = injectSaga({ key: 'homePage', saga });

export default compose(
    withReducer,
    withSaga,
    withStyles(styles),
    withConnect,
)(HomePage);
