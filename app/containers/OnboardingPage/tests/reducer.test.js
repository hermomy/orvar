
import { fromJS } from 'immutable';
import onboardingPageReducer from '../reducer';

describe('onboardingPageReducer', () => {
    it('returns the initial state', () => {
        expect(onboardingPageReducer(undefined, {})).toEqual(fromJS({}));
    });
});
