import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  Text,
  Alert,
  Button,
  TouchableHighlight,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';

GoogleSignin.configure({
  webClientId: '200641316322-5n2hgjl773t0sr5pis0mvtguc57t3nkl',
});

export default class LoginStudent extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      user: '',
      password: '',
      loggedIn: false,
      userInfo: '',
    };
  }

  componentDidMount() {
    GoogleSignin.configure({
      webClientId:
        '200641316322-5n2hgjl773t0sr5pis0mvtguc57t3nkl.apps.googleusercontent.com',
      offlineAccess: true,
      hostedDomain: '',
      forceConsentPrompt: true,
    });
  }
  login() {
    console.log('in login');
    let email = this.state.email;
    let password = this.state.password;
    console.log(email + ' ' + password);
    if (email != '' && password != '') {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
          this.setState(
            {
              user: user.user.email,
            },
            () => {
              console.log(this.state.user);
              this.props.navigation.navigate('Student');
            },
          );
        })
        .catch(error => {
          Alert.alert(error.message);
          console.log(error.message);
        });
    }
  }

  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({userInfo: userInfo, loggedIn: true});
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  render() {
    return (
      //     <Container>
      //     <Content>
      //         <Text>Student</Text>
      //         <InputGroup borderType='rounded' >
      //             <Icon name='ios-home' style={{color:'#384850'}}/>
      //             <Input placeholder='Email' onChangeText = {(email)=>{this.setState({email:email})}}/>
      //         </InputGroup>
      //         <InputGroup borderType='rounded' >
      //             <Icon name='ios-home' style={{color:'#384850'}}/>
      //             <Input secureTextEntry={true} placeholder="Password" onChangeText = {(password)=>{this.setState({password:password})}}/>
      //         </InputGroup>
      //         <Button title="Login" style={{color:'green'}} color="green" onPress={()=>{this.login()}}/>
      //         <GoogleSigninButton
      //           style={{ width: 192, height: 48 }}
      //           size={GoogleSigninButton.Size.Wide}
      //           color={GoogleSigninButton.Color.Dark}
      //           onPress={this.signIn}
      //          />
      //     </Content>
      // </Container>

      <SafeAreaView style={styles.MainContainer}>
        <SafeAreaView style={styles.Login_box}>
          <SafeAreaView style={styles.FormBox}>
            <SafeAreaView style={styles.image}>
              <Image
                source={require('../src/images/Final_logo.png')}
                style={styles.Final_logo}
              />
            </SafeAreaView>
            <Text style={styles.TextStyle2}>Student Login</Text>
            <TextInput
              textContentType="emailAddress"
              placeholderTextColor="#fff"
              placeholder="E-mail"
              onChangeText={email => {
                this.setState({email: email});
              }}
            />
            <TextInput
              textContentType="password"
              secureTextEntry={true}
              placeholderTextColor="#fff"
              placeholder="Password"
              onChangeText={password => {
                this.setState({password: password});
              }}
            />
            <TouchableHighlight
              style={styles.SubmitButtonStyle}
              activeOpacity={0.5}
              onPress={() => {
                this.login();
              }}>
              <LinearGradient
                colors={['#36D6BD', '#007E7B']}
                start={{x: 0, y: 1}}
                style={styles.Linear_G}>
                <Text style={styles.TextStyle}> LOGIN </Text>
              </LinearGradient>
            </TouchableHighlight>
          </SafeAreaView>
        </SafeAreaView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#102138',
  },

  Login_box: {
    position: 'relative',
    marginTop: -110,
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  FormBox: {
    flex: 0,
    justifyContent: 'space-evenly',
  },

  textInput_Style: {
    borderWidth: 0,
    borderBottomColor: '#fff',
    borderBottomWidth: 2,
    fontSize: 25,
    color: '#fff',
    width: 300,
    textAlign: 'justify',
    fontFamily: 'Roboto-Thin',
    paddingBottom: 0,
    marginTop: 10,
  },

  SubmitButtonStyle: {
    marginTop: 75,
    padding: 0,
    backgroundColor: '#36D6BD',
    borderRadius: 10,
    borderWidth: 0,
    width: 300,
  },

  TextStyle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 32,
    fontWeight: '100',
    fontFamily: 'Roboto-Light',
  },

  TextStyle2: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 32,
    fontWeight: '100',
    fontFamily: 'Roboto-Light',
  },

  Linear_G: {
    flex: 0,
    borderRadius: 10,
  },

  Final_logo: {
    height: 250,
    width: 250,
  },

  image: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 40,
  },
});
