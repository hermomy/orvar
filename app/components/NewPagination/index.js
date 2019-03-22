/**
*
* NewPagination
*
*/

import React from 'react';
// import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import messages from './messages';
import './style.scss';

class NewPagination extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <div>
                <FormattedMessage {...messages.header} />
            </div>
        );
    }
}

NewPagination.propTypes = {

};

export default NewPagination;
