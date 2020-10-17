import React from 'react';
import Navigation from './src/navigation';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import firebase from 'firebase';
import {store, persistor} from './src/redux';
import {StatusBar} from 'react-native';
import Background from './src/components/background';
import AsyncStorage from '@react-native-community/async-storage';

class App extends React.Component {
  componentDidMount() {
    let firebaseConfig = {
      apiKey: 'AIzaSyBCtvKJLfgluV0rTaFFEWChgN8Wz-YaXQg',
      authDomain: 'todo-729fe.firebaseapp.com',
      databaseURL: 'https://todo-729fe.firebaseio.com',
      projectId: 'todo-729fe',
      storageBucket: 'todo-729fe.appspot.com',
      messagingSenderId: '600289786715',
      appId: '1:600289786715:web:dcb71f5f07d7d989aaf87e',
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }

  render() {
    AsyncStorage.clear();
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <StatusBar
            translucent
            backgroundColor="transparent"
            barStyle={'dark-content'}
          />
          <Navigation />
        </PersistGate>
      </Provider>
    );
  }
}
export default App;
