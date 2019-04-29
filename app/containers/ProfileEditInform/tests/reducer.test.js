import { fromJS } from 'immutable';
import {
    getInformChoice,
    getUserInform,
    getUserAddress,
    getDataSuccess,
    getDataFail,
    putData,
    postAddress,
} from '../actions';
import profileEditInformReducer from '../reducer';

describe('getWishlist', () => {
    let initialState;
    beforeEach(() => {
        initialState = fromJS({});
    });
    const successData = { data: true };
    it('expect reducer returns the initial state', (done) => {
        expect(profileEditInformReducer(undefined, {})).toEqual(fromJS({}));
        done();
    });

    it('expect reducer return when try to getUserInform', (done) => {
        const expected = initialState.set('loading', true).set('success', false);
        expect(profileEditInformReducer(initialState, getUserInform())).toEqual(expected);
        done();
    });

    it('expect reducer return when try to getInformChoice', (done) => {
        const expected = initialState.set('loading', true).set('success', false);
        expect(profileEditInformReducer(initialState, getInformChoice())).toEqual(expected);
        done();
    });

    it('expect reducer return when try to getUserAddress', (done) => {
        const expected = initialState.set('loading', true).set('success', false);
        expect(profileEditInformReducer(initialState, getUserAddress(123))).toEqual(expected);
        done();
    });

    it('expect reducer return when success to getData', (done) => {
        const expected = initialState.set('data', successData).set('loading', false).set('success', true);
        expect(profileEditInformReducer(initialState, getDataSuccess(successData))).toEqual(expected);
        done();
    });

    it('expect reducer return when fail to getData', (done) => {
        const expected = initialState.set('loading', false).set('success', false).set('error');
        expect(profileEditInformReducer(initialState, getDataFail(successData))).toEqual(expected);
        done();
    });

    it('xpect reducer return when try to putData', (done) => {
        const expected = initialState.set('putLoading', true).set('success', false);
        expect(profileEditInformReducer(initialState, putData(123))).toEqual(expected);
        done();
    });

    it('xpect reducer return when try to postAddress', (done) => {
        const expected = initialState.set('postLoading', true).set('success', false);
        expect(profileEditInformReducer(initialState, postAddress(123))).toEqual(expected);
        done();
    });
});
