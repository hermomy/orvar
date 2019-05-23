/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
// import { take, call, put, select } from 'redux-saga/effects';
// import { aboutUsSaga } from '../saga';
import aboutUsSaga, { getCareerDataWorker } from '../saga';

// const generator = aboutUsSaga();

describe('aboutUsSaga', () => {
    it('Expect to have unit tests specified', () => {
        const generator = aboutUsSaga();
        expect(generator.next(getCareerDataWorker()).FORK).toEqual(undefined);
    });
});
