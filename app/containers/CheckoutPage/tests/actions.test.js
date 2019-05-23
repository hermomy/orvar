
import {
    getCheckout,
} from '../actions';
import {
    GET_CHECKOUT_DATA,
} from '../constants';

describe('CheckoutPage actions', () => {
    describe('Default Action', () => {
        it('has a type of GET_CHECKOUT_DATA', () => {
            const expected = {
                type: GET_CHECKOUT_DATA,
            };
            expect(getCheckout()).toEqual(expected);
        });
    });
});
