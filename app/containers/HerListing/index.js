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
import { getData,
         getPage,
} from './actions';
import Pagination from '../../components/Pagination';
import ProductCard from '../../components/ProductCard';
import Sort from '../../components/Sort';
import Filter from '../../components/Filter';


export class HerListing extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    state = {
        listView: false,
        selectedToggle: {},
        selectedFilter: {},
        currentQueryString: '',

        condi: {},
        child: {},
    };

    componentWillMount() {
        if (dataChecking(this.props, 'location', 'search')) {
            let sortValue = null;
            const params = this.props.location.search.split('?')[1].split('&');
            const obj = { ...this.state.selectedFilter };
            params.forEach((paramItem) => {
                const item = paramItem.split('=');

                if (item[0] === 'sort') {
                    sortValue = item[1];
                } else {
                    const key = `${item[0]}_${item[1]}`;
                    obj[key] = {
                        key: item[0],
                        id: item[1],
                    };
                }
            });
            this.setState({ selectedFilter: obj, sortValue, currentQueryString: this.props.location.search });
        } else {
            this.setState({ sortValue: 'default', currentQueryString: 'sort=default' });
        }
        this.props.dispatch(getData());
    }

    FilterRender = (list) => {
        if (dataChecking(list, 'length')) {
            return (
                <Filter
                    list={list}
                    props={this.props}
                    dpatch={(selfHref, queryString) => {
                        this.props.dispatch(getPage(`${selfHref}?${queryString}`));
                    }}
                    getCurrentQueryString={() => this.state.currentQueryString}
                    getSortValue={() => this.state.sortValue}
                    getSelectedFilter={() => this.state.selectedFilter}
                    getSelectedToggle={() => this.state.selectedToggle}
                    setState_CurrentQueryString={(currentQueryString) => {
                        this.setState({ currentQueryString });
                    }}
                    setState_SelectedFilter={(data) => {
                        this.setState({ selectedFilter: data });
                    }}
                    setState_SelectedToggle={(data) => {
                        this.setState({ selectedToggle: data });
                    }}
                />
            );
        }
        return null;
    }

    pagingRender = () => {
        const data = dataChecking(this.props, 'herlisting', 'data', 'product', 'result');
        if (!data || !data._meta) {
            return null;
        }
        return (
            <Pagination
                dpatch={(page) => {
                    this.props.dispatch(getPage(page));
                }}
                meta={data._meta}
                link={data._links}
            />
        );
    }

    sortRender = () => {
        if (!dataChecking(this.props, 'herlisting', 'data', 'sort', 'items')) {
            return null;
        }
        return (
            <Sort
                props={this.props}
                setState_SortValue={(value) => {
                    this.setState({ sortValue: value });
                }}
                dpatch={(selfHref, currentQueryString) => {
                    this.props.dispatch(getPage(`${selfHref}?${currentQueryString}`));
                }}
                setState_CurrentQueryString={(currentQueryString) => {
                    this.setState({ currentQueryString });
                }}
                getCurrentQueryString={() => this.state.currentQueryString}
                getSortValue={() => this.state.sortValue}
            />
        );
    }

    render() {
        console.log(this.props);
        return (
            <div className="container">
                <Helmet>
                    <title>HerListing</title>
                    <meta name="description" content="Description of HerListing" />
                </Helmet>
                {
                    dataChecking(this.props, 'herlisting', 'loading') ?
                        <div>Loading</div>
                        :
                        <div>
                            <img alt="topPicture" />
                            <div>
                                <p>xinshanlinzhixuan</p>
                                <p>ydsajondfsfdjjgjgjfjgjgjffdkfdkg</p>
                            </div>
                            <input type="submit" onClick={() => { this.setState({ listView: !this.state.listView }); }} value="grid/list" />
                            {this.pagingRender()}
                            {this.sortRender()}
                            <div className="filter-container">
                                {this.FilterRender(dataChecking(this.props, 'herlisting', 'data', 'filters'))}
                            </div>
                            <div>
                                {
                                    dataChecking(this.props, 'herlisting', 'contentLoading') ?
                                        <div>loading</div>
                                        :
                                        <div className={`${this.state.listView ? 'list-view' : 'grid-view'}`}>
                                            {
                                                dataChecking(this.props, 'herlisting', 'data', 'product', 'result', 'items') ?
                                                this.props.herlisting.data.product.result.items.map((product) =>
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
