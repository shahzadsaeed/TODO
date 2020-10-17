import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import Header from '../../components/Header';
import Todo from '../../components/Todo';
import AddItemModal from '../../components/AddItemModal';
import Api from '../../Api';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

class Main extends React.Component {
  state = {
    data: null,
    loading: false,
    search: '',
    searchData: null,
    modalVisible: false,
    todoID: 11,
    editData: null,
  };

  renderContent = () => {
    if (this.state.loading) {
      return (
        <View style={{...styles.main, ...{justifyContent: 'center'}}}>
          <ActivityIndicator color={'blue'} size={'small'} />
        </View>
      );
    } else if (this.state.data !== null && this.state.search.length === 0) {
      return this.state.data.map((item, index) => {
        return (
          <Todo
            key={index}
            data={item}
            onDeletePress={this.onDeletePress}
            onEditPress={this.onEditPress}
          />
        );
      });
    } else if (this.state.searchData !== null) {
      return this.state.searchData.map((item, index) => {
        return (
          <Todo
            key={index}
            data={item}
            onDeletePress={this.onDeletePress}
            onEditPress={this.onEditPress}
          />
        );
      });
    }
  };

  onEditPress = (data) => {
    console.log('data');
    this.setState({modalVisible: true, editData: data});
  };

  onEdit = (todoTitle) => {
    console.log('data');
    this.state.data.forEach((item, index) => {
      if (item.id === this.state.editData.id) {
        item.title = todoTitle;
      }
    });

    this.state.searchData &&
      this.state.searchData.forEach((item, index) => {
        if (item.id === this.state.editData.id) {
          item.title = todoTitle;
        }
      });

    this.setState({editData: null, modalVisible: false});
  };

  onDeletePress = (data) => {
    const newData = this.state.data.filter((item, index) => {
      if (item.id === data.id) {
        return false;
      }
      return true;
    });

    const newSearchData =
      this.state.searchData &&
      this.state.searchData.filter((item, index) => {
        if (item.id === data.id) {
          return false;
        }
        return true;
      });

    this.setState({data: newData, searchData: newSearchData});
  };

  onSearchPress = () => {
    const newData = this.state.data.filter((item, index) => {
      if (item.title.search(this.state.search) === -1) {
        return false;
      }
      return true;
    });
    this.setState({searchData: newData});
  };

  componentDidMount() {
    this.setState({loading: true}, () => {
      Api.LoadData((res) => {
        this.setState({data: res.slice(0, 10), loading: false});
      });
    });
  }

  setModalVisible = (value) => {
    this.setState({modalVisible: value});
  };

  addTODO = (todoTitle) => {
    let temp = this.state.data;

    temp.push({
      id: this.state.todoID,
      title: todoTitle,
      completed: false,
    });
    this.setState({
      modalVisible: false,
      data: temp,
      todoID: this.state.todoID + 1,
    });
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Header
          Callback={() => {
            this.setModalVisible(true);
          }}
        />
        <ScrollView showsVerticalScrollIndicator={false} style={styles.main}>
          <View style={styles.searchContainer}>
            <TextInput
              placeholder={'Enter name of TODO to search'}
              style={styles.textInput}
              onChangeText={(text) => {
                if (this.state.searchData !== null) {
                  this.setState({search: text, searchData: null});
                } else {
                  this.setState({search: text});
                }
              }}
              value={this.state.search}
            />

            <TouchableOpacity
              style={styles.searchButton}
              onPress={this.onSearchPress}>
              <Text style={{color: 'white'}}>Search</Text>
            </TouchableOpacity>
          </View>
          {this.renderContent()}
        </ScrollView>
        <AddItemModal
          modalVisible={this.state.modalVisible}
          setModalVisible={this.setModalVisible}
          addTODO={this.addTODO}
          edit={this.state.editData}
          onEdit={this.onEdit}
        />
      </ScrollView>
    );
  }
}

export default Main;

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'rgb(82,156,246)',
    padding: 20,
  },
  main: {
    height: Height * 0.75,
    width: Width * 0.9,
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 20,
  },
  textInput: {
    marginRight: 10,
  },
  searchContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.5)',
    marginBottom: 20,
  },
  searchButton: {
    backgroundColor: '#529CF6',
    paddingHorizontal: 5,
    borderRadius: 20,
    paddingVertical: 5,
  },
};
