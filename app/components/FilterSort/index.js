/**
*
* FilterSort
*
*/

import React from 'react';
// import styled from 'styled-components';
import { dataChecking } from 'globalUtils';
import './style.scss';

class FilterSort extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    state = {
        selectedSort: null,
        selectedToggle: null,
    }

    componentWillMount() {
        const tempLocationSearch = this.props.location.search.replace('?', '').split('&');
        const tempSelectedToggle = { ...this.state.selectedToggle };
        let tempSelectedSort = 'default';
        Object.values(tempLocationSearch).forEach((locationSearch) => {
            const tempSplit = locationSearch.split('=');
            if (tempSplit && tempSplit[0] === 'sort') {
                tempSelectedSort = tempSplit[1];
            } else if (tempSplit && tempSplit[0] !== 'ucf') {
                tempSelectedToggle[`${tempSplit[0]}_${tempSplit[1]}`] = {
                    key: tempSplit[0],
                    id: tempSplit[1],
                };
            }
        });
        this.setState({ selectedSort: tempSelectedSort, selectedToggle: tempSelectedToggle });
    }

    toggleFilter = (item) => {
        let key;
        if (item.items) {
            if (item.key && item.id) {
                key = `${item.key}_${item.id}`;
            } else {
                key = `${item.text}`;
            }
            const obj = { ...this.state.selectedToggle };
            obj[key] = !obj[key];
            this.setState({ selectedToggle: obj });
        } else {
            this.props.changeFilter(item.key, item.id);
        }
    }

    updateSelectedToggle = (item) => {
        if (!item.id || !item.key || dataChecking(this.props.parentProps, 'herlisting', 'loading')) { return; }

        const obj = { ...this.state.selectedToggle };
        if (obj[`${item.key}_${item.id}`]) {
            delete obj[`${item.key}_${item.id}`];
        } else {
            obj[`${item.key}_${item.id}`] = item;
        }
        this.setState({ selectedToggle: obj });
        this.props.changeFilter(item.key, item.id);
    }

    renderFilter = (filters) => {
        if (dataChecking(filters, 'length')) {
            return filters.map((filter) => (
                <div className="filter-item m-quater" key={filter.text}>
                    <input
                        type="checkbox"
                        className={`${dataChecking(filter, 'id') ? '' : 'invisible'}`}
                        onChange={() => this.props.changeFilter(filter.key, filter.id)}
                        defaultChecked={this.state.selectedToggle[`${filter.key}_${filter.id}`] || false}
                        disabled={dataChecking(this.props.parentProps, 'herlisting', 'loading')}
                    />
                    <div className="filter-item-display ml-quater" onClick={() => this.toggleFilter(filter)}>
                        <span>{filter.text}</span>
                        {filter.items ? <span className="toggle-icon pl-quater">{dataChecking(this.state.selectedToggle, `${filter.key}_${filter.id}`) ? '-' : '+'}</span> : null}
                    </div>
                    <div className="filter-children-div ml-1">
                        {
                            dataChecking(this.state.selectedToggle, `${filter.key}_${filter.id}`) || dataChecking(this.state.selectedToggle, `${filter.text}`) ?
                                this.renderFilter(filter.items)
                                : null
                        }
                    </div>
                </div>
            ));
        }
        return null;
    }

    renderSorter = (sorts) => {
        if (!sorts) { return null; }
        return (
            <select
                className="sort-item"
                value={this.state.selectedSort}
                onChange={(e) => { this.props.changeSort(this.state.selectedSort, e.target.value); this.setState({ selectedSort: e.target.value }); }}
            >
                {
                    dataChecking(sorts, 'length') ?
                    sorts.map((sort) =>
                    (
                        <option key={sort.id} value={sort.id}>{sort.text}</option>
                    ))
                    :
                    null
                }
            </select>
        );
    }

    render() {
        return (
            <div>
                <div className="sort-container my-half">
                    {this.renderSorter(this.props.sorts)}
                </div>
                <div className="filter-container">
                    {this.renderFilter(this.props.filters)}
                </div>
            </div>
        );
    }
}

FilterSort.propTypes = {

};

export default FilterSort;
