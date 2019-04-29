/**
 *
 * ProfileWallet
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { dataChecking } from 'globalUtils';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Pagination from 'components/Pagination';

import makeSelectProfileWallet from './selectors';
import reducer from './reducer';
import saga from './saga';
import './style.scss';
import {
    getVoucher,
    getBalance,
    getProfile,
} from './actions';

export class ProfileWallet extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    state = {
        wallet: 'usable=true',
        category: 'voucher',
    }

    componentWillMount() {
        this.props.dispatch(getVoucher('usable=true'));
    }

    renderVoucher = () => {
        if (!dataChecking(this.props, 'profileWallet', 'data', 'walletData')) {
            return null;
        }
        return (
            <div>
                <input type="button" onClick={() => { this.setState({ wallet: 'usable=true' }); this.props.dispatch(getVoucher('usable=true')); }} value="usable vouchers" />
                <input type="button" onClick={() => { this.setState({ wallet: '' }); this.props.dispatch(getVoucher('')); }} value="all vouchers" />
                {
                    this.props.profileWallet.data.walletData._meta.pageCount <= 1 && dataChecking(this.props, 'profileWallet', 'data', 'walletData', '_links', 'next') ?
                        <Pagination
                            parentProps={this.props}
                            meta={this.props.profileWallet.data.walletData._meta}
                            link={this.props.profileWallet.data.walletData._links}
                            goToPage={1}
                            isHerlisting={false}
                            callBack={(targetpage) => { this.props.dispatch(getVoucher(this.state.wallet, targetpage)); }}
                        />
                        :
                        null
                }
                <table>
                    <tbody>
                        <tr>
                            <td>Code</td>
                            <td>Description</td>
                            <td>Status</td>
                            <td>Expiry Date</td>
                        </tr>
                        {
                            this.props.profileWallet.data.walletData.items.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.code}</td>
                                    <td>{item.description_title}<br />{item.description_text}</td>
                                    <td>{item.status}</td>
                                    <td>{item.expired_datetime}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        );
    }

    renderCredit = () => (
        null
    )

    // where can get RM/SG https://hermomy.zendesk.com/embeddable/config don't hv
    renderBalance = () => {
        if (!dataChecking(this.props, 'profileWallet', 'data', 'balanceData')) {
            return null;
        }
        return (
            <div>
                {
                    dataChecking(this.props, 'profileWallet', 'data', 'profileData') ?
                        <div>
                            <span>USABLE RM{this.props.profileWallet.data.profileData.balance.usable}</span>
                            <span>ON HOLD RM{this.props.profileWallet.data.profileData.balance.on_hold}</span>
                            <span>TOTAL RM{this.props.profileWallet.data.profileData.balance.total}</span>
                        </div>
                    :
                    null
                }
                {
                    dataChecking(this.props, 'profileWallet', 'data', 'balanceData', 'items', length) ?
                        <table border="1">
                            <tbody>
                                <tr>
                                    <td>Reference</td>
                                    <td>Reference Value</td>
                                    <td>Amount</td>
                                    <td>Date Created</td>
                                </tr>
                                {
                                    this.props.profileWallet.data.balanceData.items.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.reference}</td>
                                            <td>{item.reference_value}</td>
                                            <td>{item.amount}</td>
                                            <td>{item.created_at}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    :
                    null
                }

            </div>
        );
    }

    render() {
        console.log(this.props);
        return (
            <div>
                <div>
                    <input type="button" onClick={() => { this.setState({ category: 'voucher' }); this.props.dispatch(getVoucher('usable=true')); }} value="Voucher" />
                    <input type="button" onClick={() => { this.setState({ category: 'credit' }); }} value="Credits" />
                    <input type="button" onClick={() => { this.setState({ category: 'balance' }); this.props.dispatch(getBalance()); this.props.dispatch(getProfile()); }} value="Balance" />
                </div>
                <div>
                    {this.state.category === 'voucher' ? this.renderVoucher() : null}
                    {this.state.category === 'credit' ? this.renderCredit() : null}
                    {this.state.category === 'balance' ? this.renderBalance() : null}
                </div>
            </div>
        );
    }
}

ProfileWallet.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    profileWallet: makeSelectProfileWallet(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'profileWallet', reducer });
const withSaga = injectSaga({ key: 'profileWallet', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(ProfileWallet);
