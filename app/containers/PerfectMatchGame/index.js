/**
 *
 * PerfectMatchGame
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Countdown from 'react-countdown-now';
import ReactCardFlip from 'react-card-flip';

import { Events } from 'globalUtils';

import makeSelectPerfectMatchGame from './selectors';
import reducer from './reducer';
import saga from './saga';
import './style.scss';

const TIME_UNIT = 330;

const BRANDS = [
    require('./rsc/brands/D11-Brand_Image_Au-Fairy_300x300.jpg'),
    require('./rsc/brands/D11-Brand_Image_COSRX_300x300.jpg'),
    require('./rsc/brands/D11-Brand_Image_Eucerin_300x300.jpg'),
    require('./rsc/brands/D11-Brand_Image_innisfree_300x300.jpg'),
    require('./rsc/brands/D11-Brand_Image_Laneige_300x300.jpg'),
    require('./rsc/brands/D11-Brand_Image_Loreal_300x300.jpg'),
];

const gameMusic = new Audio(require('./rsc/sound/Prizefighter.mp3'));
gameMusic.loop = true;
const winSound = new Audio(require('./rsc/sound/xmas_winner.mp3'));
const loseSound = new Audio(require('./rsc/sound/xmas_loser.mp3'));

export class PerfectMatchGame extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);

        this.state = {
            preparationDone: false,
            fliped: {},
            correctMatch: {},
            wrongMatch: {},
            onHand1: null,
            onHand2: null,
        };
    }

    componentDidMount = () => {
        document.ondragstart = () => null;
        Events.trigger('hideHeader', {});
        this.state = {
            preparationDone: false,
            fliped: {},
            correctMatch: {},
            wrongMatch: {},
            onHand1: null,
            onHand2: null,
        };

        setTimeout(() => {
            this.setState({ delay: 1 * TIME_UNIT });
        }, 1 * TIME_UNIT);
        setTimeout(() => {
            this.setState({ delay: 2 * TIME_UNIT });
        }, 2 * TIME_UNIT);
        setTimeout(() => {
            this.setState({ delay: 3 * TIME_UNIT });
        }, 3 * TIME_UNIT);
        setTimeout(() => {
            this.setState({ delay: 4 * TIME_UNIT });
        }, 4 * TIME_UNIT);
        setTimeout(() => {
            this.setState({ delay: 5 * TIME_UNIT });
        }, 5 * TIME_UNIT);
        setTimeout(() => {
            this.setState({ delay: 6 * TIME_UNIT });
        }, 6 * TIME_UNIT);
        setTimeout(() => {
            this.setState({ delay: 7 * TIME_UNIT });
        }, 7 * TIME_UNIT);
        setTimeout(() => {
            this.setState({ delay: 8 * TIME_UNIT });
        }, 8 * TIME_UNIT);
        setTimeout(() => {
            this.setState({ delay: 9 * TIME_UNIT });
        }, 9 * TIME_UNIT);
        setTimeout(() => {
            this.setState({ delay: 10 * TIME_UNIT });
        }, 10 * TIME_UNIT);
        setTimeout(() => {
            this.setState({ delay: 11 * TIME_UNIT });
        }, 11 * TIME_UNIT);
        setTimeout(() => {
            this.setState({ delay: 12 * TIME_UNIT });
        }, 12 * TIME_UNIT);
        setTimeout(() => {
            this.setState({ delay: 15 * TIME_UNIT });
        }, 15 * TIME_UNIT);
        setTimeout(() => {
            this.setState({ delay: 18 * TIME_UNIT });
        }, 18 * TIME_UNIT);
        setTimeout(() => {
            this.setState({ delay: 21 * TIME_UNIT });
        }, 21 * TIME_UNIT);
        setTimeout(() => {
            this.setState({
                delay: 24 * TIME_UNIT,
                countingDown: Date.now() + 300400,
                fliped_0: true,
                fliped_1: true,
                fliped_2: true,
                fliped_3: true,
                fliped_4: true,
                fliped_5: true,
                fliped_6: true,
                fliped_7: true,
                fliped_8: true,
                fliped_9: true,
                fliped_10: true,
                fliped_11: true,
            });
        }, 24 * TIME_UNIT);
        setTimeout(() => {
            this.setState({ delay: 27 * TIME_UNIT });
        }, 27 * TIME_UNIT);

        gameMusic.currentTime = 0;
        if (this.props.playMusic) {
            gameMusic.play();
        }

        this.setState({ brandArr: this.shuffleArray([...BRANDS, ...BRANDS]) });
    }

    componentWillUpdate = (nextProps) => {
        if (nextProps.playMusic !== this.props.playMusic) {
            gameMusic[nextProps.playMusic ? 'play' : 'pause']();
        }
    }

    componentWillUnmount() {
        gameMusic.pause();
    }

    shuffleArray = (array) => {
        // const newArr = [];
        // array.forEach((item) => {
        //     newArr[Math.floor(Math.random() * 2) ? 'push' : 'unshift'](item);
        // });
        // return newArr;

        let index = null;
        let temp = null;
        const newArr = [...array];
        let counter = newArr.length - 1;
        while (counter > 0) {
            index = Math.floor(Math.random() * counter);
            temp = newArr[counter];
            newArr[counter] = newArr[index];
            newArr[index] = temp;
            counter--;
        }

        return newArr;
    }

    renderGame = () => (
        <div className="game-panel">
            {
                this.state.delay > (12 * TIME_UNIT) && !this.state.countingDown ?
                    <div className="ready-go-container animated fadeIn">
                        {
                            this.state.delay > 12 * TIME_UNIT && this.state.delay <= 15 * TIME_UNIT ?
                                <div className="ready-go count-3 animated zoomIn">3</div>
                                :
                                null
                        }
                        {
                            this.state.delay > 15 * TIME_UNIT && this.state.delay <= 18 * TIME_UNIT ?
                                <div className="ready-go count-2 animated zoomIn">2</div>
                                :
                                null
                        }
                        {
                            this.state.delay > 18 * TIME_UNIT && this.state.delay <= 21 * TIME_UNIT ?
                                <div className="ready-go count-1 animated zoomIn">1</div>
                                :
                                null
                        }
                    </div>
                    :
                    <div className={`ready-go-container animated fadeOut ${this.state.delay < (24 * TIME_UNIT) ? '' : 'hidden'}`} />
            }
            <div>
                {
                    this.state.countingDown ?
                        <Countdown
                            date={this.state.countingDown}
                            renderer={({ seconds, completed }) => {
                                if (completed) {
                                    if (this.props.playMusic) {
                                        loseSound.play();
                                    }
                                    this.setState({
                                        complete: 'lose',
                                    });
                                    // this.props.onGameLose({ status: 'lose' });
                                }
                                return <span className="countdown-timer">{seconds}s</span>;
                            }}
                        />
                        :
                        <div className="countdown-timer">30s</div>
                }
            </div>
            {/* <div onClick={() => this.setState({ brandArr: this.shuffleArray([...BRANDS, ...BRANDS]) })}>randomise</div> */}
            <div>tips</div>
            <div className="card-field">
                {
                    this.state.brandArr && this.state.brandArr.map((brandImage, index) => (
                        <span
                            key={index}
                            onClick={() => {
                                const obj = { ...this.state };
                                let result = null;

                                if (!obj[`fliped_${index}`]) {
                                    return null;
                                }

                                if (obj.onHand1 && obj.onHand2) {
                                    obj[`fliped_${obj.onHand1.index}`] = obj.onHand1.image !== obj.onHand2.image;
                                    obj[`fliped_${obj.onHand2.index}`] = obj.onHand1.image !== obj.onHand2.image;
                                    obj.wrongMatch = {};
                                    obj.onHand1 = null;
                                    obj.onHand2 = null;
                                    clearTimeout(this.flipTimer);
                                }

                                // play flip music
                                if (this.props.playMusic) {
                                    const clickSound = new Audio(require('./rsc/sound/flip.mp3'));
                                    clickSound.play();
                                }

                                // put card onhand
                                obj[`fliped_${index}`] = false;
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
                                            const correctSound = new Audio(require('./rsc/sound/flip_correct.mp3'));
                                            correctSound.play();
                                        }

                                        obj.correctMatch[index] = true;
                                        obj.correctMatch[obj.onHand1.index] = true;

                                        obj.correct = (obj.correct || 0) + 1;
                                        if (obj.correct >= BRANDS.length) {
                                            if (this.props.playMusic) {
                                                winSound.play();
                                            }
                                            result = 'win';
                                        }
                                    } else {
                                        obj.wrongMatch[index] = true;
                                        obj.wrongMatch[obj.onHand1.index] = true;

                                        if (this.props.playMusic) {
                                            const bombSound = new Audio(require('./rsc/sound/Bomb.mp3'));
                                            bombSound.play();
                                        }
                                    }
                                }
                                this.setState(obj);

                                if (obj.onHand1 && obj.onHand2) {
                                    this.flipTimer = setTimeout(() => {
                                        this.setState({
                                            disableClick: false,
                                            [`fliped_${obj.onHand1.index}`]: obj.onHand1.image !== obj.onHand2.image,
                                            [`fliped_${obj.onHand2.index}`]: obj.onHand1.image !== obj.onHand2.image,
                                            wrongMatch: {},
                                            onHand1: null,
                                            onHand2: null,
                                            complete: result || this.state.complete,
                                        });
                                        // this.props.onGameWin({ status: 'win' });
                                    }, 2 * TIME_UNIT);
                                }

                                return true;
                            }}
                            className="flipable-card"
                        >
                            <ReactCardFlip isFlipped={this.state[`fliped_${index}`]}>
                                <img
                                    draggable="false"
                                    key="back"
                                    width="100%"
                                    height="100%"
                                    src={require('./rsc/D11-Brand_Cover-Image_300x300.jpg')}
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
        <div>
            {/* {
                this.props.gameResultImagelink ?
                    <div className="prize-inner-section animated zoomIn">
                        <img
                            draggable="false"
                            key={1}
                            width="100%"
                            src={this.props.gameResultImagelink}
                            alt="carousel slide show"
                            className="slideshow-image"
                        />
                    </div>
                    :
                    null
            } */}
            {/* {
                this.state.complete === 'win' ?
                    <div className="prize-inner-section animated zoomIn">
                        <img
                            draggable="false"
                            key={1}
                            width="100%"
                            src={require('./rsc/success.jpg')}
                            alt="carousel slide show"
                            className="slideshow-image"
                        />
                    </div>
                    :
                    <div className="prize-inner-section animated zoomIn">
                        <img
                            draggable="false"
                            key={1}
                            width="100%"
                            src={require('./rsc/failed.jpg')}
                            alt="carousel slide show"
                            className="slideshow-image"
                        />
                    </div>
            } */}
        </div>
    )

    render() {
        return (
            <div className="perfect-match-game-page animated fadeIn">
                <img
                    draggable="false"
                    width="100%"
                    src={require('./rsc/D11-Game-background.jpg')}
                    alt="game background"
                    className="game-background"
                />
                {
                    this.state.complete ?
                        <div className="result-screen">
                            {this.renderResult()}
                        </div>
                        :
                        <div className="game-screen animated fadeIn">
                            {this.renderGame()}
                        </div>
                }
            </div>
        );
    }
}

PerfectMatchGame.propTypes = {
    // dispatch: PropTypes.func.isRequired,
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
