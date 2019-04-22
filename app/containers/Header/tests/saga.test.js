/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
// import { take, call, put, select } from 'redux-saga/effects';
// import { headerSaga } from '../saga';
import headerSaga, { defaultWorker } from '../saga';

// const generator = headerSaga();

describe('headerSaga', () => {
    it('Expect to have unit tests specified', () => {
        const generator = headerSaga();
        expect(generator.next(defaultWorker()).value).toEqual(true);
    });
});
