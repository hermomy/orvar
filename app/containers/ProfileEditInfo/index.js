/**
 *
 * ProfileEditInfo
 *
 */

import React from 'react';
import { dataChecking } from 'globalUtils';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import PopupDialog from 'components/PopupDialog';
import { notifySuccess, notifyError } from 'containers/Notify';

import {
    Avatar,
    Card,
    Checkbox,
    Divider,
    Grid,
    CardContent,
    CardHeader,
    CircularProgress,
    Container,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    FormHelperText,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
    Radio,
    RadioGroup,
    TextField,
    Typography,
    Button,
} from '@material-ui/core';
import {
    Create,
    Visibility,
    VisibilityOff,
} from '@material-ui/icons';

import makeSelectProfileEditInfo from './selectors';
import * as actions from './actions';
import reducer from './reducer';
import saga from './saga';
import './style.scss';

export class ProfileEditInfo extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    state = {
        popup: false,
        showCurrentPassword: false,
        showPassword: false,
        showPasswordConfirmation: false,

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
            { label: 'SKIN TONE', dataPath: ['skin', 'tone', 'name'], action: 'skin_tone', icon: <Create /> },
            { label: 'SKIN TYPE', dataPath: ['skin', 'type', 'name'], action: 'skin_type', icon: <Create /> },
            { label: 'SKIN CONCERN', action: 'skin_concern', icon: <Create /> },
        ],
    }

    componentWillMount() {
        this.props.dispatch(actions.getUserData());
        this.props.dispatch(actions.getCommonConfig());
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.profileEditInfo.notification !== nextProps.profileEditInfo.notification) {
            if (nextProps.profileEditInfo.notification.type === 'fail') {
                notifyError(nextProps.profileEditInfo.notification.message);
            } else {
                notifySuccess(nextProps.profileEditInfo.notification.message);
            }
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

    renderDialogContent = () => {
        switch (this.state.dialogType) {
            case 'edit_gender':
                return (
                    <form>
                        <RadioGroup
                            value={dataChecking(this.props.profileEditInfo, 'userData', 'gender')}
                            onChange={(event) => {
                                this.props.dispatch(actions.changePropsAndUpdate({
                                    objKey: 'userData',
                                    dataPath: ['gender'],
                                    value: event.target.value,
                                    currentValue: dataChecking(this.props.profileEditInfo, 'userData', 'gender'),
                                    formName: 'Gender',
                                    successCallback: setTimeout(() => this.setState({ popup: false }), 900),
                                }));
                            }}
                        >
                            <FormControlLabel
                                value={'Female'}
                                disabled={false}
                                control={<Radio disabled={false} />}
                                label={'Female'}
                            />
                            <FormControlLabel
                                value={'Male'}
                                disabled={false}
                                control={<Radio disabled={false} />}
                                label={'Male'}
                            />
                        </RadioGroup>
                    </form>
                );
            case 'edit_birthday':
                return (
                    <form>
                        <TextField
                            id="date"
                            type="date"
                            value={dataChecking(this.props.profileEditInfo, 'newBirthday', 'value') || dataChecking(this.props, 'profileEditInfo', 'userData', 'birthday')}
                            onChange={() => {
                                this.props.dispatch(actions.changeProps({
                                    objKey: 'newBirthday',
                                    dataPath: ['value'],
                                    value: event.target.value,
                                }));
                            }}
                            style={{ display: 'flex', flexWrap: 'wrap' }}
                            required={true}
                        />
                        <Button
                            onClick={() => {
                                if (dataChecking(this.props.profileEditInfo, 'newBirthday', 'value')) {
                                    this.props.dispatch(actions.changePropsAndUpdate({
                                        objKey: 'userData',
                                        dataPath: ['birthday'],
                                        value: this.props.profileEditInfo.newBirthday.value,
                                        currentValue: dataChecking(this.props, 'profileEditInfo', 'userData', 'birthday'),
                                        formName: 'Birthday',
                                        successCallback: setTimeout(() => this.setState({ popup: false }), 900),
                                    }));
                                }
                            }}
                            color="secondary"
                            style={{ float: 'right', marginTop: 10 }}
                        >
                            Update
                        </Button>
                    </form>
                );
            case 'edit_password':
                return (
                    <form>
                        <FormControl style={{ display: 'flex' }}>
                            <InputLabel required={true} htmlFor="current-password">Current Password</InputLabel>
                            <Input
                                id="current-password"
                                type={this.state.showCurrentPassword ? 'text' : 'password'}
                                value={dataChecking(this.props.profileEditInfo, 'currentPassword', 'value') || ''}
                                onChange={() => {
                                    this.props.dispatch(actions.changeProps({
                                        objKey: 'currentPassword',
                                        dataPath: ['value'],
                                        value: event.target.value,
                                    }));
                                }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => {
                                                this.setState({ showCurrentPassword: !this.state.showCurrentPassword });
                                            }}
                                        >
                                            {this.state.showCurrentPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                autoComplete="off"
                                required={true}
                            />
                        </FormControl>
                        <FormControl required={true} style={{ display: 'flex', marginTop: 20 }}>
                            <InputLabel htmlFor="password">New Password</InputLabel>
                            <Input
                                id="password"
                                type={this.state.showPassword ? 'text' : 'password'}
                                value={dataChecking(this.props.profileEditInfo, 'password', 'value') || ''}
                                onChange={() => {
                                    this.props.dispatch(actions.changeProps({
                                        objKey: 'password',
                                        dataPath: ['value'],
                                        value: event.target.value,
                                    }));
                                }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => {
                                                this.setState({ showPassword: !this.state.showPassword });
                                            }}
                                        >
                                            {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                autoComplete="off"
                                required={true}
                                aria-describedby="password-helper"
                            />
                            <FormHelperText id="password-helper">Use at least 8 characters.</FormHelperText>
                        </FormControl>
                        <FormControl required={true} style={{ display: 'flex', marginTop: 10 }}>
                            <InputLabel htmlFor="password-confirmation">Confirm New Password</InputLabel>
                            <Input
                                id="password-confirmation"
                                type={this.state.showPasswordConfirmation ? 'text' : 'password'}
                                value={dataChecking(this.props.profileEditInfo, 'passwordConfirmation', 'value') || ''}
                                onChange={() => {
                                    this.props.dispatch(actions.changeProps({
                                        objKey: 'passwordConfirmation',
                                        dataPath: ['value'],
                                        value: event.target.value,
                                    }));
                                }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => {
                                                this.setState({ showPasswordConfirmation: !this.state.showPasswordConfirmation });
                                            }}
                                        >
                                            {this.state.showPasswordConfirmation ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                autoComplete="off"
                                required={true}
                            />
                        </FormControl>
                        <Button
                            disabled={(() => {
                                if (dataChecking(this.props.profileEditInfo, 'currentPassword', 'value', 'length') && dataChecking(this.props.profileEditInfo, 'password', 'value', 'length') && dataChecking(this.props.profileEditInfo, 'passwordConfirmation', 'value', 'length')) {
                                    return false;
                                }
                                return true;
                            })()}
                            onClick={() => {
                                if (dataChecking(this.props.profileEditInfo, 'password', 'value') !== dataChecking(this.props.profileEditInfo, 'passwordConfirmation', 'value')) {
                                    this.props.dispatch(actions.updatePasswordFailed(
                                        'Password and confirmation password do not match.'
                                    ));
                                } if (dataChecking(this.props.profileEditInfo, 'password', 'value') === dataChecking(this.props.profileEditInfo, 'passwordConfirmation', 'value')) {
                                    this.props.dispatch(actions.updatePassword({
                                        currentPassword: this.props.profileEditInfo.currentPassword.value,
                                        password: this.props.profileEditInfo.password.value,
                                        passwordConfirmation: this.props.profileEditInfo.passwordConfirmation.value,
                                        successCallback: setTimeout(() => this.setState({ popup: false }), 900),
                                    }));
                                }
                            }}
                            color="secondary"
                            style={{ float: 'right', marginTop: 20 }}
                        >
                            Change Password
                        </Button>
                    </form>
                );
            case 'skin_tone':
                return (
                    <form>
                        <RadioGroup
                            value={JSON.stringify({
                                id: dataChecking(this.props.profileEditInfo, 'userData', 'skin', 'tone', 'id'),
                                name: dataChecking(this.props.profileEditInfo, 'userData', 'skin', 'tone', 'name'),
                                color_code: dataChecking(this.props.profileEditInfo, 'userData', 'skin', 'tone', 'color_code'),
                            })}
                            onChange={(event) => {
                                this.props.dispatch(actions.changePropsAndUpdate({
                                    objKey: 'userData',
                                    dataPath: ['skin', 'tone'],
                                    value: JSON.parse(event.target.value),
                                    currentValue: dataChecking(this.props.profileEditInfo, 'userData', 'skin', 'tone'),
                                    formName: 'Skin Tone',
                                    successCallback: setTimeout(() => this.setState({ popup: false }), 900),
                                }));
                            }}
                        >
                            {
                                dataChecking(this.props.profileEditInfo, 'commonConfig', 'skin_tone', 'items') &&
                                    this.props.profileEditInfo.commonConfig.skin_tone.items.map((option, index) => (
                                        <FormControlLabel
                                            key={option.name + index}
                                            value={JSON.stringify({ id: option.id, name: option.name, color_code: option.color_code })}
                                            control={<Radio disabled={false} />}
                                            label={
                                                <div style={{ flexDirection: 'row', display: 'flex' }}>
                                                    <span style={{ borderRadius: 100, backgroundColor: option.color_code, width: 20, height: 20, marginRight: 10 }} />
                                                    <span>{option.name}</span>
                                                </div>
                                            }
                                        />
                                ))
                            }
                        </RadioGroup>
                    </form>
                );
            case 'skin_type':
                return (
                    <form>
                        <RadioGroup
                            value={JSON.stringify({
                                id: dataChecking(this.props.profileEditInfo, 'userData', 'skin', 'type', 'id'),
                                name: dataChecking(this.props.profileEditInfo, 'userData', 'skin', 'type', 'name'),
                            })}
                            onChange={(event) => {
                                this.props.dispatch(actions.changePropsAndUpdate({
                                    objKey: 'userData',
                                    dataPath: ['skin', 'type'],
                                    value: JSON.parse(event.target.value),
                                    currentValue: dataChecking(this.props.profileEditInfo, 'userData', 'skin', 'type'),
                                    formName: 'Skin Type',
                                    successCallback: setTimeout(() => this.setState({ popup: false }), 900),
                                }));
                            }}
                        >
                            {
                                dataChecking(this.props.profileEditInfo, 'commonConfig', 'skin_type', 'items') &&
                                    this.props.profileEditInfo.commonConfig.skin_type.items.map((option, index) => (
                                        <FormControlLabel
                                            key={option.name + index}
                                            value={JSON.stringify({ id: option.id, name: option.name })}
                                            disabled={false}
                                            control={<Radio disabled={false} />}
                                            label={
                                                <div style={{ flexDirection: 'row', display: 'flex' }}>
                                                    <span style={{ backgroundImage: `url('${option.menu.image.desktop}')`, backgroundRepeat: 'no-repeat', backgroundSize: 20, width: 20, height: 20, marginRight: 10, marginLeft: 10 }} />
                                                    <span>{option.name}</span>
                                                </div>
                                            }
                                        />
                                    ))
                            }
                        </RadioGroup>
                    </form>
                );
            case 'skin_concern':
                return (
                    <form>
                        <FormLabel>* You can select more than one option</FormLabel>
                        <FormGroup>
                            {
                                dataChecking(this.props.profileEditInfo, 'commonConfig', 'skin_concern', 'items') &&
                                    this.props.profileEditInfo.commonConfig.skin_concern.items.map((option, index) => (
                                        <FormControlLabel
                                            key={option.name + index}
                                            label={option.name}
                                            control={
                                                <Checkbox
                                                    value={JSON.stringify({ id: option.id, name: option.name })}
                                                    checked={(() => {
                                                        if (dataChecking(this.props.profileEditInfo, 'userData', 'skin', 'concerns')) {
                                                            const obj = this.props.profileEditInfo.userData.skin.concerns.find((item) => item.id === option.id);
                                                            return !!obj;
                                                        }
                                                        return false;
                                                    })()}
                                                    onChange={(event) => {
                                                        const concerns = [...this.props.profileEditInfo.userData.skin.concerns];
                                                        const targetValue = JSON.parse(event.target.value);

                                                        this.props.dispatch(actions.changePropsAndUpdate({
                                                            objKey: 'userData',
                                                            dataPath: ['skin', 'concerns'],
                                                            value: event.target.checked ? [...concerns, targetValue] : concerns.filter((item) => item.id !== targetValue.id),
                                                            currentValue: dataChecking(this.props.profileEditInfo, 'userData', 'skin', 'concerns'),
                                                            formName: 'Skin Concern',
                                                            showUpdatedTo: false,
                                                        }));
                                                    }}
                                                />
                                            }
                                        />
                                    ))
                            }
                        </FormGroup>
                    </form>
                );
            default:
                break;
        }

        return null;
    }

    renderProfileInfoCard = () => (
        this.props.profileEditInfo.userData ?
            <Card>
                <CardHeader
                    title={
                        <div>
                            <Typography variant="subtitle1">Profile Info</Typography><br />
                            <Typography variant="body1" color="textSecondary">Your personal details are only for Hermo product services, it will not be reavealed to the public or other hermo users.</Typography>
                        </div>
                    }
                />
                <CardContent style={{ paddingBottom: 16 }}>
                    {
                        this.state.profileInfoConfigs.map((config, index) => (
                            <div key={index}>
                                <Grid container={true} style={{ margin: '16px 16px 16px 0' }}>
                                    <Grid item={true} lg={2} md={2} xs={12}><Typography variant="body2" color="textSecondary">{config.label}</Typography></Grid>
                                    <Grid item={true} lg={9} md={9} xs={10}>
                                        <Typography variant="body2">
                                            {
                                                config.dataPath ?
                                                    dataChecking(this.props.profileEditInfo.userData, config.dataPath)
                                                    :
                                                    config.default
                                            }
                                        </Typography>
                                    </Grid>
                                    <Grid item={true} lg={1} md={1} xs={2}>
                                        {
                                            config.isAvatar ?
                                                <div className="avatar-container">
                                                    <input
                                                        id="avatar-uploader"
                                                        accept="image/*"
                                                        type="file"
                                                        style={{ display: 'none' }}
                                                        onChange={(event) => {
                                                            const file = dataChecking(event, 'target', 'files', 0);

                                                            if (file) {
                                                                const reader = new FileReader();
                                                                reader.readAsDataURL(file);
                                                                reader.onload = () => {
                                                                    const result = reader.result;
                                                                    const fileString = (result.split(';base64,')[1]) || null;
                                                                    if (fileString) {
                                                                        this.props.dispatch(actions.updateAvatar({
                                                                            fileString,
                                                                            file,
                                                                            dataPath: ['avatar'],
                                                                        }));
                                                                    }
                                                                };
                                                                reader.onerror = (error) => {
                                                                    console.log('Error: ', error);
                                                                };
                                                            }
                                                        }}
                                                    />
                                                    <label htmlFor="avatar-uploader">
                                                        {
                                                            this.props.profileEditInfo.updatingAvatar ?
                                                                <CircularProgress size={30} />
                                                                :
                                                                <IconButton
                                                                    size="small"
                                                                    component="span"
                                                                    style={{ padding: 0 }}
                                                                >
                                                                    <Avatar
                                                                        src={this.props.profileEditInfo.userData.avatar}
                                                                        className="avatar-responsive"
                                                                        style={{ width: 50, height: 50 }}
                                                                    />
                                                                </IconButton>
                                                        }
                                                        <i className="fa fa-camera" />
                                                    </label>
                                                </div>
                                                :
                                                <IconButton size="small" onClick={() => this.onActionButtonClick({ type: config.action })}>{config.icon}</IconButton>
                                        }
                                    </Grid>
                                </Grid>
                                {
                                    (this.state.profileInfoConfigs.length - 1 !== index) ?
                                        <Divider />
                                        :
                                        ''
                                }
                            </div>
                        ))
                    }
                </CardContent>
            </Card>
            :
            null
    )

    renderSkinDetailCard = () => {
        if (!this.props.profileEditInfo.userData || !this.props.profileEditInfo.commonConfig) {
            return null;
        }

        const skinConcern = this.props.profileEditInfo.userData.skin.concerns.map((concern) => concern.name);
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
                <CardContent >
                    {
                        this.state.skinDetailConfigs.map((config, index) => (
                            <div key={index}>
                                <Grid container={true} className="m-1">
                                    <Grid item={true} md={2} xs={12}><Typography variant="body2" color="textSecondary">{config.label}</Typography></Grid>
                                    <Grid item={true} md={9} xs={10}>
                                        <div style={{ flexDirection: 'row', display: 'flex' }}>
                                            {
                                                config.label === 'SKIN TONE' ?
                                                    <div style={{ borderRadius: 100, backgroundColor: this.props.profileEditInfo.userData.skin.tone.color_code, width: 20, height: 20, marginRight: 10 }} />
                                                    :
                                                    null
                                            }
                                            {
                                                config.label === 'SKIN TYPE' ?
                                                    dataChecking(this.props.profileEditInfo, 'commonConfig', 'skin_type', 'items').map((item) => (
                                                        item.id === this.props.profileEditInfo.userData.skin.type.id ?
                                                            <div
                                                                key={item.id}
                                                                style={{ backgroundImage: `url('${item.menu.image.desktop}')`, backgroundRepeat: 'no-repeat', backgroundSize: 20, width: 20, height: 20, marginRight: 10 }}
                                                            />
                                                            :
                                                            null
                                                        ))
                                                    :
                                                    null
                                            }
                                            <Typography variant="body2">
                                                {
                                                    config.dataPath ?
                                                        dataChecking(this.props.profileEditInfo.userData, config.dataPath)
                                                        :
                                                        concernList
                                                }
                                            </Typography>
                                        </div>
                                    </Grid>
                                    <Grid item={true} md={1} xs={1}><IconButton size="small" onClick={() => this.onActionButtonClick({ type: config.action })}>{config.icon}</IconButton></Grid>
                                </Grid>
                                {
                                    (this.state.skinDetailConfigs.length - 1 !== index) ?
                                        <Divider />
                                        :
                                        ''
                                    }
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
                <div align="center" style={{ margin: 16 }}>
                    <Typography variant="subtitle1" display="block" gutterBottom={true}>Profile</Typography>
                    <Typography>Basic info, like your name, photo and your skin details</Typography>
                </div>
                {
                    this.props.profileEditInfo.loading ?
                        <div style={{ textAlign: 'center' }}><CircularProgress /></div>
                        :
                        <div>
                            {this.renderProfileInfoCard()}
                            {this.renderSkinDetailCard()}
                        </div>
                }
                <PopupDialog
                    display={this.state.popup}
                    fullWidth={true}
                    title={this.state.dialogTitle}
                    onClose={() => {
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
