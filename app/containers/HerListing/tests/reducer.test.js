
import { fromJS } from 'immutable';
import { getData,
        getDataSuccess,
        getDataFail,
        getPage,
        getPageSuccess,
        getPageFail,
} from '../actions';
import herListingReducer from '../reducer';

describe('herListingReducer', () => {
    let initialState;
    beforeEach(() => {
        initialState = fromJS({});
    });
    const successData = { data: true };
    it('returns the initial state', (done) => {
        expect(herListingReducer(undefined, {})).toEqual(fromJS({}));
        done();
    });

    it('should show loading when try to getdata', (done) => {
        const expected = initialState.set('GetDataSuccess', false).set('loading', true).set('error', false);
        expect(herListingReducer(initialState, getData('https://api.hermo.my/mall'))).toEqual(expected);
        done();
    });

    it('should show when success to getdata', (done) => {
        const expected = initialState.set('data', true).set('GetDataSuccess', true).set('loading', false).set('error', false);
        expect(herListingReducer(initialState, getDataSuccess(true))).toEqual(expected);
        done();
    });

    it('should show when fail to getdata', (done) => {
        const expected = initialState.set('loading', false).set('GetDataError', [{ text: 'error', type: 'error' }]);
        expect(herListingReducer(initialState, getDataFail({ text: 'error', type: 'error' }))).toEqual(expected);
        done();
    });

    it('should show when try to getpage', (done) => {
        const expected = initialState.set('loading', true);
        expect(herListingReducer(initialState, getPage('https://api.hermo.my/mall'))).toEqual(expected);
        done();
    });

    it('should show when success to getpage', (done) => {
        const expected = initialState.set('data', successData).set('loading', false);
        expect(herListingReducer(initialState, getPageSuccess(successData))).toEqual(expected);
        done();
    });

    it('should show when fail to getpage', (done) => {
        const expected = initialState.set('loading', false);
        expect(herListingReducer(initialState, getPageFail())).toEqual(expected);
        done();
    });
});
