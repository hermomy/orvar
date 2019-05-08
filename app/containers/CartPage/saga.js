import { takeLatest, put, call } from 'redux-saga/effects';
import { notifySuccess, notifyError } from 'containers/Notify';
import { apiRequest } from '../../globalUtils';
import {
    GET_CART_DATA,
    QTY_UPDATE,
    ITEM_DELETE,
} from './constants';
import {
    checkoutSuccess,
    checkoutFailed,
    updateQtySuccess,
    updateQtyFail,
    removeItemInCartSuccess,
    removeItemInCartFail,
} from './actions';

export function* queryCheckoutData() {
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
        yield put(updateQtyFail(response.data));
        notifyError(response.data.messages[0].text);
    }
}

export function* deleteItemInCart(action) {
    const response = yield call(apiRequest, `/cart/${action.id}`, 'delete');
    if (response && response.ok) {
        yield put(removeItemInCartSuccess(response.data));
        notifySuccess(response.data.messages[0].text);
    } else {
        yield put(removeItemInCartFail(response.data));
        notifyError(response.data.messages[0].text);
    }
}
// Individual exports for testing
export default function* checkoutPageSaga() {
    yield takeLatest(GET_CART_DATA, queryCheckoutData);
    yield takeLatest(QTY_UPDATE, updateQtyInCart);
    yield takeLatest(ITEM_DELETE, deleteItemInCart);
}
