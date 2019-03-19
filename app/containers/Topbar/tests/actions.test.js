
import {
    fetchTopNav,
    fetchTopNavSuccess,
    fetchTopNavFailed,
} from '../actions';
import {
    FETCH_TOP_NAV,
    FETCH_TOP_NAV_SUCCESS,
    FETCH_TOP_NAV_FAILED,
} from '../constants';

describe('Topbar actions', () => {
    describe('Fetch Topbar action', () => {
        it('has a type of FETCH_TOP_NAV', () => {
            const expected = {
                type: FETCH_TOP_NAV,
            };
            expect(fetchTopNav()).toEqual(expected);
        });
    });
    describe('Fetch Topbar success action', () => {
        it('has a type of FETCH_TOP_NAV_SUCCESS', () => {
            const expected = {
                type: FETCH_TOP_NAV_SUCCESS,
            };
            expect(fetchTopNavSuccess()).toEqual(expected);
        });
    });
    describe('Fetch Topbar failed action', () => {
        it('has a type of FETCH_TOP_NAV_FAILED', () => {
            const expected = {
                type: FETCH_TOP_NAV_FAILED,
            };
            expect(fetchTopNavFailed()).toEqual(expected);
        });
    });
});
