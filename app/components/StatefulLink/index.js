/**
*
* StatefulLink
*
*  Parameters >>
*  - [state] State that want to pass to another page
*  - [path] Navigation Path
*
*  Sample Code >>
*  - <StatefulLink state={{ a: 1 }} path="/mall">title</StatefulLink>
*
*  Ways to get state >>
*  - this.props.history.location.state === { a: 1 }
*/

import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

function StatefulLink(props) {
    return (
        <NavLink
            to={{
                pathname: props.path,
                state: props.state,
            }}
            {...props}
        />
    );
}

StatefulLink.propTypes = {
    state: PropTypes.any,
    path: PropTypes.string.isRequired,
};

export default StatefulLink;
