import React, {Component, useState} from 'react';
import {
  SafeAreaView,
  TouchableHighlight,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import {Dropdown} from 'react-native-material-dropdown';
import LinearGradient from 'react-native-linear-gradient';
export default class SetHolidays extends Component {
  constructor() {
    super();
    this.state = {
      Id: '',
      dateHoliday: null,
      dateBegin: null,
      dateEndMid: null,
      dateEndEnd: null,
      semDates: null,
      semToReset: 'Select Sem',
      resetDate: '',
      holidays: '',
      holidayDelete: '',
    };
  }
  componentDidMount() {
    auth().onAuthStateChanged(user => {
      if (!user) console.log('error has occured in authstatechanged ');
      if (user) {
        console.log('The is the user ' + user);
        let userName = user.email;
        userName = userName.split('@');
        if (userName[0].includes('.'))
          userName[0] = userName[0].replace(/[.]/g, '+');
        let Id = userName[0];
        this.setState({Id: Id});
      }
    });
    this.displayHolidays();
    this.displaySemDates();
  }

  render() {
    /*
        database().ref("/DatesOfSem").once('value',(snap)=>{
            let dateBegin = new Object();
            dateBegin.label = snap.val().Beginning;
            dateBegin.value = snap.val().Beginning;
            semDates = semDates.concat(dateBegin)
            let dateEndMid = new Object();
            dateEndMid.label = snap.val().MidSem;
            dateEndMid.value = snap.val().MidSem;
            semDates = semDates.concat(dateEndMid);
            let dateEndEnd = new Object();
            dateEndEnd.label = snap.val().EndSem;
            dateEndEnd.value = snap.val().EndSem;
            semDates = semDates.concat(dateEndEnd);
        })
        */
    return (
      <SafeAreaView style={styles.maincontainer}>
        <SafeAreaView style={styles.containerText}>
          <Text style={styles.TextStyle}>Holidays</Text>
        </SafeAreaView>
        <SafeAreaView style={styles.datesContainerTop}>
          <SafeAreaView style={styles.leftContainer}>
            <SafeAreaView style={styles.setholidays}>
              <DatePicker
                style={{backgroundColor: '#fff', borderRadius: 5}}
                borderRadius={10}
                date={this.state.dateHoliday}
                format="YYYY-MM-DD"
                onDateChange={date => {
                  this.setState({dateHoliday: date});
                }}
                mode="date"
                placeholder="select date"
              />
              <TouchableHighlight
                style={styles.SubmitButtonStyle}
                activeOpacity={0.5}
                onPress={() => {
                  this.setHoliday();
                }}>
                <LinearGradient
                  colors={['#36D6BD', '#007E7B']}
                  start={{x: 0, y: 1}}
                  style={styles.Linear_G}>
                  <Text style={styles.TextStyle}>Set Holiday</Text>
                </LinearGradient>
              </TouchableHighlight>
            </SafeAreaView>
            <SafeAreaView style={styles.setholidays}>
              <DatePicker
                style={{backgroundColor: '#fff', borderRadius: 5}}
                date={this.state.holidayDelete}
                format="YYYY-MM-DD"
                onDateChange={date => {
                  this.setState({holidayDelete: date});
                }}
                mode="date"
                placeholder="select date"
              />

              <TouchableHighlight
                style={styles.SubmitButtonStyle}
                activeOpacity={0.5}
                onPress={() => {
                  this.deleteHoliday();
                }}>
                <LinearGradient
                  colors={['#36D6BD', '#007E7B']}
                  start={{x: 0, y: 1}}
                  style={styles.Linear_G}>
                  <Text style={styles.TextStyle}>Delete Holiday</Text>
                </LinearGradient>
              </TouchableHighlight>
            </SafeAreaView>
          </SafeAreaView>
          <SafeAreaView style={styles.rightContainer}>
            <Text style={styles.TextStyle}>Current Holidays</Text>

            <SafeAreaView style={styles.rightTextHolidays}>
              <Text style={styles.TextStyle}>Dates</Text>
              <Text style={{color: 'white'}}>{this.state.holidays}</Text>
            </SafeAreaView>
          </SafeAreaView>
        </SafeAreaView>
        <SafeAreaView style={styles.containerText}>
          <Text style={styles.TextStyle}>Semester Details</Text>
        </SafeAreaView>
        <SafeAreaView style={styles.datesContainerBottom}>
          <SafeAreaView style={styles.leftContainer}>
            <SafeAreaView style={styles.setsem}>
              <Text style={styles.TextStyleSemDates}>Set Beginning</Text>
              <DatePicker
                style={{backgroundColor: '#fff', borderRadius: 5}}
                date={this.state.dateBegin}
                format="YYYY-MM-DD"
                onDateChange={date => {
                  this.setState({dateBegin: date});
                }}
                mode="date"
                placeholder="select date"
              />
            </SafeAreaView>

            <SafeAreaView style={styles.setsem}>
              <Text style={styles.TextStyleSemDates}>Set Midsem</Text>
              <DatePicker
                style={{backgroundColor: '#fff', borderRadius: 5}}
                date={this.state.dateEndMid}
                format="YYYY-MM-DD"
                onDateChange={date => {
                  this.setState({dateEndMid: date});
                }}
                mode="date"
                placeholder="select date"
              />
            </SafeAreaView>

            <SafeAreaView style={styles.setsem}>
              <Text style={styles.TextStyleSemDates}>Set Endsem</Text>
              <DatePicker
                style={{backgroundColor: '#fff', borderRadius: 5}}
                date={this.state.dateEndEnd}
                format="YYYY-MM-DD"
                onDateChange={date => {
                  this.setState({dateEndEnd: date});
                }}
                mode="date"
                placeholder="select date"
              />
            </SafeAreaView>
            <TouchableHighlight
              style={styles.SetButtonStyle}
              activeOpacity={0.5}
              onPress={() => {
                this.setSemDates();
              }}>
              <LinearGradient
                colors={['#36D6BD', '#007E7B']}
                start={{x: 0, y: 1}}
                style={styles.Linear_G}>
                <Text style={styles.TextStyle}>Set Dates</Text>
              </LinearGradient>
            </TouchableHighlight>
          </SafeAreaView>
          <SafeAreaView style={styles.rightContainer}>
            <Text style={styles.TextStyle}>Current Dates</Text>

            <SafeAreaView style={styles.rightTextSem}>
              <Text style={styles.TextStyle}>Dates</Text>
              <Text style={{color: 'white'}}>{this.state.semDates}</Text>
            </SafeAreaView>
          </SafeAreaView>
        </SafeAreaView>

        <SafeAreaView style={styles.logoutcontainer}>
          <TouchableHighlight
            style={styles.LogoutButtonStyle}
            activeOpacity={0.5}
            onPress={() => {
              this.signOut();
            }}>
            <LinearGradient
              colors={['#A23434', '#7E1600']}
              start={{x: 0, y: 2}}
              style={styles.Linear_G}>
              <Text style={styles.LogoutTextStyle}>LOGOUT</Text>
            </LinearGradient>
          </TouchableHighlight>
        </SafeAreaView>
      </SafeAreaView>
    );
  }
  signOut() {
    auth()
      .signOut()
      .then(() => {
        console.log('User signed Out');
        this.props.navigation.navigate('Auth');
      })
      .catch(error => {
        console.log('An error occured while signing out ' + error);
      });
  }

  setHoliday = () => {
    if (this.state.dateHoliday == null) {
      alert('No date set');
      return;
    }
    let holiday = this.state.dateHoliday;
    database()
      .ref('/Holidays')
      .once('value', snap => {
        if (snap.val() == null) {
          console.log('Yes its null');
          database()
            .ref('/Holidays')
            .set({holidays: [holiday]})
            .then(() => {
              console.log('Holiday set');
            });
        } else {
          let holidays = snap.val().holidays;

          let tempMainDate = new Date(holiday);
          let flag = 0;
          for (let i = 0; i < holidays.length; ++i) {
            let tempDate = new Date(holidays[i]);
            console.log(tempDate.getFullYear() + ' ' + tempDate.getMonth());
            if (tempDate.getTime() == tempMainDate.getTime()) flag = 1;
          }
          if (flag == 1) {
            alert('this date is already in the database');
            return;
          }
          console.log('The holiday before concat ' + holiday);
          holidays = holidays.concat(holiday);
          console.log('new holidays ' + holidays);
          database()
            .ref('/Holidays')
            .set({holidays: holidays})
            .then(() => {
              this.displayHolidays();
              alert('Holiday set');
            });
        }
      });
  };

  displayHolidays = () => {
    let holidays;
    let displayHolidays = [];
    let Months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'June',
      'July',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    database()
      .ref('/Holidays')
      .once('value', snap => {
        holidays = snap.val().holidays;
        for (let i = 0; i < holidays.length; ++i) {
          let tempDate = new Date(holidays[i]);
          let tempString =
            tempDate.getDate() + ' ' + Months[tempDate.getMonth()] + ' |  ';
          displayHolidays = displayHolidays.concat(tempString);
        }
        this.setState({holidays: displayHolidays});
      });
  };

  deleteHoliday = () => {
    if (this.state.holidayDelete == '') {
      alert('No date selected to delete');
      return;
    }
    let holidayDelete = this.state.holidayDelete;
    database()
      .ref('/Holidays')
      .once('value', snap => {
        let holidays = snap.val().holidays;

        let tempMainDate = new Date(holidayDelete);
        let flag = 0;
        let index = null;
        for (let i = 0; i < holidays.length; ++i) {
          let tempDate = new Date(holidays[i]);
          console.log(tempDate.getFullYear() + ' ' + tempDate.getMonth());
          if (tempDate.getTime() == tempMainDate.getTime()) {
            flag = 1;
            index = i;
          }
        }
        if (flag == 0) {
          alert('this date is not a holiday');
          return;
        }
        holidays.splice(index, 1);
        console.log(holidays);

        database()
          .ref('/Holidays')
          .set({
            holidays: holidays,
          })
          .then(() => {
            this.displayHolidays();
          });
      });
  };

  setSemDates = () => {
    if (
      this.state.dateBegin == null ||
      this.state.dateEndMid == null ||
      this.state.dateEndEnd == null
    ) {
      alert("One of the dates haven't been entered");
      return;
    }
    let dateBegin = new Date(this.state.dateBegin);
    let dateEndMid = new Date(this.state.dateEndMid);
    let dateEndEnd = new Date(this.state.dateEndEnd);

    if (dateBegin.getTime() > dateEndMid.getTime()) {
      alert("The beginning and end dates haven't been set properly");
      return;
    }
    if (dateEndMid.getTime() > dateEndEnd.getTime()) {
      alert("The end dates haven't been set properly");
      return;
    }

    database()
      .ref('/DatesOfSem')
      .set({
        Beginning: this.state.dateBegin,
        MidSem: this.state.dateEndMid,
        EndSem: this.state.dateEndEnd,
      })
      .then(() => {
        alert('The Semester dates have been set');
        this.displaySemDates();
      });
  };

  displaySemDates = () => {
    database()
      .ref('/DatesOfSem')
      .once('value', snap => {
        if (snap.val() == null) {
          this.setState({semDates: 'No dates have been set yet'});
          return;
        }

        let semDates = snap.val();
        let tempString =
          ' The beginning date ' +
          snap.val().Beginning +
          '\n' +
          ' Last teaching day MIDSEM ' +
          snap.val().MidSem +
          '\n' +
          ' Last teaching day ENDSEM ' +
          snap.val().EndSem;
        this.setState({semDates: tempString});
      });
  };
  /*
resetDates =()=>{
    if(this.state.semToReset =='Select Sem' || this.state.resetDate == null){
        alert("Either the sem to be reset or the reset Date hasn't been selected");
        return;
    }
    let semToReset = this.state.semToReset;
    let resetDate = this.state.resetDate;
    let resetDateTemp = new Date(resetDate);
    if(semToReset == "Beginning"){
        database().ref("DatesOfSem").once('value',(snap)=>{
            if(snap.val()==null){
            alert("No dates for the sem have been set in the database");
            return;
            }
            let tempDate = new Date(snap.val().Beginning);
            if(tempDate.getTime()==resetDateTemp.getTime()){
                alert("This is the same date as before")
                return;
            }
            database().ref("/DatesOfSem").set({
                Beginning:resetDate,
                Midsem:snap.val(),Midsem,
                Endsem:snap.val().Endsem
            })
        })
    }
}
*/
}

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#102138',
  },

  setholidays: {
    flexDirection: 'column',
    justifyContent: 'center',
    //alignItems: 'center',
    width: '100%',
    marginTop: '10%',
    flex: 1,
  },

  leftContainer: {
    //alignItems: 'center',
    width: '50%',
    // marginTop: 50,
    // flex: 1,
  },

  rightContainer: {
    width: '40%',
  },

  setsem: {
    flexDirection: 'column',
    justifyContent: 'center',
    //alignItems: 'center',
    width: '100%',
    height: '25%',
    marginTop: 30,
    flex: 0,
  },

  containerText: {
    flexDirection: 'column',
    justifyContent: 'center',
    //alignItems: 'center',
    marginTop: '4%',
  },

  datesContainerTop: {
    flex: 1,
    marginTop: '2%',
    marginBottom: '2%',
    // height: '4%',
    flexDirection: 'row',
    justifyContent: 'center',
    //alignItems: 'center',
  },

  datesContainerBottom: {
    flex: 1,
    marginTop: '2%',
    marginBottom: '2%',
    // height: '4%',
    flexDirection: 'row',
    justifyContent: 'center',
    //alignItems: 'center',
  },

  logoutcontainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },

  LogoutButtonStyle: {
    position: 'relative',
    flex: 0,
    marginTop: '30%',
    padding: 0,
    backgroundColor: '#36D6BD',
    borderRadius: 10,
    borderWidth: 0,
    width: '30%',
  },

  rightTextHolidays: {
    borderRadius: 10,
    padding: 2,
    borderWidth: 2,
    borderColor: 'white',
    width: '100%',
    // height: 180,
    marginTop: '10%',
  },

  rightTextSem: {
    borderRadius: 10,
    borderWidth: 2,
    padding: 2,
    borderColor: 'white',
    width: '100%',
    // height: 260,
    marginTop: '10%',
  },

  LogoutTextStyle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '100',
    fontFamily: 'Roboto-Light',
  },
  Linear_G: {
    borderRadius: 10,
  },

  SetButtonStyle: {
    marginTop: '15%',
    marginBottom: 0,
    padding: 0,
    marginLeft: 0,
    //  backgroundColor: '#36D6BD',
    borderRadius: 2,
    borderWidth: 0,
    width: '70%',
  },

  SubmitButtonStyle: {
    marginTop: 10,
    marginBottom: 0,
    padding: 0,
    marginLeft: 0,
    //  backgroundColor: '#36D6BD',
    borderRadius: 2,
    borderWidth: 0,
    width: '70%',
  },

  TextStyle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '100',
    fontFamily: 'Roboto-Light',
  },

  TextStyleSemDates: {
    color: '#fff',
    //  textAlign: 'center',
    fontSize: 20,
    fontWeight: '100',
    fontFamily: 'Roboto-Light',
    marginTop: 10,
    marginBottom: 10,
    padding: 0,
    marginLeft: 0,
    //  backgroundColor: '#36D6BD',
  },

  TextStyledate: {
    color: '#fff',
    textAlign: 'left',
    fontSize: 12,
    fontWeight: '100',
    fontFamily: 'Roboto-Light',
    paddingTop: 10,
  },
  textOutputdisplay: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Roboto-Thin',
    paddingBottom: 0,
    borderColor: '#fff',
    borderWidth: 1,
    height: 150,
    width: 300,
  },
});
