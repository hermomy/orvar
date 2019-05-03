
import {
    getProfile,
    getProfileSuccess,
    getProfileFail,
} from '../actions';
import {
    GET_PROFILE,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAIL,
} from '../constants';

describe('has a type of GET_PROFILE', () => {
    it('expected to get data', () => {
        const expected = {
            type: GET_PROFILE,
        };
        expect(getProfile()).toEqual(expected);
    });
});

describe('has a type of GET_PROFILE_SUCCESS', () => {
    const payloadData = true;
    it('expected to get data success', () => {
        const expected = {
            type: GET_PROFILE_SUCCESS,
        };
        expect(getProfileSuccess(payloadData)).toEqual(expected);
    });
});

describe('has a type of GET_PROFILE_FAIL', () => {
    const payloadData = true;
    it('expected to get data fail', () => {
        const expected = {
            type: GET_PROFILE_FAIL,
        };
        expect(getProfileFail(payloadData)).toEqual(expected);
    });
});
