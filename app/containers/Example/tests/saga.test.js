/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
// import { take, call, put, select } from 'redux-saga/effects';
// import { exampleSaga } from '../saga';
import exampleSaga, { defaultWorker } from '../saga';

// const generator = exampleSaga();

describe('exampleSaga', () => {
    it('Expect to have unit tests specified', () => {
        const generator = exampleSaga();
        expect(generator.next(defaultWorker()).value).toEqual(true);
    });
});
