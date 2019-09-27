/*
 *
 * Footer reducer
 *
 */

import { fromJS } from 'immutable';
import {
    GET_LAYOUT_FOOTER,
    GET_LAYOUT_FOOTER_SUCCESS,
    GET_LAYOUT_FOOTER_FAILED,
} from './constants';

export const initialState = fromJS({
    layoutFooter: {
        loading: false,
        error: false,
        success: false,
    },
});

function footerReducer(state = initialState, action) {
    switch (action.type) {
        case GET_LAYOUT_FOOTER:
            return state
                .setIn(['layoutFooter', 'loading'], true)
                .setIn(['layoutFooter', 'error'], false);
        case GET_LAYOUT_FOOTER_SUCCESS:
            return state
                .setIn(['layoutFooter', 'success'], true)
                .setIn(['layoutFooter', 'loading'], false)
                .setIn(['layoutFooter', 'error'], false)
                .setIn(['layoutFooter', 'data'], action.layoutFooterData);
        case GET_LAYOUT_FOOTER_FAILED:
            return state
                .setIn(['layoutFooter', 'loading'], false)
                .setIn(['layoutFooter', 'error'], true)
                .setIn(['layoutFooter', 'data'], action.layoutFooterData);
        default:
            return state;
    }
}

export default footerReducer;
