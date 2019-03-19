import React from 'react';
import { shallow } from 'enzyme';

import Modal from '../index';

describe('<Modal />', () => {
    it('should use BS4 modal', () => {
        const modal = shallow(<Modal />);

        const expected = [
            modal.find('.modal').length,
            modal.find('.modal-dialog').length,
            modal.find('.modal-body').length,
        ];

        const mock = [1, 1, 1];

        expect(expected).toEqual(mock);
    });

    it('should render modal header when title is passed', () => {
        const modal = shallow(<Modal header={{}} title="Modal Title" />);
        expect(modal.find('.modal-header').length).toEqual(1);
        expect(modal.find('.modal-title').length).toEqual(1);
    });
});
