/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
// import { take, call, put, select } from 'redux-saga/effects';
// import { profileAddressSaga } from '../saga';
import profileAddressSaga, { defaultWorker } from '../saga';

// const generator = profileAddressSaga();

describe('profileAddressSaga', () => {
    it('Expect to have unit tests specified', () => {
        const generator = profileAddressSaga();
        expect(generator.next(defaultWorker()).value).toEqual(true);
    });
});
