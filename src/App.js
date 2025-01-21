import React, {useState} from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {theme} from './theme';
import {Alert, StatusBar, useWindowDimensions} from 'react-native';
import Input from './components/Input';
import Task from './components/Task';

export default function App() {
  const width = useWindowDimensions().width;
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState({
    1: {id: 1, text: 'Hanbit', completed: false},
    2: {id: 2, text: 'React Native', completed: true},
    3: {id: 3, text: 'Sample', completed: false},
  });

  const addTask = () => {
    Alert.alert(`Add: ${newTask}`);
    const ID = Date.now();
    const newTaskObj = {
      [ID]: {id: ID, text: newTask, completed: false},
    };
    setTasks({...tasks, ...newTaskObj});
    setNewTask('');
  };

  const deleteTask = id => {
    const currentTasks = Object.assign({}, tasks);
    delete currentTasks[id];
    setTasks(currentTasks);
  };

  const toggleTask = id => {
    const currentTasks = Object.assign({}, tasks);
    currentTasks[id]['completed'] = !currentTasks[id]['completed'];
    setTasks(currentTasks);
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
          {Object.values(tasks)
            .reverse()
            .map(item => (
              <Task
                key={item.id}
                item={item}
                deleteTask={deleteTask}
                toggleTask={toggleTask}
              />
            ))}
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
