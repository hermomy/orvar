/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
import {
    put,
    takeLatest,
    call,
} from 'redux-saga/effects';
import { apiRequest } from 'globalUtils';
import {
    getWishlist,
    getWishlistSuccess,
    getWishlistFail,
    deleteWishlist,
} from '../actions';
import {
    GET_WISHLIST,
    DELETE_WISHLIST,
} from '../constants';
import profileWishlistSaga, { WishlistDataWorker, DeleteWishlistWorker } from '../saga';

describe('herlisting Saga', () => {
    it('Expect GET_WISHLIST to trigger WishlistDataWorker', () => {
        const generator = profileWishlistSaga();
        expect(generator.next().value).toEqual([
            takeLatest(GET_WISHLIST, WishlistDataWorker),
        ]);
    });

    it('Expect success to get wishlist', () => {
        const responce = { ok: true };
        const generator = WishlistDataWorker(getWishlist(1));
        expect(generator.next().value).toEqual(call(apiRequest, '/wishlist', 'get'));
        expect(generator.next(responce).value).toEqual(put(getWishlistSuccess()));
    });

    it('Expect fail to get wishlist', () => {
        const responce = { ok: false };
        const generator = WishlistDataWorker(getWishlist(1));
        expect(generator.next().value).toEqual(call(apiRequest, '/wishlist', 'get'));
        expect(generator.next(responce).value).toEqual(put(getWishlistFail()));
    });

// --------------------
    it('Expect DELETE_WISHLIST to trigger DeleteWishlistWorker', () => {
        const generator = profileWishlistSaga();
        expect(generator.next().value).toEqual([
            takeLatest(DELETE_WISHLIST, DeleteWishlistWorker),
        ]);
    });

    it('Expect success to delete wishlist', () => {
        const responce = { ok: true };
        const generator = DeleteWishlistWorker(deleteWishlist(123, 123));
        expect(generator.next().value).toEqual(call(apiRequest, '/wishlist', 'delete'));
        expect(generator.next(responce).value).toEqual(put(getWishlistSuccess()));
    });

    it('Expect fail to delete wishlist', () => {
        const responce = { ok: false };
        const generator = DeleteWishlistWorker(deleteWishlist(123, 123));
        expect(generator.next().value).toEqual(call(apiRequest, '/wishlist', 'delete'));
        expect(generator.next(responce).value).toEqual(put(getWishlistFail()));
    });
});
