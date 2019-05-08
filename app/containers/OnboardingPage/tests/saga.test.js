/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
// import { take, call, put, select } from 'redux-saga/effects';
// import { onboardingPageSaga } from '../saga';
import onboardingPageSaga, { defaultWorker } from '../saga';

// const generator = onboardingPageSaga();

describe('onboardingPageSaga', () => {
    it('Expect to have unit tests specified', () => {
        const generator = onboardingPageSaga();
        expect(generator.next(defaultWorker()).value).toEqual(true);
    });
});
