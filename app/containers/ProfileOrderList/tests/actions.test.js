
import {
    getOrderList,
} from '../actions';
import {
    GET_ORDER_LIST,
} from '../constants';

describe('Header actions', () => {
    describe('Get Order List', () => {
        it('has a type of LAYOUT_TOP_NAV', () => {
            const expected = {
                type: GET_ORDER_LIST,
            };
            expect(getOrderList({})).toEqual(expected);
        });
    });
});
