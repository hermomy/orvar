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

export class HerListing extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    state = {
        listView: false,
        selectedToggle: {},
        selectedFilter: {},
        currentQueryString: '',
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

    toggleFilter = (item) => {
        if (item.items) {
            const key = `${item.key}_${item.id}`;
            const obj = { ...this.state.selectedToggle };
            obj[key] = !obj[key];
            this.setState({ selectedToggle: obj });
        } else {
            this.updateSelectedFilter(item);
        }
    }

    updateSelectedFilter = (item) => {
        if (!item.id || !item.key || dataChecking(this.props, 'herlisting', 'contentLoading')) { return; }

        const obj = { ...this.state.selectedFilter };
        if (obj[`${item.key}_${item.id}`]) {
            delete obj[`${item.key}_${item.id}`];
        } else {
            obj[`${item.key}_${item.id}`] = item;
        }
        let queryString = '';
        if (this.state.sortValue) {
            queryString = `sort=${this.state.sortValue}`;
        }
        let query = '';
        Object.values(obj).forEach((param) => {
            query = `${query}&${param.key}=${param.id}`;
        });
        queryString += query;
        if (dataChecking(this.props, 'history', 'push')) {
            this.props.history.push(`${this.props.location.pathname}?${queryString}`);
        }
        this.props.dispatch(getPage(`${this.props.herlisting.data.product._links.self.href}?${queryString}`));
        this.setState({ selectedFilter: obj, currentQueryString: `${queryString}` });
    }

    sort = (event) => {
        const currentQueryString = this.state.currentQueryString.replace(this.state.sortValue, event.target.value).replace('?', '');
        if (dataChecking(this.props, 'history', 'push')) {
            this.props.history.push(`${this.props.location.pathname}?${currentQueryString}`);
        }
        this.props.dispatch(getPage(`${this.props.herlisting.data.product._links.self.href}?${currentQueryString}`));
        this.setState({ sortValue: event.target.value, currentQueryString });
    }

    Paging = () => {
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

    renderFilterDiv = (list) => {
        if (dataChecking(list, 'length')) {
            return list.map((item) => (
                <div className="filter-item m-quater" key={item.text}>
                    <input
                        type="checkbox"
                        className={`${dataChecking(item, 'id') ? '' : 'invisible'}`}
                        onChange={() => this.updateSelectedFilter(item)}
                        checked={this.state.selectedFilter[`${item.key}_${item.id}`] || false}
                        disabled={dataChecking(this.props, 'herlisting', 'contentLoading')}
                    />
                    <div className="filter-item-display ml-quater" onClick={() => this.toggleFilter(item)}>
                        <span>{item.text}</span>
                        {item.items ? <span className="toggle-icon pl-quater">{dataChecking(this.state.selectedToggle, `${item.key}_${item.id}`) ? '-' : '+'}</span> : null}
                    </div>
                    <div className="filter-children-div ml-1">
                        {
                            dataChecking(this.state.selectedToggle, `${item.key}_${item.id}`) ?
                                this.renderFilterDiv(item.items)
                                : null
                        }
                    </div>
                </div>
            ));
        }
        return null;
    }


    render() {
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
                            {this.Paging()}
                            <div>
                                <select
                                    className="sorter"
                                    onChange={(value) => { this.setState({ sortValue: value }); this.sort(value); }}
                                    value={this.state.sortValue}
                                >
                                    {
                                        dataChecking(this.props, 'herlisting', 'data', 'sort', 'items') ?
                                        this.props.herlisting.data.sort.items.map((sort) =>
                                        (
                                            <option key={sort.id} value={sort.id}>{sort.text}</option>
                                        ))
                                        :
                                        null
                                    }
                                </select>
                            </div>
                            <div className="filter-container">
                                {this.renderFilterDiv(dataChecking(this.props, 'herlisting', 'data', 'filters'))}
                            </div>
                            <div>
                                {
                                    dataChecking(this.props, 'herlisting', 'contentLoading') ?
                                        <div>loading</div>
                                        :
                                        <div className={`${this.state.listView ? 'list_view' : 'grid_view'}`}>
                                            {
                                                dataChecking(this.props, 'herlisting', 'data', 'product', 'result', 'items') ?
                                                this.props.herlisting.data.product.result.items.map((product) =>
                                                    (
                                                        <div
                                                            key={product.id}
                                                            className={`product-card-div ${this.state.listView ? 'list_view_component' : 'grid_view_component'}`}
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
// <i class="fa fa-heart-o" aria-hidden="true"></i>

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
