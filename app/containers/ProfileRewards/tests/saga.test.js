/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
// import { take, call, put, select } from 'redux-saga/effects';
// import { profileRewardsSaga } from '../saga';
import profileRewardsSaga, { defaultWorker } from '../saga';

// const generator = profileRewardsSaga();

describe('profileRewardsSaga', () => {
    it('Expect to have unit tests specified', () => {
        const generator = profileRewardsSaga();
        expect(generator.next(defaultWorker()).value).toEqual(true);
    });
});
