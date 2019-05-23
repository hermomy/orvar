/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
// import { take, call, put, select } from 'redux-saga/effects';
// import { profileEditInformSaga } from '../saga';
import profileEditInformSaga, { getUserInformWorker } from '../saga';

// const generator = profileEditInformSaga();

describe('profileEditInformSaga', () => {
    it('Expect to have unit tests specified', () => {
        const generator = profileEditInformSaga();
        expect(generator.next(getUserInformWorker()).FORK).toEqual(undefined);
    });
});
