import React,{Component} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Button
  } from 'react-native';
  
  export default class SignUp extends Component{
    render(){
        return(
            <View>
                <Text>SignUp</Text>
                <Button title="goTo teacher" onPress={()=>{this.props.navigation.navigate('Teacher')}} />
            </View>
        )
    }
  }