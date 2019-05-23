
import {
    layoutTopNav,
} from '../actions';
import {
    LAYOUT_TOP_NAV,
} from '../constants';

describe('Header actions', () => {
    describe('Default Action', () => {
        it('has a type of LAYOUT_TOP_NAV', () => {
            const expected = {
                type: LAYOUT_TOP_NAV,
            };
            expect(layoutTopNav()).toEqual(expected);
        });
    });
});
