import {
    takeLatest,
    call,
    put,
} from 'redux-saga/effects';
import {
    GET_ADDRESS,
    GET_CONFIGDATA,
    ADD_ADDRESS,
    GET_ADDRESS_INFO,
    UPDATE_ADDRESS,
    DELETE_ADDRESS,
 } from './constants';

import { staticErrorResponse, apiRequest } from '../../globalUtils';
import {
    getConfigDataSuccess,
    getConfigDataFailed,
    getAddressSuccess,
    getAddressFailed,
    addAddressSuccess,
    addAddressFailed,
    getAddressInfoSuccess,
    getAddressInfoFailed,
    updateAddressSuccess,
    updateAddressFailed,
    deleteAddressSuccess,
    deleteAddressFailed,
 } from './actions';

export function* configDataQuery() {
    const response = yield call(apiRequest, '/app/common', 'get');
    if (response && response.ok) {
        yield put(getConfigDataSuccess(response.data));
    } else {
        yield put(getConfigDataFailed(response.data));
    }
}
export function* getAddressQuery() {
    const response = yield call(apiRequest, '/address', 'get');
    if (response && response.ok) {
        yield put(getAddressSuccess(response.data));
    } else {
        yield put(getAddressFailed(response.data));
    }
}
export function* getInfoQuery(action) {
    const api = `/address/${action.id}`;
    const response = yield call(apiRequest, api, 'get');
    if (response && response.ok) {
        yield put(getAddressInfoSuccess(response.data));
    } else {
        yield put(getAddressInfoFailed(response.data));
    }
}
export function* addAddressQuery(action) {
    let err;
    try {
        const payload = JSON.stringify({
            city: action.addressData.city,
            line_1: action.addressData.line_1,
            line_2: action.addressData.line_2,
            line_3: action.addressData.line_3,
            postal_code: action.addressData.postal_code,
            receiver_name: action.addressData.receiver_name,
            sms_number: action.addressData.sms_number,
            sms_prefix: action.addressData.sms_prefix,
            state_code: action.addressData.state_code,
            contact_number: action.addressData.contact_number,
        });
        const response = yield call(apiRequest, '/address', 'post', payload);
        const messages = response.data.messages.map((message) => message.text);
        const messageList = messages.join(' ');
        if (response && response.ok !== false) {
            yield put(addAddressSuccess(messageList));
        } else if (response && response.ok === false) {
            yield put(addAddressFailed(messageList));
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (e) {
        console.log('error: ', e);
        yield put(addAddressFailed(e));
    }
}
export function* updateAddressQuery(action) {
    let err;
    const api = `/address/${action.id}`;
    try {
        const payload = JSON.stringify({
            city: action.addressData.city,
            line_1: action.addressData.line_1,
            line_2: action.addressData.line_2,
            line_3: action.addressData.line_3,
            postal_code: action.addressData.postal_code,
            receiver_name: action.addressData.receiver_name,
            sms_number: action.addressData.sms_number,
            sms_prefix: action.addressData.sms_prefix,
            state_code: action.addressData.state_code,
            contact_number: action.addressData.contact_number,
        });
        const response = yield call(apiRequest, api, 'put', payload);
        const messages = response.data.messages.map((message) => message.text);
        const messageList = messages.join(' ');
        if (response && response.ok !== false) {
            yield put(updateAddressSuccess(messageList));
        } else if (response && response.ok === false) {
            yield put(updateAddressFailed(messageList));
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (e) {
        console.log('error: ', e);
        yield put(updateAddressFailed(e));
    }
}
export function* deleteAddressQuery(action) {
    let err;
    const api = `/address/${action.id}`;
    try {
        const response = yield call(apiRequest, api, 'delete');
        const messages = response.data.messages.map((message) => message.text);
        const messageList = messages.join(' ');
        if (response && response.ok !== false) {
            yield put(deleteAddressSuccess(messageList));
        } else if (response && response.ok === false) {
            yield put(deleteAddressFailed(messageList));
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (e) {
        console.log('error: ', e);
        yield put(deleteAddressFailed(e));
    }
}
// Individual exports for testing
export default function* profileAddressSaga() {
    yield takeLatest(GET_ADDRESS, getAddressQuery);
    yield takeLatest(GET_CONFIGDATA, configDataQuery);
    yield takeLatest(ADD_ADDRESS, addAddressQuery);
    yield takeLatest(GET_ADDRESS_INFO, getInfoQuery);
    yield takeLatest(UPDATE_ADDRESS, updateAddressQuery);
    yield takeLatest(DELETE_ADDRESS, deleteAddressQuery);
}

