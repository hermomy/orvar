/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { put, call } from 'redux-saga/effects';
import { apiRequest } from 'globalUtils';

import cartPageSaga, { getCheckoutData } from '../saga';
import { getCheckout } from '../actions';

describe('cartPageSaga', () => {
    it('Expect to contain GET_CHECKOUT_DATA when cartPageSage is triggered', () => {
        const generator = cartPageSaga();
        const mock = generator.next().value.FORK.args[0];
        const expected = put(getCheckout()).PUT.action.type;
        expect(mock).toEqual(expected);
    });

    it('Expect to return API when trigged getCheckData', () => {
        const generator = getCheckoutData();
        expect(generator.next().value).toEqual(call(apiRequest, '/cart', 'get'));
    });
});
