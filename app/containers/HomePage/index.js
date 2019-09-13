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
import ProductCard from 'components/ProductCard';

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
    getTwoh,
    getNewArrival,
    getExtension,
    getTrending,
    getSponsored,
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
        this.props.dispatch(getTwoh());
        this.props.dispatch(getNewArrival());
        this.props.dispatch(getExtension());
        this.props.dispatch(getTrending());
        this.props.dispatch(getSponsored());
    }

    sectionHeader = (title, description) => (
        <Container className="container section-header py-half" style={{ textAlign: 'center' }}>
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
     * HOT STUFF - display slider of product cards for BACK IN STOCK AND HIGHLY RATED
     */
    sectionHotStuff = (title, description, products) => (
        <Card className="m-half">
            {this.sectionHeader(title, description)}
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
                        products.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                url={product.url}
                                image={true}
                            />
                        ))
                    }
                </OwlCarousel>
            </CardContent>
        </Card>
    )

    /**
     *  HOME BANNER - slider of banner
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
     *  MOBILE SHORTCUT - list of buttons
     */
    renderMobileShortcuts = () => (
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
    )

    /**
     *  FLAGSHIP - slider of flagship brands logo
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
     * THIS WEEK ON HERMO - cards of featured banner
     */
    renderTwoh = () => {
        const twoh = dataChecking(this.props.homePage, 'twoh', 'success') && this.props.homePage.twoh;
        let twohBanner;
        if (twoh && twoh.data) {
            const section = Object.keys(dataChecking(twoh, 'data', 'result'));
            twohBanner = section.map((container) => (
                <Grid key={container} item={true} xs={6}>
                    {
                        <Grid container={true}>
                            <Grid item={true}>
                                {
                                    dataChecking(twoh, 'data', 'result') && twoh.data.result[container].primary.items.map((banner) => (
                                        <Card key={banner.id}>
                                            <CardActionArea>
                                                <img src={banner.image.desktop} alt={`${banner.name} feature banner`} />
                                            </CardActionArea>
                                            <CardContent>
                                                <Typography className="text-uppercase" variant="body2">
                                                    {banner.title}
                                                </Typography><br />
                                                <Typography className="text-uppercase" variant="caption">
                                                    {banner.brief}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    ))
                                }
                            </Grid>
                            {
                                dataChecking(twoh, 'data', 'result') && twoh.data.result[container].secondary.items.map((banner) => (
                                    <Grid key={banner.id} item={true}>
                                        <Card>
                                            <CardActionArea>
                                                <img src={banner.image.desktop} alt={`${banner.name} feature banner`} />
                                            </CardActionArea>
                                            <CardContent>
                                                <Typography className="text-uppercase" variant="body2">
                                                    {banner.title}
                                                </Typography><br />
                                                <Typography className="text-uppercase" variant="caption">
                                                    {banner.brief}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))
                            }
                        </Grid>
                    }
                </Grid>
            ));
        }
        return (
            <Container className="container home-twoh py-1">
                {
                    console.log(twoh)
                }
                <div className="div home-twoh-header">
                    {
                        this.sectionHeader(dataChecking(twoh, 'data', 'title') || 'this week on hermo', dataChecking(twoh, 'data', 'description') || '')
                    }
                </div>
                <Grid container={true}>
                    {twohBanner}
                </Grid>
            </Container>
        );
    }

    /**
     * NEW ARRIVALS - cards of new arrival products
     * #need update on product cards
     */
    renderNewArrivals = () => {
        const newArrival = dataChecking(this.props.homePage, 'newArrival', 'success') && this.props.homePage.newArrival;
        let latestTrends;
        if (newArrival && newArrival.data) {
            latestTrends = newArrival.data.latest_trends.items.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    url={product.url}
                    image={true}
                />
            ));
        }
        return (
            <Container className="container home-new-arrival py-1">
                {
                    dataChecking(this.props.homePage, 'newArrival', 'success') &&
                    <div>
                        {this.sectionHeader(dataChecking(newArrival, 'data', 'title') || 'New Arrivals', 'checkout the latest and hottest')}
                        {
                            dataChecking(newArrival, 'data', 'latest_trends', 'items') &&
                                <OwlCarousel
                                    options={{
                                        items: 2,
                                        center: true,
                                        responsive: {
                                            700: {
                                                items: 5,
                                                nav: true,
                                                navText: ['&lt;', '&gt;'],
                                                startPosition: 3,
                                            },
                                        },
                                    }}
                                >
                                    {latestTrends}
                                </OwlCarousel>
                        }
                    </div>
                }
            </Container>
        );
    }

    /**
     * EXTENSION ZONE - campaign viewer
     * #need campaign viewer component
     */
    renderExtensionZone = () => (
        <Container className=" container home-extension p-1">
            {
                dataChecking(this.props.homePage, 'extension', 'data') &&
                <Grid container={true}>
                    {
                        console.log(this.props.homePage.extension.data.items[0].banner)
                    }
                    {/* <Grid item={true} xs={12} md={6}>
                        <Hidden className="banner home-extension-desktop" smDown={true}>
                            <img src={this.props.homePage.extension.data.items.banner} alt="banner" />
                        </Hidden>
                    </Grid>
                    <Grid item={true} xs={12} md={6}>
                        <Hidden>
                            <img src={require('images/hermo-logo-image.png')} alt="logo" />
                        </Hidden>
                    </Grid> */}
                </Grid>
            }
        </Container>
    )

    /**
     * MOBILE QUICK LINK - currently disabled
     *
     */
    renderMobileQuickLink = () => {}

    /**
     * Display slider of highly rated
     */
    renderBackInStock = () => (
        <div>
            {
                this.props.homePage.newArrival.success &&
                this.sectionHotStuff(
                    'Back In Stock',
                    'We just cant get enough!',
                    dataChecking(this.props.homePage, 'newArrival', 'data', 'just_restocked', 'items')
                )
            }
        </div>
    )

    /**
     * Display slider of highly rated
     */
    renderHighlyRated = () => (
        <div>
            {
                this.props.homePage.trending.success &&
                this.sectionHotStuff(
                    'Highly Rated',
                    'Popular beauty must-haves',
                    dataChecking(this.props.homePage, 'trending', 'data', 'items')
                )
            }
        </div>
    )

    /**
     * Display featured brands
     */
    renderFeaturedBrand = () => {
        const sponsored = dataChecking(this.props.homePage, 'sponsored', 'success') && this.props.homePage.sponsored;
        let sponsoredProducts;
        if (sponsored.success && sponsored.data.result.items) {
            const sponsors = Object.keys(dataChecking(sponsored, 'data', 'result', 'items'));
            sponsoredProducts = sponsors.map((sponsor) => {
                const indexs = Object.keys(sponsored.data.result.items[sponsor]._product.items);
                const product = sponsored.data.result.items[sponsor]._product.items;
                return (
                    indexs.map((index) => (
                        <ProductCard
                            key={product[index].id}
                            product={product[index]}
                            url={product[index].url}
                            image={true}
                        />
                    ))
                );
            });
        }
        return (
            <div className="div home-sponsored my-2">
                {
                    <Container style={{ textAlign: 'center' }}>
                        {this.sectionHeader('featured brands')}
                        {
                            dataChecking(sponsored, 'data', 'result', 'items') &&
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
                                        {sponsoredProducts}
                                    </OwlCarousel>
                                </Paper>
                        }
                        {/* <NavLink to={sponsored.data.r}>  */}
                        <Button variant="contained">
                            shop now
                        </Button>
                        {/* </NavLink> */}
                    </Container>
                }
            </div>
        );
    }

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
                    {this.renderMobileShortcuts()}
                </Hidden> */}
                {this.renderFlagship()}
                {/* {this.renderTwoh()} */}
                {this.renderNewArrivals()}
                {/* {this.renderExtensionZone()} */}
                {/* <Hidden mdUp={true}>
                    {this.renderMobileQuickLink()}
                </Hidden> */}
                <Grid container={true}>
                    <Container>
                        <Grid item={true} xs={12} md={6}>
                            {this.renderBackInStock()}
                        </Grid>
                        <Grid item={true} xs={12} md={6}>
                            {this.renderHighlyRated()}
                        </Grid>
                    </Container>
                </Grid>
                {this.props.homePage.sponsored.success && this.renderFeaturedBrand()}
                {/* {this.renderRecommend()} */}
                {/* {this.renderReview()} */}
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
