import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import ListPLays from '.';

describe('Snapshot ListPLays', () => {
  test('Testar se o componente renderiza de acordo com a snapshot', () => {
    const listPLays = [
      {
        id: '1',
        playerName: 'Douglas',
        numPlays: 13,
      },
    ];
    const treeJSON = renderer
      .create(<ListPLays listPLays={listPLays} />)
      .toJSON();
    expect(treeJSON).toMatchSnapshot();
  });
});

describe('Shallow tests', () => {
  test('Testa valor apresentado pelo componente', () => {
    const listPLays = [
      {
        id: '1',
        playerName: 'Douglas',
        numPlays: 13,
      },
    ];
    const comp = shallow(<ListPLays listPLays={listPLays} />);
    expect(
      comp
        .find('strong')
        .last()
        .props().children
    ).toBe('Jogadas');
    expect(
      comp
        .find('strong')
        .first()
        .props().children
    ).toBe('Jogadores');
  });
});
