import { apiRequest } from 'globalUtils';
import { takeLatest, call, put } from 'redux-saga/effects';
import { GET_REVIEW, POST_REVIEW } from './constants';
import { getReviewSuccess, getReviewFail, getReview } from './actions';

export function* reviewDataWorker(action) {
    let res;

    if (!action.pageNum) {
        res = yield call(apiRequest, `/mall/reviewable${action.API}?reviewed=0`, 'get');
    } else {
        res = yield call(apiRequest, `/mall/reviewable${action.API}?reviewed=0&page=${action.pageNum}`, 'get');
    }

    if (res && res.ok) {
        yield put(getReviewSuccess({ reviewData: res.data }));
    } else {
        yield put(getReviewFail(res.data));
    }
}

// fix post later :(
export function* postReviewWorker(action) {
    const temp = action.wholeproduct;
    temp.comment = action.comment;
    temp.rating = action.rating;
    temp.mall_id = temp.id;
    console.log(temp);
    const res = yield call(apiRequest, '/review', 'post', temp);

    if (res && res.ok) {
        yield put(getReview(''));
    } else {
        yield put(getReviewFail(res.data));
    }
}

// Individual exports for testing
export default function* profileReviewSaga() {
    yield [
        takeLatest(GET_REVIEW, reviewDataWorker),
        takeLatest(POST_REVIEW, postReviewWorker),
    ];
}
