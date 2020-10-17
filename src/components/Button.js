import React from 'react';
import {TouchableOpacity, View, ActivityIndicator, Text} from 'react-native';

import {wp, hp} from '../helpers/Responsiveness';

const Button = (props) => {
  return (
    <TouchableOpacity
      disabled={props.loading || props.disabled}
      onPress={props.onPress}
      style={[
        styles.ButtonStyle,
        props.containerStyle,
        {opacity: props.disabled ? 0.7 : 1},
      ]}>
      {props.leftIcon && (
        <View style={[styles.leftStyle, props.leftIconStyle]}>
          {props.leftIcon}
        </View>
      )}
      {(props.loading && (
        <ActivityIndicator size={'small'} color={props.color || '#fff'} />
      )) ||
        (props.text && (
          <Text style={{...styles.textStyle, ...props.textStyle}}>
            {props.text}
          </Text>
        ))}
      {props.right && (
        <View style={[styles.leftStyle, props.rightIconStyle]}>
          {props.right}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = {
  ButtonStyle: {
    height: wp('9%'),
    elevation: 2,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    borderRadius: 5,
    minWidth: wp(40),
  },
  textStyle: {
    color: 'black',
  },
};

export default Button;
