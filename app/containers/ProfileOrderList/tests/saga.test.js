/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
// import { take, call, put, select } from 'redux-saga/effects';
// import { profileOrderListSaga } from '../saga';
import profileOrderListSaga, { defaultWorker } from '../saga';

// const generator = profileOrderListSaga();

describe('profileOrderListSaga', () => {
    it('Expect to have unit tests specified', () => {
        const generator = profileOrderListSaga();
        expect(generator.next(defaultWorker()).value).toEqual(true);
    });
});
