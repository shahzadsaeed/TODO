import React, {useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TextInput,
} from 'react-native';
import {wp, hp} from '../helpers/Responsiveness';

const AddItemModal = (props) => {
  const [todoTitle, setTodoTitle] = useState('');

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              placeholder={'Enter Title of TODO'}
              value={todoTitle}
              onChangeText={(text) => {
                setTodoTitle(text);
              }}
            />

            <TouchableHighlight
              style={{...styles.openButton, backgroundColor: '#2196F3'}}
              onPress={() => {
                if (props.edit && todoTitle.length !== 0) {
                  props.onEdit(todoTitle);
                } else {
                  todoTitle.length === 0
                    ? props.setModalVisible(!props.modalVisible, todoTitle)
                    : props.addTODO(todoTitle);
                }
                setTodoTitle('');
              }}>
              <Text style={styles.textStyle}>
                {todoTitle.length === 0 ? 'Close' : 'Done'}
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: wp(5),
  },
  modalView: {
    margin: wp(5),
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default AddItemModal;
