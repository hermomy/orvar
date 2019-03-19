/**
*
* Pagination
*
*/

import React from 'react';
import PropTypes from 'prop-types';

export function handleClick(page, event, props) {
    if (event) {
        event.preventDefault();
    }
    props.goToPage(page);
}

function Pagination(props) {
    if (props.pageCount === 1) {
        return <span></span>;
    }

    const pageArray = [];

    for (let i = 1; i <= props.pageCount; i += 1) {
        pageArray.push({
            number: i,
            active: (i === props.currentPage) ? 'active' : '',
        });
    }

    return (
        <nav className="navigation">
            <ul className="pagination pagination-sm">
                {pageArray.map((page) => (
                    <li key={page.number} className={`page-item ${page.active}`}>
                        <a className="page-link" href="#default" onClick={(e) => handleClick(page.number, e, props)}>{page.number}</a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

Pagination.propTypes = {
    pageCount: PropTypes.number,
    currentPage: PropTypes.number,
};

export default Pagination;
