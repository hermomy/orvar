/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
// import { take, call, put, select } from 'redux-saga/effects';
// import { materialUiTestingSaga } from '../saga';
import materialUiTestingSaga, { defaultWorker } from '../saga';

// const generator = materialUiTestingSaga();

describe('materialUiTestingSaga', () => {
    it('Expect to have unit tests specified', () => {
        const generator = materialUiTestingSaga();
        expect(generator.next(defaultWorker()).value).toEqual(true);
    });
});
