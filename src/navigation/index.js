import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './AuthStack';
import {connect} from 'react-redux';
import DashboardStack from './DashboardStack';
class Navigation extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <NavigationContainer>
        {this.props.user.User ? <DashboardStack /> : <AuthStack />}
      </NavigationContainer>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps, null)(Navigation);
