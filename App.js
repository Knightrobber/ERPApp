/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
//swichNavigator///////
import 'react-native-gesture-handler';
import React,{Component} from 'react';
import db from '@react-native-firebase/database'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Container, Header, Content, Input, Item,Button } from 'native-base';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from './Login/Login.js';
import SignUp from './Login/SignUp.js'
import FindFreeSlots from './TeacherTabs/FindFreeSlots.js';
//import TeacherTimeTable from './TeacherTabs/TeacherTimeTable.js';
import LoginStudent from './Login/LoginStudent.js';
import AddCourses from './StudentTabs/AddCourses.js';
import MarkAttendance from './StudentTabs/MarkAttendance.js';
import CheckAttendance from './StudentTabs/CheckAttendance.js';
import Experiment from './StudentTabs/Experiment.js';
import CourseList from './StudentTabs/CourseList.js';
import SetHolidays from './TeacherTabs/SetHolidays.js';
import TeacherTimeTable from './TeacherTabs/TeacherTimeTable.js'

const Stack = createStackNavigator();
const Tabs = createMaterialTopTabNavigator();
const Drawer = createDrawerNavigator();

export default class App extends Component{
  constructor(){
    super();
    this.state= {
      email:'',
      password:''
    }
  }
  
  componentDidMount(){
    
  }
  createHomeStack = () =>{
    return(
    <Stack.Navigator>
      <Stack.Screen name="Auth" children={this.createDrawer} options = {{title:"Auth",headerShown:false}}/>
      <Stack.Screen name="Teacher" children={this.createTabs} options = {{headerShown:false}}/>
      <Stack.Screen name="Student" children={this.createStudentTabs} options={{headerShown:false}}/>
    </Stack.Navigator>
    );
  }
  createTabs = ()=>{
    return(
    <Tabs.Navigator tabBarOptions={{style:{backgroundColor:'#36D6BD'}}}>
      <Tabs.Screen name="Free Slots" component={FindFreeSlots}/>
      <Tabs.Screen name="Admin" component={SetHolidays}/>
    </Tabs.Navigator>
    );
  }
  createStudentTabs = () => {
    return(
      <Tabs.Navigator>
        <Tabs.Screen name="AddCourses" component={AddCourses}/>
        <Tabs.Screen name="MarkAttendance" component={MarkAttendance}/>
        <Tabs.Screen name="Experiment" component={Experiment}/>
        <Tabs.Screen name="CourseList" component ={CourseList}/>
      </Tabs.Navigator>
    )
  }
  createDrawer = () => {
    return(
      <Drawer.Navigator>
        <Drawer.Screen name="LoginStudent" component={LoginStudent} options={{title:"Student"}}/>
        <Drawer.Screen name="Login" component={Login} options={{title:"Teacher"}}/>
        
      </Drawer.Navigator>
    )
  }

  render(){
    return(
      <NavigationContainer>
      {this.createHomeStack()}
      </NavigationContainer>
    );
  }
  
}

function login(){
  //let email = this.state.email;
  //let password = this .state.password;
  console.log('Yo! im joe');
}



const styles = StyleSheet.create({
 textbox:{
  marginTop:'3%'
 },
 button:{
   marginTop:'3%', 
 },
 header:{
   backgroundColor:'purple'
 }
});


