/*
 *
 * HerListing reducer
 *
 */

import { fromJS } from 'immutable';
import {
    GETDATA,
    GETDATASUCCESS,
    GETDATAFAIL,
    GETPAGE,
    GETPAGESUCCESS,
    GETPAGEFAIL,
} from './constants';

const initialState = fromJS({});

function herListingReducer(state = initialState, action) {
    const newdata = { ...state.get('data') };
    switch (action.type) {
        case GETDATA:
            return state
                .set('GetDataSuccess', false)
                .set('loading', true)
                .set('error', false);
        case GETDATASUCCESS:
            return state
                .set('data', action.payload)
                .set('GetDataSuccess', true)
                .set('loading', false)
                .set('error', false);
        case GETDATAFAIL:
            return state
                .set('loading, false')
                .setIn(['error'], action.payload || {
                    message: [{
                        text: 'please refresh',
                        type: 'error',
                    }],
                });

        case GETPAGE:
            return state
                .set('loading', true);
        case GETPAGESUCCESS:
            if (newdata.product && newdata.product.result) {
                newdata.product.result = action.data;
            }
            return state
                .set('data', newdata)
                .set('loading', false);
        case GETPAGEFAIL:
            return state
                .set('loading', false);
        default:
            return state;
    }
}

export default herListingReducer;
