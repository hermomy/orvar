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
