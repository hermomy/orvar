/**
*
* SortFilter
*
*/

import {
    getPage,
} from 'containers/HerListing/actions';
import React from 'react';
// import styled from 'styled-components';

import { dataChecking } from 'globalUtils';
import './style.scss';

class SortFilter extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    state = {
        listView: false,
        selectedFilter: { ...this.props.initialSortFilterParams.selectedFilter },
        sortValue: this.props.initialSortFilterParams.sortValue,
        currentQueryString: this.props.initialSortFilterParams.currentQueryString,
        selectedToggle: {},
    }

    updateSelectedSort = (event) => {
        const currentQueryString = this.state.currentQueryString.replace(this.state.sortValue, event.target.value).replace('?', '');
        if (dataChecking(this.props.parent, 'history', 'push')) {
            this.props.parent.history.push(`${this.props.parent.location.pathname}?${currentQueryString}`);
        }
        this.props.dpatch(this.props.parent.herlisting.data.product._links.self.href, currentQueryString);
        this.setState({ sortValue: event.target.value, currentQueryString });
    }

    updateSelectedFilter = (item) => {
        const { parent } = this.props;
        if (!item.id || !item.key || dataChecking(parent, 'herlisting', 'contentLoading')) { return; }

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
        if (dataChecking(parent, 'history', 'push')) {
            parent.history.push(`${parent.location.pathname}?${queryString}`);
        } else {
            console.warn('History for route not found.');
        }
        parent.dispatch(getPage(`${parent.herlisting.data.product._links.self.href}?${queryString}`));
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

    renderFilter = (list) => {
        if (dataChecking(list, 'length')) {
            return list.map((item) => (
                <div className="filter-item m-quater" key={item.text}>
                    <input
                        type="checkbox"
                        className={`${dataChecking(item, 'id') ? '' : 'invisible'}`}
                        onChange={() => this.updateSelectedFilter(item)}
                        checked={this.state.selectedFilter[`${item.key}_${item.id}`] || false}
                        disabled={dataChecking(this.props.parent, 'herlistng', 'contentLoading')}
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
                <div>
                    <select
                        className="sorter"
                        onChange={(value) => { this.setState({ sortValue: value }); this.updateSelectedSort(value); }}
                        value={this.state.sortValue}
                    >
                        {
                            dataChecking(this.props.parent, 'herlisting', 'data', 'sort', 'items') ?
                            this.props.parent.herlisting.data.sort.items.map((sort) =>
                            (
                                <option key={sort.id} value={sort.id}>{sort.text}</option>
                            ))
                            :
                            null
                        }
                    </select>
                </div>
                <div className="filter-container">
                    {this.renderFilter(dataChecking(this.props.parent, 'herlisting', 'data', 'filters'))}
                </div>
            </div>
        );
    }
}

SortFilter.propTypes = {

};

export default SortFilter;
