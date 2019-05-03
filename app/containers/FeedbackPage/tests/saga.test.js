/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
// import { take, call, put, select } from 'redux-saga/effects';
// import { feedbackPageSaga } from '../saga';
import feedbackPageSaga, { defaultWorker } from '../saga';

// const generator = feedbackPageSaga();

describe('feedbackPageSaga', () => {
    it('Expect to have unit tests specified', () => {
        const generator = feedbackPageSaga();
        expect(generator.next(defaultWorker()).value).toEqual(true);
    });
});
