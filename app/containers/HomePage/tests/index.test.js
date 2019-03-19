import React from 'react';
import { FormattedMessage } from 'react-intl';
import { shallow } from 'enzyme';

import HomePage from '../index';
import messages from '../messages';

describe('<HomePage />', () => {
    it('should render the page message', () => {
        const renderedComponent = shallow(
            <HomePage />
        );
        expect(renderedComponent.contains(
            <div className="container">
                <h1>
                    <FormattedMessage {...messages.header} />
                </h1>
            </div>
        )).toEqual(true);
    });
});
