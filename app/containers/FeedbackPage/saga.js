import { takeLatest, call, put } from 'redux-saga/effects';
import { apiRequest } from 'globalUtils';
import { POST_FEEDBACK } from './constants';
import { postFeedbackSuccess, postFeedbackFail } from './actions';


export function* postFeedbackWorker(action) {
    const temp = {
        comment: action.comment,
        product_suggestion: action.suggestProduct,
        rating: action.rate / 2,
    };
    const res = yield call(apiRequest, '/feedback', 'post', temp);

    if (res && res.ok) {
        yield put(postFeedbackSuccess());
    } else {
        yield put(postFeedbackFail(res.data));
    }
}

// Individual exports for testing
export default function* feedbackPageSaga() {
    yield takeLatest(POST_FEEDBACK, postFeedbackWorker);
}
