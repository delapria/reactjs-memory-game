import { setDataPlaysAction } from '../redux/games';

export const requestPlaysThunk = () => {
  return (dispatch, getState) => {
    const { listPlays } = getState().games;
    if (!listPlays || listPlays.length !== 0) return;
    const data = localStorage.getItem('dataGamePLays');
    if (!data) return;

    dispatch(setDataPlaysAction(JSON.parse(data)));
  };
};

export const savePlaysStorageThunk = () => {
  return (dispatch, getState) => {
    const { listPlays } = getState().games;

    const newlistPlays = listPlays.sort((numA, numB) => {
      if (numA.numPlays > numB.numPlays) {
        return 1;
      }
      if (numA.numPlays < numB.numPlays) {
        return -1;
      }
      return 0;
    });
    return localStorage.setItem('dataGamePLays', JSON.stringify(newlistPlays));
  };
};
