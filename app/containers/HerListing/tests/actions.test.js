
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
    const path = true;
    const dataType = true;
    const api = true;
    const queryParamString = true;
    it('has a type of GETDATA', () => {
        const expected = {
            type: GET_DATA,
            path,
            dataType,
            api,
            queryParamString,
        };
        expect(getData(path, dataType, api, queryParamString)).toEqual(expected);
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
    const error = false;
    it('has a type of GETDATAFAIL', () => {
        const expexted = {
            type: GET_DATA_FAIL,
            error,
        };
        expect(getDataFail(error)).toEqual(expexted);
    });
});

describe('getProductSuccess action', () => {
    const data = true;
    it('has a type of GET_PRODUCT_SUCCESS', () => {
        const expected = {
            type: GET_PRODUCT_SUCCESS,
            data,
        };
        expect(getProductSuccess(data)).toEqual(expected);
    });
});

describe('postWishlist action', () => {
    const id = true;
    it('has a type of POST_WISHLIST', () => {
        const expected = {
            type: POST_WISHLIST,
            id,
        };
        expect(postWishlist(id)).toEqual(expected);
    });
});
