/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
// import { take, call, put, select } from 'redux-saga/effects';
// import { footerSaga } from '../saga';
import footerSaga, { defaultWorker } from '../saga';

// const generator = footerSaga();

describe('footerSaga', () => {
    it('Expect to have unit tests specified', () => {
        const generator = footerSaga();
        expect(generator.next(defaultWorker()).value).toEqual(true);
    });
});
