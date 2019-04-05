/**
*
* SortFilter
*
*/

import {
    getData,
} from 'containers/HerListing/actions';
import React from 'react';
// import styled from 'styled-components';

import { dataChecking } from 'globalUtils';
import './style.scss';

class SortFilter extends React.Component { // eslint-disable-line react/prefer-stateless-function
    state = {
        listView: false,
        selectedFilter: null,
        selectedSorter: '',
        currentQueryString: null,
        selectedToggle: {},
    }

    componentWillMount() {
        if (this.props.initialSortFilterParams) {
            this.setState(this.props.initialSortFilterParams);
        }
    }

    // parentProps={this.props}
    // sortData={dataChecking(this.props, 'herlisting', 'data', 'sort')}
    // filterData={dataChecking(this.props, 'herlisting', 'data', 'filters')}
    // initialSortFilterParams: {
    //     selectedFilter: obj,
    //     selectedSorter,
    //     currentQueryString,
    // },

    updateSelectedSort = (event) => {
        const currentQueryString = this.state.currentQueryString.replace(this.state.selectedSorter, event.target.value).replace('?', '');
        this.props.parentProps.dispatch(getData(`${this.props.parentProps.herlisting.data.mall.product._links.self.href}?${currentQueryString}`));
        this.setState({
            selectedSorter: event.target.value,
            currentQueryString,
        });
        if (dataChecking(this.props.parentProps, 'history', 'push')) {
            this.props.parentProps.history.push(`${this.props.parentProps.location.pathname}?${currentQueryString}`);
        }
    }

    updateSelectedFilter = (item) => {
        const { parentProps } = this.props;
        if (!item.id || !item.key || dataChecking(this.props.parentProps, 'herlisting', 'loading')) { return; }

        const obj = { ...this.state.selectedFilter };
        if (obj[`${item.key}_${item.id}`]) {
            delete obj[`${item.key}_${item.id}`];
        } else {
            obj[`${item.key}_${item.id}`] = item;
        }
        let queryString = '';
        if (this.state.selectedSorter) {
            queryString = `sort=${this.state.selectedSorter}`;
        }
        let query = '';
        Object.values(obj).forEach((param) => {
            query = `${query}&${param.key}=${param.id}`;
        });
        queryString += query;
        if (dataChecking(parentProps, 'history', 'push')) {
            this.props.parentProps.history.push(`${this.props.parentProps.location.pathname}?${queryString}`);
        } else {
            console.warn('History for route not found.');
        }
        parentProps.dispatch(getData(`${parentProps.herlisting.data.mall.product._links.self.href}?${queryString}`));
        this.setState({ selectedFilter: obj, currentQueryString: queryString });
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

    renderSorter = (data) => {
        if (!data) { return null; }

        return (
            <select
                className="sort-item"
                onChange={this.updateSelectedSort}
                value={this.state.selectedSorter}
            >
                {
                    dataChecking(data, 'items', 'length') ?
                    this.props.parentProps.herlisting.data.mall.sort.items.map((sort) =>
                    (
                        <option key={sort.id} value={sort.id}>{sort.text}</option>
                    ))
                    :
                    null
                }
            </select>
        );
    }

    renderFilter = (list) => {
        if (dataChecking(list, 'length')) {
            return list.map((item) => (
                <div className="filter-item m-quater" key={item.text}>
                    <input
                        type="checkbox"
                        className={`${dataChecking(item, 'id') ? '' : 'invisible'}`}
                        onChange={() => this.updateSelectedFilter(item)}
                        checked={this.state.selectedFilter[`${item.key}_${item.id}`] || false}
                        disabled={dataChecking(this.props.parentProps, 'herlistng', 'loading')}
                    />
                    <div className="filter-item-display ml-quater" onClick={() => this.toggleFilter(item)}>
                        <span>{item.text}</span>
                        {item.items ? <span className="toggle-icon pl-quater">{dataChecking(this.state.selectedToggle, `${item.key}_${item.id}`) ? '-' : '+'}</span> : null}
                    </div>
                    <div className="filter-children-div ml-1">
                        {
                            dataChecking(this.state.selectedToggle, `${item.key}_${item.id}`) ?
                                this.renderFilter(item.items)
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
            <div>
                {/* <div>
                    <div>{JSON.stringify(this.state.selectedFilter)}</div>
                    <hr />
                    <div>{JSON.stringify(this.state.selectedSorter)}</div>
                    <hr />
                    <div>{JSON.stringify(this.state.currentQueryString)}</div>
                </div> */}
                <div className="sort-container my-half">
                    {this.renderSorter(dataChecking(this.props.parentProps, 'herlisting', 'data', 'mall', 'sort'))}
                </div>
                <div className="filter-container">
                    {this.renderFilter(dataChecking(this.props.parentProps, 'herlisting', 'data', 'mall', 'filters'))}
                </div>
            </div>
        );
    }
}

SortFilter.propTypes = {

};

export default SortFilter;
