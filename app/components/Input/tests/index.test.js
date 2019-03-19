import React from 'react';
import { shallow } from 'enzyme';

import Input from '../index';

describe('<Input />', () => {
    describe('with no props', () => {
        const rendered = shallow(<Input type="submit" />);
        it('should not show label when no label is passed', () => {
            expect(rendered.find('label').length).toEqual(0);
        });

        it('should not have the form-control', () => {
            expect(rendered.find('.form-control').length).toEqual(0);
        });
    });

    describe('with some props', () => {
        it('should display label when props.label exist', () => {
            const withLabel = shallow(<Input label="test" />);
            expect(withLabel.find('label').length).toEqual(1);
        });

        it('should display "Loading..." when props.loading is true', () => {
            const d = true;
            const withLoading = shallow(<Input loading={d} />);
            expect(withLoading.find('input').props().value).toEqual('Loading...');
        });

        it('should display placeholder', () => {
            const expected = 'Placeholder';
            const withPlaceholder = shallow(<Input placeholder={expected} />);
            const rendered = withPlaceholder.find('input').props().placeholder;
            expect(rendered).toEqual(expected);
        });
    });
});
