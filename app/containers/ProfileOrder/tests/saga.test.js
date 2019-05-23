/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
// import { take, call, put, select } from 'redux-saga/effects';
// import { profileOrderSaga } from '../saga';
import profileOrderSaga, { orderDataWorker } from '../saga';

// const generator = profileOrderSaga();

describe('profileOrderSaga', () => {
    it('Expect to have unit tests specified', () => {
        const generator = profileOrderSaga();
        expect(generator.next(orderDataWorker()).FORK).toEqual(undefined);
    });
});
