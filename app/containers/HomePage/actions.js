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

