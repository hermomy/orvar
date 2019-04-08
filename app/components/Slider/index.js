/**
*
* Slider
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { isArray } from 'lodash';

import './style.scss';

function Slider(props) {
    let index = 0;
    return (
        <div className={props.className}>
            <div className="slider-title">{props.title}</div>
            <ul className="slider">
                {
                    isArray(props.contents) ?
                        props.contents.map((content) => (
                            <li key={`Slider_${index++}`}>{content}</li>
                        ))
                        :
                        props.contents
                }
            </ul>
        </div>
    );
}

Slider.propTypes = {
    title: PropTypes.string.isRequired,
};

export default Slider;
