import 'whatwg-fetch';
import globalScope from 'globalScope';
import Cookies from 'universal-cookie';

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

export function dataChecking(object, ...argsArr) {
    if (!argsArr || !argsArr.length) {
        return object;
    }

    const args = argsArr[0].constructor === Array ? argsArr[0] : argsArr;
    let obj = object;

    for (let i = 0; i < args.length; i += 1) {
        if (Array.isArray(obj) && !obj[args[i]]) {
            return null;
        } else if (!obj || !Object.prototype.hasOwnProperty.call(obj, args[i])) {
            return null;
        }
        obj = obj[args[i]];
    }
    return obj;
}

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
 * @type {object} Callbacks - at scope that hold all the callbacks instances
 */
const Callbacks = {};

/**
 * Events triggerer util function
 *
 * @function a util function that handle listen event and fire event
 *
 */
export const Events = {
    /**
     * @alias on
     * @name listen - to establish an listener
     *
     * @param {string} at - event name
     * @param {string} id - a unique ID bind to the component
     * @param {function} callback - callback function after target event triggered
     *
     * @return {string} id
     *
     * @example
     *     Events.on('showSnackBar', 123456, () => {}));
     *     Events.listen('showSnackBar', 123456, () => {});
     */
    on: (at, id, callback) => Events.listen(at, id, callback),
    listen: (at, id, callback) => {
        if (at === '') { return false; }
        if (at in Callbacks) {
            Callbacks[at][id] = callback;
        } else {
            Callbacks[at] = {};
            Callbacks[at][id] = callback;
        }
        return id;
    },
    t: (at, data) => Events.trigger(at, data),

    /**
     * @name trigger - to trigger an event fire
     *
     * @param {string} at - event name
     * @param {object} data - all the params wrapped in an object
     *
     * @return {object} null
     *
     * @example
     *     Events.trigger('showSnackBar', { message, duration, backgroundColor });
     */
    trigger: (at, data) => {
        const data2 = data || '';
        const obj = Callbacks[at];
        if (!obj) {
            console.warn('Event triggered have not being register: ', at);
            return;
        }
        Object.keys(obj).forEach((key) => {
            if (!obj[key]) {
                console.warn('Event triggered have not being register yet: ', key);
                return;
            }
            obj[key](data2);
        });
    },

    /**
     * @alias rm
     * @name remove - to remove an active listener providedd event and unique id
     *
     * @param {string} at - event name
     * @param {string} id - a unique ID bind to the component
     *
     * @return {string} null
     *
     * @example
     *     Events.rm('showSnackBar', 123456);
     *     Events.remove('showSnackBar', 123456);
     */
    rm: (at, id) => Events.remove(at, id),
    remove: (at, id) => { delete Callbacks[at][id]; },

    /**
     * @name removeAll - to remove all active listener of targeted event
     *
     * @param {string} at - event name
     *
     * @return {string} null
     *
     * @example
     *     Events.removeAll('showSnackBar');
     */
    removeAll: (at) => { delete Callbacks[at]; },
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

/**
 * Cookies utils
 */
const cookies = new Cookies();
export const setCookie = (key, value, options) => {
    const opt = options || { path: '/' };
    cookies.set(key, value, opt);
};
export const getCookie = (key, options) => (
    cookies.get(key, options)
);
export const removeCookie = (key, options) => (
    cookies.remove(key, options)
);

/**
 * Log utils
 */
export const devlog = (...logs) => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        console.log(...logs);
    }
};

export const sleep = (ms) =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
