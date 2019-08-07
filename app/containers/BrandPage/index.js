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
import { Search } from '@material-ui/icons';
import { NavLink } from 'react-router-dom';

import { dataChecking } from 'globalUtils';
import makeSelectBrandPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getBrandList } from './actions';
import './style.scss';

export class BrandPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    componentDidMount() {
        this.props.dispatch(getBrandList());
    }

    brandFilter = () => {
        console.log();
        return (
            <Container className="mb-1">
                <Typography variant="h5">All Brands</Typography>
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
                    <Grid item={true}>
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
                    <Grid item={true}>
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
                <Grid className="text-uppercase" item={true} key={key}>
                    <Typography>{key}</Typography>
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
                    <Grid container={true} justify="space-evenly">
                        {alpabetFilter}
                    </Grid>
                </Container>
            </div>
        );
    }

    brandList = () => {
        let listBrand;
        let featureBrand;

        if (this.props.brandPage.data && this.props.brandPage.data.feature) {
            const Obj2 = Object.keys(dataChecking(this.props, 'brandPage', 'data', 'feature'));
            featureBrand = Obj2.map((key) => (
                <Grid container={true} spacing={2}>
                    {
                        dataChecking(this.props, 'brandPage', 'data', 'feature', key) && this.props.brandPage.data.feature[key].map((item) => (
                            <Grid item={true} key={key} md={4}>
                                <NavLink className="navLink"to={item.url} >
                                    <Typography>{item.name}</Typography>
                                </NavLink>
                            </Grid>
                            ))
                    }
                </Grid>));
        }
        if (this.props.brandPage.data && this.props.brandPage.data.items) {
            const Obj = Object.keys(dataChecking(this.props, 'brandPage', 'data', 'items'));
            listBrand = Obj.map((key) => (
                <Grid container={true} spacing={2} className="mb-3 p-3">
                    <Grid className="brand-name text-uppercase" item={true} key={key} sm={3}>
                        <Typography variant="h2"><u>{key}</u></Typography>
                    </Grid>
                    <Grid item={true} key={key} sm={7}>
                        <Grid container={true} spacing={2}>
                            {
                                dataChecking(this.props, 'brandPage', 'data', 'items', key) && this.props.brandPage.data.items[key].map((item) => (
                                    <Grid item={true} key={key} md={4}>
                                        <NavLink className="navLink"to={item.url} >
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
            <div
                className="py-1"
                style={{
                    backgroundColor: 'white',
                }}
            >
                <Box bgcolor="#f7f7f7" className="ml-1 mr-1 p-3">
                    <Grid container={true} spacing={2} className="mb-3 p-3">
                        <Grid className="featured-brand" item={true} sm={3}>
                            <Typography variant="h3"><u>Featured Brands</u></Typography>
                        </Grid>
                        <Grid item={true} sm={7}>
                            {featureBrand}
                        </Grid>
                    </Grid>
                    {listBrand}
                </Box>

            </div>
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
                {this.brandList()}
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
    withConnect,
)(BrandPage);
