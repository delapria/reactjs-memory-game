import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const images = require.context('../../assets/images', true);

const Container = styled.div`
  display: flex;
  flex: 1;
  align-content: stretch;
  width: 100px;
  height: 150px;
  cursor: pointer;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  :hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.35), 0 10px 10px rgba(0, 0, 0, 0.32);
  }
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
`;

const Card = ({ urlBack, urlFront, isFlipped, onClick }) => {
  const teste = images(`./${isFlipped ? urlFront : urlBack}`);
  return (
    <Container onClick={onClick}>
      <Image src={teste} alt='' />
    </Container>
  );
};

Card.propTypes = {
  urlBack: PropTypes.string.isRequired,
  urlFront: PropTypes.string.isRequired,
  isFlipped: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Card;
