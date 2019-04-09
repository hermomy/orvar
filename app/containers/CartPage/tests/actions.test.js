
import {
    getCheckoutData,
    checkoutDataSuccess,
} from '../actions';
import {
    GET_CHECKOUT_DATA,
    CHECKOUT_DATA_SUCCESS,
} from '../constants';

describe('CartPage actions', () => {
    it('should expect checkout constant', () => {
        expect(getCheckoutData()).toEqual({
            type: GET_CHECKOUT_DATA,
        });
    });

    it('should expect checkout success', () => {
        expect(checkoutDataSuccess()).toEqual({
            type: CHECKOUT_DATA_SUCCESS,
        });
    });
});
