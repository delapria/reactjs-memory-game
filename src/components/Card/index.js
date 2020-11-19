import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const images = require.context('../../assets/images', true);

//import './styles.css';

const Container = styled.div`
  display: flex;
  flex: 1;
  width: 120px;
  height: 160px;
  cursor: pointer;
  transition: all 0.3s ease 0s;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 5px;

  :hover {
    transform: translateY(-7px);
  }
`;

const Image = styled.img`
  object-fit: cover;
  overflow: hidden;
  vertical-align: middle;
  border-radius: 5px;
`;

const Card = ({ urlBack, urlFront, isFlipped, onClick }) => {
  const imageUrl = images(`./${isFlipped ? urlFront : urlBack}`);
  return (
    <Container class="card" onClick={onClick}>
      <Image src={imageUrl} alt={isFlipped ? urlFront : urlBack} />
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
