/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
// import { take, call, put, select } from 'redux-saga/effects';
// import { profileReviewSaga } from '../saga';
import profileReviewSaga, { defaultWorker } from '../saga';

// const generator = profileReviewSaga();

describe('profileReviewSaga', () => {
    it('Expect to have unit tests specified', () => {
        const generator = profileReviewSaga();
        expect(generator.next(defaultWorker()).value).toEqual(true);
    });
});
