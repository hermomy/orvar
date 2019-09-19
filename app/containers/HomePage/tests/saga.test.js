/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
// import { take, call, put, select } from 'redux-saga/effects';
// import { homePageSaga } from '../saga';
import homePageSaga, { defaultWorker } from '../saga';

// const generator = homePageSaga();

describe('homePageSaga', () => {
    it('Expect to have unit tests specified', () => {
        const generator = homePageSaga();
        expect(generator.next(defaultWorker()).value).toEqual(true);
    });
});
