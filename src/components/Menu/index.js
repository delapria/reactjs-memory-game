import React, { Component } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { setLoggedIn } from '../../utils/fake-login';

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-around;
`;

const Title = styled.strong`
  cursor: pointer;
  color: #d50000;
  font-family: 'Greta Sans Condensed Bold', 'Greta Sans Bold', 'Arial',
    'sans-serif';
  font-size: 45px;
  letter-spacing: 1px;
  text-shadow: 0 10px 35px rgba(0, 0, 0, 0.3), 0 10px 10px rgba(0, 0, 0, 0.32);
`;

const ButtonHome = styled.button`
  border: none;
  background: none;
  font-size: 20px;
  font-family: 'Roboto';
  text-transform: uppercase;
  letter-spacing: 1px;
  outline: none;
  margin-top: 20px;
`;

class Menu extends Component {
  onClick = () => {
    const { history } = this.props;
    setLoggedIn(true);
    history.push('/');
  };

  render() {
    return (
      <Container>
        <ButtonHome onClick={this.onClick}>
          <Title>Jogo da Memória</Title>
        </ButtonHome>
      </Container>
    );
  }
}

Menu.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default withRouter(Menu);
