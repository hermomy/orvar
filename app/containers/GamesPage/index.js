/**
 *
 * GamesPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { dataChecking, Events } from 'globalUtils';
import globalScope from 'globalScope';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'assets/animate.min.scss';
import AuthPage from '../AuthPage';
import PerfectMatchGame from '../PerfectMatchGame';
import {
    getResult,
} from './actions';
import makeSelectGamesPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import './style.scss';

import mockData from './mockDataReturnFromAPI';

// const prizeSlide = [
//     {
//         key: 'prize1',
//         image: require('./rsc/D11-prize-image.jpg'),
//         next: null,
//         prev: null,
//     // }, {
//     //     key: 'prize2',
//     //     image: require('./rsc/prize_two.jpg'),
//     //     next: 'prize3',
//     //     prev: 'prize1',
//     // }, {
//     //     key: 'prize3',
//     //     key: 'prize3',
//     //     image: require('./rsc/prize_three.jpg'),
//     //     next: null,
//     //     prev: 'prize2',
//     },
// ];
// const howToSlide = [
//     {
//         key: 'how_to',
//         image: require('./rsc/D11-How-To-Play.jpg'),
//         next: 'prize2',
//         prev: null,
//     },
// ];
const idleMusic = new Audio(mockData.config.menu.background_music);
idleMusic.loop = true;
const startSound = new Audio(mockData.config.menu.start_sound);

export class GamesPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            availableChance: null,
            showModal: null,
            slideArray: null,
            gameId: null,
            loading: true,
            // gameId: 1,
            // showModal: 'showPlay',
            playMusic: false,
            showPassword: false,
            requestToken: false,
            pageFontSize: '13px',
        };
    }

    componentDidMount = () => {
        document.ondragstart = () => null;
        Events.trigger('hideHeader', {});
        Events.trigger('hideFooter', {});
        setTimeout(() => {
            this.setState({ isRendered: true });
        }, 1100);

        if (window.takePocket) {
            this.handlePocket(window.takePocket());
        } else if (this.props.location.search.indexOf('pickPocket') || window.location !== window.parent.location) {
            if (window.addEventListener) {
                // For standards-compliant web browsers
                window.addEventListener('message', this.parsePocketFromWeb, false);
                if (globalScope.token) {
                    this.setState({ loading: false });
                } else {
                    globalScope.previousPage = window.location.pathname;
                    this.setState({ loading: false, requestToken: true });
                }
            } else {
                window.attachEvent('onmessage', this.parsePocketFromWeb);
            }
        } else {
            globalScope.previousPage = window.location.pathname;
            this.setState({ requestToken: true, loading: false });
        }
    }

    componentWillReceiveProps = (nextProps) => {
        if (dataChecking(nextProps, 'gamesPage', 'result') !== dataChecking(this.props, 'gamesPage', 'result') && nextProps.gamesPage.result.success) {
            this.setState({ gameResultImagelink: nextProps.gamesPage.result.data });
        }
    }

    onBgImageLoaded = ({ target: imageEl }) => {
        this.setState({
            // dimensions: {
            //     height: imageEl.offsetHeight,
            //     width: imageEl.offsetWidth,
            // },
            pageFontSize: `${imageEl.offsetWidth / 36}px`,
        });
    }

    onGameComplete = (payload) => {
        this.props.dispatch(getResult(payload));
    }

    onBackToMenu = () => {
        this.setState({ showModal: null });
        if (this.state.playMusic && this.state.showModal === 'showPlay') {
            idleMusic.currentTime = 0;
            idleMusic.play();
        }
    }

    parsePocketFromWeb = (event) => {
        if (event.origin !== 'https://www.hermo.my'
            && event.origin !== 'https://hermo.my'
            && event.origin !== 'https://devshop.hermo.my'
            && event.origin !== 'http://localhost:1234'
            && event.origin !== 'http://hershop.hermo.my') {
            console.log(`Receive postMessage from invalid source: ${event.origin}`);
            return null;
        }
        if (event.data) {
            try {
                const pocket = JSON.parse(event.data);
                if (pocket.hertoken) {
                    this.handlePocket(pocket);
                    return pocket;
                } else if (globalScope.token) {
                    return (
                        this.setState({ loading: false, requestToken: false })
                    );
                }
                globalScope.previousPage = window.location.pathname;
                this.setState({ loading: false, requestToken: true });
            } catch (error) {
                console.log('Error happen when parsing pocket', error);
            }
        }

        return null;
    };

    handlePocket = (pocket) => {
        if (pocket.hertoken) {
            globalScope.profile = pocket;
            globalScope.token = pocket.hertoken;
            globalScope.axios.setHeader('hertoken', globalScope.token);
            this.setState({ loading: false });
        } else if (globalScope.token) {
            this.setState({ loading: false, requestToken: false });
        } else {
            globalScope.previousPage = window.location.pathname;
            this.setState({ requestToken: true, loading: false });
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    };


    renderModalContent = () => {
        const { showModal, slideArray, gameId } = this.state;

        if (showModal === 'showPlay' && gameId) {
            if (gameId) {
                idleMusic.pause();
                return (
                    <PerfectMatchGame
                        props={{ smth: true }}
                        playMusic={this.state.playMusic}
                        onGameStart={() => alert('gamestart')}
                        onGameWin={(payload) => this.onGameComplete(payload)}
                        onGameLose={(payload) => this.onGameComplete(payload)}
                        onBackToMenu={this.onBackToMenu}
                        gameResultImagelink={this.state.gameResultImagelink}
                        gameConfig={mockData.config.game}
                    />
                );
            }
        }

        if (showModal === 'slideShow' && slideArray) {
            return (
                <div className="prize-inner-section">
                    <Carousel showThumbs={false} showStatus={false} showIndicators={slideArray.length > 1} emulateTouch={true}>
                        {
                            slideArray.map((item, index) => (
                                <img
                                    draggable="false"
                                    key={index}
                                    width="100%"
                                    src={item}
                                    alt="carousel slide show"
                                    className="slideshow-image"
                                />
                            ))
                        }
                    </Carousel>
                </div>
            );
        }

        return null;
    }

    render() {
        return (
            <div className="games-page" style={{ fontSize: this.state.pageFontSize }}>
                <div className="game-container">
                    <div className="page-buttons">
                        {
                            this.state.showModal ?
                                <div
                                    className="toggle-back page-button-item"
                                    onClick={() => this.onBackToMenu()}
                                >
                                    <img
                                        draggable="false"
                                        width="100%"
                                        src={require('./rsc/icons8-left-3-96.png')}
                                        alt="play"
                                        className="main-menu-button-item animated zoomIn"
                                    />
                                </div>
                                :
                                null
                        }
                        <div
                            className="toggle-music page-button-item to-right"
                            onClick={() => {
                                this.setState({ playMusic: !this.state.playMusic });
                                idleMusic[!this.state.playMusic ? 'play' : 'pause']();
                            }}
                        >
                            {
                                this.state.playMusic ?
                                    <img
                                        draggable="false"
                                        width="100%"
                                        src={require('./rsc/icons8-sound-100.png')}
                                        alt="play"
                                        className="main-menu-button-item animated zoomIn"
                                    />
                                    :
                                    <img
                                        draggable="false"
                                        width="100%"
                                        src={require('./rsc/icons8-mute-100.png')}
                                        alt="play"
                                        className="main-menu-button-item animated zoomIn"
                                    />
                            }
                        </div>
                    </div>
                    {
                        this.state.requestToken ?
                            <span className="games-login-modal animated fa" style={{ backgroundColor: 'rgba(255,255,255)', overflow: 'auto' }}>
                                <AuthPage isModal={true} />
                            </span>
                            :
                            <div className="main-menu-wrapper">
                                <div className="main-menu-content">
                                    {/* <div
                                        className="back-button gotoshop"
                                        onClick={() => {
                                            console.log('gotoshop', window.goToShop);

                                            if (window.goToShop) {
                                                window.goToShop();
                                            }
                                        }}
                                    >
                                        <i className="fas fa-store-alt"></i>
                                    </div> */}
                                    <div className="main-menu-bottom-content animated fadeIn">
                                        <div className="game-info">
                                            <div className="main-menu-username">
                                                {
                                                    dataChecking(globalScope, 'profile', 'name') && dataChecking(globalScope, 'profile', 'username') ?
                                                        <div className="profile-name animated fadeIn">Welcome, {globalScope.profile.name || globalScope.profile.username}!</div>
                                                        :
                                                        <img className="username-loading" src={require('images/preloader-02.gif')} alt="" />
                                                }
                                            </div>
                                            {
                                                this.state.availableChance !== null ?
                                                    <div className="main-menu-username animated fadeIn">
                                                        <div variant="h4">You have {this.state.availableChance || 0} token</div>
                                                    </div>
                                                    :
                                                    null

                                            }
                                        </div>
                                        <div
                                            onClick={
                                                () => {
                                                    if (this.state.playMusic) {
                                                        startSound.play();
                                                    }
                                                    setTimeout(() => {
                                                        this.setState({ showModal: 'showPlay', gameId: 1 });
                                                    }, 0);

                                                    return true;
                                                }
                                            }
                                            className="animated fadeIn"
                                        >
                                            <img
                                                draggable="false"
                                                src={require('./rsc/D11-Button-image_Play_529x130.png')}
                                                alt="play"
                                                className="main-menu-button-item"
                                            />
                                        </div>
                                        <div
                                            onClick={() => this.setState({ showModal: 'slideShow', slideArray: mockData.config.menu.prize_slider })}
                                            className="animated fadeIn"
                                        >
                                            <img
                                                draggable="false"
                                                src={require('./rsc/D11-Button-image_Prize_529x130.png')}
                                                alt="prizes"
                                                className="main-menu-button-item"
                                            />
                                        </div>
                                        <div
                                            onClick={() => this.setState({ showModal: 'slideShow', slideArray: mockData.config.menu.how_to_play_slider })}
                                            className="animated fadeIn"
                                        >
                                            <img
                                                draggable="false"
                                                src={require('./rsc/D11-Button-image_How-to-play_529x130.png')}
                                                alt="how to play"
                                                className="main-menu-button-item"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                    }
                    <div
                        className="ppg-version"
                        onClick={() => {
                            // alert('asdfadsf');
                            // alert(`${window.parent ? 'have window.parent' : 'no window.parent'}`);
                            // // alert(`${window.parent && window.parent.onPerfectGame ? 'have window.parent.onPerfectGame' : 'no window.parent.onPerfectGame'}`);
                            // if (window.parent && window.parent.onPerfectGame) {
                            //     window.parent.onPerfectGame();
                            // }

                            // if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
                            //     window.ReactNativeWebView.postMessage('adasdadasd', 'applink');

                            //     if (window.onCloseWindow) {
                            //         window.onCloseWindow();
                            //     }
                            // }
                        }}
                    >0.3.8</div>
                    <img
                        draggable="false"
                        onLoad={this.onBgImageLoaded}
                        src={require('./rsc/D11-Landing-image-v2.jpg')}
                        alt="main menu background"
                        className="main-menu-bg animated fadeIn"
                    />
                    {
                        this.state.loading ?
                            <div className="token-loading">
                                <img className="token-loading-gif" src={require('images/preloader-02.gif')} alt="loading" />
                            </div>
                            :
                            null
                    }
                    {
                        this.state.showModal ?
                            <div
                                className={`games-page-popup-modal modal-${this.state.showModal} animated ${this.state.isRendered ? 'fadeIn' : 'opacity-zero'}`}
                            >
                                <div className="modal-inner-div">
                                    {this.renderModalContent(this.state.slideArray)}
                                </div>
                            </div>
                            :
                            null
                    }
                </div>
            </div>
        );
    }
}

GamesPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    gamesPage: makeSelectGamesPage(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'gamesPage', reducer });
const withSaga = injectSaga({ key: 'gamesPage', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(GamesPage);
