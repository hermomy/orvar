/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
// import { take, call, put, select } from 'redux-saga/effects';
// import { beautyWallSaga } from '../saga';
import beautyWallSaga, { defaultWorker } from '../saga';

// const generator = beautyWallSaga();

describe('beautyWallSaga', () => {
    it('Expect to have unit tests specified', () => {
        const generator = beautyWallSaga();
        expect(generator.next(defaultWorker()).value).toEqual(true);
    });
});
