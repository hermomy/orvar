import { fromJS } from 'immutable';
import {
    postFeedback,
    postFeedbackSuccess,
    postFeedbackFail,
} from '../actions';
import feedbackPageReducer from '../reducer';

describe('getWishlist', () => {
    let initialState;
    beforeEach(() => {
        initialState = fromJS({});
    });
    it('expect reducer returns the initial state', (done) => {
        expect(feedbackPageReducer(undefined, {})).toEqual(fromJS({}));
        done();
    });

    it('expect reducer return when try to getFeedback', (done) => {
        const expected = initialState.set('loading', true).set('success', false);
        expect(feedbackPageReducer(initialState, postFeedback())).toEqual(expected);
        done();
    });

    it('expect reducer return when success to getFeedback', (done) => {
        const expected = initialState;
        expect(feedbackPageReducer(initialState, postFeedbackSuccess())).toEqual(expected);
        done();
    });

    it('expect reducer return when fail to getFeedback', (done) => {
        const expected = initialState.set('error').set('loading', false).set('success', false);
        expect(feedbackPageReducer(initialState, postFeedbackFail())).toEqual(expected);
        done();
    });
});
