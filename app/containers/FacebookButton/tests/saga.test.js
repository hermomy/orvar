/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
// import { take, call, put, select } from 'redux-saga/effects';
// import { facebookButtonSaga } from '../saga';
import facebookButtonSaga, { defaultWorker } from '../saga';

// const generator = facebookButtonSaga();

describe('facebookButtonSaga', () => {
    it('Expect to have unit tests specified', () => {
        const generator = facebookButtonSaga();
        expect(generator.next(defaultWorker()).value).toEqual(true);
    });
});
