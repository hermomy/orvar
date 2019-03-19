/**
*
* Modal
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.section`
    display: block;

`;

function Modal(props) {
    return (
        <div>
            <Container className="modal">
                <aside className="modal-dialog">
                    <div className="modal-content">
                        {props.title &&
                            <div className="modal-header">
                                <h3 className="modal-title">{props.title}</h3>
                            </div>
                        }
                        <div className="modal-body">
                            {props.children}
                        </div>
                    </div>
                </aside>
            </Container>
            <div className="modal-backdrop fade show"></div>
        </div>
    );
}

Modal.propTypes = {
    title: PropTypes.string,
    children: PropTypes.any,
};

export default Modal;
