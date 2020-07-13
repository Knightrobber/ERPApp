import React,{Component} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Button,
    Alert
  } from 'react-native';
  import { Container, Content, InputGroup, Input, Icon} from 'native-base';
  import auth from '@react-native-firebase/auth';
  import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin';

  GoogleSignin.configure({
    webClientId: '200641316322-5n2hgjl773t0sr5pis0mvtguc57t3nkl',
  });

  export default class LoginStudent extends Component{
    constructor(){
        super();
        this.state = {
            email:'',
            user:'',
            password:'',
            loggedIn: false,
            userInfo:''
        }
    }

    componentDidMount(){
        GoogleSignin.configure({
            webClientId: '200641316322-5n2hgjl773t0sr5pis0mvtguc57t3nkl.apps.googleusercontent.com',
            offlineAccess: true, 
            hostedDomain: '', 
            forceConsentPrompt: true, 
          });
    }
    login(){
        console.log("in login")
        let email = this.state.email;
        let password = this.state.password;
        console.log(email + " " + password)
        if(email!='' && password!=''){
            auth().signInWithEmailAndPassword(email,password).then((user)=>{
                this.setState({
                    user:user.user.email
                },()=>{
                  console.log(this.state.user)
                  this.props.navigation.navigate("Student");
                })
            }).catch((error)=>{
                Alert.alert(error.message);
                console.log(error.message)
            })
        }
        

    }

    signIn = async () => {
        try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          this.setState({ userInfo: userInfo, loggedIn: true });
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
    
    

    render(){
        return(
            <Container>
            <Content>
                <Text>studant</Text>
                <InputGroup borderType='rounded' >
                    <Icon name='ios-home' style={{color:'#384850'}}/>
                    <Input placeholder='Email' onChangeText = {(email)=>{this.setState({email:email})}}/>
                </InputGroup>
                <InputGroup borderType='rounded' >
                    <Icon name='ios-home' style={{color:'#384850'}}/>
                    <Input secureTextEntry={true} placeholder="Password" onChangeText = {(password)=>{this.setState({password:password})}}/>
                </InputGroup>
                <Button title="Login" style={{color:'green'}} color="green" onPress={()=>{this.login()}}/>
                <GoogleSigninButton
                  style={{ width: 192, height: 48 }}
                  size={GoogleSigninButton.Size.Wide}
                  color={GoogleSigninButton.Color.Dark}
                  onPress={this.signIn}
                 />
            </Content>
        </Container>
        
        )

    }
  }