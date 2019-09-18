/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
// import { take, call, put, select } from 'redux-saga/effects';
// import { loginFormSaga } from '../saga';
import loginFormSaga, { defaultWorker } from '../saga';

// const generator = loginFormSaga();

describe('loginFormSaga', () => {
    it('Expect to have unit tests specified', () => {
        const generator = loginFormSaga();
        expect(generator.next(defaultWorker()).value).toEqual(true);
    });
});
