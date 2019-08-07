/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
// import { take, call, put, select } from 'redux-saga/effects';
// import { profileOrderDetailSaga } from '../saga';
import profileOrderDetailSaga, { getOrderDataWorker } from '../saga';

// const generator = profileOrderDetailSaga();

describe('profileOrderDetailSaga', () => {
    it('Expect to have unit tests specified', () => {
        const generator = profileOrderDetailSaga();
        expect(generator.next(getOrderDataWorker()).FORK).toEqual(undefined);
    });
});
