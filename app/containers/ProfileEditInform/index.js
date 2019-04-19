/**
 *
 * ProfileEditInform
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Checkbox from 'components/Checkbox';
import { dataChecking } from 'globalUtils';

import makeSelectProfileEditInform from './selectors';
import reducer from './reducer';
import saga from './saga';
import './style.scss';
import { getInformChoice, getUserInform } from './actions';

export class ProfileEditInform extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    state = {
        datestyle: 'show',
        thisyear: new Date(Date.now()).getUTCFullYear(),
        gender: dataChecking(this.props, 'profileEditInform', 'data', 'UserInformData', 'gender'),
        year: new Date(dataChecking(this.props, 'profileEditInform', 'data', 'UserInformData', 'birthday')).getFullYear(),
        month: new Date(dataChecking(this.props, 'profileEditInform', 'data', 'UserInformData', 'birthday')).getMonth(),
        day: new Date(dataChecking(this.props, 'profileEditInform', 'data', 'UserInformData', 'birthday')).getDate(),
        skinTone: dataChecking(this.props, 'profileEditInform', 'data', 'UserInformData', 'skin', 'tone'),
        skinType: dataChecking(this.props, 'profileEditInform', 'data', 'UserInformData', 'skin', 'type'),
        skinConcernData: null,
        monthList: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    }

    componentWillMount() {
        this.props.dispatch(getInformChoice());
        this.props.dispatch(getUserInform());
    }

    saveUserConcernToState = (userChoice) => {
        this.setState({ skinConcernData: userChoice });
    }

    submitInform = () => {
        // left this
    }

    renderCheckbox = (user, choice) => {
        if (!dataChecking(choice, 'skin_problem', 'items')) {
            return null;
        }
        return (
            <Checkbox
                choice={choice.skin_problem.items}
                userselect={user.skin.concerns}
                saveDataToContainer={(userChoice) => this.saveUserConcernToState(userChoice)}
            />
        );
    }

    renderForm = () => {
        if (!dataChecking(this.props, 'profileEditInform', 'data', 'InformChoiceData') || !dataChecking(this.props, 'profileEditInform', 'data', 'UserInformData')) {
            return null;
        }
        const user = this.props.profileEditInform.data.UserInformData;
        const choice = this.props.profileEditInform.data.InformChoiceData;
        return (
            <div>
                <span>Username</span>
                <input type="text" disabled={true} value={user.username} />
                <span>User Level</span>
                <input type="text" disabled={true} value={user.membership.name} />
                <span>Email Address</span>
                <input type="text" disabled={true} value={user.email} />
                <select name="sex">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                <span>Email Address</span>
                <input type="text" disabled={true} value={user.email} />
                {
                    this.state.datestyle === 'show' ?
                        <div>
                            <input type="text" disabled={true} value={user.email} />
                            <input type="text" value={user.birthday} disabled={true} /><i className="fa fa-calendar" aria-hidden="true" onClick={() => this.setState({ datestyle: 'edit' })}></i>
                        </div>
                        :
                        <div>
                            <select value={this.state.year} onChange={(e) => this.setState({ year: e.target.value })}>
                                <option value="Year" >Year</option>
                                {[...Array(this.state.thisyear - 1918)].map((e, i) => <option key={this.state.thisyear - i}>{ this.state.thisyear - i }</option>)}
                            </select>
                            <select value={this.state.month} onChange={(e) => this.setState({ month: parseInt(e.target.value, 10) + 1 })}>
                                <option value="Month">Month</option>
                                {[...Array(12)].map((e, i) => <option key={i} value={i} >{this.state.monthList[i]}</option>)}
                            </select>
                            <select value={this.state.day} onChange={(e) => this.setState({ day: e.target.value })}>
                                <option value="Day">Day</option>
                                {[...Array(31)].map((e, i) => <option key={i} >{i + 1}</option>)}
                            </select>
                        </div>
                }
                <span>Skin Tone</span>
                {
                    choice.skin_tone.items.map((item) => (
                        <div key={item.id}>
                            <input name="skin_tone" type="radio" value={item} defaultChecked={item.id === user.skin.tone.id} onChange={() => this.setState({ skinTone: item })} />{item.name}
                        </div>
                    ))
                }
                <span>Skin Type</span>
                {
                    choice.skin_type.items.map((item) => (
                        <div key={item.id}>
                            <input name="skin_type" type="radio" value={item} defaultChecked={item.id === user.skin.type.id} />{item.name}
                        </div>
                    ))
                }
                <span>Skin Concern</span>
                {this.renderCheckbox(user, choice)}
                <input type="button" value="Save Change" onClick={() => this.submitInform()} />
            </div>
        );
    }

    render() {
        console.log(this.props);
        return (
            <div>
                {this.renderForm()}
            </div>
        );
    }
}

ProfileEditInform.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    profileEditInform: makeSelectProfileEditInform(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'profileEditInform', reducer });
const withSaga = injectSaga({ key: 'profileEditInform', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(ProfileEditInform);
