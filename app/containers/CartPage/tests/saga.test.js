/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
// import { take, call, put, select } from 'redux-saga/effects';
// import { cartPageSaga } from '../saga';
import cartPageSaga, { getCheckoutData } from '../saga';

// const generator = cartPageSaga();

describe('cartPageSaga', () => {
    it('Expect to have unit tests specified', () => {
        const generator = cartPageSaga();
        expect(generator.next(getCheckoutData()).value).toEqual(true);
    });
});
