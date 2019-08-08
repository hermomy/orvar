/**
 *
 * BrandPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { Container, Typography, TextField, InputAdornment, MenuItem, Grid, Box } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { Search } from '@material-ui/icons';
import { NavLink } from 'react-router-dom';

import { dataChecking } from 'globalUtils';
import makeSelectBrandPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getBrandList } from './actions';
import './style.scss';
import styles from './materialStyle';


export class BrandPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

    componentDidMount() {
        this.props.dispatch(getBrandList());
    }

    brandFilter = () => {
        console.log();
        return (
            <Container className="mb-1">
                <Typography variant="h5"><b>All Brands</b></Typography>
                <Grid container={true} spacing={2}>
                    <Grid item={true}>
                        <TextField
                            variant="outlined"
                            type="search"
                            margin="dense"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search />
                                    </InputAdornment>
                                ),
                            }}
                            placeholder="Search for brand"
                        />
                    </Grid>
                    <Grid item={true} >
                        <TextField
                            variant="outlined"
                            select={true}
                            margin="dense"
                            value="All Categories"
                        >
                            <MenuItem key="All Categories" value="All Categories">
                                All Categories
                            </MenuItem>
                            <MenuItem key="Skin Care" value="Skin Care">
                                Skin Care
                            </MenuItem>
                            <MenuItem key="Make Up" value="Make Up">
                                Make Up
                            </MenuItem>
                            <MenuItem key="Bath & Body" value="Bath & Body">
                                Bath & Body
                            </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item={true} >
                        <TextField
                            variant="outlined"
                            select={true}
                            margin="dense"
                            value="All Countries"
                        >
                            <MenuItem key="All Countries" value="All Countries">
                                All Countries
                            </MenuItem>
                            <MenuItem key="Japan" value="Japan">
                                Japan
                            </MenuItem>
                            <MenuItem key="Korea" value="Korea">
                                Korea
                            </MenuItem>
                            <MenuItem key="Malaysia" value="Malaysia">
                                Malaysia
                            </MenuItem>
                        </TextField>
                    </Grid>
                </Grid>
            </Container>
        );
    }

    brandFilterByAlphabet = () => {
        let alpabetFilter;
        if (this.props.brandPage.data && this.props.brandPage.data.items) {
            const Obj = Object.keys(dataChecking(this.props, 'brandPage', 'data', 'items'));
            alpabetFilter = Obj.map((key) => (
                <Grid key={key} className="text-uppercase" item={true}>
                    <Typography onClick={() => (this.scroolTo(key))} variant="button" className="navLink">{key}</Typography>
                </Grid>
            ));
        }
        return (
            <div
                className="py-1"
                style={{
                    backgroundColor: 'white',
                }}
            >
                <Container>
                    <Grid container={true} justify="space-evenly" spacing={3}>
                        {alpabetFilter}
                    </Grid>
                </Container>
            </div>
        );
    }


    featuredBrandList = () => {
        let featureBrand;
        if (this.props.brandPage.data && this.props.brandPage.data.feature) {
            const feature = Object.keys(dataChecking(this.props, 'brandPage', 'data', 'feature'));
            featureBrand = feature.map((key) => (
                <Grid key={key} container={true}>
                    {
                        dataChecking(this.props, 'brandPage', 'data', 'feature') && this.props.brandPage.data.feature[key].map((item) => (
                            <Grid item={true} key={item.url} className="mb-1" xs={12} sm={4}>
                                <NavLink className="navLink" to={item.url} >
                                    <Typography>{item.name}</Typography>
                                </NavLink>
                            </Grid>
                            ))
                    }
                </Grid>));
        }

        return (
            <Grid container={true} className="mb-3">
                <Grid className={`featured-brand ${this.props.classes.featureBrand}`} item={true} md={3}>
                    <Typography variant="h4"><b><u>Featured Brands</u></b></Typography>
                </Grid>
                <Grid item={true} xs={12} md={7}>
                    {featureBrand}
                </Grid>
            </Grid>

        );
    }

    normalbrandList = () => {
        let listBrand;
        if (this.props.brandPage.data && this.props.brandPage.data.items) {
            const normalBrand = Object.keys(dataChecking(this.props, 'brandPage', 'data', 'items'));
            listBrand = normalBrand.map((key) => (
                <Grid key={key} container={true} className="mb-3">
                    <Grid className={`text-uppercase featured-brand ${this.props.classes.featureBrand}`} item={true} md={3}>
                        <Typography variant="h3"><b><u>{key}</u></b></Typography>
                    </Grid>
                    <Grid item={true} xs={12} md={7}>
                        <Grid container={true}>
                            {
                                dataChecking(this.props, 'brandPage', 'data', 'items', key) && this.props.brandPage.data.items[key].map((item) => (
                                    <Grid item={true} key={item.url} className="mb-1" xs={12} sm={4}>
                                        <NavLink className="navLink" to={item.url} >
                                            <Typography>{item.name}</Typography>
                                        </NavLink>
                                    </Grid>
                                    ))
                            }
                        </Grid>
                    </Grid>
                </Grid>));
        }

        return (
            listBrand
        );
    }

    render() {
        return (
            <div className="pt-1">
                <div
                    style={{
                        position: 'sticky',
                        top: '60px',
                        backgroundColor: '#f3efee',
                    }}
                >
                    {this.brandFilter()}
                    {this.brandFilterByAlphabet()}
                </div>
                <div
                    style={{
                        backgroundColor: 'white',
                    }}
                >
                    <Container>
                        <Box bgcolor="#f7f7f7" className="p-2">
                            {this.featuredBrandList()}
                            {this.normalbrandList()}
                        </Box>
                    </Container>
                </div>
            </div>
        );
    }
}

BrandPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    brandPage: makeSelectBrandPage(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'brandPage', reducer });
const withSaga = injectSaga({ key: 'brandPage', saga });

export default compose(
    withReducer,
    withSaga,
    withStyles(styles),
    withConnect,
)(BrandPage);
