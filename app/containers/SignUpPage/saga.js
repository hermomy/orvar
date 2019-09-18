import {
    takeLatest,
    call,
    put,
} from 'redux-saga/effects';
import globalScope from 'globalScope';
import {
    AUTH_SIGNUP,
    AUTH_SENDOTP,
    GET_SMS_PREFIX,
    GET_IMAGE_LINK,
} from './constants';
import { apiRequest, setCookie } from '../../globalUtils';

import {
    sendOTPSuccess,
    sendOTPFailed,
    getSmsPrefixSuccess,
    getSmsPrefixFailed,
    signupSuccess,
    signupFailed,
    getImageLinkSuccess,
    getImageLinkFailed,
} from './actions';

export function* smsPrefixQuery() {
    const response = yield call(apiRequest, '/app/common', 'get');
    if (response && response.ok) {
        yield put(getSmsPrefixSuccess(response.data));
    } else {
        yield put(getSmsPrefixFailed(response.data));
    }
}
export function* imageLinkQuery() {
    const response = yield call(apiRequest, '/image?code=hershop-signup', 'get');
    if (response && response.ok) {
        yield put(getImageLinkSuccess(response.data));
    } else {
        yield put(getImageLinkFailed(response.data));
    }
}

export function* signupQuery(action) {
    const payload = JSON.stringify({
        email: action.signupData.email,
        password: action.signupData.password,
        tac: action.signupData.tac,
        password_confirmation: action.signupData.password_confirmation,
        sms_number: action.signupData.sms_number,
        sms_prefix: action.signupData.sms_prefix,
    });
    const response = yield call(apiRequest, '/register', 'post', payload);
    if (response && response.ok) {
        globalScope.token = response.data.token;
        globalScope.axios.setHeader('hertoken', globalScope.token);
        setCookie(process.env.TOKEN_KEY, globalScope.token);
        yield put(signupSuccess(response.data));
    } else {
        yield put(signupFailed(response.data));
    }
}

export function* queryOTP(params) {
    const payload = JSON.stringify({
        sms_number: params.smsNumber,
        sms_prefix: params.smsPrefix,
    });
    const response = yield call(apiRequest, '/auth/tac', 'post', payload);
    if (response && response.ok) {
        yield put(sendOTPSuccess(response.data));
    } else {
        yield put(sendOTPFailed(response.data));
    }
}

// Individual exports for testing
export default function* signUpPageSaga() {
    yield takeLatest(AUTH_SIGNUP, signupQuery);
    yield takeLatest(AUTH_SENDOTP, queryOTP);
    yield takeLatest(GET_SMS_PREFIX, smsPrefixQuery);
    yield takeLatest(GET_IMAGE_LINK, imageLinkQuery);
}
