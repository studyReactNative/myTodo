import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {theme} from './theme';
import {StatusBar} from 'react-native';
import Input from './components/Input';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <StatusBar
          barStyle="light-content"
          backgroundColor={theme.background}
        />
        <Title>TODO List</Title>
        <Input placeholder="+ Add a Task" />
      </Container>
    </ThemeProvider>
  );
}

const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  background-color: ${({theme}) => theme.background};
`;

const Title = styled.Text`
  align-self: flex-start;
  margin: 0px 20px;
  font-size: 40px;
  font-weight: 600;
  color: ${({theme}) => theme.main};
`;
