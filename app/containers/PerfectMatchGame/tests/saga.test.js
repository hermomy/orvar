/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
// import { take, call, put, select } from 'redux-saga/effects';
// import { perfectMatchGameSaga } from '../saga';
import perfectMatchGameSaga, { defaultWorker } from '../saga';

// const generator = perfectMatchGameSaga();

describe('perfectMatchGameSaga', () => {
    it('Expect to have unit tests specified', () => {
        const generator = perfectMatchGameSaga();
        expect(generator.next(defaultWorker()).value).toEqual(true);
    });
});
