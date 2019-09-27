/*
 *
 * HomePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
    GET_HOME_BANNER,
    GET_HOME_BANNER_SUCCESS,
    GET_HOME_BANNER_FAILED,
    GET_FLAGSHIP,
    GET_FLAGSHIP_SUCCESS,
    GET_FLAGSHIP_FAILED,
    GET_TWOH,
    GET_TWOH_SUCCESS,
    GET_TWOH_FAILED,
    GET_NEW_ARRIVAL,
    GET_NEW_ARRIVAL_SUCCESS,
    GET_NEW_ARRIVAL_FAILED,
    GET_EXTENSION,
    GET_EXTENSION_SUCCESS,
    GET_EXTENSION_FAILED,
    GET_TRENDING,
    GET_TRENDING_SUCCESS,
    GET_TRENDING_FAILED,
    GET_SPONSORED,
    GET_SPONSORED_SUCCESS,
    GET_SPONSORED_FAILED,
    GET_REVIEW,
    GET_REVIEW_SUCCESS,
    GET_REVIEW_FAILED,
    GET_STORE,
    GET_STORE_SUCCESS,
    GET_STORE_FAILED,
    GET_LAYOUT_FOOTER,
    GET_LAYOUT_FOOTER_SUCCESS,
    GET_LAYOUT_FOOTER_FAILED,
    GET_IMAGE_FOOTER,
    GET_IMAGE_FOOTER_SUCCESS,
    GET_IMAGE_FOOTER_FAILED,
    GET_PARTNER_FOOTER,
    GET_PARTNER_FOOTER_SUCCESS,
    GET_PARTNER_FOOTER_FAILED,
} from './constants';

export const initialState = fromJS({
    banner: {
        loading: false,
        error: false,
    },
    flagship: {
        loading: false,
        error: false,
    },
    extension: {
        loading: false,
        error: false,
    },
    twoh: {
        loading: false,
        error: false,
        success: false,
    },
    newArrival: {
        loading: false,
        error: false,
        success: false,
    },
    trending: {
        loading: false,
        error: false,
        success: false,
    },
    sponsored: {
        loading: false,
        error: false,
        success: false,
    },
    review: {
        loading: false,
        error: false,
        success: false,
    },
    store: {
        loading: false,
        error: false,
        success: false,
    },
    layoutFooter: {
        loading: false,
        error: false,
        success: false,
    },
    imageFooter: {
        loading: false,
        error: false,
        success: false,
    },
    partnerFooter: {
        loading: false,
        error: false,
        success: false,
    },
});

function homePageReducer(state = initialState, action) {
    switch (action.type) {
        case GET_HOME_BANNER:
            return state
                .setIn(['banner', 'loading'], true)
                .setIn(['banner', 'error'], false);
        case GET_HOME_BANNER_SUCCESS:
            return state
                .setIn(['banner', 'loading'], false)
                .setIn(['banner', 'error'], false)
                .setIn(['banner', 'data'], action.bannerData);
        case GET_HOME_BANNER_FAILED:
            return state
                .setIn(['banner', 'loading'], false)
                .setIn(['banner', 'error'], true)
                .setIn(['banner', 'data'], action.bannerData);
        case GET_FLAGSHIP:
            return state
                .setIn(['flagship', 'loading'], true)
                .setIn(['flagship', 'error'], false);
        case GET_FLAGSHIP_SUCCESS:
            return state
                .setIn(['flagship', 'loading'], false)
                .setIn(['flagship', 'error'], false)
                .setIn(['flagship', 'data'], action.flagshipData);
        case GET_FLAGSHIP_FAILED:
            return state
                .setIn(['flagship', 'loading'], false)
                .setIn(['flagship', 'error'], true)
                .setIn(['flagship', 'data'], action.flagshipData);
        case GET_EXTENSION:
            return state
                .setIn(['extension', 'loading'], true)
                .setIn(['extension', 'error'], false);
        case GET_EXTENSION_SUCCESS:
            return state
                .setIn(['extension', 'loading'], false)
                .setIn(['extension', 'error'], false)
                .setIn(['extension', 'data'], action.extensionData);
        case GET_EXTENSION_FAILED:
            return state
                .setIn(['extension', 'loading'], false)
                .setIn(['extension', 'error'], true)
                .setIn(['extension', 'data'], action.extensionData);
        case GET_TWOH:
            return state
                .setIn(['twoh', 'loading'], true)
                .setIn(['twoh', 'error'], false);
        case GET_TWOH_SUCCESS:
            return state
                .setIn(['twoh', 'success'], true)
                .setIn(['twoh', 'loading'], false)
                .setIn(['twoh', 'error'], false)
                .setIn(['twoh', 'data'], action.twohData);
        case GET_TWOH_FAILED:
            return state
                .setIn(['twoh', 'loading'], false)
                .setIn(['twoh', 'error'], true)
                .setIn(['twoh', 'data'], action.twohData);
        case GET_NEW_ARRIVAL:
            return state
                .setIn(['newArrival', 'loading'], true)
                .setIn(['newArrival', 'error'], false);
        case GET_NEW_ARRIVAL_SUCCESS:
            return state
                .setIn(['newArrival', 'success'], true)
                .setIn(['newArrival', 'loading'], false)
                .setIn(['newArrival', 'error'], false)
                .setIn(['newArrival', 'data'], action.newArrivalData);
        case GET_NEW_ARRIVAL_FAILED:
            return state
                .setIn(['newArrival', 'loading'], false)
                .setIn(['newArrival', 'error'], true)
                .setIn(['newArrival', 'data'], action.newArrivalData);
        case GET_TRENDING:
            return state
                .setIn(['trending', 'loading'], true)
                .setIn(['trending', 'error'], false);
        case GET_TRENDING_SUCCESS:
            return state
                .setIn(['trending', 'success'], true)
                .setIn(['trending', 'loading'], false)
                .setIn(['trending', 'error'], false)
                .setIn(['trending', 'data'], action.trendingData);
        case GET_TRENDING_FAILED:
            return state
                .setIn(['trending', 'loading'], false)
                .setIn(['trending', 'error'], true)
                .setIn(['trending', 'data'], action.trendingData);
        case GET_SPONSORED:
            return state
                .setIn(['sponsored', 'loading'], true)
                .setIn(['sponsored', 'error'], false);
        case GET_SPONSORED_SUCCESS:
            return state
                .setIn(['sponsored', 'success'], true)
                .setIn(['sponsored', 'loading'], false)
                .setIn(['sponsored', 'error'], false)
                .setIn(['sponsored', 'data'], action.sponsoredData);
        case GET_SPONSORED_FAILED:
            return state
                .setIn(['sponsored', 'loading'], false)
                .setIn(['sponsored', 'error'], true)
                .setIn(['sponsored', 'data'], action.sponsoredData);
        case GET_REVIEW:
            return state
                .setIn(['review', 'loading'], true)
                .setIn(['review', 'error'], false);
        case GET_REVIEW_SUCCESS:
            return state
                .setIn(['review', 'success'], true)
                .setIn(['review', 'loading'], false)
                .setIn(['review', 'error'], false)
                .setIn(['review', 'data'], action.reviewData);
        case GET_REVIEW_FAILED:
            return state
                .setIn(['review', 'loading'], false)
                .setIn(['review', 'error'], true)
                .setIn(['review', 'data'], action.reviewData);
        case GET_STORE:
            return state
                .setIn(['store', 'loading'], true)
                .setIn(['store', 'error'], false);
        case GET_STORE_SUCCESS:
            return state
                .setIn(['store', 'success'], true)
                .setIn(['store', 'loading'], false)
                .setIn(['store', 'error'], false)
                .setIn(['store', 'data'], action.storeData);
        case GET_STORE_FAILED:
            return state
                .setIn(['store', 'loading'], false)
                .setIn(['store', 'error'], true)
                .setIn(['store', 'data'], action.storeData);
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
        case GET_IMAGE_FOOTER:
            return state
                .setIn(['imageFooter', 'loading'], true)
                .setIn(['imageFooter', 'error'], false);
        case GET_IMAGE_FOOTER_SUCCESS:
            return state
                .setIn(['imageFooter', 'success'], true)
                .setIn(['imageFooter', 'loading'], false)
                .setIn(['imageFooter', 'error'], false)
                .setIn(['imageFooter', 'data'], action.imageFooterData);
        case GET_IMAGE_FOOTER_FAILED:
            return state
                .setIn(['imageFooter', 'loading'], false)
                .setIn(['imageFooter', 'error'], true)
                .setIn(['imageFooter', 'data'], action.imageFooterData);
        case GET_PARTNER_FOOTER:
            return state
                .setIn(['partnerFooter', 'loading'], true)
                .setIn(['partnerFooter', 'error'], false);
        case GET_PARTNER_FOOTER_SUCCESS:
            return state
                .setIn(['partnerFooter', 'success'], true)
                .setIn(['partnerFooter', 'loading'], false)
                .setIn(['partnerFooter', 'error'], false)
                .setIn(['partnerFooter', 'data'], action.partnerFooterData);
        case GET_PARTNER_FOOTER_FAILED:
            return state
                .setIn(['partnerFooter', 'loading'], false)
                .setIn(['partnerFooter', 'error'], true)
                .setIn(['partnerFooter', 'data'], action.partnerFooterData);
        default:
            return state;
    }
}

export default homePageReducer;
