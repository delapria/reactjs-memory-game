import React from 'react';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
`;

const About = () => {
  return (
    <Container>
      <span>Jogo da Memória.</span>
      <span>Desenvolvido por: Douglas Delapria</span>
      <span>Empresa: DB1 Global Software</span>
    </Container>
  );
};

export default About;
