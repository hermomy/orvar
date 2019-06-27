/**
 *
 * ProfileEditInfo
 *
 */

import React from 'react';
import { apiRequest, dataChecking } from 'globalUtils';
import { fromJS } from 'immutable';
import PropTypes from 'prop-types';

import Async from 'assets/react-async';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import PopupDialog from 'components/PopupDialog';

import globalScope from 'globalScope';

import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Create } from '@material-ui/icons/';

import makeSelectProfileEditInfo from './selectors';
import reducer from './reducer';
import saga from './saga';
import './style.scss';

export class ProfileEditInfo extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    state = {
        popup: false,

        value: '',
        genderValue: '',

        profileInfoConfigs: [
            { label: 'PHOTO', default: 'Add a photo to personalise your account', isAvatar: true },
            { label: 'NAME', dataPath: ['username'] },
            { label: 'LEVEL', dataPath: ['membership', 'name'] },
            { label: 'GENDER', dataPath: ['gender'], action: 'edit_gender', icon: <Create /> },
            { label: 'EMAIL', dataPath: ['email'] },
            { label: 'BIRTHDAY', dataPath: ['birthday'], action: 'edit_birthday', icon: <Create /> },
            { label: 'PASSWORD', default: '••••••••', action: 'edit_password', icon: <Create /> },
        ],
        skinDetailConfigs: [
            { label: 'SKIN TONE', isColorCoded: true, dataPath: ['skin', 'tone', 'name'], action: 'skin_tone', icon: <Create /> },
            { label: 'SKIN TYPE', dataPath: ['skin', 'type', 'name'], action: 'skin_type', icon: <Create /> },
            { label: 'SKIN CONCERN', action: 'skin_concern', icon: <Create /> },
        ],
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextState.userData !== this.state.userData) {
            console.log('not same', nextState.userData);
        } else {
            console.log('same', this.state.userData);
        }
    }

    onActionButtonClick = ({ type }) => {
        let dialogTitle = null;

        switch (type) {
            case 'edit_gender':
                dialogTitle = 'Gender';
                break;
            case 'edit_birthday':
                dialogTitle = 'Birthday';
                break;
            case 'edit_password':
                dialogTitle = 'Password';
                break;
            case 'skin_tone':
                dialogTitle = 'Update your skin tone';
                break;
            case 'skin_type':
                dialogTitle = 'Update your skin type';
                break;
            case 'skin_concern':
                dialogTitle = 'Update your skin concern';
                break;
            default:
                break;
        }

        this.setState({
            popup: !this.state.popup,
            dialogTitle,
            dialogType: type,
        });
    }

    getUserData = apiRequest('/profile', 'get');
    getCommonData = apiRequest('/common', 'get');
    getData = () => Promise.all([this.getUserData, this.getCommonData]);

    putProfileData = (dataPath) => apiRequest('/profile', 'put', dataChecking(this.state, dataPath));

    handleChange = (value, objKey, path) => {
        // fromJS
        const immuObj = fromJS(dataChecking(this.state, objKey));
        const updatedObj = immuObj.setIn(path, value);
        globalScope.test = updatedObj.toJS();
        console.log('check1', globalScope.test);
        this.setState({ [objKey]: updatedObj.toJS() });
        const newState = { ...this.state };
        newState[objKey] = updatedObj.toJS();
        this.setState(newState);
        console.log('check2', newState);
        // this.setState({ value: event.target.value });
    };

    renderDialogContent = () => {
        switch (this.state.dialogType) {
            case 'edit_gender':
                return (
                    <form>
                        <FormControl style={{ display: 'flex', flexWrap: 'wrap' }}>
                            <InputLabel htmlFor="gender-selector">Gender</InputLabel>
                            <Select
                                value={this.state.genderValue}
                                onChange={this.handleChange}
                                input={<Input id="gender-selector" />}
                            >
                                <MenuItem value={'Male'}>Male</MenuItem>
                                <MenuItem value={'Female'}>Female</MenuItem>
                            </Select>
                        </FormControl>
                    </form>
                );
            case 'edit_birthday':
                return (
                    <div>
                        <form noValidate={true}>
                            <TextField
                                id="date"
                                type="date"
                            />
                        </form>
                    </div>
                );
            case 'edit_password':
                return <div>password</div>;
            case 'skin_tone':
                return (
                    <FormControl component="fieldset">
                        <RadioGroup
                            value={`${dataChecking(this.state, 'userData', 'data', 'skin', 'tone', 'id')}`}
                            onChange={(event) => {
                                this.handleChange(parseInt(event.target.value, 10), 'userData', ['data', 'skin', 'tone', 'id']);
                            }}
                        >
                            {
                                this.state.skinData.data.skin_tone.items.map((option, index) => (
                                    <FormControlLabel
                                        key={option.name + index}
                                        value={`${option.id}`}
                                        disabled={false}
                                        control={<Radio disabled={false} />}
                                        label={
                                            <div style={{ flexDirection: 'row', display: 'flex' }}>
                                                <span style={{ borderRadius: 100, backgroundColor: option.color_code, width: 20, height: 20, marginTop: 10 }} />
                                                <span>{option.name}</span>
                                            </div>
                                        }
                                    />
                                ))
                            }
                        </RadioGroup>
                    </FormControl>
                );
            case 'skin_type':
                return (
                    <FormControl component="fieldset">
                        <RadioGroup
                            value={this.state.value}
                            onChange={this.handleChange}
                        >
                            {
                                this.state.skinData.data.skin_type.items.map((option, index) => (
                                    <FormControlLabel
                                        key={option.name + index}
                                        value={option.name}
                                        disabled={false}
                                        control={<Radio disabled={false} />}
                                        label={option.name}
                                    />
                                ))
                            }
                        </RadioGroup>
                    </FormControl>
                );
            case 'skin_concern':
                return (
                    <FormControl component="fieldset">
                        <FormLabel>* You can select more than one option</FormLabel>
                        <FormGroup
                            value={this.state.value}
                            onChange={this.handleRadioChange}
                        >
                            {
                                this.state.skinData.data.skin_concern.items.map((option, index) => (
                                    <FormControlLabel
                                        key={option.name + index}
                                        value={option.name}
                                        disabled={false}
                                        control={<Checkbox value={option.name} disabled={false} />}
                                        label={option.name}
                                    />
                                ))
                            }
                        </FormGroup>
                    </FormControl>
                );
            default:
                break;
        }

        return null;
    }

    renderProfileInfoCard = () => (
        this.state.userData ?
            <Card>
                <CardHeader
                    title={
                        <div>
                            <Typography variant="subtitle1">Profile Info</Typography><br />
                            <Typography variant="body1" color="textSecondary">Your personal details are only for Hermo product services, it will not be reavealed to the public or other hermo users.</Typography>
                        </div>
                    }
                />
                <CardContent>
                    {
                        this.state.profileInfoConfigs.map((config, index) => (
                            <div key={index}>
                                <Grid container={true} className="m-1">
                                    <Grid item={true} lg={2} md={2} xs={12}><Typography variant="body2" color="textSecondary">{config.label}</Typography></Grid>
                                    <Grid item={true} lg={9} md={9} xs={10}><Typography variant="body2">{config.dataPath ? dataChecking(this.state.userData.data, config.dataPath) : config.default}</Typography></Grid>
                                    <Grid item={true} lg={1} md={1} xs={2}>
                                        {config.isAvatar ?
                                            <div className="avatar-container">
                                                <input id="avatar-uploader" accept="image/*" type="file" style={{ display: 'none' }} />
                                                <label htmlFor="avatar-uploader">
                                                    <IconButton size="small" component="span"><Avatar src={this.state.userData.data.avatar} className="avatar-responsive" /></IconButton>
                                                    <i className="fa fa-camera" />
                                                </label>
                                            </div>
                                            :
                                            <IconButton size="small" onClick={() => this.onActionButtonClick({ type: config.action })}>{config.icon}</IconButton>
                                        }
                                    </Grid>
                                </Grid>
                                {(this.state.profileInfoConfigs.length - 1 !== index) ? <Divider /> : '' }
                            </div>
                        ))
                    }
                </CardContent>
            </Card>
            :
            null
    )

    renderSkinDetailCard = () => {
        if (!this.state.userData || !this.state.skinData) {
            return null;
        }
        const skinConcern = this.state.userData.data.skin.concerns.map((concern) => concern.name);
        const concernList = skinConcern.join(', ');

        return (
            <Card className="mt-2 mb-2">
                <CardHeader
                    title={
                        <div>
                            <Typography variant="subtitle1">Skin Details</Typography><br />
                            <Typography variant="body1" color="textSecondary">Get to know your skin and discover the best product for your concern.</Typography>
                        </div>
                    }
                />
                <CardContent>
                    {
                        this.state.skinDetailConfigs.map((config, index) => (
                            <div key={index}>
                                <Grid container={true} className="m-1">
                                    <Grid item={true} md={2} xs={12}><Typography variant="body2" color="textSecondary">{config.label}</Typography></Grid>
                                    <Grid item={true} md={9} xs={10}>
                                        <div style={{ flexDirection: 'row', display: 'flex' }}>
                                            {config.isColorCoded ?
                                                <div style={{ borderRadius: 100, backgroundColor: this.state.userData.data.skin.tone.color_code, width: 20, height: 20, marginRight: 10 }} />
                                                :
                                                null
                                            }
                                            <Typography variant="body2">{config.dataPath ? dataChecking(this.state.userData.data, config.dataPath) : concernList}</Typography>
                                        </div>
                                    </Grid>
                                    <Grid item={true} md={1} xs={1}><IconButton size="small" onClick={() => this.onActionButtonClick({ type: config.action })}>{config.icon}</IconButton></Grid>
                                </Grid>
                                {(this.state.skinDetailConfigs.length - 1 !== index) ? <Divider /> : '' }
                            </div>
                        ))
                    }
                </CardContent>
            </Card>
        );
    }

    render() {
        return (
            <Container>
                <div align="center" className="m-2">
                    <Typography variant="subtitle1" display="block" gutterBottom={true}>Profile</Typography>
                    <Typography>Basic info, like your name, photo and your skin details</Typography>
                </div>
                <Async promise={this.getData()}>
                    <Async.Loading><CircularProgress /></Async.Loading>
                    <Async.Resolved>
                        {(data) => {
                            this.state.userData = data[0];
                            this.state.skinData = data[1];
                            return (
                                <div>
                                    {this.renderProfileInfoCard()}
                                    {this.renderSkinDetailCard()}
                                </div>
                            );
                        }}
                    </Async.Resolved>
                    <Async.Rejected>
                        <div>PLACEHOLDER FOR ERROR</div>
                    </Async.Rejected>
                </Async>
                <PopupDialog
                    display={this.state.popup}
                    title={this.state.dialogTitle}
                    onUpdate={() => {
                        console.log({
                            // global: globalScope.test.data.skin.tone,
                            state: this.state.userData.data.skin.tone,
                        });
                        // this.putProfileData(dataChecking(globalScope.test, 'data')).then((response) => {
                        this.putProfileData(['userData', 'data']).then((response) => {
                            console.log(response);
                            this.setState({ popup: false, userData: response });
                        });
                    }}
                    onCancel={() => {
                        this.setState({ popup: false });
                    }}
                >
                    {this.renderDialogContent()}
                </PopupDialog>
            </Container>
        );
    }
}

ProfileEditInfo.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    profileEditInfo: makeSelectProfileEditInfo(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'profileEditInfo', reducer });
const withSaga = injectSaga({ key: 'profileEditInfo', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(ProfileEditInfo);
