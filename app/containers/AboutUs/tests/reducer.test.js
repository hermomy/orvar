import { fromJS } from 'immutable';
import {
    getCareer,
    getPaymentBank,
    getDataSuccess,
    getDataFail,
} from '../actions';
import profileWishlistReducer from '../reducer';

describe('getWishlist', () => {
    let initialState;
    beforeEach(() => {
        initialState = fromJS({});
    });
    const successData = { data: true };
    it('expect reducer returns the initial state', (done) => {
        expect(profileWishlistReducer(undefined, {})).toEqual(fromJS({}));
        done();
    });

    it('expect reducer return when try to getCareer', (done) => {
        const expected = initialState.set('loading', true).set('success', false);
        expect(profileWishlistReducer(initialState, getCareer())).toEqual(expected);
        done();
    });

    it('expect reducer return when success to getData', (done) => {
        const expected = initialState.set('data', successData).set('loading', false).set('success', true);
        expect(profileWishlistReducer(initialState, getDataSuccess(successData))).toEqual(expected);
        done();
    });

    it('expect reducer return when fail to getData', (done) => {
        const expected = initialState.set('error').set('loading', false).set('error', false);
        expect(profileWishlistReducer(initialState, getDataFail())).toEqual(expected);
        done();
    });

    it('xpect reducer return when try to getPaymentBank', (done) => {
        const expected = initialState.set('loading', true).set('success', false);
        expect(profileWishlistReducer(initialState, getPaymentBank(123, 123))).toEqual(expected);
        done();
    });
});
