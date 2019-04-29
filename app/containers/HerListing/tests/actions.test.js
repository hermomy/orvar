
import {
    getData,
    getDataSuccess,
    getDataFail,
    getProductSuccess,
    postWishlist,
} from '../actions';
import {
    GET_DATA,
    GET_DATA_SUCCESS,
    GET_PRODUCT_SUCCESS,
    GET_DATA_FAIL,
    POST_WISHLIST,
} from '../constants';


describe('getData action', () => {
    it('has a type of GETDATA', () => {
        const expected = {
            type: GET_DATA,
        };
        expect(getData()).toEqual(expected);
    });
});

describe('getDataSuccess action', () => {
    const apiData = true;
    it('has a type of GETDATASUCCESS', () => {
        const expected = {
            type: GET_DATA_SUCCESS,
            data: true,
        };
        expect(getDataSuccess(apiData)).toEqual(expected);
    });
});

describe('getDataFail action', () => {
    it('has a type of GETDATAFAIL', () => {
        const expexted = {
            type: GET_DATA_FAIL,
        };
        expexted(getDataFail().toEqual(expexted));
    });
});

describe('getProductSuccess action', () => {
    it('has a type of GET_PRODUCT_SUCCESS', () => {
        const expected = {
            type: GET_PRODUCT_SUCCESS,
        };
        expected(getProductSuccess().toEqual(expected));
    });
});

describe('postWishlist action', () => {
    const id = true;
    it('has a type of POST_WISHLIST', () => {
        const expected = {
            type: POST_WISHLIST,
        };
        expected(postWishlist(id).toEqual(expected));
    });
});
