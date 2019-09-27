/*
 *
 * HomePage actions
 *
 */

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

export function getHomeBanner() {
    return {
        type: GET_HOME_BANNER,
    };
}

export function getHomeBannerSuccess(bannerData) {
    return {
        type: GET_HOME_BANNER_SUCCESS,
        bannerData,
    };
}

export function getHomeBannerFailed(bannerData) {
    return {
        type: GET_HOME_BANNER_FAILED,
        bannerData,
    };
}
export function getFlagship() {
    return {
        type: GET_FLAGSHIP,
    };
}

export function getFlagshipSuccess(flagshipData) {
    return {
        type: GET_FLAGSHIP_SUCCESS,
        flagshipData,
    };
}

export function getFlagshipFailed(flagshipData) {
    return {
        type: GET_FLAGSHIP_FAILED,
        flagshipData,
    };
}
export function getTwoh() {
    return {
        type: GET_TWOH,
    };
}

export function getTwohSuccess(twohData) {
    return {
        type: GET_TWOH_SUCCESS,
        twohData,
    };
}
export function getTwohFailed(twohData) {
    return {
        type: GET_TWOH_FAILED,
        twohData,
    };
}
export function getNewArrival() {
    return {
        type: GET_NEW_ARRIVAL,
    };
}

export function getNewArrivalSuccess(newArrivalData) {
    return {
        type: GET_NEW_ARRIVAL_SUCCESS,
        newArrivalData,
    };
}
export function getNewArrivalFailed(newArrivalData) {
    return {
        type: GET_NEW_ARRIVAL_FAILED,
        newArrivalData,
    };
}
export function getExtension() {
    return {
        type: GET_EXTENSION,
    };
}

export function getExtensionSuccess(extensionData) {
    return {
        type: GET_EXTENSION_SUCCESS,
        extensionData,
    };
}
export function getExtensionFailed(extensionData) {
    return {
        type: GET_EXTENSION_FAILED,
        extensionData,
    };
}
export function getTrending() {
    return {
        type: GET_TRENDING,
    };
}

export function getTrendingSuccess(trendingData) {
    return {
        type: GET_TRENDING_SUCCESS,
        trendingData,
    };
}
export function getTrendingFailed(trendingData) {
    return {
        type: GET_TRENDING_FAILED,
        trendingData,
    };
}
export function getSponsored() {
    return {
        type: GET_SPONSORED,
    };
}

export function getSponsoredSuccess(sponsoredData) {
    return {
        type: GET_SPONSORED_SUCCESS,
        sponsoredData,
    };
}
export function getSponsoredFailed(sponsoredData) {
    return {
        type: GET_SPONSORED_FAILED,
        sponsoredData,
    };
}
export function getReview() {
    return {
        type: GET_REVIEW,
    };
}

export function getReviewSuccess(reviewData) {
    return {
        type: GET_REVIEW_SUCCESS,
        reviewData,
    };
}
export function getReviewFailed(reviewData) {
    return {
        type: GET_REVIEW_FAILED,
        reviewData,
    };
}
export function getStore() {
    return {
        type: GET_STORE,
    };
}

export function getStoreSuccess(storeData) {
    return {
        type: GET_STORE_SUCCESS,
        storeData,
    };
}
export function getStoreFailed(storeData) {
    return {
        type: GET_STORE_FAILED,
        storeData,
    };
}
export function getLayoutFooter() {
    return {
        type: GET_LAYOUT_FOOTER,
    };
}

export function getLayoutFooterSuccess(layoutFooterData) {
    return {
        type: GET_LAYOUT_FOOTER_SUCCESS,
        layoutFooterData,
    };
}
export function getLayoutFooterFailed(layoutFooterData) {
    return {
        type: GET_LAYOUT_FOOTER_FAILED,
        layoutFooterData,
    };
}
export function getImageFooter() {
    return {
        type: GET_IMAGE_FOOTER,
    };
}

export function getImageFooterSuccess(imageFooterData) {
    return {
        type: GET_IMAGE_FOOTER_SUCCESS,
        imageFooterData,
    };
}
export function getImageFooterFailed(imageFooterData) {
    return {
        type: GET_IMAGE_FOOTER_FAILED,
        imageFooterData,
    };
}
export function getPartnerFooter() {
    return {
        type: GET_PARTNER_FOOTER,
    };
}

export function getPartnerFooterSuccess(partnerFooterData) {
    return {
        type: GET_PARTNER_FOOTER_SUCCESS,
        partnerFooterData,
    };
}
export function getPartnerFooterFailed(partnerFooterData) {
    return {
        type: GET_PARTNER_FOOTER_FAILED,
        partnerFooterData,
    };
}
