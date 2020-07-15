/* eslint-disable no-trailing-spaces */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable radix */
/* eslint-disable no-shadow */
/* eslint-disable eqeqeq */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    TouchableHighlight,
    View,
    Text,
    StatusBar,
    Button
  } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
  
  export default class CourseList extends Component{
    render(){
        return(
            <View style={{backgroundColor: '#102138', flex: 1}}>
            <View style={styles.card1}>
                <View style={{alignItems: 'center'}}>
                <Text style={styles.texthead}>Course List</Text>
                </View>
                <View style={styles.outline}>
                    <Text style={styles.text}>Courses</Text>
                    {/* If you want the displayed text to be next line just change the view style from inline to 
                    outline (line no. 22, 28, 34)and text2 width% to 50% (line no. 74) and card1 height% to 50% (line no. 60)*/}
                    <Text style={styles.text2}>: Sample text</Text>
                </View>
                <View style={styles.outline}>
                    <Text style={styles.text}>Labs</Text>
                     {/* If you want the displayed text to be next line just change the view style from inline to 
                    outline (line no. 22, 28, 34)and text2 width% to 50% (line no. 74) and card1 height% to 50% (line no. 60)*/}
                    <Text style={styles.text2}>: Sample text</Text>
                </View>
                <View style={styles.outline}>
                    <Text style={styles.text}>Tutorials:</Text>
                     {/* If you want the displayed text to be next line just change the view style from inline to 
                    outline (line no. 22, 28, 34)and text2 width% to 50% (line no. 74) and card1 height% to 50% (line no. 60)*/}
                    <Text style={styles.text2}>: Sample text</Text>
                </View>
                <View style={{alignItems: 'center'}}>
                    <TouchableHighlight style={styles.SubmitButtonStyle} activeOpacity = { 0.5 } onPress={()=>{this.submitAttendance()}} >
                        <LinearGradient colors={['#36D6BD','#007E7B']} start={{ x:0, y:1}} style={ styles.Linear_G }>
                            <Text style={styles.TextStyle}>Show Courses</Text>
                        </LinearGradient>
                    </TouchableHighlight>
                </View>
            </View>
            <SafeAreaView style={styles.logoutcontainer}>
        <TouchableHighlight style={styles.LogoutButtonStyle} activeOpacity = { 0.5 } onPress={()=>{this.signOut()}} >
        <LinearGradient colors={['#A23434','#7E1600']} start={{ x:0, y:2}} style={ styles.Linear_G }>
          <Text style={styles.LogoutTextStyle}>LOGOUT</Text>
        </LinearGradient>
        </TouchableHighlight>
        </SafeAreaView>
            </View>
        )
    }
  }

  const styles = StyleSheet.create(
    {       
        card1: {
            borderColor: '#fff',
            borderWidth: 2,
            padding: 10,
            margin: 20,
            height: '50%',
            justifyContent: 'space-evenly',
            borderRadius: 10
          },
        
        text: {
            color: '#fff',
            fontSize: 18,
            fontFamily: 'Roboto-Light',
            width: '60%',
          },

          text2: {
            fontSize: 15,
            width: '50%',
            color: '#fff',
            fontFamily: 'Roboto-Light',
          },        

        texthead: {
            color: '#fff',
            fontSize: 18,
            fontFamily: 'Roboto-Light',
            fontWeight: '200',
            alignItems: "center"
          },


        inline:{
            flexDirection: 'row',
        },

        outline:{
            flexDirection: 'column',
            padding: 20
        },
        
        SubmitButtonStyle: {
            
            borderRadius: 5,
            borderWidth: 0,
            width: 150,
            marginTop: 10,
        },
        
        TextStyle:{
            color:'#fff',
            textAlign:'center',
            fontSize: 20,
            fontWeight: '200',
            fontFamily: 'Roboto-Light'
            
        },
        Linear_G:
        {
            borderRadius: 5,
        },

        LogoutTextStyle:{
            color:'#fff',
            textAlign:'center',
            fontSize: 20,
            fontWeight: '100',
            fontFamily: 'Roboto-Light'
        },      

          LogoutButtonStyle: {
        
            position: 'relative',
            flex: 0,
            padding: 0,
            backgroundColor: '#36D6BD',
            borderRadius: 10,
            borderWidth: 0,
            width: 130
          },

          logoutcontainer:
          {
              alignItems: 'center'
          }
    });
