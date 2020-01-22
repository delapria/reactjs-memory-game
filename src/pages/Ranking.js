import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ListPLays from '../components/ListPlays';

const Container = styled.ul`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  list-style-type: none;
`;

const Ranking = ({ listPlays }) => {
  return (
    <Container>
      <h2>Lista de jogadas</h2>
      <ListPLays listPlays={listPlays} />
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    listPlays: state.games.listPlays,
  };
};

Ranking.propTypes = {
  listPlays: PropTypes.arrayOf(PropTypes.object),
};

Ranking.defaultProps = {
  listPlays: [],
};

const ListGamesConnected = connect(mapStateToProps, null)(Ranking);

export default ListGamesConnected;
