import { takeLatest, put, call } from 'redux-saga/effects';
import { GET_CHECKOUT_DATA } from './constants';
import { apiRequest } from '../../globalUtils';
import { checkoutSuccess } from './actions';


export function* getCheckoutData() {
    const response = yield call(apiRequest, '/cart', 'get');
    if (response && response.ok) {
        yield put(checkoutSuccess(response.data));
    } else {
        // yield put(listingRequestFailed(response.data));
    }
}

// Individual exports for testing
export default function* cartPageSaga() {
    yield takeLatest(GET_CHECKOUT_DATA, getCheckoutData);
}
