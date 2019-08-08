/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
// import { take, call, put, select } from 'redux-saga/effects';
// import { profileOrderListSaga } from '../saga';
import profileOrderListSaga, { getOrderListWorker } from '../saga';

// const generator = profileOrderListSaga();

describe('profileOrderListSaga', () => {
    it('Expect to have unit tests specified', () => {
        const generator = profileOrderListSaga();
        expect(generator.next(getOrderListWorker()).FORK).toEqual(undefined);
    });
});
