/**
*
* Breadcrumb
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import StatefulLink from 'components/StatefulLink';

import './style.scss';

function Breadcrumb(props) {
    return (
        <ul>
            <li className="home">
                <StatefulLink path="?ucf=breadcrumb">Home </StatefulLink>
            </li>
            {
                props.paths.map((path, key) => (
                    <li className={path.text} key={key}>
                        <span>&gt;&gt;</span>
                        <StatefulLink path={`${path.url}?ucf=breadcrumb`}>
                            {path.text}
                        </StatefulLink>
                    </li>
                ))
            }
        </ul>
    );
}

Breadcrumb.propTypes = {
    paths: PropTypes.array.isRequired,
};

export default Breadcrumb;
