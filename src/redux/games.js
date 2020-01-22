import { createAction, handleActions } from 'redux-actions';
import uuid from 'uuid';

const GAME_SET_PLAYER = 'GAME/SET_PLAYER';
const GAME_SET_COUNT_PLAYS = 'GAME/SET_COUNT_PLAYS';
const GAME_SET_PLAYS = 'GAME/SET_PLAYS';
const GAME_RESET = 'GAME/RESET';
const GAME_RESET_PLAY = 'GAME/RESET_PLAY';
const GAME_SET_FETCHING_ACTION = 'GAME/SET_FETCHING';
const GAME_SET_DATA_PLAYS = 'GAME/SET_DATA_PLAYS';

export const setPlayerNowAction = createAction(GAME_SET_PLAYER);
export const setCountPlaysAction = createAction(GAME_SET_COUNT_PLAYS);
export const setPlaysAction = createAction(GAME_SET_PLAYS);
export const resetGameAction = createAction(GAME_RESET);
export const resetPlayAction = createAction(GAME_RESET_PLAY);
export const setFetchingAction = createAction(GAME_SET_FETCHING_ACTION);
export const setDataPlaysAction = createAction(GAME_SET_DATA_PLAYS);

const INITIAL_STATE = {
  listPlays: [],
  playerNow: '',
  countPlays: 0,
  fetching: false,
};

const gamesHandler = handleActions(
  {
    [GAME_SET_PLAYER]: (state, action) => {
      return {
        ...state,
        playerNow: action.payload,
      };
    },
    [GAME_SET_COUNT_PLAYS]: state => {
      return {
        ...state,
        countPlays: state.countPlays + 1,
      };
    },
    [GAME_SET_PLAYS]: state => {
      const newPlay = {
        id: uuid(),
        playerName: state.playerNow,
        numPlays: state.countPlays,
      };
      return {
        ...state,
        listPlays: [...state.listPlays, newPlay],
      };
    },
    [GAME_SET_DATA_PLAYS]: (state, action) => {
      return {
        ...state,
        listPlays: [...action.payload],
      };
    },
    [GAME_RESET]: state => {
      return {
        ...state,
        playerNow: '',
        countPlays: 0,
      };
    },
    [GAME_RESET_PLAY]: state => {
      return {
        ...state,
        countPlays: 0,
      };
    },
    [GAME_SET_FETCHING_ACTION]: (state, action) => {
      return {
        ...state,
        fetching: action.payload,
      };
    },
  },
  INITIAL_STATE
);

export const reducers = {
  games: gamesHandler,
};
