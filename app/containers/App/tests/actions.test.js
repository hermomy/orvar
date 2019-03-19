
import {
    fetchConfig,
    fetchConfigSuccess,
    fetchConfigFailed,
} from '../actions';
import {
    FETCH_CONFIG,
    FETCH_CONFIG_SUCCESS,
    FETCH_CONFIG_FAILED,
} from '../constants';

describe('App actions', () => {
    describe('fetchConfig', () => {
        it('has a type of FETCH_CONFIG', () => {
            const expected = {
                type: FETCH_CONFIG,
            };
            expect(fetchConfig()).toEqual(expected);
        });
    });

    describe('fetchConfigSuccess', () => {
        it('has a type of FETCH_CONFIG_SUCCESS', () => {
            const expected = {
                type: FETCH_CONFIG_SUCCESS,
            };
            expect(fetchConfigSuccess()).toEqual(expected);
        });
    });

    describe('fetchConfigFailed', () => {
        it('has a type of FETCH_CONFIG_FAILED', () => {
            const expected = {
                type: FETCH_CONFIG_FAILED,
            };
            expect(fetchConfigFailed()).toEqual(expected);
        });
    });
});
