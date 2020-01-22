import React from 'react';
import renderer from 'react-test-renderer';

import GameDataInfo from '.';

describe('Snapshot Menu', () => {
  test('Testar se o componente renderiza de acordo com a snapshot', () => {
    const playerName = 'Douglas';
    const countPlays = 15;
    const treeJSON = renderer
      .create(<GameDataInfo playerName={playerName} countPlays={countPlays} />)
      .toJSON();
    expect(treeJSON).toMatchSnapshot();
  });
});
