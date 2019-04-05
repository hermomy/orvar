/**
 *
 * HerListing
 *
 */

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import React from 'react';
import PropTypes from 'prop-types';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { dataChecking } from 'globalUtils';

import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import makeSelectHerListing from './selectors';
import reducer from './reducer';
import saga from './saga';
import './style.scss';
import {
    getData,
} from './actions';
import Pagination from '../../components/Pagination';
import ProductCard from '../../components/ProductCard';
import SortFilter from '../../components/SortFilter';


export class HerListing extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);

        const obj = {};
        let selectedSorter = 'default';
        let currentQueryString = 'sort=default';

        if (dataChecking(this.props, 'location', 'search')) {
            const params = this.props.location.search.split('?')[1].split('&');
            params.forEach((paramItem) => {
                const item = paramItem.split('=');

                if (item[0] === 'sort') {
                    selectedSorter = item[1];
                } else {
                    const key = `${item[0]}_${item[1]}`;
                    obj[key] = {
                        key: item[0],
                        id: item[1],
                    };
                }
            });
            currentQueryString = this.props.location.search;
        }

        this.state = {
            listView: false,
            initialQueryString: currentQueryString,
            initialSortFilterParams: {
                selectedFilter: obj,
                selectedSorter,
                currentQueryString,
            },
        };
    }

    componentWillMount() {
        this.props.dispatch(getData('/mall', 'mall'));
    }

    componentWillReceiveProps(nextProps) {
        if (dataChecking(nextProps, 'herlisting', 'data', 'filters') && this.state.initialQueryString) {
            this.props.dispatch(getData(`/mall/list?${this.state.initialQueryString}`));
            this.setState({ initialQueryString: null });
        }
    }

    pagingRender = () => {
        const data = dataChecking(this.props, 'herlisting', 'mall', 'product', 'result');
        if (!data || !data._meta) {
            return null;
        }
        return (
            <Pagination
                dpatch={(page) => {
                    this.props.dispatch(getData(page, 'mall'));
                }}
                meta={data._meta}
                link={data._links}
            />
        );
    }

    render() {
        console.log(this.props);
        if (dataChecking(this.props, 'herlisting', 'mall')) {
            this.setState({ sortFromMall: this.props.herlisting.mall.sort, filterFromMall: this.props.herlisting.mall.filters });
            console.log(this.state.sortFromMall);
            this.props.dispatch(getData('/mall/list', 'mall'));
        }
        return (
            <div className="container">
                <Helmet>
                    <title>HerListing</title>
                    <meta name="description" content="Description of HerListing" />
                </Helmet>
                {
                    dataChecking(this.props, 'herlisting', 'loading') && !dataChecking(this.props.herlisting, 'data') ?
                        <img className="herlisting-loading content-loading" src={require('images/preloader-02.gif')} alt="" />
                        :
                        <div>
                            <img className="banner" src="https://cdn5.hermo.my/hermo/imagelink/2019/april-2019-loreal-paris_01554085356.jpg" alt="" />
                            <div>
                                <div className="view-button">
                                    <input type="button" onClick={() => { this.setState({ listView: !this.state.listView }); }} value="grid/list" />
                                </div>
                                {this.pagingRender()}
                            </div>
                            <div className="sort-filter-container">
                                <SortFilter
                                    parentProps={this.props}
                                    sortData={dataChecking(this.props, 'herlisting', 'data', 'mall', 'sort')}
                                    filterData={dataChecking(this.props, 'herlisting', 'data', 'mall', 'filters')}
                                    initialSortFilterParams={this.state.initialSortFilterParams}
                                />
                            </div>
                            <div className="data-container">
                                {
                                    dataChecking(this.props, 'herlisting', 'loading') ?
                                        <div className="data-loading">
                                            <img className="herlisting-loading" src={require('images/preloader-02.gif')} alt="" />
                                        </div>
                                        :
                                        <div className={`${this.state.listView ? 'list-view' : 'grid-view'}`}>
                                            {
                                                dataChecking(this.props, 'herlisting', 'mall', 'items') ?
                                                this.props.herlisting.mall.items.map((product) =>
                                                    (
                                                        <div
                                                            key={product.id}
                                                            className={`product-card-div ${this.state.listView ? 'list-view-component' : 'grid-view-component'}`}
                                                        >
                                                            <ProductCard
                                                                product={product}
                                                                listViewMode={this.state.listView}
                                                            />
                                                        </div>
                                                )) : null
                                            }
                                        </div>
                                }
                            </div>
                        </div>
                }
            </div>
        );
    }
}

HerListing.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    herlisting: makeSelectHerListing(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'herListing', reducer });
const withSaga = injectSaga({ key: 'herListing', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(HerListing);
