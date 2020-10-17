import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';

const Background = ({children}) => (
  <ImageBackground
    source={require('../assets/images/background_dot.png')}
    resizeMode="repeat"
    style={styles.background}>
    <ScrollView contentContainerStyle={styles.container} behavior="padding">
      {children}
    </ScrollView>
  </ImageBackground>
);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Background;
