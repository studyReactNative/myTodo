import PropTypes from 'prop-types';
import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ThemeContext} from 'styled-components';
import IconButton from './IconButton';
import {images} from '../images';

const Task = ({item, deleteTask, toggleTask}) => {
  const theme = useContext(ThemeContext);
  const id = item.id;
  const completed = item.completed;
  const text = item.text;

  return (
    <View style={[styles.container, {backgroundColor: theme.itemBackground}]}>
      <IconButton
        type={completed ? images.completed : images.uncompleted}
        id={id}
        onPressOut={toggleTask}
        completed={completed}
      />
      <Text
        style={[
          styles.contents,
          {color: completed ? theme.done : theme.text},
          {textDecorationLine: completed ? 'line-through' : 'none'},
        ]}>
        {text}
      </Text>
      {completed || <IconButton type={images.update} completed={completed} />}
      <IconButton
        type={images.delete}
        id={id}
        onPressOut={deleteTask}
        completed={completed}
      />
    </View>
  );
};

Task.propsTypes = {
  item: PropTypes.object.isRequired,
  deleteTask: PropTypes.func.isRequired,
  toggleTask: PropTypes.func.isRequired,
};

export default Task;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    padding: 5,
    marginHorizontal: 3,
  },
  contents: {
    flex: 1,
    fontSize: 24,
  },
});
