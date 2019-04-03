/**
*
* Slider
*
*/

import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

function Slider(props) {
    return (
        <div className={props.className}>
            <div className="slider-title">{props.title}</div>
            <ul className="slider">
                {
                    props.contents.map((content) => (
                        <li>{content}</li>
                    ))
                }
            </ul>
        </div>
    );
}

Slider.propTypes = {
    title: PropTypes.string.isRequired,
};

export default Slider;
