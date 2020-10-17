import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Background from '../../components/background';
import Button from '../../components/Button';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen/index';
import InputField from '../../components/InputField';
import firebase from 'firebase';
import {connect} from 'react-redux';
import {loginUser} from '../../redux/user/actions';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false,
      errorMessage: '',
      emailError: false,
      passwordError: false,
    };
  }

  onLogin = () => {
    const {email, password, loading, errorMessage} = this.state;
    const Emailreg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.trim().length < 1) {
      this.setState({errorMessage: 'Enter your email', emailError: true});
    } else if (!Emailreg.test(email)) {
      this.setState({errorMessage: 'Enter Valid email', emailError: true});
    } else if (password.trim().length < 1) {
      this.setState({errorMessage: 'Enter your password', passwordError: true});
    } else if (password.trim().length < 6) {
      this.setState({
        errorMessage: 'Password should be 6 characters long',
        passwordError: true,
      });
    } else {
      this.setState({loading: true, errorMessage: ''});

      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
          console.log('response after user logged in ', res);
          this.props.loginUser(res.user);
          console.log('User logged-in successfully!');
        })
        .catch((error) => {
          if (error.code === 'auth/user-not-found') {
            firebase
              .auth()
              .createUserWithEmailAndPassword(email, password)
              .then((res) => {
                console.log('response after user logged in ', res);
                this.props.loginUser(res.user);
                console.log('User logged-in successfully!');
              })
              .catch((error) => {
                this.setState({
                  errorMessage: 'Some thing went wrong. Please try again',
                });
              });
          }
          if (error.code === 'auth/invalid-email') {
            this.setState({errorMessage: 'That email address is invalid!'});
          }
          if (error.code === 'auth/wrong-password') {
            this.setState({errorMessage: 'Invalid Password'});
          }
          if (error.code === 'auth/too-many-requests') {
            this.setState({errorMessage: 'Too many attempts.Try later'});
          }
          console.log(error);
        })
        .finally(() => {
          this.setState({loading: false});
        });
    }
  };

  render() {
    return (
      <Background>
        <Text style={styles.welcomeText}>TODO Application</Text>
        <Text style={styles.error}>{this.state.errorMessage}</Text>

        <InputField
          keyboardType={'email-address'}
          autoCapitalize="none"
          containerStyle={[
            styles.input,
            {borderColor: this.state.emailError ? '#ff9999' : '#E2E2E2'},
          ]}
          onChangeText={(e) =>
            this.setState({email: e, emailError: false, errorMessage: ''})
          }
          placeholder={'Email'}
        />
        <InputField
          secureTextEntry
          value={this.state.password}
          autoCapitalize="none"
          containerStyle={[
            styles.input,
            {borderColor: this.state.passwordError ? '#ff9999' : '#E2E2E2'},
          ]}
          onChangeText={(e) =>
            this.setState({password: e, passwordError: false, errorMessage: ''})
          }
          placeholder={'Password'}
        />
        <Button
          disabled={this.state.loading}
          loading={this.state.loading}
          text={'LOGIN'}
          containerStyle={styles.loginButton}
          textStyle={styles.loginButtonText}
          onPress={this.onLogin}
        />
      </Background>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (user) => dispatch(loginUser(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

const styles = {
  background: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: wp('20'),
    width: wp('20'),
  },

  welcomeText: {
    fontWeight: 'bold',
    fontSize: wp('7'),
    color: '#600EE6',
    marginVertical: wp('3'),
  },
  input: {
    borderColor: '#E2E2E2',
    marginBottom: wp('4'),
    width: wp('80'),
  },
  signupTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButton: {
    marginVertical: wp('4'),
    height: wp('12'),
    width: wp('80'),
    backgroundColor: '#600EE6',
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: wp('5'),
  },
  signUpButtonText: {
    color: '#600EE6',
    fontWeight: 'bold',
    fontSize: wp('5'),
  },
  signup: {color: '#600EE6', fontWeight: 'bold'},
  error: {
    color: '#ff4d4d',
    fontWeight: '600',
    marginBottom: wp('2'),
  },
};
