import { takeLatest, put, call, select } from 'redux-saga/effects';
import { staticErrorResponse, apiRequest } from 'globalUtils';
import { fromJS } from 'immutable';

import {
    GET_USER_DATA,
    GET_COMMON_CONFIG,
    UPDATE_AVATAR,
    UPDATE_PASSWORD,
    CHANGE_PROPS_AND_UPDATE,
} from './constants';
import {
    getUserDataSuccess,
    getUserDataFailed,
    updateAvatarSuccess,
    updateAvatarFailed,
    updatePasswordSuccess,
    updatePasswordFailed,
    getCommonConfigSuccess,
    getCommonConfigFailed,
    updateUserDataSuccess,
    updateUserDataFailed,
} from './actions';

export function* getUserDataWorker() {
    let err;

    try { // Trying the HTTP Request
        const response = yield call(apiRequest, '/profile');
        if (response && response.ok !== false) {
            yield put(getUserDataSuccess(response));
        } else if (response && response.ok === false) {
            yield put(getUserDataFailed(response));
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (e) {
        console.log('error: ', e);
        yield put(getUserDataFailed(e));
    }
}

export function* getCommonConfigWorker() {
    let err;

    try { // Trying the HTTP Request
        const response = yield call(apiRequest, '/common');
        if (response && response.ok !== false) {
            yield put(getCommonConfigSuccess(response));
        } else if (response && response.ok === false) {
            yield put(getCommonConfigFailed(response));
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (e) {
        console.log('error: ', e);
        yield put(getCommonConfigFailed(e));
    }
}

export function* updateUserAvatarWorker(action) {
    let err;

    try { // Trying the HTTP Request
        const response = yield call(apiRequest, '/profile/avatar', 'put', {
            path: 'avatar',
            image: action.fileString,
        });
        if (response && response.ok !== false) {
            yield put(updateAvatarSuccess(`Avatar has been updated to [ ${action.file.name} ] successfully.`, response.data.profile));
        } else if (response && response.ok === false) {
            yield put(updateAvatarFailed(`Failed to update avatar to [ ${action.file.name} ].`));
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (e) {
        console.log('error: ', e);
        yield put(updateAvatarFailed(e));
    }
}

export function* updateUserPasswordWorker(action) {
    let err;

    try { // Trying the HTTP Request
        const response = yield call(apiRequest, '/password/change', 'post', {
            current_password: action.currentPassword,
            password: action.password,
            password_confirmation: action.passwordConfirmation,
            action: 'change',
        });
        const messages = response.data.messages.map((message) => message.text);
        const messageList = messages.join(' ');

        if (response && response.ok !== false) {
            yield put(updatePasswordSuccess(messageList));
        } else if (response && response.ok === false) {
            yield put(updatePasswordFailed(messageList));
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (e) {
        console.log('error: ', e);
        yield put(updatePasswordFailed(e));
    }
}

export function* updateUserDataWorker(action) {
    let err;

    try { // Trying the HTTP Request
        const profileEditInfoState = (state) => state.get('profileEditInfo');
        const profileEditInfoData = yield select(profileEditInfoState);
        const userData = profileEditInfoData.toJS().userData;

        const immuObj = fromJS(userData);

        const response = yield call(apiRequest, '/profile', 'put', immuObj.setIn(action.dataPath, action.value));
        if (response && response.ok !== false) {
            yield put(updateUserDataSuccess(`${action.formName} has been updated${action.showUpdatedTo ? ` to [ ${action.value.name || action.value} ]` : ''} successfully.`));
        } else if (response && response.ok === false) {
            yield call(() => new Promise((resolve) => setTimeout(resolve, 500)));
            yield put(updateUserDataFailed(`Failed to update ${action.formName}${action.showUpdatedTo ? ` to [ ${action.value.name || action.value} ]` : ''}.`, immuObj.setIn(action.dataPath, action.currentValue)));
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (e) {
        console.log('error: ', e);
        yield put(updateUserDataFailed(e));
    }
}

// Individual exports for testing
export default function* profileEditInfoSaga() {
    yield takeLatest(GET_USER_DATA, getUserDataWorker);
    yield takeLatest(GET_COMMON_CONFIG, getCommonConfigWorker);
    yield takeLatest(UPDATE_AVATAR, updateUserAvatarWorker);
    yield takeLatest(UPDATE_PASSWORD, updateUserPasswordWorker);
    yield takeLatest(CHANGE_PROPS_AND_UPDATE, updateUserDataWorker);
}
