import { fromJS } from 'immutable';
import {
    getWishlist,
    getWishlistSuccess,
    getWishlistFail,
    deleteWishlist,
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

    it('expect reducer return when try to getWishlist', (done) => {
        const expected = initialState.set('loading', true).set('error', false);
        expect(profileWishlistReducer(initialState, getWishlist('https://api.hermo.my/mall'))).toEqual(expected);
        done();
    });

    it('expect reducer return when success to getWishlist', (done) => {
        const expected = initialState.set('data', successData).set('success', true).set('loading', false).set('error', false);
        expect(profileWishlistReducer(initialState, getWishlistSuccess(successData))).toEqual(expected);
        done();
    });

    it('expect reducer return when fail to getWishlist', (done) => {
        const expected = initialState.set('loading', false).set('error');
        expect(profileWishlistReducer(initialState, getWishlistFail())).toEqual(expected);
        done();
    });

    it('expect reducer return when try to deleteWishlist', (done) => {
        const expected = initialState.set('delete', true).set('loading', false).set('error');
        expect(profileWishlistReducer(initialState, deleteWishlist(123, 123))).toEqual(expected);
        done();
    });
});
