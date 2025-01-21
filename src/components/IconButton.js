import React, {useContext} from 'react';
import {Pressable} from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import {images} from '../images';
// import {ThemeContext} from 'styled-components';

const IconButton = ({type, onPressOut = () => {}, id}) => {
  // const theme = useContext(ThemeContext);

  return (
    <Pressable hitSlop={10} onPressOut={() => onPressOut(id)}>
      <Icon source={type} />
      {/* <Image source={type} style={[styles.icon, {tintColor: theme.text}]} /> */}
    </Pressable>
  );
};

IconButton.propTypes = {
  type: PropTypes.oneOf(Object.values(images)).isRequired,
  onPressOut: PropTypes.func,
  id: PropTypes.number,
};

export default IconButton;

const Icon = styled.Image.attrs(({theme}) => ({
  tintColor: theme.text,
}))`
  width: 30px;
  height: 30px;
  margin: 10px;
`;

// const styles = StyleSheet.create({
//   icon: {
//     width: 30,
//     height: 30,
//     margin: 10,
//   },
// });
