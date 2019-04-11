/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
// import { take, call, put, select } from 'redux-saga/effects';
// import { profilePageSaga } from '../saga';
import profilePageSaga, { defaultWorker } from '../saga';

// const generator = profilePageSaga();

describe('profilePageSaga', () => {
    it('Expect to have unit tests specified', () => {
        const generator = profilePageSaga();
        expect(generator.next(defaultWorker()).value).toEqual(true);
    });
});
