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
  //import Moment from 'react-moment';
  import moment from "moment";
  import database from '@react-native-firebase/database';
  import auth from '@react-native-firebase/auth';
  import DatePicker from 'react-native-datepicker';
  import {Dropdown} from 'react-native-material-dropdown';
  import CheckBox from '@react-native-community/checkbox';
  
  export default class Experiment extends Component{
    constructor(){
        super();
        this.state ={
            date:null,
            Id:'',
            courseName:'',
            missableLectures:0,missableLabs:0,missableTutes:0,
            missableRunning:'',submitAttendanceRunning:'',
            missedLecture:false,missedLab:false,missedTute:false,
            condonedLecture:false,condonedLab:false,condonedTute:false,
            noClassLecture:false,noClassLab:false,noClassTute:false,
            extraClassLecture:false,extraClassLab:false,extraClassTute:false,
            doYouHaveAHoliday:false,
            advanced:0
        }
    }
    componentDidMount(){
        auth().onAuthStateChanged((user)=>{
          if(!user)
          console.log("error has occured in authstatechanged ");
          if(user){
          console.log("The is the user " + user);
              let userName = user.email;
              userName = userName.split("@")
              if(userName[0].includes('.'))
              userName[0] = userName[0].replace(/[.]/g,"+");
              let Id = userName[0];
              console.log(Id);
              this.setState({Id:Id})

          }
      })
      }
    render(){

        let myCourses=[];
        database().ref("/Courses/" + this.state.Id).once('value',(snap)=>{
            let courses = snap.val().courses;
            for(let i=0;i<courses.length;++i){
                let obj = new Object();
                obj.label = courses[i];
                obj.value = courses[i];
                myCourses.push(obj);
            }

        })

        return(
            <View>
                <View>
                <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'baseline'}}>
                    <Text>Choose Course</Text>
                    <Dropdown data={myCourses} onChangeText={(courseName)=>{this.setState({courseName:courseName})}} containerStyle={{width:120}}/>
                </View>
                <View style={{flexDirection:'column',justifyContent:'space-around'}}>
                    <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                        <Text>Current Attendance </Text>
                        <Text>100</Text>
                    </View>

                    <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                        <Text>End Attendance </Text>
                        <Text>100</Text>
                    </View>
                </View>
                <Text>MissableClasses</Text>
                <View style={{flexDirection:'column',justifyContent:'space-around'}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between',width:'30%'}}>
                    <Text>Lectures</Text>
                    <Text>{this.state.missableLectures}</Text>
                    <Button title="trade" />
                    </View>

                    <View style={{flexDirection:'row',justifyContent:'space-around',width:'30%'}}>
                    <Text>Labs</Text>
                    <Text>{this.state.missableLabs}</Text>
                    <Button title="trade"/>
                    </View>

                    <View style={{flexDirection:'row',justifyContent:'space-around',width:'30%'}}>
                    <Text>Tutes</Text>
                    <Text>{this.state.missableTutes}</Text>
                    <Button title="trade"/>
                    </View>
                </View>
                
               <View>
                   <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                       <Text>(advanced manipulations below)</Text>
                       <Button title="Advanced" onPress={()=>{this.toggleAdvanced()}}/>
                   </View>
                   {this.showAdvanced()}
               </View>
            


               

            </View>
            </View>
        )
    }

    showAdvanced = () =>{
        if(this.state.advanced)
        return(
            <View>
                <Text>Check Missable Classes</Text>
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'baseline'}}>
                    <Text> Choose Category</Text>
                    <Text>Category dropdown hereß</Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                    <View>
                       <View style={{flexDirection:'row'}}>
                       <CheckBox
                         disabled={false}
                         value={this.state.missedLecture}
                         onValueChange={(value)=>{this.setState({missedLecture:value});}}
                       />
                       <Text>Lecture </Text>
                       </View>
                       <View style={{flexDirection:'column',justifyContent:'space-around'}}>
                           <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                           <Text> M </Text>
                           <Text> 10</Text>
                           </View>
                           <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                           <Text> C </Text>
                           <Text> 3</Text>
                           </View>
                           <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                           <Text> MnC </Text>
                           <Text> 0 </Text>
                           </View>

                       </View>
                    </View>
                    
                    
                    <View>
                       <View style={{flexDirection:'row'}}>
                       <CheckBox
                         disabled={false}
                         value={this.state.missedLab}
                         onValueChange={(value)=>{this.setState({missedLab:value});}}
                       />
                       <Text>Lab</Text>
                       </View>
                       <View style={{flexDirection:'column',justifyContent:'space-around'}}>
                           <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                           <Text> M </Text>
                           <Text> 10</Text>
                           </View>
                           <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                           <Text> C </Text>
                           <Text> 3</Text>
                           </View>
                           <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                           <Text> MnC </Text>
                           <Text> 0 </Text>
                           </View>

                       </View>
                    </View>


                    <View>
                       <View style={{flexDirection:'row'}}>
                       <CheckBox
                         disabled={false}
                         value={this.state.missedtute}
                         onValueChange={(value)=>{this.setState({missedTute:value});}}
                       />
                       <Text>Tute </Text>
                       </View>
                       <View style={{flexDirection:'column',justifyContent:'space-around'}}>
                           <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                           <Text> M </Text>
                           <Text> 10</Text>
                           </View>
                           <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                           <Text> C </Text>
                           <Text> 3</Text>
                           </View>
                           <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                           <Text> MnC </Text>
                           <Text> 0 </Text>
                           </View>

                       </View>
                    </View>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Button title="undo"/>
                    <Button title="See Missable Classes"/>
                </View>
            </View>
        );

    }

    toggleAdvanced = ()=>{
        this.setState({
            advanced:!this.state.advanced
        })
    }
  }