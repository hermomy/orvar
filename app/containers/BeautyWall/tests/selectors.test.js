import { fromJS } from 'immutable';
import makeSelectBeautyWall from '../selectors';
import { initialState } from '../reducer';

describe('makeSelectBeautyWall', () => {
    it('Expect makeSelectBeautyWall to return state from reducer', () => {
        const selector = makeSelectBeautyWall();
        const mock = fromJS({ BeautyWall: initialState });
        expect(selector(mock)).toEqual(initialState.toJS());
    });
});
