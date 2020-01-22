import React from 'react';
import renderer from 'react-test-renderer';
import Modal from 'react-modal';
import { shallow } from 'enzyme';

import FinishModal from '.';

describe('Snapshot Menu', () => {
  test('Testar se o componente renderiza de acordo com a snapshot', () => {
    const setCloseModal = () => {};
    const setResetGame = () => {};
    const modalIsOpen = false;
    const playerName = 'Douglas';
    const countPlays = 14;
    const treeJSON = renderer
      .create(
        <FinishModal
          modalIsOpen={modalIsOpen}
          playerName={playerName}
          countPlays={countPlays}
          setCloseModal={setCloseModal}
          setResetGame={setResetGame}
        />
      )
      .toJSON();
    expect(treeJSON).toMatchSnapshot();
  });
});

describe('Shallow tests', () => {
  test('Testa valor propriedade isOpen', () => {
    const setCloseModal = () => {};
    const setResetGame = () => {};
    const modalIsOpen = false;
    const playerName = 'Douglas';
    const countPlays = 14;
    const comp = shallow(
      <FinishModal
        modalIsOpen={modalIsOpen}
        playerName={playerName}
        countPlays={countPlays}
        setCloseModal={setCloseModal}
        setResetGame={setResetGame}
      />
    );
    expect(comp.getElement().props.children.props.isOpen).toBe(false);
  });
});
