/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
// import { take, call, put, select } from 'redux-saga/effects';
// import { signUpPageSaga } from '../saga';
import signUpPageSaga, { defaultWorker } from '../saga';

// const generator = signUpPageSaga();

describe('signUpPageSaga', () => {
    it('Expect to have unit tests specified', () => {
        const generator = signUpPageSaga();
        expect(generator.next(defaultWorker()).value).toEqual(true);
    });
});
