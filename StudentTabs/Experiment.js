import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  TouchableHighlight,
} from 'react-native';
//import Moment from 'react-moment';
import moment from 'moment';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import DatePicker from 'react-native-datepicker';
import {Dropdown} from 'react-native-material-dropdown';
import CheckBox from '@react-native-community/checkbox';
import LinearGradient from 'react-native-linear-gradient';

export default class Experiment extends Component {
  constructor() {
    super();
    this.state = {
      date: null,
      Id: '',
      courseName: '',
      missableLectures: 0,
      missableLabs: 0,
      missableTutes: 0,
      missableRunning: '',
      submitAttendanceRunning: '',
      missedLecture: false,
      missedLab: false,
      missedTute: false,
      condonedLecture: false,
      condonedLab: false,
      condonedTute: false,
      noClassLecture: false,
      noClassLab: false,
      noClassTute: false,
      extraClassLecture: false,
      extraClassLab: false,
      extraClassTute: false,
      doYouHaveAHoliday: false,
      advanced: 0,
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
        console.log(Id);
        this.setState({Id: Id});
      }
    });
  }
  render() {
    let myCourses = [];
    database()
      .ref('/Courses/' + this.state.Id)
      .once('value', snap => {
        let courses = snap.val().courses;
        for (let i = 0; i < courses.length; ++i) {
          let obj = new Object();
          obj.label = courses[i];
          obj.value = courses[i];
          myCourses.push(obj);
        }
      });

    return (
      <View>
        <View>
          <View style={styles.card1}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <View style={styles.inline}>
                <Text style={styles.text}>Choose Course</Text>
                <Dropdown
                  data={myCourses}
                  onChangeText={courseName => {
                    this.setState({courseName: courseName});
                  }}
                  containerStyle={{width: '30%'}}
                />
              </View>
              <View>
                <View style={styles.inline}>
                  <Text style={styles.text}>Current Attendance </Text>
                  <Text style={styles.text2}>: 100</Text>
                </View>

                <View style={styles.inline}>
                  <Text style={styles.text}>Final Attendance </Text>
                  <Text style={styles.text2}>: 100</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.card2}>
            <Text style={styles.texthead}>Missable Classes</Text>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <View style={styles.inlineMargin}>
                <Text style={styles.text}>Lectures</Text>
                <Text style={styles.text2}>
                  : {this.state.missableLectures}
                </Text>
                <TouchableHighlight
                  style={styles.TradeButtonStyle}
                  activeOpacity={0.5}
                  onPress={() => {}}>
                  {/* <LinearGradient
                    colors={['#36D6BD', '#007E7B']}
                    start={{x: 0, y: 1}}
                    style={styles.Linear_G}> */}
                  <Text style={styles.SubmitTextStyle}>Trade</Text>
                  {/* </LinearGradient> */}
                </TouchableHighlight>
              </View>

              <View style={styles.inlineMargin}>
                <Text style={styles.text}>Labs</Text>
                <Text style={styles.text2}>: {this.state.missableLabs}</Text>
                <TouchableHighlight
                  style={styles.TradeButtonStyle}
                  activeOpacity={0.5}
                  onPress={() => {}}>
                  {/* <LinearGradient
                    colors={['#36D6BD', '#007E7B']}
                    start={{x: 0, y: 1}}
                    style={styles.Linear_G}> */}
                  <Text style={styles.SubmitTextStyle}>Trade</Text>
                  {/* </LinearGradient> */}
                </TouchableHighlight>
              </View>

              <View style={styles.inlineMargin}>
                <Text style={styles.text}>Tutorials</Text>
                <Text style={styles.text2}>: {this.state.missableTutes}</Text>
                <TouchableHighlight
                  style={styles.TradeButtonStyle}
                  activeOpacity={0.5}
                  onPress={() => {}}>
                  {/* <LinearGradient
                    colors={['#36D6BD', '#007E7B']}
                    start={{x: 0, y: 1}}
                    style={styles.Linear_G}> */}
                  <Text style={styles.SubmitTextStyle}>Trade</Text>
                  {/* </LinearGradient> */}
                </TouchableHighlight>
              </View>
            </View>
            <Text>{this.state.missableRunning}</Text>
          </View>

          {/* <View
            style={{flexDirection: 'column', justifyContent: 'space-around'}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '30%',
              }}>
              <Text>Lectures</Text>
              <Text>{this.state.missableLectures}</Text>
              <Button title="trade" />
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                width: '30%',
              }}>
              <Text>Labs</Text>
              <Text>{this.state.missableLabs}</Text>
              <Button title="trade" />
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                width: '30%',
              }}>
              <Text>Tutes</Text>
              <Text>{this.state.missableTutes}</Text>
              <Button title="trade" />
            </View>
          </View> */}

          <View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <Text>(advanced manipulations below)</Text>
              <Button
                title="Advanced"
                onPress={() => {
                  this.toggleAdvanced();
                }}
              />
            </View>
            {this.showAdvanced()}
          </View>
        </View>
      </View>
    );
  }

  showAdvanced = () => {
    if (this.state.advanced)
      return (
        <View style={styles.card3}>
          <Text style={styles.texthead}>Check Missable Classes</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'baseline',
            }}>
            <Text style={styles.text}> Choose Category</Text>
            <Text style={styles.text}>Category</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <View>
              <View style={{flexDirection: 'row'}}>
                <CheckBox
                  disabled={false}
                  value={this.state.missedLecture}
                  onValueChange={value => {
                    this.setState({missedLecture: value});
                  }}
                  tintColors={{true: 'white', false: 'white'}}
                />
                <Text sstyle={styles.text}>Lecture </Text>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <Text> M </Text>
                  <Text> 10</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <Text> C </Text>
                  <Text> 3</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <Text> MnC </Text>
                  <Text> 0 </Text>
                </View>
              </View>
            </View>

            <View>
              <View style={{flexDirection: 'row'}}>
                <CheckBox
                  disabled={false}
                  value={this.state.missedLab}
                  onValueChange={value => {
                    this.setState({missedLab: value});
                  }}
                  tintColors={{true: 'white', false: 'white'}}
                />
                <Text>Lab</Text>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <Text> M </Text>
                  <Text> 10</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <Text> C </Text>
                  <Text> 3</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <Text> MnC </Text>
                  <Text> 0 </Text>
                </View>
              </View>
            </View>

            <View>
              <View style={{flexDirection: 'row'}}>
                <CheckBox
                  disabled={false}
                  value={this.state.missedtute}
                  onValueChange={value => {
                    this.setState({missedTute: value});
                  }}
                  tintColors={{true: 'white', false: 'white'}}
                />
                <Text>Tute </Text>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <Text> M </Text>
                  <Text> 10</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <Text> C </Text>
                  <Text> 3</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <Text> MnC </Text>
                  <Text> 0 </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Button title="undo" />
            <Button title="See Missable Classes" />
          </View>
        </View>
      );
  };

  toggleAdvanced = () => {
    this.setState({
      advanced: !this.state.advanced,
    });
  };
}

const styles = StyleSheet.create({
  card1: {
    backgroundColor: '#102138',
    alignItems: 'center',
  },

  card2: {
    backgroundColor: '#102138',
    alignItems: 'center',
  },

  card3: {
    backgroundColor: 'blue',
    alignItems: 'center',
  },

  inline: {
    flexDirection: 'row',
  },

  inlineMargin: {
    flexDirection: 'row',
    marginTop: 10,
  },

  texthead: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Roboto-Light',
    alignItems: 'center',
    fontWeight: '200',
  },

  text: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '200',
    fontFamily: 'Roboto-Light',
    width: '60%',
  },

  text2: {
    fontSize: 15,
    width: '20%',
    justifyContent: 'center',
    color: '#fff',
    fontFamily: 'Roboto-Light',
  },

  SubmitButtonStyle: {
    backgroundColor: '#36D6BD',
    borderRadius: 10,
    borderWidth: 0,
    width: 130,
    marginTop: 10,
  },

  TradeButtonStyle: {
    backgroundColor: '#102138',
    borderRadius: 10,
    borderWidth: 2,
    width: 50,
    marginTop: 0,
    borderColor: '#36D6BD',
  },

  TextStyle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '200',
    fontFamily: 'Roboto-Light',
  },
  SubmitTextStyle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '200',
    fontFamily: 'Roboto',
  },
  Linear_G: {
    borderRadius: 10,
  },
});
