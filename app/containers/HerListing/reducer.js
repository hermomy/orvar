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
} from './constants';

const initialState = fromJS({});

function herListingReducer(state = initialState, action) {
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
        default:
            return state;
    }
}

export default herListingReducer;
