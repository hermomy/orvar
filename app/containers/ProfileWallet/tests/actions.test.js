
import {
    getVoucher,
} from '../actions';
import {
    GET_VOUCHER,
} from '../constants';

describe('ProfileWallet actions', () => {
    describe('Default Action', () => {
        it('has a type of GET_VOUCHER', () => {
            const expected = {
                type: GET_VOUCHER,
            };
            expect(getVoucher()).toEqual(expected);
        });
    });
});
