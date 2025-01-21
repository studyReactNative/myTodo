import PropTypes from 'prop-types';
import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ThemeContext} from 'styled-components';
import IconButton from './IconButton';
import {images} from '../images';

const Task = ({text}) => {
  const theme = useContext(ThemeContext);

  return (
    <View style={[styles.container, {backgroundColor: theme.itemBackground}]}>
      <IconButton type={images.uncompleted} />
      <Text style={[styles.contents, {color: theme.text}]}>{text}</Text>
      <IconButton type={images.update} />
      <IconButton type={images.delete} />
    </View>
  );
};

Task.propsTypes = {
  text: PropTypes.string.isRequired,
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
