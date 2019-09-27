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

import { Events } from 'globalUtils';

import makeSelectPerfectMatchGame from './selectors';
import reducer from './reducer';
import saga from './saga';
import './style.scss';

const TIME_UNIT = 500;

const BRANDS = [
    require('./rsc/brands/brand_one.png'),
    require('./rsc/brands/brand_two.png'),
    require('./rsc/brands/brand_three.png'),
    require('./rsc/brands/brand_four.png'),
    require('./rsc/brands/brand_five.png'),
    require('./rsc/brands/brand_six.png'),
];

const arr = [...BRANDS, ...BRANDS];
let currentIndex = arr.length;
let temporaryValue = null;
let randomIndex = null;

// While there remain elements to shuffle...
while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = arr[currentIndex];
    arr[currentIndex] = arr[randomIndex];
    arr[randomIndex] = temporaryValue;
}
const arrayOfRandomCard = arr;

export class PerfectMatchGame extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);

        this.state = {
            preparationDone: false,
            flicked: {},
            onHand: null,
            disableFlick: false,
        };
    }

    componentDidMount = () => {
        Events.trigger('hideHeader', {});
        setTimeout(() => {
            this.setState({ isRendered: true });
        }, 1100);

        setTimeout(() => {
            this.setState({ delay: TIME_UNIT });
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
            this.setState({ delay: 10 * TIME_UNIT });
        }, 10 * TIME_UNIT);
        setTimeout(() => {
            this.setState({ delay: 12 * TIME_UNIT });
        }, 12 * TIME_UNIT);
        setTimeout(() => {
            this.setState({ delay: 14 * TIME_UNIT });
        }, 14 * TIME_UNIT);
        setTimeout(() => {
            this.setState({ delay: 16 * TIME_UNIT });
        }, 16 * TIME_UNIT);
        setTimeout(() => {
            this.setState({ delay: 18 * TIME_UNIT, countingDown: Date.now() + 30000 });
        }, 18 * TIME_UNIT);
    }

    renderGame = () => (
        <div>
            <div>
                {
                    this.state.countingDown ?
                        <Countdown
                            date={this.state.countingDown}
                            renderer={({ seconds, completed }) => {
                                if (completed) {
                                    this.setState({
                                        complete: 'lose',
                                    });
                                }
                                return <span className="countdown-timer">{seconds}s</span>;
                            }}
                        />
                        :
                        null
                }
            </div>
            <div>tips</div>
            <div className="card-field">
                {
                    arrayOfRandomCard.map((brandImage, index) => (
                        <span
                            key={index}
                            onClick={() => {
                                if (this.state[`flicked_${index}`] || this.state.disableFlick) {
                                    return null;
                                }
                                this.setState({ [`flicked_${index}`]: true });

                                if (this.state.onHand) {
                                    this.state.disableFlick = true;
                                    setTimeout(() => {
                                        if (this.state.onHand && brandImage === this.state.onHand.image) {
                                            this.state.correct = (this.state.correct || 0) + 1;
                                            this.setState({
                                                onHand: null,
                                                disableFlick: false,
                                            });

                                            if (this.state.correct >= BRANDS.length) {
                                                this.setState({
                                                    complete: 'win',
                                                });
                                            }
                                        } else {
                                            this.setState({
                                                [`flicked_${index}`]: false,
                                                [`flicked_${this.state.onHand.index}`]: false,
                                                onHand: null,
                                                disableFlick: false,
                                            });
                                        }
                                    }, 2 * TIME_UNIT);
                                } else {
                                    this.setState({
                                        onHand: {
                                            index,
                                            image: brandImage,
                                        },
                                    });
                                }

                                return true;
                            }}
                            className="flickable-card"
                        >
                            <ReactCardFlip isFlipped={this.state[`flicked_${index}`]}>
                                <img
                                    key="front"
                                    width="100%"
                                    src={require('./rsc/brand_cover.png')}
                                    alt="game card"
                                    className={`game-card-image animated ${this.state.delay > index * TIME_UNIT ? 'fadeIn' : 'opacity-zero'}`}
                                />
                                <img
                                    key="back"
                                    width="100%"
                                    src={brandImage}
                                    alt="game card"
                                    className={`game-card-image animated ${this.state.delay > index * TIME_UNIT ? 'fadeIn' : 'opacity-zero'}`}
                                />
                            </ReactCardFlip>
                        </span>
                    ))
                }
            </div>
        </div>
    )

    renderResult = () => (
        <div>{this.state.complete}</div>
    )

    render() {
        return (
            <div className="perfect-match-game-page animated fadeIn">
                <img
                    width="100%"
                    src={require('./rsc/game_background.jpg')}
                    alt="game background"
                    className="game-background"
                />
                <div className="idle-screen">
                    <div className={`game-card-images animated ${this.state.delay >= 16 * TIME_UNIT ? 'fadeOut' : ''}`}>
                        {
                            BRANDS.map((brandImage, index) => (
                                <img
                                    key={index}
                                    width="100%"
                                    src={brandImage}
                                    alt="game card"
                                    className={`game-card-image animated ${this.state.delay > index * TIME_UNIT ? 'fadeIn' : 'opacity-zero'}`}
                                />
                            ))
                        }
                    </div>
                    <div className="ready-go-container">
                        {
                            this.state.delay > 10 * TIME_UNIT && this.state.delay <= 12 * TIME_UNIT ?
                                <div className="ready-go count-3 animated fadeIn">3</div>
                                :
                                null
                        }
                        {
                            this.state.delay > 12 * TIME_UNIT && this.state.delay <= 14 * TIME_UNIT ?
                                <div className="ready-go count-2 animated fadeIn">2</div>
                                :
                                null
                        }
                        {
                            this.state.delay > 14 * TIME_UNIT && this.state.delay <= 16 * TIME_UNIT ?
                                <div className="ready-go count-1 animated fadeIn">1</div>
                                :
                                null
                        }
                    </div>
                </div>
                {
                    this.state.complete ?
                        <div className={`result-screen animated ${this.state.delay >= 18 * TIME_UNIT ? 'fadeIn' : 'opacity-zero'}`}>
                            {this.renderResult()}
                        </div>
                        :
                        <div className={`game-screen animated ${this.state.delay >= 18 * TIME_UNIT ? 'fadeIn' : 'opacity-zero'}`}>
                            {this.renderGame()}
                        </div>
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
