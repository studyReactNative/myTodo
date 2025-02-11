import React, {useEffect, useState} from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {theme} from './theme';
import {
  ActivityIndicator,
  Alert,
  StatusBar,
  useWindowDimensions,
} from 'react-native';
import Input from './components/Input';
import Task from './components/Task';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const width = useWindowDimensions().width;
  const [isLoading, setIsLoading] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState({});

  const addTask = () => {
    Alert.alert(`Add: ${newTask}`);
    const ID = Date.now();
    const newTaskObj = {
      [ID]: {id: ID, text: newTask, completed: false},
    };
    saveTasks({...tasks, ...newTaskObj});
    setNewTask('');
  };

  const deleteTask = id => {
    const currentTasks = Object.assign({}, tasks);
    delete currentTasks[id];
    saveTasks(currentTasks);
  };

  const toggleTask = id => {
    const currentTasks = Object.assign({}, tasks);
    currentTasks[id]['completed'] = !currentTasks[id]['completed'];
    saveTasks(currentTasks);
  };

  const updateTask = item => {
    const currentTasks = Object.assign({}, tasks);
    currentTasks[item.id] = item;
    saveTasks(currentTasks);
  };

  const onBlur = () => setNewTask('');

  const handleTextChange = text => setNewTask(text);

  const saveTasks = async tasks => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      setTasks(tasks);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    try {
      setIsLoading(true);
      loadTasks();
    } catch (e) {
      console.log(e);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }, []);

  const loadTasks = async () => {
    const loadedTasks = await AsyncStorage.getItem('tasks');
    setTasks(JSON.parse(loadedTasks || '{}'));
  };

  return (
    <ThemeProvider theme={theme}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#000" style={{flex: 1}} />
      ) : (
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
            onBlur={onBlur}
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
                  updateTask={updateTask}
                />
              ))}
          </List>
        </Container>
      )}
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
