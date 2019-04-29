
import { fromJS } from 'immutable';
import profilePageReducer from '../reducer';
import {
    getProfile,
    getProfileSuccess,
    getProfileFail,
 } from '../actions';

describe('profilePageReducer', () => {
    let initialState;
    beforeEach(() => {
        initialState = fromJS({
            data: null,
            loading: false,
            error: false,
        });
    });

    it('expect reducer returns the initial state', (done) => {
        expect(profilePageReducer(undefined, {})).toEqual(fromJS({}));
        done();
    });

    it('expect reducer return when try to getProfile', (done) => {
        const expected = initialState.set('loading', true).set('error', false);
        expect(profilePageReducer(initialState, getProfile('https://api.hermo.my/profile'))).toEqual(expected);
        done();
    });

    it('expect reducer return when success to getProfile', (done) => {
        const expected = initialState.set('data', true).set('loading', false).set('error', false);
        expect(profilePageReducer(initialState, getProfileSuccess(true))).toEqual(expected);
        done();
    });

    it('expect reducer return when fail to getProfile', (done) => {
        const expected = initialState.set('data', true).set('loading', false).set('error', true);
        expect(profilePageReducer(initialState, getProfileFail(true))).toEqual(expected);
        done();
    });
});
