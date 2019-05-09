
import {
    getCheckout,
} from '../actions';
import {
    GET_CART_DATA,
} from '../constants';

describe('CartPage actions', () => {
    describe('Default Action', () => {
        it('has a type of GET_CART_DATA', () => {
            const expected = {
                type: GET_CART_DATA,
            };
            expect(getCheckout()).toEqual(expected);
        });
    });
});
