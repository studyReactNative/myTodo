import PropTypes from 'prop-types';
import React, {useContext, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ThemeContext} from 'styled-components';
import IconButton from './IconButton';
import {images} from '../images';
import Input from './Input';

const Task = ({item, deleteTask, toggleTask, updateTask}) => {
  const theme = useContext(ThemeContext);
  const id = item.id;
  const completed = item.completed;
  const text = item.text;

  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(text);

  const handleUpdateButton = () => setIsEditing(true);

  const onSubmitEditing = () => {
    if (isEditing) {
      const editedTask = Object.assign({}, item, {text: newText});
      setIsEditing(false);
      updateTask(editedTask);
    }
  };

  const onBlur = () => {
    if (isEditing) {
      setIsEditing(false);
      setNewText(text);
    }
  };

  return isEditing ? (
    <Input
      value={newText}
      onChangeText={text => setNewText(text)}
      onSubmitEditing={onSubmitEditing}
      onBlur={onBlur}
    />
  ) : (
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
      {completed || (
        <IconButton type={images.update} onPressOut={handleUpdateButton} />
      )}
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
    marginVertical: 3,
  },
  contents: {
    flex: 1,
    fontSize: 24,
  },
});
