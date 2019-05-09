
import {
    getMall,
} from '../actions';
import {
    GET_MALL,
} from '../constants';

describe('MallPage actions', () => {
    describe('Default Action', () => {
        it('has a type of GET_MALL', () => {
            const expected = {
                type: GET_MALL,
            };
            expect(getMall()).toEqual(expected);
        });
    });
});
