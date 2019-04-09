
import {
    getCheckoutData,
    checkoutDataSuccess,
} from '../actions';
import {
    GET_CHECKOUT_DATA,
    CHECKOUT_DATA_SUCCESS,
} from '../constants';

describe('CartPage actions', () => {
    describe('get checkout data Action', () => {
        it('has a type of GET_CHECKOUT_DATA', () => {
            const expected = {
                type: GET_CHECKOUT_DATA,
            };
            expect(getCheckoutData()).toEqual(expected);
        });
    });
    describe('get checkout data success Action', () => {
        it('has a type of CHECKOUT_DATA_SUCCESS', () => {
            const expected = {
                type: CHECKOUT_DATA_SUCCESS,
            };
            expect(checkoutDataSuccess()).toEqual(expected);
        });
    });
});
