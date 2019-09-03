/**
 *
 * ProfileRewards
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { dataChecking } from 'globalUtils';
import {
    Button,
    Container,
    Grid,
    Typography,
    Paper,
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Avatar,
    ButtonBase,
} from '@material-ui/core';
import PopupDialog from 'components/PopupDialog';
import parse from 'html-react-parser';
import {
    getRewards,
    getRewardsInfo,
    redeemRewards,
} from './actions';
import makeSelectProfileRewards from './selectors';
import reducer from './reducer';
import saga from './saga';
import './style.scss';

export class ProfileRewards extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            type: 'locals',
            popup: false,
            clickRedeem: false,
        };
    }
    componentDidMount() {
        this.props.dispatch(getRewards({ type: this.state.type }));
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.profileRewards.redeemRewards.success !== nextProps.profileRewards.redeemRewards.success && nextProps.profileRewards.redeemRewards.success) {
            this.setState({ clickRedeem: false });
        }
    }
    renderRewards = () => dataChecking(this.props, 'profileRewards', 'rewards', 'data', 'data', 'items') &&
        this.props.profileRewards.rewards.data.data.items.map((item, index) => (
            <Grid item={true} key={index} xs={12} sm={6} md={4}>
                <Card id={`reward-item ${index}`} className="my-1">
                    <ButtonBase
                        onClick={() => {
                            this.props.dispatch(getRewardsInfo(item._weblink.params.url));
                            this.setState({ popup: true });
                        }}
                    >
                        <CardHeader
                            title={
                                <Typography>{item.partner.name}</Typography>
                            }
                            avatar={
                                <Avatar>
                                    <img width="110%" alt="partner-logo" src={item.partner.logo} />
                                </Avatar>
                            }
                        />
                        <CardContent>
                            <Typography variant="body2" color="primary">{item.value.amount} {item.value.currency}</Typography>
                            <br />
                            <Typography variant="body1">{item.title}</Typography>
                            <br />
                            <Typography variant="caption">{item.remark}</Typography>
                        </CardContent>
                    </ButtonBase>
                </Card>
            </Grid>
        )
    )
    renderAccountBalance = () => {
        if (dataChecking(this.props, 'profileRewards', 'rewards', 'data', 'data', 'balance')) {
            return (
                <Typography color="secondary">{this.props.profileRewards.rewards.data.data.balance.amount}</Typography>
            );
        }
        return null;
    }
    renderDialogContent = () => {
        if (dataChecking(this.props, 'profileRewards', 'rewardsInfo', 'data')) {
            const info = this.props.profileRewards.rewardsInfo.data.data;
            return (
                <div>
                    <CardHeader
                        title={
                            <Typography>{info.partner.name}</Typography>
                        }
                        avatar={
                            <Avatar>
                                <img width="110%" alt="partner-logo" src={info.partner.logo} />
                            </Avatar>
                        }
                        subheader={
                            <Typography variant="caption" color="primary"><br />{info.value.amount} {info.value.currency}</Typography>
                        }
                    />
                    <CardContent>
                        <Typography>{info.title}</Typography>
                    </CardContent>
                    <CardActions>
                        {this.state.clickRedeem ?
                            <Container>
                                {/* CLICK */}
                                <Typography variant="h6" color="primary">Redeem Now</Typography>
                                <br />
                                <Typography>You will be deducted <b>{info.value.amount} {info.value.currency}</b> in order to redeem the voucher.</Typography>
                                <Button variant="outlined" onClick={() => this.setState({ clickRedeem: false })}>No</Button>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={() => {
                                        if (this.state.type === 'locals') {
                                            this.props.dispatch(redeemRewards(info._weblink.params.url, 'locals'));
                                        } else {
                                            this.props.dispatch(redeemRewards(info._weblink.params.url, null));
                                        }
                                    }}
                                >
                                Yes
                                </Button>
                            </Container>
                            :
                            <div>
                                {
                                    dataChecking(this.props, 'profileRewards', 'rewardsInfo', 'data', 'data', 'status')
                                    ?
                                        <Typography color="secondary" variant="h5">{this.props.profileRewards.rewardsInfo.data.data.status}</Typography>
                                    :
                                        dataChecking(this.props, 'profileRewards', 'redeemRewards', 'data')
                                        ?
                                            <div>
                                                <Typography variant="h5">{this.props.profileRewards.redeemRewards.data.data.message.title}</Typography>
                                                <br />
                                                <Typography>{this.props.profileRewards.redeemRewards.data.data.message.content}</Typography>
                                            </div>
                                        :
                                            <Button
                                                variant="outlined"
                                                color="secondary"
                                                fullWidth={true}
                                                onClick={() => this.setState({ clickRedeem: true })}
                                            >
                                            Redeem Now
                                            </Button>
                                }
                            </div>
                        }
                    </CardActions>
                    <CardContent>
                        <Typography variant="h5">Terms and Conditions</Typography>
                        <br />
                        {parse(info.tnc)}
                        {/* USE LINE BELOW TO USE REACT'S RENDER HTML FROM A STRING. ABOVE LINE USE HTML-REACT-PARSE PACKAGE */}
                        {/* <div dangerouslySetInnerHTML={{ __html: info.tnc }} />  */}
                    </CardContent>
                    { info.partner.description ?
                        <CardContent>
                            <Typography variant="h5">About {info.partner.name}</Typography>
                            <br />
                            <Typography>{info.partner.description}</Typography>
                        </CardContent>
                        :
                        null
                    }
                </div>
            );
        }
        return null;
    }
    render() {
        return (
            <Container>
                <Typography variant="h2">Rewards</Typography>
                <br />
                <Button
                    onClick={() => {
                        this.setState({ type: 'locals' });
                        this.props.dispatch(getRewards({ type: 'locals' }));
                    }}
                >
                    <Typography>Hermo</Typography>
                </Button>
                <Button
                    onClick={() => {
                        this.setState({ type: 'partners' });
                        this.props.dispatch(getRewards({ type: 'partners' }));
                    }}
                >
                    <Typography>Partners</Typography>
                </Button>
                <Paper className="p-1">
                    <Typography>Available credits: </Typography>
                    {this.renderAccountBalance()}
                </Paper>
                <Grid container={true} spacing={1}>
                    {this.renderRewards()}
                </Grid>
                <PopupDialog
                    display={this.state.popup}
                    title="Reward Details"
                    onClose={() => {
                        this.setState({
                            popup: false,
                            clickRedeem: false,
                        });
                    }}
                >
                    {this.renderDialogContent()}
                </PopupDialog>
            </Container>
        );
    }
}

ProfileRewards.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    profileRewards: makeSelectProfileRewards(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'profileRewards', reducer });
const withSaga = injectSaga({ key: 'profileRewards', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(ProfileRewards);
