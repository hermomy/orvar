/**
 *
 * GamesPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { Events } from 'globalUtils';
import globalScope from 'globalScope';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'assets/animate.min.scss';

import LoginForm from 'containers/LoginForm';
import PerfectMatchGame from '../PerfectMatchGame';

import makeSelectGamesPage from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import './style.scss';

const prizeSlide = [
    {
        key: 'prize1',
        image: require('./rsc/prize_one.png'),
        next: 'prize2',
        prev: null,
    }, {
        key: 'prize2',
        image: require('./rsc/prize_two.jpg'),
        next: 'prize3',
        prev: 'prize1',
    }, {
        key: 'prize3',
        image: require('./rsc/prize_three.jpg'),
        next: null,
        prev: 'prize2',
    },
];
const howToSlide = [
    {
        key: 'how_to',
        image: require('./rsc/how_to_play_modal.png'),
        next: 'prize2',
        prev: null,
    },
];
const idleMusic = new Audio(require('./rsc/sound/Prizefighter.mp3'));
idleMusic.loop = true;

export class GamesPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);

        this.state = {
            showModal: null,
            slideArray: null,
            gameId: null,
            // gameId: 1,
            // showModal: 'showPlay',
            playMusic: false,
            showLogin: false,
            requestToken: false,
        };
    }

    componentDidMount = () => {
        document.ondragstart = () => null;
        Events.trigger('hideHeader', {});
        setTimeout(() => {
            this.setState({ isRendered: true });
        }, 1100);

        if (!globalScope.token) {
            if (window.takePocket) {
                globalScope.token = window.takePocket();
            } else {
                this.setState({ requestToken: true });
            }
        }
    }

    renderModalContent = () => {
        const { showModal, slideArray, gameId } = this.state;

        if (showModal === 'showPlay' && gameId) {
            if (gameId) {
                idleMusic.pause();
                return (
                    <PerfectMatchGame
                        props={{ smth: true }}
                        playMusic={this.state.playMusic}
                    />
                );
            }
        }

        if (showModal === 'slideShow' && slideArray) {
            return (
                <div className="prize-inner-section">
                    <Carousel showThumbs={false} showStatus={false} showIndicators={false} emulateTouch={true}>
                        {
                            slideArray.map((item, index) => (
                                <img
                                    draggable="false"
                                    key={index}
                                    width="100%"
                                    src={item.image}
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
            <div className="games-page">
                {
                    this.state.requestToken ?
                        <div className="games-login-modal">
                            <LoginForm />
                        </div>
                        :
                        null
                }
                <div className="game-container">
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
                            <div className="page-buttons">
                                {
                                    this.state.showModal ?
                                        <div
                                            className="toggle-back page-button-item"
                                            onClick={() => {
                                                this.setState({ showModal: null });
                                                if (this.state.playMusic) {
                                                    idleMusic.currentTime = 0;
                                                    idleMusic.play();
                                                }
                                            }}
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
                            <div className="main-menu-buttons animated slideInDown fadeIn">
                                <div
                                    onClick={
                                        () => {
                                            if (this.state.playMusic) {
                                                const startSound = new Audio(require('./rsc/sound/Start_button.wav'));
                                                startSound.play();
                                            }
                                            setTimeout(() => {
                                                this.setState({ showModal: 'showPlay', gameId: 1 });
                                            }, 0);
                                        }
                                    }
                                >
                                    <img
                                        draggable="false"
                                        src={require('./rsc/button_play.png')}
                                        alt="play"
                                        className="main-menu-button-item animated slideInRight"
                                    />
                                </div>
                                <div onClick={() => this.setState({ showModal: 'slideShow', slideArray: prizeSlide })}>
                                    <img
                                        draggable="false"
                                        src={require('./rsc/button_prizes.png')}
                                        alt="prizes"
                                        className="main-menu-button-item animated slideInLeft"
                                    />
                                </div>
                                <div onClick={() => this.setState({ showModal: 'slideShow', slideArray: howToSlide })}>
                                    <img
                                        draggable="false"
                                        src={require('./rsc/button_how.png')}
                                        alt="how to play"
                                        className="main-menu-button-item animated slideInRight"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <img
                        draggable="false"
                        src={require('./rsc/main_menu.jpg')}
                        alt="main menu background"
                        className="main-menu-bg animated fadeIn"
                    />
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
