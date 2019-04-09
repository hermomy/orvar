
import {
    getData,
    getDataSuccess,
    getDataFail,
    getPage,
    getPageSuccess,
    getPageFail,
} from '../actions';
import {
    GET_DATA,
    GET_DATA_SUCCESS,
    GET_DATA_FAIL,
    GET_PAGE,
    GET_PAGE_SUCCESS,
    GET_PAGE_FAIL,
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

describe('getPage action', () => {
    it('has a type of GETPAGE', () => {
        const expected = {
            type: GET_PAGE,
        };
        expected(getPage().toEqual(expected));
    });
});

describe('getPageSuccess action', () => {
    const apiData = true;
    it('has a type of GETPAGESUCCESS', () => {
        const expected = {
            type: GET_PAGE_SUCCESS,
        };
        expected(getPageSuccess(apiData).toEqual(expected));
    });
});

describe('getPageFail action', () => {
    it('has a type of getPageFail', () => {
        const expected = {
            type: GET_PAGE_FAIL,
        };
        expected(getPageFail().toEqual(expected));
    });
});
