import React from 'react';
import {TouchableOpacity, View, Text, Dimensions, Image} from 'react-native';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

import Edit from '../assets/icons/Edit.png';
import Delete from '../assets/icons/Delete.png';

const Todo = (props) => {
  const {data} = props;
  return (
    <TouchableOpacity
      activeOpacity={1}
      underlayColor={null}
      style={styles.container}>
      <View style={styles.circle} />
      <View style={styles.main}>
        <View style={{width: '80%'}}>
          <Text numberOfLines={1} style={{color: 'black', fontSize: 18}}>
            {data.title}
          </Text>
          <Text style={{color: 'black', fontSize: 14}}>
            Completed: {data.completed ? 'True' : 'False'}
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignSelf: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              props.onEditPress(data);
            }}>
            <Image
              source={Edit}
              style={{width: 17, height: 17, marginRight: 5}}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              props.onDeletePress(data);
            }}>
            <Image
              source={Delete}
              style={{width: 20, height: 20, tintColor: 'red'}}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Todo;

const styles = {
  container: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    width: Width * 0.9,
    paddingHorizontal: 10,
  },
  main: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    padding: 5,
    width: '90%',
  },
  circle: {
    width: 10,
    height: 10,
    backgroundColor: 'blue',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
};
