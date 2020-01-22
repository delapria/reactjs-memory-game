import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { Form as FinalForm } from 'react-final-form';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { setPlayerNowAction, resetPlayAction } from '../redux/games';
import { requestPlaysThunk } from '../thunk/games';
import { setLoggedIn } from '../utils/fake-login';

const Container = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 9;
  align-items: center;
`;

const ButtonStart = styled.button`
  border-radius: 5px;
  font-size: 20px;
  margin-top: 10px;
  background-color: #f06809;
  font-weight: bold;
  height: 45px;
  width: 300px;
  border: none;
  cursor: pointer;
  :hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
`;

const ButtonList = styled.button`
  border-radius: 5px;
  font-size: 20px;
  margin-top: 10px;
  background-color: #ce8900;
  font-weight: bold;
  height: 45px;
  width: 300px;
  border: none;
  cursor: pointer;
  :hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
`;

const InputName = styled.input`
  font-size: 18px;
  width: 300px;
`;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerName: '',
    };

    this.inputGamer = createRef();
  }

  componentDidMount() {
    this.requestLocalPLays();
  }

  requestLocalPLays = async () => {
    const { requestPlays } = this.props;
    await requestPlays();
  };

  setUserName = event => {
    return this.setState({ playerName: event.target.value });
  };

  onClickListPlays = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  onSubmit = form => {
    if (this.inputGamer.current.value === '') return;
    const { history, setPlayerName, resetPlay } = this.props;
    const { playerName } = this.state;

    resetPlay();
    setPlayerName(playerName);
    setLoggedIn(true);
    history.push('/game');
    setTimeout(form.reset);
  };

  renderForm = renderProps => {
    const { handleSubmit } = renderProps;
    return (
      <Container onSubmit={handleSubmit}>
        <h1>Jogador</h1>
        <InputName
          name='fieldPlayer'
          type='text'
          value={this.player}
          placeholder='Informe o nome do jogador'
          onChange={this.setUserName}
          ref={this.inputGamer}
        />
        <ButtonStart type='submit'>Iniciar</ButtonStart>
        <ButtonList onClick={this.onClickListPlays}>Ranking</ButtonList>
      </Container>
    );
  };

  render() {
    return <FinalForm onSubmit={this.onSubmit} render={this.renderForm} />;
  }
}

const mapDispatchToProps = {
  setPlayerName: setPlayerNowAction,
  resetPlay: resetPlayAction,
  requestPlays: requestPlaysThunk,
};

Home.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  setPlayerName: PropTypes.func.isRequired,
  resetPlay: PropTypes.func.isRequired,
  requestPlays: PropTypes.func.isRequired,
};

const PostListConnected = connect(null, mapDispatchToProps)(Home);

export default PostListConnected;
