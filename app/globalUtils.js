import 'whatwg-fetch';
import globalScope from 'globalScope';
import Cookies from 'universal-cookie';
import * as copy from 'copy-to-clipboard';

export const apiRequest = (path, type = 'get', body, baseUrl, headerParams) => {
    globalScope.axios.setBaseURL(baseUrl || globalScope.api);
    return globalScope.axios[type](path, body, headerParams);
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
        if (!obj || !(Object.prototype.hasOwnProperty.call(obj, args[i]) || obj[args[i]])) {
            return null;
        }
        obj = obj[args[i]];
    }
    return obj;
};

// TODO: TP: need to assume the case that original ovject have other value
export const setDataByPath = (data, ...argsArr) => {
    let args = argsArr;
    if (argsArr[0].constructor === Array) {
        args = argsArr[0];
    }

    let obj = data;
    for (let i = args.length - 1; i >= 0; i--) {
        obj = {
            [args[i]]: obj,
        };
    }

    return obj;
};
export const createObjectByPath = setDataByPath;

export const combineObject = (...argsArr) => {
    const i = ['a', 'b', 'c', 'd'];
    const WholeObject = {};
    let count = 0;
    // eslint-disable-next-line array-callback-return
    argsArr.map((prop) => {
        WholeObject[i[count++]] = prop;
    });
    return WholeObject;
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

export const copyToClipboard = (text) => {
    if (text) {
        copy(text);
    }
};

