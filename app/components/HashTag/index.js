/**
*
* HashTag
*
*/

import React from 'react';
import StatefulLink from 'components/StatefulLink';
import PropTypes from 'prop-types';


function HashTag(props) {
    return (
        <div className={props.className}>
            {
                props.tags.map((tag) =>
                (
                    <StatefulLink
                        key={tag.id}
                        path={tag.url}
                        state={tag}
                        className={`hashtag ${tag.id}`}
                    >
                        #{tag.name}
                    </StatefulLink>
                ))
            }
        </div>
    );
}

HashTag.propTypes = {
    tags: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        url: PropTypes.string,
    })),
    // from: PropTypes.string.isRequired for ucf purpose
};

export default HashTag;
