/**
 *
 * Footer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { NavLink } from 'react-router-dom';

import {
    Container,
    Grid,
    Typography,
    Divider,
    Hidden,
    TextField,
    IconButton,
} from '@material-ui/core';

import {
    Phone,
    Mail,
} from '@material-ui/icons';
import { dataChecking, Events } from 'globalUtils';
import {
    getLayoutFooter,
} from './actions';
import makeSelectFooter from './selectors';
import reducer from './reducer';
import saga from './saga';
import './style.scss';

export class Footer extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);

        this.state = {
            hideFooter: false,
        };

        Events.listen('hideFooter', 123456, () => {
            this.setState({ hideFooter: true });
        });
    }

    componentDidMount() {
        this.props.dispatch(getLayoutFooter());
    }

    copyright = (result) => (
        <Typography variant="caption">
            Copyright &copy; {result.copyright.company_name} ({result.copyright.company_registration}). {result.copyright.is_gst_applicable && `[GST Reg. No.: ${result.copyright.company_gst_no}]. `}All right reserved
        </Typography>
    )

    /**
     * FOOTERLINK
     *  - need help
     *  - customer service
     *  - hermo
     *  - connect with us
     */
    renderFooterLink = () => {
        const layoutFooter = dataChecking(this.props.footer, 'layoutFooter', 'success') && this.props.footer.layoutFooter;
        const modules = dataChecking(this.props.footer, 'layoutFooter', 'success') && layoutFooter.data.modules;
        let section;
        if (layoutFooter.success && modules) {
            const moduleIndex = Object.keys(modules);
            section = moduleIndex.map((mIndex) => {
                if (modules[mIndex].id === 'footer-links') {
                    const sections = dataChecking(modules[mIndex], 'result', 'items');
                    const sectionIndex = Object.keys(sections);
                    return (
                        <Grid container={true} key={modules[mIndex].id} justify="space-between">
                            {
                                (modules[mIndex].id === 'footer-links') && sectionIndex.map((sIndex) => (
                                    <div key={sections[sIndex].title}>
                                        {
                                            sections[sIndex].id === 'links' ?
                                                <Grid item={true} md={3}>
                                                    <Container>
                                                        <div>
                                                            <Typography variant="h5">{sections[sIndex].title}</Typography>
                                                        </div>
                                                        <div>
                                                            {
                                                                Object.keys(sections[sIndex].items).map((iIndex) => (
                                                                    <NavLink key={sections[sIndex].items[iIndex].url} to={sections[sIndex].items[iIndex].url}>
                                                                        <Typography variant="body1">{sections[sIndex].items[iIndex].text}</Typography><br />
                                                                    </NavLink>
                                                                ))
                                                            }
                                                        </div>
                                                    </Container>
                                                </Grid>
                                            :
                                                <div>
                                                    {
                                                        sections[sIndex].id === 'need-help' &&
                                                            <Grid item={true} md={3}>
                                                                <Container>
                                                                    <div>
                                                                        <Typography variant="h5">{sections[sIndex].title}</Typography>
                                                                    </div>
                                                                    <Typography variant="body2">
                                                                        <Phone style={{ float: 'left' }} />
                                                                        {sections[sIndex].data.contact_number}
                                                                    </Typography>
                                                                    <br />
                                                                    <Typography variant="body2">
                                                                        {sections[sIndex].data.email}
                                                                    </Typography>
                                                                    <Divider variant="middle" style={{ color: '#f2f2f2' }} />
                                                                    <Typography variant="caption">
                                                                        Operation Hours:
                                                                    </Typography>
                                                                    <br />
                                                                    <Typography variant="body2">
                                                                        {sections[sIndex].data.working_day}
                                                                    </Typography>
                                                                    <br />
                                                                    <Typography variant="body1">
                                                                        {sections[sIndex].data.operation_hour}
                                                                    </Typography>
                                                                </Container>
                                                            </Grid>
                                                    }
                                                    {
                                                        sections[sIndex].id === 'social-links' &&
                                                            <Grid item={true} md={3}>
                                                                <Container>
                                                                    <div>
                                                                        <Typography variant="h5">{sections[sIndex].title}</Typography>
                                                                    </div>
                                                                    <div>
                                                                        {
                                                                            Object.keys(sections[sIndex].items).map((iIndex) => (
                                                                                <NavLink key={sections[sIndex].items[iIndex].url} to={sections[sIndex].items[iIndex].url}>
                                                                                    <Typography variant="body1">{sections[sIndex].items[iIndex].text}</Typography><br />
                                                                                </NavLink>
                                                                            ))
                                                                        }
                                                                    </div>
                                                                </Container>
                                                            </Grid>
                                                    }
                                                </div>
                                        }
                                    </div>
                                ))
                            }
                        </Grid>
                    );
                }
                return null;
            });
        }
        return (
            <div>
                {section}
            </div>
        );
    }

    /**
     * FOOTERSUPPORT
     *  - MY
     *  - SG
     */
    renderFooterSupport = () => {
        const layoutFooter = dataChecking(this.props.footer, 'layoutFooter', 'success') && this.props.footer.layoutFooter;
        const modules = dataChecking(this.props.footer, 'layoutFooter', 'success') && layoutFooter.data.modules;
        let section;

        if (layoutFooter.success && modules) {
            const moduleIndex = Object.keys(modules);
            section = moduleIndex.map((mIndex) => {
                if (modules[mIndex].id === 'footer-support') {
                    const result = modules[mIndex].result;
                    const siteIndex = Object.keys(result.sites);
                    return (
                        <Grid container={true} key={modules[mIndex].id} justify="space-between">
                            <Grid item={true} xs={8}>
                                <Typography>Now shopping</Typography>
                                {/* NEED TO USE is_active TO SHOW ACTIVE SITE */}
                                {
                                    siteIndex.map((sIndex) => (
                                        <div key={result.sites[sIndex].url}>
                                            <img src={result.sites[sIndex].image} alt="country-flag" />
                                            <NavLink to={result.sites[sIndex].url}>
                                                <Typography>{result.sites[sIndex].text}</Typography>
                                            </NavLink>
                                        </div>
                                    ))
                                }
                            </Grid>
                            <Grid item={true} xs={4}>
                                <img src={result.image} alt="supported banks" />
                            </Grid>
                        </Grid>
                    );
                }
                return null;
            });
        }
        return (
            <div className="py-1">{section}</div>
        );
    }

    /**
     * FOOTERCOPYRIGHT
     */
    renderFooterCopyright = () => {
        const layoutFooter = dataChecking(this.props.footer, 'layoutFooter', 'success') && this.props.footer.layoutFooter;
        const modules = dataChecking(this.props.footer, 'layoutFooter', 'success') && layoutFooter.data.modules;
        let section;

        if (layoutFooter.success && modules) {
            const moduleIndex = Object.keys(modules);
            section = moduleIndex.map((mIndex) => {
                if (modules[mIndex].id === 'footer-copyright') {
                    const result = modules[mIndex].result;
                    return (
                        <Grid container={true} key={modules[mIndex].id} justify="space-between">
                            <Grid item={true}>
                                <img src={result.image} alt="footer-payment-gateway" />
                            </Grid>
                            <Grid item={true}>
                                <Typography variant="caption">
                                    {this.copyright(result)}
                                </Typography>
                            </Grid>
                        </Grid>
                    );
                }
                return null;
            });
        }
        return (
            <div className="py-1">{section}</div>
        );
    }

    /**
     * FOOTERFEEDBACK - mobile; subscribe email
     */
    renderFooterFeedback = () => (
        <div>
            <Typography >
                Sign up & get two FREE masks.
            </Typography>
            <TextField
                id="email"
                placeholder="Subscribe with us! Enter your email."
            />
            <IconButton>
                <Mail />
            </IconButton>
        </div>
    )
    render() {
        if (this.state.hideFooter) {
            return null;
        }

        return (
            <div>
                <Hidden smDown={true}>
                    <div className="footer-desktop" style={{ backgroundColor: '#000', color: '#f2f2f2' }}>
                        {
                        this.props.footer.layoutFooter.success &&
                        <Container className="p-3">
                            {this.renderFooterLink()}
                            <Divider />
                            {this.renderFooterSupport()}
                            <Divider />
                            {this.renderFooterCopyright()}
                        </Container>
                        }
                    </div>
                </Hidden>
                <Hidden mdUp={true}>
                    {
                        this.props.footer.layoutFooter.success &&
                        <div className="footer-mobile" style={{ textAlign: 'center' }}>
                            {this.renderFooterFeedback()}
                        </div>
                    }
                </Hidden>
            </div>
        );
    }
}

Footer.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    footer: makeSelectFooter(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'footer', reducer });
const withSaga = injectSaga({ key: 'footer', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(Footer);
