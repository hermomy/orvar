/**
*
* HashTag
*
*/

import React from 'react';
import PropTypes from 'prop-types';


function HashTag(props) {
    return (
        <div>
            {
                props.tags.map((tag) =>
                (
                    <div
                        key={tag.id}
                        className={`hashtag ${tag.id}`}
                        // onClick
                    >
                        #{tag.name}
                    </div>
                ))
            }
        </div>
    );
}

HashTag.propTypes = {
    tags: PropTypes.array.isRequired,
};

export default HashTag;
