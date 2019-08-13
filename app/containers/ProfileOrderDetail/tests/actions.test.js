
import {
    getOrderData,
} from '../actions';
import {
    GET_ORDER_DATA,
} from '../constants';

describe('ProfileOrderDetail actions', () => {
    describe('Get Order Data', () => {
        it('has a type of GET_ORDER_DATA', () => {
            const expected = {
                type: GET_ORDER_DATA,
            };
            expect(getOrderData()).toEqual(expected);
        });
    });
});
