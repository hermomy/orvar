/**
*
* Filter
*
*/

import React from 'react';
import { dataChecking } from 'globalUtils';
// import styled from 'styled-components';

import './style.scss';

class Filter extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    state = {
        child: [],
    }

    updateSelectedFilter = (item) => {
        if (!item.id || !item.key || dataChecking(this.props.props, 'herlisting', 'contentLoading')) { return; }

        const obj = { ...this.props.getSelectedFilter() };
        if (obj[`${item.key}_${item.id}`]) {
            delete obj[`${item.key}_${item.id}`];
        } else {
            obj[`${item.key}_${item.id}`] = item;
        }
        let queryString = '';
        if (this.props.getSortValue()) {
            queryString = `sort=${this.props.getSortValue()}`;
        }
        let query = '';
        Object.values(obj).forEach((param) => {
            query = `${query}&${param.key}=${param.id}`;
        });
        queryString += query;
        if (dataChecking(this.props.props, 'history', 'push')) {
            this.props.props.history.push(`${this.props.props.location.pathname}?${queryString}`);
        }
        this.props.dpatch(this.props.props.herlisting.data.product._links.self.href, queryString);
        this.props.setState_SelectedFilter(obj);
        this.props.setState_CurrentQueryString(queryString);
    }

    toggleFilter = (item) => {
        if (item.items) {
            const key = `${item.key}_${item.id}`;
            const obj = { ...this.props.getSelectedToggle() };
            obj[key] = !obj[key];
            this.props.setState_SelectedToggle(obj);
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
                        checked={this.props.getSelectedFilter()[`${item.key}_${item.id}`] || this.state.child[`${item.key}_${item.id}`] || false}
                        disabled={dataChecking(this.props.props, 'herlistng', 'contentLoading')}
                    />
                    <div className="filter-item-display ml-quater" onClick={() => this.toggleFilter(item)}>
                        <span>{item.text}</span>
                        {item.items ? <span className="toggle-icon pl-quater">{dataChecking(this.props.getSelectedToggle(), `${item.key}_${item.id}`) ? '-' : '+'}</span> : null}
                    </div>
                    <div className="filter-children-div ml-1">
                        {
                            dataChecking(this.props.getSelectedToggle(), `${item.key}_${item.id}`) ?
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
                {
                    this.renderFilter(dataChecking(this.props.props, 'herlisting', 'data', 'filters'))
                }
            </div>
        );
    }
}

Filter.propTypes = {

};

export default Filter;
