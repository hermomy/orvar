import { takeLatest, call, put } from 'redux-saga/effects';
import { apiRequest } from 'globalUtils';
import { GET_USER_INFORM, GET_INFORM_CHOICE, GET_USER_ADDRESS, PUT_DATA, POST_ADDRESS } from './constants';
import { getDataSuccess, getDataFail, getInformChoice, getUserInform } from './actions';

export function* getUserInformWorker() {
    const res = yield call(apiRequest, '/profile', 'get');

    if (res && res.ok) {
        yield put(getDataSuccess({ UserInformData: res.data }));
    } else {
        yield put(getDataFail(res.data));
    }
}

export function* getUserChoiceWorker() {
    const res = yield call(apiRequest, '/common', 'get');

    if (res && res.ok) {
        yield put(getDataSuccess({ InformChoiceData: res.data }));
    } else {
        yield put(getDataFail(res.data));
    }
}

export function* getUserAddressWorker(action) {
    let res = '';
    if (action.addressId) {
        res = yield call(apiRequest, `/address/${action.addressId}`, 'get');
        if (res && res.ok) {
            yield put(getDataSuccess({ AddressDetail: res.data }));
        } else {
            yield put(getDataFail(res.data));
        }
    } else {
        res = yield call(apiRequest, '/address', 'get');
        if (res && res.ok) {
            yield put(getDataSuccess({ Address: res.data }));
        } else {
            yield put(getDataFail(res.data));
        }
    }
}

export function* putUserInformWorker(action) {
    const temp = action.UserInform;
    if (action.gender) {
        temp.gender = action.gender;
    }
    if (action.year || action.month || action.day) {
        temp.birthday = `${action.year ? action.year : temp.birthday.split('-')[0]}-${action.month ? action.month : temp.birthday.split('-')[1]}-${action.day ? action.day : temp.birthday.split('-')[2]}`;
        temp.birthdayDisplay = `${temp.birthday}T16:00:00.000Z`;
    }
    if (action.skinTone) {
        temp.skin.tone = action.skinTone;
    }
    if (action.skinType) {
        temp.skin.type = action.skinType;
    }
    if (action.skinConcern) {
        temp.skin.concerns = action.skinConcern;
    }

    const res = yield call(apiRequest, '/profile', 'put', temp);

    if (res && res.ok) {
        yield put(getInformChoice());
        yield put(getUserInform());
        window.location.reload();
    } else {
        yield put(getDataFail(res.data));
    }
}

export function* postAddressWorker(action) {
    let res = '';

    if (action.HTTPMethod === 'put') {
        const temp = action.AddressDetail;
        const tempcountry = action.state.split('/')[0];
        const tempcountrycode = action.state.split('/')[1];

        temp.receiver_name = action.receiver_name;
        temp.line_1 = action.line_1;
        temp.line_2 = action.line_2;
        temp.line_3 = action.line_3;
        temp.city = action.city;
        temp.postal_code = action.postal_code;
        temp.state.name = tempcountry;
        temp.state.id = tempcountrycode;
        temp.sms_prefix = action.sms_prefix;
        temp.sms_number = action.sms_number;
        temp.contact_number = action.contact_number;
        temp.full_address = `${temp.line_1} \n${temp.line_2} \n${temp.line_3} \n${temp.postal_code}, ${temp.city}, ${tempcountry}, ${temp.country.name}`;
        temp.full_contact = `${temp.sms_prefix}-${temp.sms_number} / ${temp.contact_number}`;
        temp.state_code = tempcountrycode;

        res = yield call(apiRequest, `/address/${temp.id}`, 'put', temp);
    } else if (action.HTTPMethod === 'delete') {
        res = yield call(apiRequest, `/address/${action.AddressDetail.id}`, 'delete');
    } else if (action.HTTPMethod === 'post') {
        const tempcountry = action.state.split('/')[0];
        const tempcountrycode = action.state.split('/')[1];

        const tempObject = {
            receiver_name: action.receiver_name,
            line_1: action.line_1,
            line_2: action.line_2,
            line_3: action.line_3,
            city: action.city,
            postal_code: action.postal_code,
            state: tempcountry,
            state_code: tempcountrycode,
            sms_prefix: action.sms_prefix,
            sms_number: action.sms_number,
            contact_number: action.contact_number,
        };
        res = yield call(apiRequest, '/address', 'post', tempObject);
    }

    // wont refresh
    if (res && res.ok) {
        yield put(getInformChoice());
        yield put(getUserInform());
    } else {
        yield put(getDataFail(res.data));
    }
}

// Individual exports for testing
export default function* profileEditInformSaga() {
    yield [
        takeLatest(GET_USER_INFORM, getUserInformWorker),
        takeLatest(GET_INFORM_CHOICE, getUserChoiceWorker),
        takeLatest(GET_USER_ADDRESS, getUserAddressWorker),
        takeLatest(PUT_DATA, putUserInformWorker),
        takeLatest(POST_ADDRESS, postAddressWorker),
    ];
}
