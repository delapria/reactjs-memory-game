import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ItemsTitle = styled.li`
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  width: 50%;
  height: 20px;
  border: 2px;
  border-color: red;
  border-radius: 10px;
  padding: 10px 10px;
  background-color: #ce8900;
  box-shadow: 1px 3px 20px rgba(0, 2, 94, 0.2);
`;

const Items = styled.li`
  display: flex;
  justify-content: space-between;
  margin-top: 3px;
  width: 50%;
  height: 15px;
  border-radius: 10px;
  padding: 10px 10px;
  background-color: white;
  box-shadow: 1px 3px 20px rgba(0, 2, 94, 0.2);
`;

const ListPlays = ({ listPlays }) => {
  return (
    <>
      <ItemsTitle>
        <strong>Jogadores</strong>
        <strong>Jogadas</strong>
      </ItemsTitle>
      {listPlays.map(item => (
        <Items key={item.id}>
          <span>{item.playerName}</span>
          <span>{item.numPlays}</span>
        </Items>
      ))}
    </>
  );
};

ListPlays.propTypes = {
  listPlays: PropTypes.arrayOf(PropTypes.object),
};

ListPlays.defaultProps = {
  listPlays: [],
};

export default ListPlays;
