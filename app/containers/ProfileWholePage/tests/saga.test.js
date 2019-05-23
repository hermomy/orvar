/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
// import { take, call, put, select } from 'redux-saga/effects';
// import { profileWholePageSaga } from '../saga';
import profileWholePageSaga, { mainProfileDataWorker } from '../saga';

// const generator = profileWholePageSaga();

describe('profileWholePageSaga', () => {
    it('Expect to have unit tests specified', () => {
        const generator = profileWholePageSaga();
        expect(generator.next(mainProfileDataWorker()).FORK).toEqual(undefined);
    });
});
