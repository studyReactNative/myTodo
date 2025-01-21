import React, {useState} from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {theme} from './theme';
import {StatusBar, useWindowDimensions} from 'react-native';
import Input from './components/Input';
import Task from './components/Task';

export default function App() {
  const width = useWindowDimensions().width;
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    Alert(`Add: ${newTask}`);
    setNewTask('');
  };

  const handleTextChange = text => setNewTask(text);

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <StatusBar
          barStyle="light-content"
          backgroundColor={theme.background}
        />
        <Title>TODO List</Title>
        <Input
          value={newTask}
          onChangeText={handleTextChange}
          onSubmitEditing={addTask}
          placeholder="+ Add a Task"
        />
        <List width={width}>
          <Task text="Hanbit" />
          <Task text="Hanbit" />
          <Task text="Hanbit" />
        </List>
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

const List = styled.ScrollView`
  flex: 1;
  width: ${({width}) => width - 40};
`;
