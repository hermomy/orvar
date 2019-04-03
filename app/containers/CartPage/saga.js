import { call, takeLatest, put } from 'redux-saga/effects';
import { GET_CHECKOUT_DATA } from './constants';
import { apiRequest } from '../../globalUtils';
import { checkoutDataSuccess } from './actions';

function* getCheckoutData() {
    const response = yield call(apiRequest, '/cart', 'get');
    if (response && response.ok) {
        yield put(checkoutDataSuccess(response.data));
    } else {
        // yield put(listingRequestFailed(response.data));
    }
}

// Individual exports for testing
export default function* defaultSaga() {
    yield takeLatest(GET_CHECKOUT_DATA, getCheckoutData);
    // See example in containers/HomePage/saga.js
}
