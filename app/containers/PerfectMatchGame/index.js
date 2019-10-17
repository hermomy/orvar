/**
 *
 * PerfectMatchGame
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Countdown from 'react-countdown-now';
import ReactCardFlip from 'react-card-flip';
import {
    FacebookShareButton,
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon,
    TelegramShareButton,
    TelegramIcon,
    WhatsappShareButton,
    WhatsappIcon,
} from 'react-share';
import { dataChecking, Events } from 'globalUtils';
import {
    IconButton,
} from '@material-ui/core';
import {
    Close,
} from '@material-ui/icons';
import {
    getGameToken,
} from './actions';
import makeSelectPerfectMatchGame from './selectors';
import reducer from './reducer';
import saga from './saga';
import './style.scss';

const CARD_PAIR = 6;
const GAME_DURATION = 30000;

const TIME_UNIT = 330;
const shareUrl = 'https://app.hermo.my/N1B7NUpi3Z';
const shareTitle = '';
const shareHashtag = '#Double11Fiesta';
const shareVia = '';

const initialState = {
    delay: null,
    shareModal: false,
    tips: '',
    countingDown: null,
    preparationDone: false,
    correct: 0,
    correctMatch: {},
    wrongMatch: {},
    onHand1: null,
    onHand2: null,
    complete: null,
    gameAccessToken: null,
    brandArr: [],
};

export class PerfectMatchGame extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);

        document.ondragstart = () => null;
        Events.trigger('hideHeader', {});
        this.state = {
            ...initialState,
            brandArr: this.shuffleArray(this.getRandomBrands()),
            gameMusic: new Audio(this.props.gameConfig.background_music),
            correctSound: new Audio(this.props.gameConfig.flip_corret_sound),
            wrongSound: new Audio(this.props.gameConfig.flip_wrong_sound),
            winSound: new Audio(this.props.gameConfig.winner_sound),
            loseSound: new Audio(this.props.gameConfig.loser_sound),
            clickSound: new Audio(this.props.gameConfig.flip_sound),
        };
        this.state.gameMusic.loop = true;
        this.props.dispatch(getGameToken());

        let counter = 0;
        while (counter < CARD_PAIR) {
            this.state[`flipped_${counter}`] = false;
            counter++;
        }
    }

    componentWillReceiveProps = (nextProps) => {
        if (dataChecking(nextProps, 'perfectMatchGame', 'gameToken', 'success') !== dataChecking(this.props, 'perfectMatchGame', 'gameToken', 'success') && nextProps.perfectMatchGame.gameToken.success) {
            this.setState({ gameAccessToken: nextProps.perfectMatchGame.gameToken.data.token });
            this.initialiseGame();
        }
    }

    componentWillUpdate = (nextProps) => {
        if (nextProps.playMusic !== this.props.playMusic) {
            this.state.gameMusic[nextProps.playMusic ? 'play' : 'pause']();
        }
    }

    componentWillUnmount() {
        this.state.gameMusic.pause();
    }


    getRandomBrands = () => {
        const brands = [...this.props.gameConfig.card_image];
        let index = null;
        const newArr = [];

        let counter = 0;
        while (counter < CARD_PAIR) {
            index = Math.floor(Math.random() * CARD_PAIR);
            newArr.push(brands[index]);
            brands.splice(index, 1);
            counter++;
        }
        return [...newArr, ...newArr];
    }

    setDelayState = (value, getExtraObj) => {
        setTimeout(() => {
            const obj = getExtraObj ? getExtraObj() : {};
            this.setState({ ...obj, delay: value * TIME_UNIT });
        }, value * TIME_UNIT);
    }

    initialiseGame = () => {
        let counter = 0;
        while (counter < (CARD_PAIR * 2)) {
            this.setDelayState(counter + 1);
            counter++;
        }
        this.setDelayState((CARD_PAIR * 2) + 3);
        this.setDelayState((CARD_PAIR * 2) + 6);
        this.setDelayState((CARD_PAIR * 2) + 9);

        const getExtraObj = () => {
            const obj = {
                countingDown: Date.now() + (GAME_DURATION + 400),
                tips: 'Try to get a match!',
            };
            let counter2 = 0;
            while (counter2 < (CARD_PAIR * 2)) {
                obj[`flipped_${counter2}`] = true;
                counter2++;
            }

            return obj;
        };
        this.setDelayState((CARD_PAIR * 2) + 12, getExtraObj);
        this.setDelayState((CARD_PAIR * 2) + 15);

        // setTimeout(() => {
        //     this.setState({ delay: 1 * TIME_UNIT });
        // }, 1 * TIME_UNIT);
        // setTimeout(() => {
        //     this.setState({ delay: 2 * TIME_UNIT });
        // }, 2 * TIME_UNIT);
        // setTimeout(() => {
        //     this.setState({ delay: 3 * TIME_UNIT });
        // }, 3 * TIME_UNIT);
        // setTimeout(() => {
        //     this.setState({ delay: 4 * TIME_UNIT });
        // }, 4 * TIME_UNIT);
        // setTimeout(() => {
        //     this.setState({ delay: 5 * TIME_UNIT });
        // }, 5 * TIME_UNIT);
        // setTimeout(() => {
        //     this.setState({ delay: 6 * TIME_UNIT });
        // }, 6 * TIME_UNIT);
        // setTimeout(() => {
        //     this.setState({ delay: 7 * TIME_UNIT });
        // }, 7 * TIME_UNIT);
        // setTimeout(() => {
        //     this.setState({ delay: 8 * TIME_UNIT });
        // }, 8 * TIME_UNIT);
        // setTimeout(() => {
        //     this.setState({ delay: 9 * TIME_UNIT });
        // }, 9 * TIME_UNIT);
        // setTimeout(() => {
        //     this.setState({ delay: 10 * TIME_UNIT });
        // }, 10 * TIME_UNIT);
        // setTimeout(() => {
        //     this.setState({ delay: 11 * TIME_UNIT });
        // }, 11 * TIME_UNIT);
        // setTimeout(() => {
        //     this.setState({ delay: 12 * TIME_UNIT });
        // }, 12 * TIME_UNIT);
        // setTimeout(() => {
        //     this.setState({ delay: 15 * TIME_UNIT });
        // }, 15 * TIME_UNIT);
        // setTimeout(() => {
        //     this.setState({ delay: 18 * TIME_UNIT });
        // }, 18 * TIME_UNIT);
        // setTimeout(() => {
        //     this.setState({ delay: 21 * TIME_UNIT });
        // }, 21 * TIME_UNIT);
        // setTimeout(() => {
        //     const obj = {
        //         delay: 24 * TIME_UNIT,
        //         countingDown: Date.now() + (30400),
        //         tips: 'Try to get a match!',
        //     };

        //     let counter = 0;
        //     while (counter < CARD_PAIR) {
        //         obj[`flipped_${counter}`] = true;
        //         counter++;
        //     }

        //     this.setState(obj);
        // }, 24 * TIME_UNIT);
        // setTimeout(() => {
        //     this.setState({ delay: 27 * TIME_UNIT });
        // }, 27 * TIME_UNIT);

        this.state.gameMusic.currentTime = 0;
        if (this.props.playMusic) {
            this.state.gameMusic.play();
        }
    }


    shuffleArray = (array) => {
        const newArr = [];
        array.forEach((item) => {
            newArr[Math.floor(Math.random() * 2) ? 'push' : 'unshift'](item);
        });
        return newArr;

        // let index = null;
        // let temp = null;
        // const newArr = [...array];
        // let counter = newArr.length - 1;
        // while (counter > 0) {
        //     index = Math.floor(Math.random() * counter);
        //     temp = newArr[counter];
        //     newArr[counter] = newArr[index];
        //     newArr[index] = temp;
        //     counter--;
        // }
        // return newArr;
    }

    renderGame = () => (
        <div className="game-panel">
            {
                this.state.delay > ((CARD_PAIR * 2) * TIME_UNIT) && !this.state.countingDown ?
                    <div className="ready-go-container animated fadeIn">
                        {
                            this.state.delay > (CARD_PAIR * 2) * TIME_UNIT && this.state.delay <= ((CARD_PAIR * 2) + 3) * TIME_UNIT ?
                                <div className="ready-go count-3 animated zoomIn">3</div>
                                :
                                null
                        }
                        {
                            this.state.delay > ((CARD_PAIR * 2) + 3) * TIME_UNIT && this.state.delay <= ((CARD_PAIR * 2) + 6) * TIME_UNIT ?
                                <div className="ready-go count-2 animated zoomIn">2</div>
                                :
                                null
                        }
                        {
                            this.state.delay > ((CARD_PAIR * 2) + 6) * TIME_UNIT && this.state.delay <= ((CARD_PAIR * 2) + 9) * TIME_UNIT ?
                                <div className="ready-go count-1 animated zoomIn">1</div>
                                :
                                null
                        }
                    </div>
                    :
                    <div className={`ready-go-container animated fadeOut ${this.state.delay < (((CARD_PAIR * 2) + 12) * TIME_UNIT) ? '' : 'hidden'}`} />
            }
            <div>
                {
                    this.state.countingDown ?
                        <Countdown
                            date={this.state.countingDown}
                            renderer={({ seconds, completed }) => {
                                if (completed) {
                                    if (this.props.playMusic) {
                                        this.state.loseSound.play();
                                    }
                                    this.setState({
                                        complete: 'lose',
                                    });
                                    this.props.onGameLose({ score: 0, token: this.state.gameAccessToken });
                                }
                                return <span className="countdown-timer" style={{ fontSize: '2.5em' }}>{seconds}s</span>;
                            }}
                        />
                        :
                        <div className="countdown-timer">
                            {
                                (() => {
                                    if (this.state.delay < ((CARD_PAIR * 2) + 3) * TIME_UNIT) {
                                        return 'Memorise the cards!';
                                    } else if (this.state.delay < ((CARD_PAIR * 2) + 9) * TIME_UNIT) {
                                        return 'Ready?';
                                    }

                                    return 'GO!';
                                })()
                            }
                        </div>
                }
            </div>
            <div className="perfect-game-tips p-1" style={{ fontSize: '1.5em' }}>{this.state.tips}</div>
            <div className="card-field">
                {
                    this.state.brandArr && this.state.brandArr.map((brandImage, index) => (
                        <span
                            key={index}
                            className={`flipable-card ${CARD_PAIR > 6 ? 'four-per-row' : ''}`}
                            onClick={() => {
                                const obj = { ...this.state };
                                let result = null;

                                if (!obj[`flipped_${index}`]) {
                                    return null;
                                }

                                if (obj.onHand1 && obj.onHand2) {
                                    obj[`flipped_${obj.onHand1.index}`] = obj.onHand1.image !== obj.onHand2.image;
                                    obj[`flipped_${obj.onHand2.index}`] = obj.onHand1.image !== obj.onHand2.image;
                                    obj.wrongMatch = {};
                                    obj.onHand1 = null;
                                    obj.onHand2 = null;
                                    clearTimeout(this.flipTimer);
                                }

                                // play flip music
                                if (this.props.playMusic) {
                                    this.state.clickSound.play();
                                }

                                // put card onhand
                                obj[`flipped_${index}`] = false;
                                if (!obj.onHand1) {
                                    obj.onHand1 = {
                                        index,
                                        image: brandImage,
                                    };
                                } else {
                                    obj.disableClick = true;
                                    obj.onHand2 = {
                                        index,
                                        image: brandImage,
                                    };

                                    // play pair result music
                                    if (brandImage === obj.onHand1.image) {
                                        if (this.props.playMusic) {
                                            this.state.correctSound.play();
                                        }
                                        obj.tips = 'It’s a perfect match!';
                                        obj.correctMatch[index] = true;
                                        obj.correctMatch[obj.onHand1.index] = true;

                                        obj.correct = (obj.correct || 0) + 1;
                                        if (obj.correct >= CARD_PAIR) {
                                            if (this.props.playMusic) {
                                                this.state.winSound.play();
                                            }
                                            result = 'win';
                                        }
                                    } else {
                                        obj.wrongMatch[index] = true;
                                        obj.wrongMatch[obj.onHand1.index] = true;
                                        obj.tips = 'Oops! That’s not a match.';
                                        if (this.props.playMusic) {
                                            this.state.wrongSound.play();
                                        }
                                    }
                                }
                                this.setState(obj);

                                if (obj.onHand1 && obj.onHand2) {
                                    this.flipTimer = setTimeout(() => {
                                        this.setState({
                                            disableClick: false,
                                            [`flipped_${obj.onHand1.index}`]: obj.onHand1.image !== obj.onHand2.image,
                                            [`flipped_${obj.onHand2.index}`]: obj.onHand1.image !== obj.onHand2.image,
                                            wrongMatch: {},
                                            onHand1: null,
                                            onHand2: null,
                                            complete: result || this.state.complete,
                                        }, () => {
                                            if (result === 'win') {
                                                this.props.onGameWin({ score: 6, token: this.state.gameAccessToken });
                                            }
                                        });
                                    }, 2 * TIME_UNIT);
                                }

                                return true;
                            }}
                        >
                            <ReactCardFlip isFlipped={this.state[`flipped_${index}`]}>
                                <img
                                    draggable="false"
                                    key="back"
                                    width="100%"
                                    height="100%"
                                    src={this.props.gameConfig.card_cover}
                                    // src={brandImage}
                                    alt="game card"
                                    className={`
                                        game-card-image
                                        ${this.state.correctMatch[index] ? 'correct-match' : ''}
                                    `}
                                />
                                <img
                                    draggable="false"
                                    key="front"
                                    width="100%"
                                    height="100%"
                                    src={brandImage}
                                    alt="game card"
                                    className={`
                                        game-card-image
                                        ${(this.state.delay) > index * TIME_UNIT ? '' : 'opacity-zero'}
                                        ${this.state.correctMatch[index] ? 'correct-match' : ''}
                                        ${this.state.wrongMatch[index] ? 'wrong-match' : ''}
                                    `}
                                />
                            </ReactCardFlip>
                        </span>
                    ))
                }
            </div>
        </div>
    )

    renderResult = () => (
        <div className="result-screen-content">
            <div className="prize-inner-section animated zoomIn">
                {
                    dataChecking(this.props, 'gameResultImagelink', 'result', 'image', 'mobile') ?
                        <div
                            onClick={() => {
                                if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
                                    if (window.onCloseWindow) {
                                        window.onCloseWindow();
                                    }
                                    const link = {
                                        key: '_appLink',
                                        value: this.props.gameResultImagelink.result._applink,
                                    };
                                    const str = JSON.stringify(link);
                                    window.ReactNativeWebView.postMessage(str);
                                } else {
                                    alert('weblink handling');
                                }
                            }}
                        >
                            <img
                                draggable="false"
                                width="100%"
                                key={1}
                                src={this.props.gameResultImagelink.result.image.desktop}
                                alt="result background"
                                className="result-image"
                            />
                        </div>
                        :
                        null
                }
                <span className="result-bottom-content">
                    <div
                        className="menu result-content"
                        onClick={this.props.onBackToMenu}
                    >
                        <img
                            className="result-button-item animated zoomIn"
                            draggable="false"
                            src={this.props.gameConfig.result_actions.menu_button}
                            alt="menu button"
                        />
                    </div>
                    <div
                        className="share result-content"
                        onClick={() => this.setState({ shareModal: true })}
                    >
                        <img
                            className="result-button-item animated zoomIn"
                            draggable="false"
                            src={this.props.gameConfig.result_actions.share_button}
                            alt="share button"
                        />
                    </div>
                    <div
                        className="replay result-content"
                        onClick={() => {
                            this.props.dispatch(getGameToken());
                            this.setState({
                                ...initialState,
                                brandArr: this.shuffleArray(this.getRandomBrands()),
                            });
                        }}
                    >
                        <img
                            className="result-button-item animated zoomIn"
                            draggable="false"
                            src={this.props.gameConfig.result_actions.replay_button}
                            alt="replay button"
                        />
                    </div>
                </span>
            </div>
        </div>
    )

    renderDialogContent = () => (
        <div>
            <div className="share-dialog-title">
                Share to others!
            </div>
            <span className="share-dialog-content">
                <div className="facebook share-content">
                    <FacebookShareButton
                        className="facebook share-button-item"
                        url={shareUrl}
                        quote={shareTitle}
                        hashtag={shareHashtag}
                    >
                        <FacebookIcon round={true} />
                    </FacebookShareButton>
                </div>
                <div className="twitter share-content">
                    <TwitterShareButton
                        className="twitter share-button-item"
                        url={shareUrl}
                        title={shareTitle}
                        via={shareVia}
                        hashtag={shareHashtag}
                    >
                        <TwitterIcon round={true} />
                    </TwitterShareButton>
                </div>
                <div className="telegram share-content">
                    <TelegramShareButton
                        className="telegram share-button-item"
                        url={shareUrl}
                        title={shareTitle}
                    >
                        <TelegramIcon round={true} />
                    </TelegramShareButton>
                </div>
                <div className="whatsapp share-content">
                    <WhatsappShareButton
                        className="whatsapp share-button-item"
                        url={shareUrl}
                        title={shareTitle}
                        separator="\n"
                    >
                        <WhatsappIcon round={true} />
                    </WhatsappShareButton>
                </div>
            </span>
        </div>
    )

    render() {
        return (
            <div className="perfect-match-game-page animated fadeIn">
                <img
                    draggable="false"
                    width="100%"
                    src={this.props.gameConfig.background_image}
                    alt="game background"
                    className="game-background"
                />
                {
                    dataChecking(this.props, 'perfectMatchGame', 'gameToken', 'loading') ?
                        <div>Loading...</div>
                        :
                        this.state.complete ?
                            <div className="result-screen">
                                {this.renderResult()}
                            </div>
                            :
                            <div className="game-screen animated fadeIn">
                                {this.renderGame()}
                            </div>
                }
                {
                    this.state.shareModal ?
                        <div className="perfect-match-share-modal">
                            <div className="modal-inner-div">
                                <IconButton className="close modal-inner-button" onClick={() => this.setState({ shareModal: false })}>
                                    <Close />
                                </IconButton>
                                {this.renderDialogContent()}
                            </div>
                        </div>
                        :
                        null
                }
            </div>
        );
    }
}

PerfectMatchGame.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    perfectMatchGame: makeSelectPerfectMatchGame(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'perfectMatchGame', reducer });
const withSaga = injectSaga({ key: 'perfectMatchGame', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(PerfectMatchGame);
