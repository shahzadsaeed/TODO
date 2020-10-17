import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const LoadData = (onDone) => {
  Axios.get('https://jsonplaceholder.typicode.com/todos/')
    .then((res) => res.data)
    .then((response) => {
      onDone(response);
    });
};

export default {LoadData};
