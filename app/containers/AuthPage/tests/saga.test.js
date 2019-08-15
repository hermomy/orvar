/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
// import { take, call, put, select } from 'redux-saga/effects';
// import { authPageSaga } from '../saga';
import authPageSaga, { defaultWorker } from '../saga';

// const generator = authPageSaga();

describe('authPageSaga', () => {
    it('Expect to have unit tests specified', () => {
        const generator = authPageSaga();
        expect(generator.next(defaultWorker()).value).toEqual(true);
    });
});
