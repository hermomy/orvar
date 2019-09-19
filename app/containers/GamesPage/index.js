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
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'assets/animate.min.scss';

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

export class GamesPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);

        this.state = {
            showModal: null,
            slideArray: null,
            gameId: null,
            // gameId: 1,
            // showModal: 'showPlay',
        };
    }

    componentDidMount = () => {
        Events.trigger('hideHeader', {});
        setTimeout(() => {
            this.setState({ isRendered: true });
        }, 1100);
    }

    renderModalContent = () => {
        const { showModal, slideArray, gameId } = this.state;

        if (showModal === 'showPlay' && gameId) {
            if (gameId) {
                return (
                    <PerfectMatchGame
                        props={{ smth: true }}
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
                <div className="game-container">
                    <img
                        width="100%"
                        src={require('./rsc/main_menu.jpg')}
                        alt="main menu background"
                        className="main-menu animated fadeIn"
                    />
                    <div className="main-menu-buttons animated slideInDown fadeIn">
                        <div
                            onClick={
                                () =>
                                    this.setState({ showModal: 'showPlay', gameId: 1 })
                            }
                        >
                            <img
                                width="100%"
                                src={require('./rsc/button_play.png')}
                                alt="play"
                                className="main-menu-button-item animated slideInRight"
                            />
                        </div>
                        <div onClick={() => this.setState({ showModal: 'slideShow', slideArray: prizeSlide })}>
                            <img
                                width="100%"
                                src={require('./rsc/button_prizes.png')}
                                alt="prizes"
                                className="main-menu-button-item animated slideInLeft"
                            />
                        </div>
                        <div onClick={() => this.setState({ showModal: 'slideShow', slideArray: howToSlide })}>
                            <img
                                width="100%"
                                src={require('./rsc/button_how.png')}
                                alt="how to play"
                                className="main-menu-button-item animated slideInRight"
                            />
                        </div>
                    </div>
                    {
                        this.state.showModal ?
                            <div
                                className={`games-page-popup-modal modal-${this.state.showModal} animated ${this.state.isRendered ? 'fadeIn' : 'opacity-zero'}`}
                            >
                                <div className="modal-inner-div">
                                    <div
                                        className="modal-close-button"
                                        onClick={() => this.setState({ showModal: null })}
                                    >
                                        <img
                                            src={require('../../resources/ic-close.png')}
                                            alt="close"
                                            className="close-button-icon animated rotateIn"
                                        />
                                    </div>
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
