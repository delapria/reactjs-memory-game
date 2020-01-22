import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    alignItems: 'center',
  },
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TextName = styled.span`
  font-size: 15px;
  font-weight: bold;
`;

const ButtonNewPlayer = styled.button`
  margin-top: 10px;
  border-radius: 5px;
  background-color: #00c853;
  font-weight: bold;
  border: none;
  cursor: pointer;
  height: 30px;
`;

const ButtonResetGame = styled.button`
  border-radius: 5px;
  font-weight: bold;
  background-color: #f57f17;
  border: none;
  cursor: pointer;
  height: 30px;
`;

const FinishModal = ({
  modalIsOpen,
  setCloseModal,
  setResetGame,
  playerName,
  countPlays,
}) => {
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={setCloseModal}
        style={customStyles}
        contentLabel='Finish game'
        ariaHideApp={false}
      >
        <Container>
          <TextName>{`Jogador: ${playerName}`}</TextName>
          <h3>{`Jogadas: ${countPlays}`}</h3>
          <ButtonResetGame onClick={setResetGame}>
            Reiniciar o jogo
          </ButtonResetGame>
          <ButtonNewPlayer onClick={setCloseModal}>
            Novo jogador
          </ButtonNewPlayer>
        </Container>
      </Modal>
    </div>
  );
};

FinishModal.propTypes = {
  modalIsOpen: PropTypes.bool.isRequired,
  setCloseModal: PropTypes.func.isRequired,
  setResetGame: PropTypes.func.isRequired,
  playerName: PropTypes.string.isRequired,
  countPlays: PropTypes.number.isRequired,
};

export default FinishModal;
