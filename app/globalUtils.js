import 'whatwg-fetch';
import { create } from 'apisauce';
import globalScope from 'globalScope';
import Cookies from 'universal-cookie';

export const apiRequest = (path, type, body, baseUrl, headerParams) => {
    const apiObject = addHeaderToAPI(baseUrl || globalScope.api);
    return apiObject[type](path, body, headerParams);
};

const addHeaderToAPI = (apiString) => {
    const api = create({
        baseURL: apiString,
        headers: {
            'Content-Type': 'application/json',
            'Accept-Language': 'en',
            'api-version': '1.0.0',
            // 'app-version': DeviceInfo.getVersion(),
            // 'app-os-name': 'Platform.OS',
            'hertoken': globalScope.token,
            // 'app-os-version': DeviceInfo.getSystemVersion(),
        },
        timeout: 30000,
    });
    return api;
};

export const getURLParams = (urlparams) => {
    const result = {};
    let param = urlparams;
    if (typeof param === 'string') {
        param = param.substr(1).split('&').forEach((str) => {
            const d = str.split('=');
            result[d[0]] = decodeURIComponent(d[1]);
        });
    }

    return result;
};

export const staticErrorResponse = (message) => (
    {
        success: false,
        messages: [message],
    }
);

// to convert the  percentage of width to the dp;
// eg: getXdp(50)
export const getXdp = (percent) => `${percent}vw`;
// to convert the  percentage of height to the dp;
// eg: getYdp(50)
export const getYdp = (percent) => `${percent}vw`;

export const dataChecking = (object, ...argsArr) => {
    // let args = Array.prototype.slice.call(arguments, 1);
    let args = argsArr;
    if (argsArr[0].constructor === Array) {
        args = argsArr[0];
    }

    let obj = object;
    for (let i = 0; i < args.length; i += 1) {
        if (!obj || !Object.prototype.hasOwnProperty.call(obj, args[i])) {
            return null;
        }
        obj = obj[args[i]];
    }
    return obj;
};

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
export const parseJSON = (response) => {
    if (response.status === 204 || response.status === 205) {
        return null;
    }

    try {
        return response.json();
    } catch (e) {
        return {
            success: false,
            messages: [{
                text: 'Please check your internet connection',
            }],
        };
    }
};

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export const request = (url, options) => (
    fetch(url, options)
        .then(parseJSON)
        .catch(parseJSON)
);

const cookies = new Cookies();

export const setCookie = (key, value, options) => {
    const opt = options || { path: '/' };
    cookies.set(key, value, opt);
};

export const getCookie = (key, options) => cookies.get(key, options);

export const removeCookie = (key, options) => cookies.remove(key, options);
