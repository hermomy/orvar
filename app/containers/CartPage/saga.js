import { takeLatest, put, call } from 'redux-saga/effects';
import { notifySuccess, notifyError } from 'containers/Notify';
import { apiRequest } from '../../globalUtils';

import {
    GET_CHECKOUT_DATA,
    QTY_UPDATE,
} from './constants';
import {
    checkoutSuccess,
    updateQtySuccess,
    checkoutFailed,
} from './actions';

export function* getCheckoutData() {
    const response = yield call(apiRequest, '/cart', 'get');
    if (response && response.ok) {
        yield put(checkoutSuccess(response.data));
    } else {
        yield put(checkoutFailed(response.data));
        notifyError(response.data.messages[0].text);
    }
}

export function* updateQtyInCart(action) {
    const body = JSON.stringify({
        param: action.id,
        qty: action.qty,
    });
    const response = yield call(apiRequest, `/cart/${action.id}`, 'put', body);
    if (response && response.ok) {
        yield put(updateQtySuccess(response.data));
        notifySuccess(response.data.messages[0].text);
    } else {
        // yield put(listingRequestFailed(response.data));
    }
}

// Individual exports for testing
export default function* cartPageSaga() {
    yield takeLatest(GET_CHECKOUT_DATA, getCheckoutData);
    yield takeLatest(QTY_UPDATE, updateQtyInCart);
}
