import React from 'react';
import { shallow } from 'enzyme';

import Pagination, { handleClick } from '../index';

describe('<Pagination />', () => {
    let meta;
    const goToPage = jest.fn();

    beforeEach(() => {
        meta = {
            totalCount: 2,
            pageCount: 2,
            currentPage: 1,
            perPage: 1,
        };
    });

    it('should render a BS4 <li> pagination items if pageCount > 1', () => {
        const renderedComponent = shallow(<Pagination {...meta} goToPage={goToPage} />);
        const list = renderedComponent.find('.page-item');
        expect(list.length).toBeGreaterThan(1);
    });

    it('should render <span></span> if pageCount == 1', () => {
        meta.pageCount = 1;
        const renderedComponent = shallow(<Pagination {...meta} goToPage={goToPage} />);
        const expected = shallow(<span></span>);
        expect(renderedComponent).toEqual(expected);
    });

    it('should execute goToPage when clicked on one of .page-link element', () => {
        const renderedComponent = shallow(<Pagination {...meta} goToPage={goToPage} />);
        const link = renderedComponent.find('.page-link').first();
        link.simulate('click');

        expect(link.length).toBeGreaterThan(0);
        expect(goToPage).toHaveBeenCalledTimes(1);
    });

    it('should handle preventDefault when <a> is clicked', () => {
        const event = { preventDefault: jest.fn };
        const spy = jest.spyOn(event, 'preventDefault');
        handleClick(null, event, { goToPage });
        expect(spy).toHaveBeenCalledTimes(1);
    });
});
