import React,{Component} from 'react'
import {
SafeAreaView,
StyleSheet,
Image,
View,
Text,
Alert,
Button,
TouchableHighlight,
TextInput
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
  import auth from '@react-native-firebase/auth';
  import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin';
  

  export default class Login extends Component{
    constructor(){
        super();
        this.state = {
            email:'',
            user:'',
            googleEmail:'',
            password:'',
            loggedIn: false,
            userInfo:'',
            ID:''
        }
    }

    componentDidMount(){
      /*
        GoogleSignin.configure({
            scopes: ['https://www.googleapis.com/auth/drive.readonly'],
            webClientId: '200641316322-5n2hgjl773t0sr5pis0mvtguc57t3nkl.apps.googleusercontent.com',
            offlineAccess: true, 
            hostedDomain: '', 
            forceConsentPrompt: true, 
            accountName: '',
          });
          */
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
                  
                  this.props.navigation.navigate("Teacher");
                  
                })
            }).catch((error)=>{
                Alert.alert(error.message);
                console.log(error.message)
            })
        }
        

    }
  /*
    signIn = async () => {
        try {
          console.log("trying")
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          this.setState({ userInfo: userInfo, loggedIn: true, googleEmail:userInfo.user.email},()=>{
            let googleEmail = this.state.googleEmail;
            console.log("user signed in " + googleEmail);
            googleEmail = googleEmail.split("@");
            if(googleEmail[0].includes(".")){
            googleEmail[0] = googleEmail[0].replace(/[.]/g,"+") 
            console.log("ID " + googleEmail[0])
            this.setState({ID:googleEmail[0]});
          }
            else{
              this.setState({ID:googleEmail[0]}); console.log("ID " + googleEmail[0]);
            }
          });
          this.props.navigation.navigate('Teacher');
        } catch (error) {
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
            console.log(error.code);
          } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (f.e. sign in) is in progress already
            console.log(error.code);
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
            console.log(error.code);
          } else {
            // some other error happened
            console.log(error);
          }
        }
      };
      */
    
    

    render(){
        return(
          <View style = { styles.MainContainer }>
          <View style = { styles.Login_box }>
            <View style = { styles.FormBox }>
            <View style={ styles.image }>
              <Image source={ require('../src/images/Final_logo.png') } style={ styles.Final_logo }/>
              </View>
            <Text style={styles.TextStyle2}>Faculty Login</Text>
              <TextInput textContentType='emailAddress' placeholderTextColor="#fff" placeholder="E-mail"  style = { styles.textInput_Style } onChangeText = {(email)=>{this.setState({email:email})}}/>
              <TextInput textContentType='password' secureTextEntry={true} placeholderTextColor="#fff" placeholder="Password" style = { styles.textInput_Style } onChangeText = {(password)=>{this.setState({password:password})}}/>
            <TouchableHighlight style={styles.SubmitButtonStyle} activeOpacity = { 0.5 } onPress={()=>{this.login()}} >
            <LinearGradient colors={['#36D6BD','#007E7B']} start={{ x:0, y:1}} style={ styles.Linear_G }>	
              <Text style={styles.TextStyle}> LOGIN </Text>
            </LinearGradient>
            </TouchableHighlight>
            </View>
          </View>
        </View>
        
        )

    }
  }

  const styles = StyleSheet.create(
		{
			MainContainer:
			{
				flex: 1,
				justifyContent: 'space-around',
				alignItems: 'center',
				backgroundColor: '#102138'
			},
			
			Login_box:
			{
				position: 'relative',
				marginTop: -110,
				flex: 1,
				justifyContent: 'space-around',
				alignItems: 'center'
			},
			
			FormBox:
			{
				flex: 0,
				justifyContent: 'space-evenly'
			},
			
			textInput_Style:
			{
				borderWidth: 0,
				borderBottomColor: '#fff',
				borderBottomWidth: 2,
				fontSize: 25,
				color: '#fff',
				width: 300,
				textAlign: 'justify',
				fontFamily: 'Roboto-Thin', 
				paddingBottom: 0,
				marginTop: 10
			},	
			
			SubmitButtonStyle: {
				
				marginTop: 75,
				padding: 0,
				backgroundColor: '#36D6BD',
				borderRadius: 10,
				borderWidth: 0,
				width: 300
			},
			
			TextStyle:{
				color:'#fff',
				textAlign:'center',
				fontSize: 32,
				fontWeight: '100',
				fontFamily: 'Roboto-Light'
				
			},

			TextStyle2:{
				color:'#fff',
				textAlign:'center',
				fontSize: 32,
				fontWeight: '100',
				fontFamily: 'Roboto-Light'
				
			},

			Linear_G:
			{
				flex: 0,
				borderRadius: 10,
			},

			Final_logo:
			{
				height: 250,
				width: 250,
			},

			image:
			{
				alignItems: 'center',
				justifyContent: 'center',
				marginLeft: 40,
			}
		});
/*
  async function onGoogleButtonPress() {
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}
*/
