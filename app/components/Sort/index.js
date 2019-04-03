/**
*
* Sort
*
*/

import React from 'react';

import { dataChecking } from 'globalUtils';
// import styled from 'styled-components';

import './style.scss';

class Sort extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    updateSelectedSort = (event) => {
        const currentQueryString = this.props.getCurrentQueryString().replace(this.props.getSortValue(), event.target.value).replace('?', '');
        if (dataChecking(this.props.props, 'history', 'push')) {
            this.props.props.history.push(`${this.props.props.location.pathname}?${currentQueryString}`);
        }
        this.props.dpatch(this.props.props.herlisting.data.product._links.self.href, currentQueryString);
        this.props.setState_SortValue(event.target.value);
        this.props.setState_CurrentQueryString(currentQueryString);
    }

    render() {
        return (
            <div>
                <select
                    className="sorter"
                    onChange={(value) => { this.props.setState_SortValue(value); this.updateSelectedSort(value); }}
                    value={this.props.getSortValue()}
                >
                    {
                        this.props.props.herlisting.data.sort.items.map((sort) =>
                        (
                            <option key={sort.id} value={sort.id}>{sort.text}</option>
                        ))
                    }
                </select>
            </div>
        );
    }
}

Sort.propTypes = {

};

export default Sort;
