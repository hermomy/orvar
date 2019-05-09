
// import { fromJS } from 'immutable';
import cartPageReducer, { initialState } from '../reducer';
import {
    GET_CART_DATA,
    GET_CART_DATA_SUCCESS,
    GET_CART_DATA_FAILED,
} from '../constants';

describe('cartPageReducer', () => {
    it('returns the initial state', () => {
        expect(cartPageReducer(initialState, {})).toEqual(initialState);
    });
    it('returns the GET_CART_DATA state', () => {
        const expected = initialState.set('loading', true);
        expect(cartPageReducer(initialState, { type: GET_CART_DATA })).toEqual(expected);
    });
    it('returns the GET_CART_DATA_SUCCESS state', () => {
        const expected = initialState.set('data', undefined);
        expect(cartPageReducer(initialState, { type: GET_CART_DATA_SUCCESS })).toEqual(expected);
    });
    it('returns the GET_CART_DATA_FAILED state', () => {
        const expected = initialState
            .set('error', true)
            .set('data', undefined);
        expect(cartPageReducer(initialState, { type: GET_CART_DATA_FAILED })).toEqual(expected);
    });
});
