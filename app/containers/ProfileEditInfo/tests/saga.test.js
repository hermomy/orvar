/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
// import { take, call, put, select } from 'redux-saga/effects';
// import { profileEditInfoSaga } from '../saga';
import profileEditInfoSaga, { getUserDataWorker } from '../saga';

// const generator = profileEditInfoSaga();

describe('profileEditInfoSaga', () => {
    it('Expect to have unit tests specified', () => {
        const generator = profileEditInfoSaga();
        expect(generator.next(getUserDataWorker()).FORK).toEqual(undefined);
    });
});
