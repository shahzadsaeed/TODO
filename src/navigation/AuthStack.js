import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignIn from '../screens/authentication/SignIn';
const Stack = createStackNavigator();
const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="SignIn"
        component={SignIn}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
