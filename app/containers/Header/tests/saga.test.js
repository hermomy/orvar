/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
// import { take, call, put, select } from 'redux-saga/effects';
import headerSaga, { getTopNav } from '../saga';

// const generator = headerSaga();

describe('headerSaga', () => {
    it('Expect to have unit tests specified', () => {
        const generator = headerSaga();
        expect(generator.next(getTopNav()).FORK).toEqual(undefined);
    });
});
