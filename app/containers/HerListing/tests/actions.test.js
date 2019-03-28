
import {
    getData,
    getDataSuccess,
    getDataFail,
    getPage,
    getPageSuccess,
    getPageFail,
} from '../actions';
import {
    GETDATA,
    GETDATASUCCESS,
    GETDATAFAIL,
    GETPAGE,
    GETPAGESUCCESS,
    GETPAGEFAIL,
} from '../constants';


describe('getData action', () => {
    it('has a type of GETDATA', () => {
        const expected = {
            type: GETDATA,
        };
        expect(getData()).toEqual(expected);
    });
});

describe('getDataSuccess action', () => {
    const apiData = true;
    it('has a type of GETDATASUCCESS', () => {
        const expected = {
            type: GETDATASUCCESS,
        };
        expect(getDataSuccess(apiData)).toEqual(expected);
    });
});

describe('getDataFail action', () => {
    it('has a type of GETDATAFAIL', () => {
        const expexted = {
            type: GETDATAFAIL,
        };
        expexted(getDataFail().toEqual(expexted));
    });
});

describe('getPage action', () => {
    it('has a type of GETPAGE', () => {
        const expected = {
            type: GETPAGE,
        };
        expected(getPage().toEqual(expected));
    });
});

describe('getPageSuccess action', () => {
    const apiData = true;
    it('has a type of GETPAGESUCCESS', () => {
        const expected = {
            type: GETPAGESUCCESS,
        };
        expected(getPageSuccess(apiData).toEqual(expected));
    });
});

describe('getPageFail action', () => {
    it('has a type of getPageFail', () => {
        const expected = {
            type: GETPAGEFAIL,
        };
        expected(getPageFail().toEqual(expected));
    });
});
