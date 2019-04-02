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
                        if (!content.togglable) {
                            return (
                                <div
                                    className="accordion-container"
                                    key={content.key}
                                >
                                    {content.title}
                                </div>
                            );
                        }
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
                                    <span className="accordion-icon">
                                        {
                                            status === 'active' ?
                                                this.props.active_icon
                                                :
                                                this.props.inactive_icon
                                        }
                                    </span>
                                </div>
                                <div className={`accordion-content ${status}`} style={{ maxHeight: height }}>
                                    <div dangerouslySetInnerHTML={{ __html: content.description }} />
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
        title: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.element,
        ]),
        description: PropTypes.string,
        togglable: PropTypes.bool,
    })),
    height_threshold: PropTypes.string,
    active_icon: PropTypes.string,
    inactive_icon: PropTypes.string,
};

export default Accordion;
