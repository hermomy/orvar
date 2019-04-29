import { fromJS } from 'immutable';
import {
    mainGetProfile,
    mainGetProfileSuccess,
    mainGetProfileFail,
} from '../actions';
import profileWholePageReducer from '../reducer';

describe('profileWholePageReducer', () => {
    let initialState;
    beforeEach(() => {
        initialState = fromJS({});
    });
    const successData = { data: true };
    it('expect reducer returns the initial state', (done) => {
        expect(profileWholePageReducer(undefined, {})).toEqual(fromJS({}));
        done();
    });

    it('expect reducer return when try to getProfile', (done) => {
        const expected = initialState.set('loading', true).set('success', false);
        expect(profileWholePageReducer(initialState, mainGetProfile('https://api.hermo.my/mall'))).toEqual(expected);
        done();
    });

    it('expect reducer return when success to getProfile', (done) => {
        const expected = initialState.set('data', successData).set('loading', false).set('success', true);
        expect(profileWholePageReducer(initialState, mainGetProfileSuccess(successData))).toEqual(expected);
        done();
    });

    it('expect reducer return when fail to getProfile', (done) => {
        const expected = initialState.set('loading', false).set('success', false);
        expect(profileWholePageReducer(initialState, mainGetProfileFail(false))).toEqual(expected);
        done();
    });
});
