import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Card from '../../components/Card';
import GameDataInfo from '../../components/GameDataInfo';
import {
  setCountPlaysAction,
  resetGameAction,
  setPlaysAction,
  resetPlayAction,
  setFetchingAction,
} from '../../redux/games';
import { savePlaysStorageThunk } from '../../thunk/games';
import FinishModal from '../../components/FinishModal';
import { CreatCards, shuffleArray } from '../../utils/functions';

import './styles.css';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      firstCard: null,
      secondCard: null,
      countHits: 1,
      modalIsOpen: false,
    };
  }

  componentDidMount() {
    const newCards = this.handleGenerateCards();
    return this.setState({ cards: newCards });
  }

  handleGenerateCards = () => {
    const newCards = CreatCards();
    return shuffleArray(newCards);
  };

  setFirstCard = card => {
    this.setState({ firstCard: card });
  };

  setSecondCard = card => {
    this.setState({ secondCard: card }, () => {
      this.comparePair();
    });
  };

  setCloseModal = () => {
    this.setState({ modalIsOpen: false });
    const { resetGame, history } = this.props;
    resetGame();
    this.setState({ cards: this.handleGenerateCards() });
    this.onResetCardsFirsSecond();
    this.setState({ countHits: 1 });
    history.push('/');
  };

  setResetGame = () => {
    const { resetPlay } = this.props;
    resetPlay();
    this.setState({ cards: this.handleGenerateCards() });
    this.onResetCardsFirsSecond();
    this.setState({ modalIsOpen: false });
    this.setState({ countHits: 1 });
  };

  handleCountHits = () => {
    const { countHits } = this.state;
    this.setState({ countHits: countHits + 1 });
  };

  onCardClick = id => {
    const { cards, firstCard } = this.state;
    const { fetching } = this.props;
    if (fetching) return;
    const newCard = cards.filter(cardItem => cardItem.id === id);
    if (!newCard[0].canFlip) return;

    newCard[0].isFlipped = true;
    this.setState({ cards });

    firstCard ? this.setSecondCard(newCard[0]) : this.setFirstCard(newCard[0]);
  };

  comparePair = () => {
    const { firstCard, secondCard } = this.state;
    if (!firstCard || !secondCard) return;

    if (firstCard.urlFront !== secondCard.urlFront) {
      this.onFailureGuess(firstCard.id, secondCard.id);
      return;
    }

    this.onSuccessGuess(firstCard.id, secondCard.id);
    this.onResetCardsFirsSecond();
  };

  onResetCardsFirsSecond = () => {
    this.setSecondCard(null);
    this.setFirstCard(null);
  };

  onSuccessGuess = (firstId, secondId) => {
    const { cards, countHits } = this.state;
    const { setCountPlays, setPlays } = this.props;
    if (!firstId && !secondId) return;

    this.handleCountHits();
    const firstCard = cards.filter(cardItem => cardItem.id === firstId);
    firstCard[0].canFlip = false;
    this.setState({ cards });

    const secondCard = cards.filter(cardItem => cardItem.id === secondId);
    secondCard[0].canFlip = false;
    setCountPlays();
    this.setState({ cards }, () => {});

    if (countHits === 10) {
      setPlays();
      this.setFinishGame();
    }
  };

  onFailureGuess = (firstId, secondId) => {
    const { setCountPlays, setFetching } = this.props;
    setCountPlays();
    setFetching(true);
    this.onResetCardsFliped(firstId, secondId);
    this.setSecondCard(null);
    this.setFirstCard(null);
  };

  onResetCardsFliped = (firstId, secondId) => {
    const { cards } = this.state;
    const { setFetching } = this.props;

    if (!firstId && !secondId) return;
    const firstCard = cards.filter(cardItem => cardItem.id === firstId);
    setTimeout(() => {
      firstCard[0].isFlipped = false;
      this.setState({ cards });
    }, 1000);

    const secondCard = cards.filter(cardItem => cardItem.id === secondId);
    setTimeout(() => {
      secondCard[0].isFlipped = false;
      this.setState({ cards });
      setFetching(false);
    }, 1000);
  };

  setFinishGame = async () => {
    const { savePlaysStorage } = this.props;
    await savePlaysStorage();
    this.setState({ modalIsOpen: true });
  };

  render() {
    const { cards, modalIsOpen } = this.state;
    const { playerName, countPlays } = this.props;
    return (
      <>
        <GameDataInfo playerName={playerName} countPlays={countPlays} />
        <FinishModal
          modalIsOpen={modalIsOpen}
          setCloseModal={this.setCloseModal}
          setResetGame={this.setResetGame}
          playerName={playerName}
          countPlays={countPlays}
        />
        <section className="cards">
          {cards.map(card => (
            <Card
              onClick={() => this.onCardClick(card.id)}
              key={card.id}
              urlBack={card.urlBack}
              urlFront={card.urlFront}
              isFlipped={card.isFlipped}
            />
          ))}
        </section>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    playerName: state.games.playerNow,
    countPlays: state.games.countPlays,
    fetching: state.games.fetching,
  };
};

const mapDispatchToProps = {
  setCountPlays: setCountPlaysAction,
  resetGame: resetGameAction,
  setPlays: setPlaysAction,
  resetPlay: resetPlayAction,
  setFetching: setFetchingAction,
  savePlaysStorage: savePlaysStorageThunk,
};

Game.propTypes = {
  playerName: PropTypes.string,
  countPlays: PropTypes.number,
  setCountPlays: PropTypes.func.isRequired,
  setPlays: PropTypes.func.isRequired,
  resetPlay: PropTypes.func.isRequired,
  resetGame: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  savePlaysStorage: PropTypes.func.isRequired,
  setFetching: PropTypes.func.isRequired,
  fetching: PropTypes.bool,
};

Game.defaultProps = {
  playerName: '',
  countPlays: 0,
  fetching: false,
};

const GameListConnected = connect(mapStateToProps, mapDispatchToProps)(Game);

export default GameListConnected;
