import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { isLoggedIn } from '../../utils/fake-login';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 40px;
`;

const LabelPlayer = styled.strong`
  display: flex;
  font-size: 20px;
  font-weight: bold;
  flex-direction: row;
  margin-right: 30px;
  text-align: center;
  font-family: 'Greta Sans Condensed Bold', 'Greta Sans Bold', 'Arial',
    'sans-serif';
  text-shadow: 0 10px 35px rgba(0, 0, 0, 0.3), 0 10px 10px rgba(0, 0, 0, 0.32);
`;

const GameDataInfo = ({ playerName, countPlays }) => {
  return (
    <>
      {isLoggedIn() ? (
        <Container>
          <LabelPlayer>{`Jogador: ${playerName}`}</LabelPlayer>
          <LabelPlayer>{`Jogadas: ${countPlays}`}</LabelPlayer>
        </Container>
      ) : (
        ''
      )}
    </>
  );
};

GameDataInfo.propTypes = {
  playerName: PropTypes.string.isRequired,
  countPlays: PropTypes.number.isRequired,
};

export default GameDataInfo;
