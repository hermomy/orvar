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
import parse from 'html-react-parser';

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
    getReview,
    getStore,
    getLayoutFooter,
    getImageFooter,
    getPartnerFooter,
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
        this.props.dispatch(getReview());
        this.props.dispatch(getStore());
        this.props.dispatch(getLayoutFooter());
        this.props.dispatch(getImageFooter());
        this.props.dispatch(getPartnerFooter());
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
        <Card className={this.props.classes.card}>
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
                                className="product-card animated fadeIn"
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
                        <Hidden className="home-banner-desktop carousel animated fadeIn" smDown={true}>
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
                                            <NavLink key={banner.id} to={banner.url} className="home-banner-item">
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
    renderMobileShortcuts = () => {
        const buttonlink = dataChecking(this.props.homePage, 'store', 'success') && this.props.homePage.store.data.button_link;
        let buttonLinks;
        if (this.props.homePage.store.success && buttonlink.items) {
            const buttonIndex = Object.keys(buttonlink.items);
            buttonLinks = buttonIndex.map((index) => (
                <Grid key={buttonlink.items[index].id}item={true} xs={3}>
                    {
                        buttonlink.items[index].id === 4987 ?
                            <div style={{ textAlign: 'center' }}>
                                <img src={buttonlink.items[index].image.app} alt={`${buttonlink.items[index].name} button`} />
                                <Typography>{buttonlink.items[index].title}</Typography>
                            </div>
                        :
                            <NavLink to={buttonlink.items[index].url}>
                                <div style={{ textAlign: 'center' }}>
                                    <img src={buttonlink.items[index].image.app} alt={`${buttonlink.items[index].name} button`} />
                                    <Typography>{buttonlink.items[index].title}</Typography>
                                </div>
                            </NavLink>
                    }
                </Grid>
            ));
        }
        return (
            <Container>
                <Grid container={true}>
                    {buttonLinks}
                </Grid>
            </Container>
        );
    }

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
                                        <Card key={banner.id} className={this.props.classes.card}>
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
                                        <Card className={this.props.classes.card2}>
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
     * BACK IN STOCK - slider of restoked product cards
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
     * HIGHLY RATED - slider of trending product cards
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
     * FEATURED - sponsored products
     */
    renderFeaturedBrand = () => {
        const sponsored = dataChecking(this.props.homePage, 'sponsored', 'success') && this.props.homePage.sponsored;
        let sponsoredBrands;
        let sponsoredContainer;
        if (sponsored.success && sponsored.data.result.items) {
            const sponsors = Object.keys(dataChecking(sponsored, 'data', 'result', 'items'));

            sponsoredBrands = sponsors.map((sponsor) => {
                const indexs = Object.keys(sponsored.data.result.items[sponsor]._product.items);
                const product = sponsored.data.result.items[sponsor]._product.items;
                sponsoredContainer = (
                    <Container style={{ textAlign: 'center' }}>
                        {this.sectionHeader('featured brands')}
                        <Paper className="py-1 my-1">
                            <OwlCarousel
                                options={{
                                    items: 1,
                                    responsive: {
                                        320: {
                                            items: 1,
                                        },
                                        700: {
                                            items: 3,
                                            nav: true,
                                            navText: ['&lt;', '&gt;'],
                                        },
                                    },
                                }}
                            >
                                {
                                    indexs.map((index) => (
                                        // NEED TO CHANGE TO <Card>, depends on wireframe later
                                        <ProductCard
                                            key={product[index].id}
                                            product={product[index]}
                                            url={product[index].url}
                                            image={true}
                                        />
                                    ))
                                }
                            </OwlCarousel>
                        </Paper>
                        <NavLink to={sponsored.data.result.items[sponsor].url}>
                            <Button variant="contained">
                                shop now
                            </Button>
                        </NavLink>
                    </Container>
                );
                return (
                    <div className="div home-sponsored-item" key={sponsored.data.result.items[sponsor].id}>
                        <Hidden smDown={true}>
                            <div className="p-3" style={{ backgroundImage: `url(${sponsored.data.result.items[sponsor].image.desktop})` }}>
                                { sponsoredContainer }
                            </div>
                        </Hidden>
                        <Hidden mdUp={true}>
                            <div style={{ backgroundImage: `url(${sponsored.data.result.items[sponsor].image.mobile})` }}>
                                { sponsoredContainer }
                            </div>
                        </Hidden>
                    </div>
                );
            });
        }
        return (
            <div className="div home-sponsored my-2">
                {sponsoredBrands}
            </div>
        );
    }

    /**
     * RECOMMENDED FOR YOU - slider of recommended product cards
     */
    renderRecommend = () => (
        <div>
            <Container>
                {this.sectionHeader('recommend for you')}
                {/* <OwlCarousel
                    options={{
                        items: 3,
                        loop: true,
                        nav: true,
                        navText: ['&lt;', '&gt;'],
                        stagePadding: 50,
                    }}
                >
                    {
                        // Product Card here
                    } */}
                    UNAVAILABLE
                {/* </OwlCarousel> */}
            </Container>
        </div>
    )

    /**
     * REVIEW - slider of review cards
     */
    renderReview = () => {
        const review = dataChecking(this.props.homePage, 'review', 'success') && this.props.homePage.review;
        let reviewCards;
        if (review.success && review.data.result.items) {
            const items = dataChecking(review, 'data', 'result', 'items');
            const reviewObject = Object.keys(dataChecking(review, 'data', 'result', 'items'));
            reviewCards = reviewObject.map((index) => (
                <Card key={items[index].id} className={this.props.classes.cardReview}>
                    <CardHeader
                        avatar={<Avatar src={items[index].avatar} alt={`${items[index].username} avatar`} />}
                        title={items[index].username}
                        subheader={items[index].created_text}
                        action={
                            <div>
                                <Favorite />
                                <Typography>{items[index].like_count}</Typography>
                            </div>
                        }
                    />
                    <Divider />
                    <CardContent>
                        <Grid container={true}>
                            <Grid item={true} xs={3}>
                                <img src={items[index].image.square || require('images/hermo.png')} alt="review product" />
                            </Grid>
                            <Grid item={true} xs={9}>
                                <Typography>
                                    {items[index].comment}
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            ));
        }
        return (
            <div className="my-3" style={{ textAlign: 'center' }}>
                {
                    review.success && this.sectionHeader(dataChecking(review, 'data', 'title') || 'beauty reviews', dataChecking(review, 'data', 'description') || 'share your beauty stories') &&
                        <Container>
                            <OwlCarousel
                                options={{
                                    items: 1.3,
                                    loop: true,
                                    stagePadding: 50,
                                    responsive: {
                                        700: {
                                            items: 3,
                                            nav: true,
                                            navText: ['&lt;', '&gt;'],
                                        },
                                    },
                                }}
                            >
                                {reviewCards}
                            </OwlCarousel>
                            <NavLink to={review.data.url}>
                                <Button variant="contained">
                                    see all reviews
                                </Button>
                            </NavLink>
                        </Container>
                }
            </div>
        );
    }

    /**
     * HOME FOOTER - footer about us and partners
     */
    renderHomeFooter = () => {
        const partnerFooter = dataChecking(this.props.homePage, 'partnerFooter', 'success') && this.props.homePage.partnerFooter;
        let partnerLogos;
        if (partnerFooter.success && partnerFooter.data.items) {
            const partnerObject = Object.keys(dataChecking(partnerFooter, 'data', 'items'));
            partnerLogos = partnerObject.map((index) => (
                <Grid key={partnerFooter.data.items[index].id} item={true}>
                    <Avatar src={partnerFooter.data.items[index].image.desktop} alt={partnerFooter.data.items[index].name} />
                </Grid>
            ));
        }
        return (
            <Hidden smDown={true}>
                {
                    this.props.homePage.layoutFooter.success && this.props.homePage.imageFooter.success && this.props.homePage.partnerFooter &&
                    <div style={{ backgroundColor: '#000' }}>
                        <Container className="p-3">
                            <Grid container={true}>
                                <Grid item={true} md={8}>
                                    <Container style={{ color: '#FFF' }}>
                                        <img src={this.props.homePage.imageFooter.data.items[0].image.desktop || null} alt={this.props.homePage.imageFooter.data.items[0].name} />
                                        <Box>
                                            <Typography style={{ color: '#FFF' }}>
                                                {parse(this.props.homePage.layoutFooter.data.modules[0].result.text)}
                                            </Typography>
                                        </Box>
                                    </Container>
                                </Grid>
                                <Divider orientation="vertical" style={{ color: '#FFF' }} />
                                <Grid item={true} md={4}>
                                    <Container style={{ color: '#FFF' }}>
                                        <Typography variant="h4">{this.props.homePage.layoutFooter.data.modules[1].result.title}</Typography>
                                        <div className="my-3">
                                            <Typography className="my-2" variant="body1">{this.props.homePage.layoutFooter.data.modules[1].result.text}</Typography>
                                        </div>
                                        <Grid container={true} justify="space-evenly" alignItems="center">
                                            {
                                                partnerLogos
                                            }
                                        </Grid>
                                        <div className="my-1" style={{ textAlign: 'center' }}>
                                            <Button variant="contained">
                                                View All Partners
                                            </Button>
                                        </div>
                                    </Container>
                                </Grid>
                            </Grid>
                        </Container>
                    </div>
                }
            </Hidden>
        );
    }

    render() {
        return (
            <div>
                {this.renderHomeBanner()}
                <Hidden mdUp={true}>
                    {this.renderMobileShortcuts()}
                </Hidden>
                {this.renderFlagship()}
                {this.renderTwoh()}
                {this.renderNewArrivals()}
                {/* {this.renderExtensionZone()} */}
                {/* <Hidden mdUp={true}>
                    {this.renderMobileQuickLink()}
                </Hidden> */}
                <Container>
                    <Grid container={true}>
                        <Grid item={true} xs={12} md={6}>
                            {this.renderBackInStock()}
                        </Grid>
                        <Grid item={true} xs={12} md={6}>
                            {this.renderHighlyRated()}
                        </Grid>
                    </Grid>
                </Container>
                {this.props.homePage.sponsored.success && this.renderFeaturedBrand()}
                {this.renderRecommend()}
                {this.renderReview()}
                {this.renderHomeFooter()}
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
