/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
// import { take, call, put, select } from 'redux-saga/effects';
// import { mallPageSaga } from '../saga';
import mallPageSaga, { defaultWorker } from '../saga';

// const generator = mallPageSaga();

describe('mallPageSaga', () => {
    it('Expect to have unit tests specified', () => {
        const generator = mallPageSaga();
        expect(generator.next(defaultWorker()).value).toEqual(true);
    });
});
