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
  import auth, { firebase } from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { TextInput } from 'react-native-gesture-handler';
import { Container, Header, Content, Form, Item, Input } from 'native-base';
import { Dropdown } from 'react-native-material-dropdown';
import LinearGradient from 'react-native-linear-gradient';
  
  export default class CourseList extends Component{
    constructor() {
        super();
        this.state = {
            Id: '',
            courseName: '',
            dayOfTheWeek: '',
            freeTimings: '',
            selectedCourse: '',
            courseName1: '',
            labs:[],
            tutes:[],
            courses:[]
        };
      }
    
      componentDidMount() {
        auth().onAuthStateChanged((user) => {
          if (!user) { console.log('error has occured in authstatechanged '); }
          if (user) {
            console.log('The is the user ' + user);
            let userName = user.email;
            userName = userName.split('@');
            if (userName[0].includes('.')) { userName[0] = userName[0].replace(/[.]/g, '+'); }
            let Id = userName[0];
            this.setState({ Id: Id });
          }
        });
      }



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
                    outline (line no. 22, 28, 34)and tex\nT2 width% to 50% (line no. 74) and card1 height% to 50% (line no. 60)*/}
                    <Text style={styles.text2}>{this.state.courses}</Text>
                </View>
                <View style={styles.outline}>
                    <Text style={styles.text}>Labs</Text>
                     {/* If you want the displayed text to be next line just change the view style from inline to 
                    outline (line no. 22, 28, 34)and tex\nT2 width% to 50% (line no. 74) and card1 height% to 50% (line no. 60)*/}
                    <Text style={styles.text2}>{this.state.labs}</Text>
                </View>
                <View style={styles.outline}>
                    <Text style={styles.text}>Tutorials:</Text>
                     {/* If you want the displayed text to be next line just change the view style from inline to 
                    outline (line no. 22, 28, 34)and tex\nT2 width% to 50% (line no. 74) and card1 height% to 50% (line no. 60)*/}
                    <Text style={styles.text2}>{this.state.tutes}</Text>
                </View>
                <View style={{alignItems: 'center'}}>
                    <TouchableHighlight style={styles.SubmitButtonStyle} activeOpacity = { 0.5 } onPress={()=>{this.runfreecourses()}} >
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


    checkCourse = (user) => {
        return new Promise((resolve, reject) => {
          let courselist = [];
          let coursedays = [];
          let m = [], t = [], w = [], th = [], f = []; //busy timings
          let mt = [], tt = [], wt = [], tht = [], ft = []; //free timings
          database().ref('/StudentsLLT/' + user).once('value').then((snapshot) => {
            snapshot.forEach((snapshot) => {
              if (snapshot.val().Monday != null) {
                //console.log(snapshot.val().Monday.Lecture);
                if (snapshot.val().Monday.Lecture != null) { m.push(snapshot.val().Monday.Lecture); }
                if (snapshot.val().Monday.Lab != null) { m.push(snapshot.val().Monday.Lab); }
                if (snapshot.val().Monday.Tute != null) { m.push(snapshot.val().Monday.Tute); }
              }
              if (snapshot.val().Tuesday != null) {
                if (snapshot.val().Tuesday.Lecture != null) { t.push(snapshot.val().Tuesday.Lecture); }
                if (snapshot.val().Tuesday.Lab != null) { t.push(snapshot.val().Tuesday.Lab); }
                if (snapshot.val().Tuesday.Tute != null) { t.push(snapshot.val().Tuesday.Tute); }
              }
              if (snapshot.val().Wednesday != null) {
                if (snapshot.val().Wednesday.Lecture != null) { w.push(snapshot.val().Wednesday.Lecture); }
                if (snapshot.val().Wednesday.Lab != null) { w.push(snapshot.val().Wednesday.Lab); }
                if (snapshot.val().Wednesday.Tute != null) { w.push(snapshot.val().Wednesday.Tute); }
              }
              if (snapshot.val().Thursday != null) {
                if (snapshot.val().Thursday.Lecture != null) { th.push(snapshot.val().Thursday.Lecture); }
                if (snapshot.val().Thursday.Lab != null) { th.push(snapshot.val().Thursday.Lab); }
                if (snapshot.val().Thursday.Tute != null) { th.push(snapshot.val().Thursday.Tute); }
              }
              if (snapshot.val().Friday != null) {
                if (snapshot.val().Friday.Lecture != null) { f.push(snapshot.val().Friday.Lecture); }
                if (snapshot.val().Friday.Lab != null) { f.push(snapshot.val().Friday.Lab); }
                if (snapshot.val().Friday.Tute != null) { f.push(snapshot.val().Friday.Tute); }
              }
              mt = this.findFreeTime(m);
              tt = this.findFreeTime(t);
              wt = this.findFreeTime(w);
              tht = this.findFreeTime(th);
              ft = this.findFreeTime(f);
            });
          }).then(() => {
            database().ref('/CourseList').once('value', (snapshot) => {
              //console.log(snapshot.val());
              snapshot.forEach((snapshot) => {
                //console.log(snapshot.val());
                let mct = [], tct = [], wct = [], thct = [], fct = []; //course time
                let coursedaycount = 0;
                let days = [];
    
                //For each course
                if (snapshot.val().Monday != null) {
                  coursedaycount++;
                  mct.push(snapshot.val().Monday);
                  let flag = this.course_compare(mt, mct);
                  if (flag == 0) {
                    days.push('Monday');
                  }
                }
                if (snapshot.val().Tuesday != null) {
                  coursedaycount++;
                  tct.push(snapshot.val().Tuesday);
                  let flag = this.course_compare(tt, tct);
                  if (flag == 0) {
                    days.push('Tuesday');
    
                  }
                }
                if (snapshot.val().Wednesday != null) {
                  coursedaycount++;
                  wct.push(snapshot.val().Wednesday);
                  let flag = this.course_compare(wt, wct);
                  if (flag == 0) {
                    days.push('Wednesday');
                  }
                }
                if (snapshot.val().Thursday != null) {
                  coursedaycount++;
                  thct.push(snapshot.val().Thursday);
                  let flag = this.course_compare(tht, thct);
                  if (flag == 0) {
                    days.push('Thursday');
                  }
                }
                if (snapshot.val().Friday != null) {
                  coursedaycount++;
                  fct.push(snapshot.val().Friday);
                  let flag = this.course_compare(ft, fct);
                  if (flag == 0) {
                    days.push('Friday');
                  }
                }
                let check1 = 0;//lecture
                let check2 = 0;//lab
                let check3 = 0;//tut
    
                if (days.length == coursedaycount) {
                  //courselist.push(snapshot.key);
                  check1++;
                  //console.log('match');
                  //console.log(snapshot.key);
                  if (check1 > 0) {
                    if (snapshot.val().Labs != null) {
                      var labs = [];
                      labs.push(snapshot.key + ' = ');
                      snapshot.forEach((snap) => { //for each day under child lab
                        if (snap.val().P1 != null) {
                          let lm = [], lt = [], lw = [], lth = [], lf = []; //lab days
                          if (snap.val().P1.Monday != null) {
                            //console.log("check");
                            lm.push(snap.val().P1.Monday);
                            let f = this.course_compare(mt, lm);
                            if (f == 0) {
                              //console.log("P1 - Monday:"+snap.val().P1.Monday);
                              labs.push('\nP1  - Monday: ' + snap.val().P1.Monday);
                            }
                          }
                          if (snap.val().P1.Tuesday != null) {
                            lt.push(snap.val().P1.Tuesday);
                            let f = this.course_compare(tt, lt);
                            if (f == 0) {
                              labs.push('\nP1  - Tuesday: ' + snap.val().P1.Tuesday);
                            }
                          }
                          if (snap.val().P1.Wednesday != null) {
                            lw.push(snap.val().P1.Wednesday);
                            let f = this.course_compare(wt, lw);
                            if (f == 0) {
                              labs.push('\nP1  - Wednesday: ' + snap.val().P1.Wednesday);
                            }
                          }
                          if (snap.val().P1.Thursday != null) {
                            lth.push(snap.val().P1.Thursday);
                            let f = this.course_compare(tht, lth);
                            if (f == 0) {
                              labs.push('\nP1  - Thursday: ' + snap.val().P1.Thursday);
                            }
                          }
                          if (snap.val().P1.Friday != null) {
                            lf.push(snap.val().P1.Friday);
                            let f = this.course_compare(ft, lf);
                            if (f == 0) {
                              labs.push('\nP1  - Friday: ' + snap.val().P1.Friday);
                            }
                          }
    
    
                        }
    
                        if (snap.val().P2 != null) {
                          let lm = [], lt = [], lw = [], lth = [], lf = []; //lab days
                          if (snap.val().P2.Monday != null) {
                            lm.push(snap.val().P2.Monday);
                            let f = this.course_compare(mt, lm);
                            if (f == 0) {
                              labs.push('\nP2  - Monday: ' + snap.val().P2.Monday);
                            }
                          }
                          if (snap.val().P2.Tuesday != null) {
                            lt.push(snap.val().P2.Tuesday);
                            let f = this.course_compare(tt, lt);
                            if (f == 0) {
                              labs.push('\nP2  - Tuesday: ' + snap.val().P2.Tuesday);
                            }
                          }
                          if (snap.val().P2.Wednesday != null) {
                            lw.push(snap.val().P2.Wednesday);
                            let f = this.course_compare(wt, lw);
                            if (f == 0) {
                              labs.push('\nP2  - Wednesday: ' + snap.val().P2.Wednesday);
                            }
                          }
                          if (snap.val().P2.Thursday != null) {
                            lth.push(snap.val().P2.Thursday);
                            let f = this.course_compare(tht, lth);
                            if (f == 0) {
                              labs.push('\nP2  - Thursday: ' + snap.val().P2.Thursday);
                            }
                          }
                          if (snap.val().P2.Friday != null) {
                            lf.push(snap.val().P2.Friday);
                            let f = this.course_compare(ft, lf);
                            if (f == 0) {
                              labs.push('\nP2  - Friday: ' + snap.val().P2.Friday);
                            }
                          }
    
                        }
    
                        if (snap.val().P3 != null) {
                          let lm = [], lt = [], lw = [], lth = [], lf = []; //lab days
                          if (snap.val().P3.Monday != null) {
                            lm.push(snap.val().P3.Monday);
                            let f = this.course_compare(mt, lm);
                            if (f == 0) {
                              labs.push('\nP3  - Monday: ' + snap.val().P3.Monday);
                            }
                          }
                          if (snap.val().P3.Tuesday != null) {
                            lt.push(snap.val().P3.Tuesday);
                            let f = this.course_compare(tt, lt);
                            if (f == 0) {
                              labs.push('\nP3  - Tuesday: ' + snap.val().P3.Tuesday);
                            }
                          }
                          if (snap.val().P3.Wednesday != null) {
                            lw.push(snap.val().P3.Wednesday);
                            f = this.course_compare(wt, lw);
                            if (f == 0) {
                              labs.push('\nP3  - Wednesday: ' + snap.val().P3.Wednesday);
                            }
                          }
                          if (snap.val().P3.Thursday != null) {
                            lth.push(snap.val().P3.Thursday);
                            let f = this.course_compare(tht, lth);
                            if (f == 0) {
                              labs.push('\nP3  - Thursday: ' + snap.val().P3.Thursday);
                            }
                          }
                          if (snap.val().P3.Friday != null) {
                            lf.push(snap.val().P3.Friday);
                            let f = this.course_compare(ft, lf);
                            if (f == 0) {
                              labs.push('\nP3  - Friday: ' + snap.val().P3.Friday);
                            }
                          }
    
                        }
                        if (snap.val().P4 != null) {
                          let lm = [], lt = [], lw = [], lth = [], lf = []; //lab days
                          if (snap.val().P4.Monday != null) {
                            lm.push(snap.val().P4.Monday);
                            let f = this.course_compare(mt, lm);
                            if (f == 0) {
                              labs.push('\nP4  - Monday: ' + snap.val().P4.Monday);
                            }
                          }
                          if (snap.val().P4.Tuesday != null) {
                            lt.push(snap.val().P4.Tuesday);
                            let f = this.course_compare(tt, lt);
                            if (f == 0) {
                              labs.push('\nP4  - Tuesday: ' + snap.val().P4.Tuesday);
                            }
                          }
                          if (snap.val().P4.Wednesday != null) {
                            lw.push(snap.val().P4.Wednesday);
                            let f = this.course_compare(wt, lw);
                            if (f == 0) {
                              labs.push('\nP4  - Wednesday: ' + snap.val().P4.Wednesday);
                            }
                          }
                          if (snap.val().P4.Thursday != null) {
                            lth.push(snap.val().P4.Thursday);
                            let f = this.course_compare(tht, lth);
                            if (f == 0) {
                              labs.push('\nP4  - Thursday: ' + snap.val().P4.Thursday);
                            }
                          }
                          if (snap.val().P4.Friday != null) {
                            lf.push(snap.val().P4.Friday);
                            let f = this.course_compare(ft, lf);
                            if (f == 0) {
                              labs.push('\nP4  - Friday: ' + snap.val().P4.Friday);
                            }
                          }
    
                        }
                        if (snap.val().P5 != null) {
                          let lm = [], lt = [], lw = [], lth = [], lf = []; //lab days
                          if (snap.val().P5.Monday != null) {
                            lm.push(snap.val().P5.Monday);
                            let f = this.course_compare(mt, lm);
                            if (f == 0) {
                              labs.push('\nP5  - Monday: ' + snap.val().P5.Monday);
                            }
                          }
                          if (snap.val().P5.Tuesday != null) {
                            lt.push(snap.val().P5.Tuesday);
                            let f = this.course_compare(tt, lt);
                            if (f == 0) {
                              labs.push('\nP5  - Tuesday: ' + snap.val().P5.Tuesday);
                            }
                          }
                          if (snap.val().P5.Wednesday != null) {
                            lw.push(snap.val().P5.Wednesday);
                            let f = this.course_compare(wt, lw);
                            if (f == 0) {
                              labs.push('\nP5  - Wednesday: ' + snap.val().P5.Wednesday);
                            }
                          }
                          if (snap.val().P5.Thursday != null) {
                            lth.push(snap.val().P5.Thursday);
                            let f = this.course_compare(tht, lth);
                            if (f == 0) {
                              labs.push('\nP5  - Thursday: ' + snap.val().P5.Thursday);
                            }
                          }
                          if (snap.val().P5.Friday != null) {
                            lf.push(snap.val().P5.Friday);
                            let f = this.course_compare(ft, lf);
                            if (f == 0) {
                              labs.push('\nP5  - Friday: ' + snap.val().P5.Friday);
                            }
                          }
    
                        }
                      });
                      if (Array.isArray(labs) && labs.length > 1) {
                        check2++;
                        //console.log(labs);
                      }
    
                    }
                    else { check2++; }
                    if (snapshot.val().Tuts != null) { //TUTS
                      var tuts = [];
                      //console.log("tut check");
                      tuts.push(snapshot.key + ' = ');
                      snapshot.forEach((snap) => { //for each day under child tuts
                        if (snap.val().T1 != null) {
                          let lm = [], lt = [], lw = [], lth = [], lf = []; //tut days
                          if (snap.val().T1.Monday != null) {
                            lm.push(snap.val().T1.Monday);
                            let f = this.course_compare(mt, lm);
                            if (f == 0) {
                              tuts.push('\nT1 - Monday: ' + snap.val().T1.Monday);
                            }
                          }
                          if (snap.val().T1.Tuesday != null) {
                            lt.push(snap.val().T1.Tuesday);
                            let f = this.course_compare(tt, lt);
                            if (f == 0) {
                              tuts.push('\nT1 - Tuesday: ' + snap.val().T1.Tuesday);
                            }
                          }
                          if (snap.val().T1.Wednesday != null) {
                            lw.push(snap.val().T1.Wednesday);
                            let f = this.course_compare(wt, lw);
                            if (f == 0) {
                              tuts.push('\nT1 - Wednesday: ' + snap.val().T1.Wednesday);
                            }
                          }
                          if (snap.val().T1.Thursday != null) {
                            lth.push(snap.val().T1.Thursday);
                            let f = this.course_compare(tht, lth);
                            if (f == 0) {
                              tuts.push('\nT1 - Thursday: ' + snap.val().T1.Thursday);
                            }
                          }
                          if (snap.val().T1.Friday != null) {
                            lf.push(snap.val().T1.Friday);
                            let f = this.course_compare(ft, lf);
                            if (f == 0) {
                              tuts.push('\nT1 - Friday: ' + snap.val().T1.Friday);
                            }
                          }
    
    
                        }
    
                        if (snap.val().T2 != null) {
                          let lm = [], lt = [], lw = [], lth = [], lf = []; //lab days
                          if (snap.val().T2.Monday != null) {
                            lm.push(snap.val().T2.Monday);
                            let f = this.course_compare(mt, lm);
                            if (f == 0) {
                              tuts.push('\nT2 - Monday: ' + snap.val().T2.Monday);
                            }
                          }
                          if (snap.val().T2.Tuesday != null) {
                            lt.push(snap.val().T2.Tuesday);
                            let f = this.course_compare(tt, lt);
                            if (f == 0) {
                              tuts.push('\nT2 - Tuesday: ' + snap.val().T2.Tuesday);
                            }
                          }
                          if (snap.val().T2.Wednesday != null) {
                            lw.push(snap.val().T2.Wednesday);
                            let f = this.course_compare(wt, lw);
                            if (f == 0) {
                              tuts.push('\nT2 - Wednesday: ' + snap.val().T2.Wednesday);
                            }
                          }
                          if (snap.val().T2.Thursday != null) {
                            lth.push(snap.val().T2.Thursday);
                            let f = this.course_compare(tht, lth);
                            if (f == 0) {
                              tuts.push('\nT2 - Thursday: ' + snap.val().T2.Thursday);
                            }
                          }
                          if (snap.val().T2.Friday != null) {
                            lf.push(snap.val().T2.Friday);
                            let f = this.course_compare(ft, lf);
                            if (f == 0) {
                              tuts.push('\nT2 - Friday: ' + snap.val().T2.Friday);
                            }
                          }
    
                        }
    
                        if (snap.val().T3 != null) {
                          let lm = [], lt = [], lw = [], lth = [], lf = []; //lab days
                          if (snap.val().T3.Monday != null) {
                            lm.push(snap.val().T3.Monday);
                            let f = this.course_compare(mt, lm);
                            if (f == 0) {
                              tuts.push('\nT3 - Monday: ' + snap.val().T3.Monday);
                            }
                          }
                          if (snap.val().T3.Tuesday != null) {
                            lt.push(snap.val().T3.Tuesday);
                            let f = this.course_compare(tt, lt);
                            if (f == 0) {
                              tuts.push('\nT3 - Tuesday: ' + snap.val().T3.Tuesday);
                            }
                          }
                          if (snap.val().T3.Wednesday != null) {
                            lw.push(snap.val().T3.Wednesday);
                            let f = this.course_compare(wt, lw);
                            if (f == 0) {
                              tuts.push('\nT3 - Wednesday: ' + snap.val().T3.Wednesday);
                            }
                          }
                          if (snap.val().T3.Thursday != null) {
                            lth.push(snap.val().T3.Thursday);
                            let f = this.course_compare(tht, lth);
                            if (f == 0) {
                              tuts.push('\nT3 - Thursday: ' + snap.val().T3.Thursday);
                            }
                          }
                          if (snap.val().T3.Friday != null) {
                            lf.push(snap.val().T3.Friday);
                            let f = this.course_compare(ft, lf);
                            if (f == 0) {
                              tuts.push('\nT3 - Friday: ' + snap.val().T3.Friday);
                            }
                          }
    
                        }
                        if (snap.val().T4 != null) {
                          let lm = [], lt = [], lw = [], lth = [], lf = []; //lab days
                          if (snap.val().T4.Monday != null) {
                            lm.push(snap.val().T4.Monday);
                            let f = this.course_compare(mt, lm);
                            if (f == 0) {
                              tuts.push('\nT4  - Monday: ' + snap.val().T4.Monday);
                            }
                          }
                          if (snap.val().T4.Tuesday != null) {
                            lt.push(snap.val().T4.Tuesday);
                            let f = this.course_compare(tt, lt);
                            if (f == 0) {
                              tuts.push('\nT4  - Tuesday: ' + snap.val().T4.Tuesday);
                            }
                          }
                          if (snap.val().T4.Wednesday != null) {
                            lw.push(snap.val().T4.Wednesday);
                            let f = this.course_compare(wt, lw);
                            if (f == 0) {
                              tuts.push('\nT4  - Wednesday: ' + snap.val().T4.Wednesday);
                            }
                          }
                          if (snap.val().T4.Thursday != null) {
                            lth.push(snap.val().T4.Thursday);
                            let f = this.course_compare(tht, lth);
                            if (f == 0) {
                              tuts.push('\nT4  - Thursday: ' + snap.val().T4.Thursday);
                            }
                          }
                          if (snap.val().T4.Friday != null) {
                            lf.push(snap.val().T4.Friday);
                            let f = this.course_compare(ft, lf);
                            if (f == 0) {
                              tuts.push('\nT4  - Friday: ' + snap.val().T4.Friday);
                            }
                          }
    
                        }
                        if (snap.val().T5 != null) {
                          let lm = [], lt = [], lw = [], lth = [], lf = []; //lab days
                          if (snap.val().T5.Monday != null) {
                            lm.push(snap.val().T5.Monday);
                            let f = this.course_compare(mt, lm);
                            if (f == 0) {
                              tuts.push('\nT5  - Monday: ' + snap.val().T5.Monday);
                            }
                          }
                          if (snap.val().T5.Tuesday != null) {
                            lt.push(snap.val().T5.Tuesday);
                            let f = this.course_compare(tt, lt);
                            if (f == 0) {
                              tuts.push('\nT5  - Tuesday: ' + snap.val().T5.Tuesday);
                            }
                          }
                          if (snap.val().T5.Wednesday != null) {
                            lw.push(snap.val().T5.Wednesday);
                            let f = this.course_compare(wt, lw);
                            if (f == 0) {
                              tuts.push('\nT5  - Wednesday: ' + snap.val().T5.Wednesday);
                            }
                          }
                          if (snap.val().T5.Thursday != null) {
                            lth.push(snap.val().T5.Thursday);
                            let f = this.course_compare(tht, lth);
                            if (f == 0) {
                              tuts.push('\nT5  - Thursday: ' + snap.val().T5.Thursday);
                            }
                          }
                          if (snap.val().T5.Friday != null) {
                            lf.push(snap.val().T5.Friday);
                            let f = this.course_compare(ft, lf);
                            if (f == 0) {
                              tuts.push('\nT5  - Friday: ' + snap.val().T5.Friday);
                            }
                          }
    
                        }
    
                      });
                      if (Array.isArray(tuts) && tuts.length > 1) {
                        check3++;
                        //console.log(tuts);
    
                      }
    
    
                    } //tut close
                    else { check3++; }
    
                  }
    
                  if (check1 > 0 && check2 > 0 && check3 > 0) {
                    courselist.push(snapshot.key + " ,");
                    if (Array.isArray(labs) && labs.length > 1) {
                      console.log(labs + "labs");
                      labs.push("\n")
                      let labsState = this.state.labs;
                      labsState.push(labs);
                      this.setState({labs:labsState});
                      //document.getElementById('labs').value = labs;
                    }
                    if (Array.isArray(tuts) && tuts.length > 1) {
                      console.log(tuts + "tutes");
                      let tutesState = this.state.tutes;
                      tuts.push("\n")
                      tutesState.push(tuts);
                      this.setState({tutes:tutesState});
                      //document.getElementById('tut').value = tuts;
                    }
                  }
    
                }
    
              });
            }).then(() => {
              //console.log(courselist);
              if (courselist.length > 0) {
                console.log(courselist);
                this.setState({courses:courselist});
                //document.getElementById("coursesss").value = courselist;
              }
              else {
                console.log('No courses found for current timetable');
                return;
              }
            });
          });
        });
    
      };


      runfreecourses = () => {
        let promise2 = this.checkCourse(this.state.Id);
      };
    
    
      findFreeTime = (timings) => {
        //let TotalSlots = 20;
        let FreeTimings = [];
    
        let BusyTimings = this.BreakTimingsNew(timings); // breaks all the timings of the user into 1/2 hour slots
        //console.log( 'Busy timings:' + BusyTimings.length,);
        let start = '8:00';
        let end = '8:30';
        for (let i = 0; i <= 20; ++i) {
          // 20 strings of the form "8:00-8:30", "8:30-9:00" are compared with all the 1/2 hour slots of the user
          let tempSlotString = start + '-' + end; // form a string to compare
          let busyTimingsCount = 0;
          for (let j = 0; j < BusyTimings.length; ++j) {
            if (tempSlotString != BusyTimings[j]) { ++busyTimingsCount; }
            else { break; }
          }
          if (busyTimingsCount == BusyTimings.length) {
            // if the 1/2 hour slot doesn't match wiht any of users slots its pushed into a freetime array
            FreeTimings.push(tempSlotString);
          }
    
          start = this.newTime(start); // increments start time for looping
    
          end = this.newTime(end); // increments end time for looping
        }
    
        return FreeTimings;
      };
    
      BreakTimings = (classTimings) => {
        //let noOfClasses = classTimings.length;
        let brokenTimings = [];
        //console.log(classTimings);
        if (classTimings != []) {
          for (let i = 0; i < classTimings.length; ++i) {
            if (classTimings[i].length == 1) {
              let time = classTimings[i][0].split('-');
              let start = time[0];
              let end = time[1];
              while (start != end) {
                let prevStart = start;
                let tempSplit = start.split(':');
                if (tempSplit[1] == '00') {
                  tempSplit[1] = '30';
                  start = tempSplit[0] + ':' + tempSplit[1];
                  let tempString = prevStart + '-' + start;
                  brokenTimings.push(tempString);
                } else if (tempSplit[1] == '30') {
                  tempSplit[1] = '00';
                  tempSplit[0] = (parseInt(tempSplit[0]) + 1).toString();
                  start = tempSplit[0] + ':' + tempSplit[1];
                  let tempString = prevStart + '-' + start;
                  brokenTimings.push(tempString);
                }
              }
            } else if (classTimings[i].length > 1) {
              for (let j = 0; j < classTimings[i].length; ++j) {
                let time = classTimings[i][j].split('-');
                let start = time[0];
                let end = time[1];
                while (start != end) {
                  let prevStart = start;
                  let tempSplit = start.split(':');
                  if (tempSplit[1] == '00') {
                    tempSplit[1] = '30';
                    start = tempSplit[0] + ':' + tempSplit[1];
                    let tempString = prevStart + '-' + start;
                    brokenTimings.push(tempString);
                  } else if (tempSplit[1] == '30') {
                    tempSplit[1] = '00';
                    tempSplit[0] = (parseInt(tempSplit[0]) + 1).toString();
                    start = tempSplit[0] + ':' + tempSplit[1];
                    let tempString = prevStart + '-' + start;
                    brokenTimings.push(tempString);
                  }
                }
              }
            }
          }
        }
        return brokenTimings;
      };
    
      BreakTimingsNew = (classTimings) => {
        // can be used when array is like ["15:30-17:00","16:00-17:00"]
        // breaktimings is used when array is like [["15:00-17:00"],["15:00-17:00","15:00-17:00"]]
        let noOfClasses = classTimings.length;
        let brokenTimings = [];
        for (let i = 0; i < noOfClasses; ++i) {
          let time = classTimings[i].split('-');
          let start = time[0];
          let end = time[1];
          while (start != end) {
            let prevStart = start;
            let tempSplit = start.split(':');
            if (tempSplit[1] == '00') {
              tempSplit[1] = '30';
              start = tempSplit[0] + ':' + tempSplit[1];
              let tempString = prevStart + '-' + start;
              brokenTimings.push(tempString);
            }
            else if (tempSplit[1] == '30') {
              tempSplit[1] = '00';
              tempSplit[0] = (parseInt(tempSplit[0]) + 1).toString();
              start = tempSplit[0] + ':' + tempSplit[1];
              let tempString = prevStart + '-' + start;
              brokenTimings.push(tempString);
            }
          }
        }
        return brokenTimings;
      }
    
      newTime = (time) => {
        let tempSplit = time.split(':');
        if (tempSplit[1] == '00') {
          tempSplit[1] = '30';
          let timeNew = tempSplit[0] + ':' + tempSplit[1];
          return timeNew;
        } else if (tempSplit[1] == '30') {
          tempSplit[1] = '00';
          tempSplit[0] = (parseInt(tempSplit[0]) + 1).toString();
          let timeNew = tempSplit[0] + ':' + tempSplit[1];
          return timeNew;
        }
        return;
      };
    
      course_compare = (freetime, coursetime) => {
        if (coursetime.filter(Array.isArray).length > 0) {
          var brokencoursetime = this.BreakTimings(coursetime);
        }
        else {
          var brokencoursetime = this.BreakTimingsNew(coursetime);
        }
        let flag = 0; // count intervals and check if it matches with course timings
        for (let i = 0; i < freetime.length; i++) {
          for (let j = 0; j < brokencoursetime.length; j++) {
            if (freetime[i] == brokencoursetime[j]) {
              flag++;
            }
          }
        }
        if (flag == brokencoursetime.length) { var flag1 = 0; } // can take course
        else { var flag1 = 1; } // can't take course
        return flag1;
      }



    signOut() {
        auth()
          .signOut()
          .then(() => {
            console.log('User signed Out');
            this.props.navigation.navigate('LoginStudent');
          })
          .catch((error) => {
            console.log('An error occured while signing out ' + error);
          });
      }
  }





  
  const styles = StyleSheet.create(
    {       
        card1: {
            borderColor: '#fff',
            borderWidth: 2,
            padding: 10,
            margin: 20,
            
            justifyContent: 'space-evenly',
            borderRadius: 10
          },
        
        text: {
            color: '#fff',
            fontSize: 18,
            fontFamily: 'Roboto-Light',
            
          },

          text2: {
            fontSize: 15,
         
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
