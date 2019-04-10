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
import Pagination from 'components/Pagination';
import ProductCard from 'components/ProductCard';
import SortFilter from 'components/SortFilter';
import { withRouter } from 'react-router-dom';

import makeSelectHerListing from './selectors';
import reducer from './reducer';
import saga from './saga';
import './style.scss';
import {
    getData,
} from './actions';

export class HerListing extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);

        const obj = {};
        let selectedSorter = 'default';
        let currentQueryString = 'sort=default';
        let currentPage = 1;

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

        this.props.location.pathname.split('/').forEach((param) => {
            const arr = param.split('-');
            if (arr && arr[0] === 'page') {
                currentPage = arr[1];
            }
        });

        const pageNum = dataChecking(this.props, 'match', 'params', 'pageNum');
        if (pageNum) {
            currentPage = pageNum.split('-')[1];
        }

        this.state = {
            listView: false,
            initialQueryString: currentQueryString,
            currentPage,
            initialSortFilterParams: {
                selectedFilter: obj,
                selectedSorter,
                currentQueryString,
            },
            bukatutup: true,
        };
    }

    componentWillMount() {
        this.props.dispatch(getData('/mall', this.props.dataType || 'mall'));
    }

    componentWillReceiveProps(nextProps) {
        // initial a fillter/sort when receive initialQueryString from the url
        if (dataChecking(nextProps, 'herlisting', 'data', 'filters') && this.state.initialQueryString) {
            this.props.dispatch(getData('mallList', this.state.initialQueryString));
            this.setState({ initialQueryString: null });
        }
    }

    abcdefg = () => {
        if (dataChecking(this.props, 'herlisting', 'data', 'product', 'result', '_links', 'next', 'href')) {
            this.props.dispatch(getData('mallList', null, this.props.herlisting.data.product.result._links.next.href));
        } else {
            if (this.props.herlisting.data.product.result._meta.pageCount === this.props.herlisting.data.product.result._meta.currentPage) {
                return null;
            }
            this.props.dispatch(getData('mallList', null, `${this.props.herlisting.data.product._links.self.href}?page=2`));
        }
        this.setState({ currentPage: this.state.currentPage + 1 });
        let newPathName = '';
        if (dataChecking(this.props, 'history', 'push') && dataChecking(this.props, 'location', 'pathname')) {
            this.props.location.pathname.split('/').forEach((param) => {
                const arr = param.split('-');
                const temppage = this.props.herlisting.data.product.result._meta.currentPage + 1;
                if (arr && arr[0] === 'page') {
                    newPathName = this.props.location.pathname.replace(param, `page-${temppage}`);
                } else {
                    newPathName = `${this.props.location.pathname}/page-${temppage}`;
                }
            });
            this.props.history.push(`${newPathName}${this.props.history.location.search}`);
        }
        return null;
    }


    renderPaginator = () => {
        const data = dataChecking(this.props, 'herlisting', 'data', 'product', 'result');
        if (!data || !data._meta) {
            return null;
        }
        return (
            <Pagination
                parentProps={this.props}
                meta={data._meta}
                link={data._links}
                currentPage={this.state.currentPage}
            />
        );
    }

    renderProductCard = () => {
        const data = dataChecking(this.props, 'herlisting', 'data', 'product', 'result', 'items');
        if (!data) {
            return null;
        }
        return this.props.herlisting.data.product.result.items.map((product) =>
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
        ));
    }

    render() {
        const { herlisting } = this.props;
        console.log(this.props);
        return (
            <div className="container">
                <Helmet>
                    <title>HerListing</title>
                    <meta name="description" content="Description of HerListing" />
                </Helmet>
                {
                    dataChecking(herlisting, 'loading') && !dataChecking(herlisting, 'data') ?
                        <img className="herlisting-loading content-loading" src={require('images/preloader-02.gif')} alt="" />
                        :
                        <div>
                            <img className="banner" src="https://cdn5.hermo.my/hermo/imagelink/2019/april-2019-loreal-paris_01554085356.jpg" alt="" />
                            <div>
                                <div className="view-button">
                                    <input type="button" onClick={() => { this.setState({ listView: !this.state.listView }); }} value="grid/list" />
                                </div>
                                {this.renderPaginator()}
                            </div>
                            <div className="sort-filter-container">
                                <SortFilter
                                    parentProps={this.props}
                                    sortData={dataChecking(herlisting, 'data', 'sort')}
                                    filterData={dataChecking(herlisting, 'data', 'filters')}
                                    initialSortFilterParams={this.state.initialSortFilterParams}
                                />
                            </div>
                            <div className="data-container">
                                {
                                    dataChecking(herlisting, 'loading') ?
                                        <div className="data-loading">
                                            <img className="herlisting-loading" src={require('images/preloader-02.gif')} alt="" />
                                        </div>
                                        :
                                        <div className={`${this.state.listView ? 'list-view' : 'grid-view'}`}>
                                            {this.renderProductCard()}
                                        </div>
                                }
                            </div>
                            <div>
                                <span className="next-page-bottom" onClick={() => this.abcdefg()}>Next Page</span>
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
    withRouter,
)(HerListing);
