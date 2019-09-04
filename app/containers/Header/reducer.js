/*
 *
 * Header reducer
 *
 */

import { fromJS } from 'immutable';
import {
    LAYOUT_TOP_NAV,
    LAYOUT_TOP_NAV_SUCCESS,
    LAYOUT_TOP_NAV_FAIL,
    SEARCH_RESULT,
    SEARCH_RESULT_SUCCESS,
    SEARCH_RESULT_FAIL,
    GET_IMG_LINK,
    GET_IMG_LINK_SUCCESS,
    GET_IMG_LINK_FAILED,
} from './constants';


export const initialState = fromJS({
    header: {
        loading: false,
        error: false,
        data: null,
    },
    suggestionData: {
        loading: false,
        error: false,
        data: null,
    },
    imgLink: {
        loading: false,
        error: false,
        data: null,
    },
});

function headerReducer(state = initialState, action) {
    switch (action.type) {
        case LAYOUT_TOP_NAV:
            return state
                .setIn(['header', 'loading'], true)
                .setIn(['header', 'error'], false)
                .setIn(['header', 'data'], null);
        case LAYOUT_TOP_NAV_SUCCESS:
            return state
                .setIn(['header', 'loading'], false)
                .setIn(['header', 'error'], false)
                .setIn(['header', 'data'], action.headerData);
        case LAYOUT_TOP_NAV_FAIL:
            return state
                .setIn(['header', 'loading'], false)
                .setIn(['header', 'error'], true)
                .setIn(['header', 'data'], action.headerData);
        case SEARCH_RESULT:
            return state
                .setIn(['suggestionData', 'loading'], true)
                .setIn(['suggestionData', 'error'], false)
                .setIn(['suggestionData', 'data'], null);
        case SEARCH_RESULT_SUCCESS:
            return state
                .setIn(['suggestionData', 'loading'], false)
                .setIn(['suggestionData', 'error'], false)
                .setIn(['suggestionData', 'data'], action.searchResultData);
        case SEARCH_RESULT_FAIL:
            return state
                .setIn(['suggestionData', 'loading'], false)
                .setIn(['suggestionData', 'error'], true)
                .setIn(['suggestionData', 'data'], action.searchResultData);
        case GET_IMG_LINK:
            return state
                .setIn(['imgLink', 'loading'], true)
                .setIn(['imgLink', 'error'], false)
                .setIn(['imgLink', 'data'], null);
        case GET_IMG_LINK_SUCCESS:
            return state
                .setIn(['imgLink', 'loading'], false)
                .setIn(['imgLink', 'error'], false)
                .setIn(['imgLink', 'data'], action.imgLink);
        case GET_IMG_LINK_FAILED:
            return state
                .setIn(['imgLink', 'loading'], false)
                .setIn(['imgLink', 'error'], true)
                .setIn(['imgLink', 'data'], action.imgLink);
        default:
            return state;
    }
}

export default headerReducer;
