import React, {useCallback} from 'react';
import {Text, View, Dimensions, TouchableOpacity, Image} from 'react-native';
import Moment from 'moment';
const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

import Add from '../assets/icons/Add.png';
import {wp} from '../helpers/Responsiveness';

const App = ({Callback}) => {
  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <View>
        <Text style={{color: 'white', fontSize: wp(12)}}>Today</Text>
        <Text style={{color: 'white', fontSize: wp(5)}}>
          {Moment().format('dddd, MMMM Do YYYY')}
        </Text>
      </View>
      <View style={{marginTop: wp(5)}}>
        <TouchableOpacity
          onPress={() => {
            Callback();
          }}>
          <Image
            source={Add}
            style={{
              width: wp(13),
              height: wp(13),
              resizeMode: 'contain',
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default App;
