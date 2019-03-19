
import { fromJS } from 'immutable';
import topbarReducer from '../reducer';

const initialState = fromJS({
    loading: false,
    error: false,
    topNav: [
        {
            text: 'Loading...',
            code: 'navigator-loading',
        },
    ],
});

describe('topbarReducer', () => {
    it('returns the initial state', () => {
        expect(topbarReducer(undefined, {})).toEqual(fromJS(initialState));
    });
});
