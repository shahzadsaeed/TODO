import React from 'react';
import {StyleSheet, TouchableOpacity, TextInput, View} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const InputField = (props) => {
  const {rightPress} = props;
  const Right = rightPress ? TouchableOpacity : View;
  return (
    <View style={[styles.container, props.containerStyle]}>
      <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
        {props.leftIcon && (
          <View style={[props.leftStyle, styles.leftStyle]}>
            {props.leftIcon}
          </View>
        )}
        <TextInput
          autoCapitalize={props.autoCapitalize}
          onChangeText={props.onChangeText}
          style={[styles.inputField, props.inputField]}
          placeholder={props.placeholder}
          underlineColorAndroid={'transparent'}
          placeholderTextColor={props.placeholderTextColor}
          value={props.value}
          // textAlign={'center'}
          keyboardType={props.keyboardType ? props.keyboardType : 'default'}
          secureTextEntry={
            props.secureTextEntry ? props.secureTextEntry : false
          }
          textAlignVertical={props.textAlignVerticalTop ? 'top' : 'center'}
          multiline={props.multiline}
          numberOfLines={props.numberOfLines ? 5 : 1}
          editable={props.editable}
          returnKeyType={props.search}
          onSubmitEditing={props.onSubmit}
        />
      </View>
      {props.right && (
        <Right
          style={[props.rightStyle, styles.rightStyle]}
          onPress={rightPress}>
          {props.right}
        </Right>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // borderColor: Colors.Border,
    // borderBottomWidth: 1,
    height: wp('13.5%'),
    backgroundColor: 'white',
    borderRadius: 5,
    // elevation: 2,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  leftStyle: {
    paddingLeft: 10,
  },
  inputField: {
    flex: 1,
    width: '100%',
    fontSize: wp('4%'),
    // fontFamily: Fonts.SarabunRegular,
    color: 'black',
    padding: 0,
    paddingHorizontal: 10,
    // alignItems: 'flex-start',
    // justifyContent: 'flex-start'
    // marginVertical:10
  },
  inputLabel: {
    color: '#969696',
    fontSize: wp('20%'),
  },
  rightStyle: {
    paddingRight: 10,
  },
});

export default InputField;
