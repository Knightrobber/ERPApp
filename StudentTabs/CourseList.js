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
  
  export default class CourseList extends Component{
    render(){
        return(
            <View>
                <Text>Check Attendance</Text>
                <Button title="LogOut" onPress={()=>{this.props.navigation.navigate('LoginStudent')}} />
            </View>
        )
    }
  }