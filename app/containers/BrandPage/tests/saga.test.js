/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
// import { take, call, put, select } from 'redux-saga/effects';
// import { brandPageSaga } from '../saga';
import brandPageSaga, { defaultWorker } from '../saga';

// const generator = brandPageSaga();

describe('brandPageSaga', () => {
    it('Expect to have unit tests specified', () => {
        const generator = brandPageSaga();
        expect(generator.next(defaultWorker()).value).toEqual(true);
    });
});
