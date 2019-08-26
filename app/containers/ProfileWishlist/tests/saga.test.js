/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
// import { take, call, put, select } from 'redux-saga/effects';
// import { profileWishlistSaga } from '../saga';
import profileWishlistSaga, { getWishlistWorker } from '../saga';

// const generator = profileWishlistSaga();

describe('profileWishlistSaga', () => {
    it('Expect to have unit tests specified', () => {
        const generator = profileWishlistSaga();
        expect(generator.next(getWishlistWorker()).FORK).toEqual(undefined);
    });
});
