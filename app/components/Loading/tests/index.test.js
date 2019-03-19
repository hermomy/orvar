import React from 'react';
import { shallow } from 'enzyme';

import Loading from '../index';

describe('<Loading />', () => {
    it('To have the text "Loading..."', () => {
        const renderedComponent = shallow(<Loading />);
        expect(renderedComponent.contains('Loading...')).toEqual(true);
    });
});
