/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
// import { take, call, put, select } from 'redux-saga/effects';
// import { checkoutPageSaga } from '../saga';
import checkoutPageSaga, { queryCheckoutData } from '../saga';

// const generator = checkoutPageSaga();

describe('checkoutPageSaga', () => {
    it('Expect to have unit tests specified', () => {
        const generator = checkoutPageSaga();
        expect(generator.next(queryCheckoutData()).FORK).toEqual(undefined);
    });
});
