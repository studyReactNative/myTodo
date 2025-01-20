import React from 'react';
import {useWindowDimensions} from 'react-native';
import styled from 'styled-components';
import propTypes from 'prop-types';
import PropTypes from 'prop-types';

const Input = ({placeholder, value, onChangeText, onSubmitEditing}) => {
  const width = useWindowDimensions().width;

  Input.propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChangeText: PropTypes.func.isRequired,
    onSubmitEditing: PropTypes.func.isRequired,
  };

  return (
    <StyledInput
      value={value}
      onChangeText={onChangeText}
      onSubmitEditing={onSubmitEditing}
      width={width}
      placeholder={placeholder}
      maxLength={50}
      autoCapitalize="none"
      autoCorrect={false}
      returnKeyType="done"
    />
  );
};

export default Input;

const StyledInput = styled.TextInput.attrs(({theme}) => ({
  placeholderTextColor: theme.main,
}))`
  width: ${({width}) => width - 40}px;
  height: 60px;
  margin: 3px 0;
  padding: 15px 20px;
  border-radius: 10px;
  background-color: ${({theme}) => theme.itemBackground};
  font-size: 25px;
  color: ${({theme}) => theme.text};
`;
