/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
// import { take, call, put, select } from 'redux-saga/effects';
// import { checkoutPageSaga } from '../saga';
import checkoutPageSaga, { defaultWorker } from '../saga';

// const generator = checkoutPageSaga();

describe('checkoutPageSaga', () => {
    it('Expect to have unit tests specified', () => {
        expect(true).toEqual(false);
        const generator = checkoutPageSaga();
        expect(generator.next(defaultWorker()).value).toEqual(true);
    });
});
