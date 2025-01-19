import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {theme} from './theme';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container></Container>
    </ThemeProvider>
  );
}

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  background-color: ${({theme}) => theme.background};
`;
