/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
// import { take, call, put, select } from 'redux-saga/effects';
// import { gamesPageSaga } from '../saga';
import gamesPageSaga, { defaultWorker } from '../saga';

// const generator = gamesPageSaga();

describe('gamesPageSaga', () => {
    it('Expect to have unit tests specified', () => {
        const generator = gamesPageSaga();
        expect(generator.next(defaultWorker()).value).toEqual(true);
    });
});
