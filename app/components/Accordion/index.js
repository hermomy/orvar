/**
*
* Accordion
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

class Accordion extends React.Component { // eslint-disable-line react/prefer-stateless-function
    state = {};

    toggleAccordion(key) {
        this.setState({
            [key]: !this.state[key],
        });
    }

    render() {
        return (
            <div className={this.props.className}>
                {
                    this.props.contents.map((content) => {
                        const status = this.state[content.key] ? 'active' : '';
                        const height = status ?
                            this.props.height_threshold || '162px' :
                            '0px';
                        return (
                            <div
                                className="accordion-container"
                                key={content.key}
                                onClick={() => this.toggleAccordion(content.key)}
                            >
                                <div className={`accordion-title ${status}`}>
                                    {content.title}
                                    <span className={`accordion-icon ${status}`}>&gt;</span>
                                </div>
                                <div className={`accordion-content ${status}`} style={{ maxHeight: height }}>
                                    {content.description}
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

Accordion.propTypes = {
    contents: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
    })),
    height_threshold: PropTypes.string,
};

export default Accordion;
