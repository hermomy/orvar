/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
// import { take, call, put, select } from 'redux-saga/effects';
// import { mallPageSaga } from '../saga';
import mallPageSaga, { getMallDataWorker } from '../saga';

// const generator = mallPageSaga();

describe('mallPageSaga', () => {
    it('Expect to have unit tests specified', () => {
        const generator = mallPageSaga();
        expect(generator.next(getMallDataWorker()).FORK).toEqual(undefined);
    });
});
