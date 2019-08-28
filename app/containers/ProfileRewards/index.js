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
    Avatar,
} from '@material-ui/core';
import {
    getRewards,
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
        };
    }
    componentDidMount() {
        this.props.dispatch(getRewards({ type: this.state.type }));
    }
    renderRewards = () => dataChecking(this.props, 'profileRewards', 'data', 'data', 'items') &&
        this.props.profileRewards.data.data.items.map((item, index) => (
            <Grid item={true} key={index} xs={12} sm={6} md={4}>
                <Card id={`reward-item ${index}`} className="my-1">
                    <CardHeader
                        title={
                            <Typography>{item.partner.name}</Typography>
                        }
                        avatar={
                            <Avatar>
                                <img width="110%" alt="partner-logo" src={item.partner.logo} />
                            </Avatar>
                        }
                        img={<img width="100%" alt="reward-items" src={item.banner} />}
                    />
                    <CardContent>
                        <Typography variant="body2" color="primary">{item.value.amount} {item.value.currency}</Typography>
                        <br />
                        <Typography variant="body1">{item.title}</Typography>
                        <br />
                        <Typography variant="caption">{item.remark}</Typography>
                    </CardContent>
                </Card>
            </Grid>
        )
    )
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
                    <Typography color="secondary">{this.props.profileRewards.data.data.balance.amount}</Typography>
                </Paper>
                <Grid container={true} spacing={1}>
                    {this.renderRewards()}
                </Grid>
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
