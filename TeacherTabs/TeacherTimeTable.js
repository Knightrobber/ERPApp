import React,{Component} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Button,
    TextInput
  } from 'react-native';
  import {Picker} from '@react-native-community/picker';
  import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import {Dropdown} from 'react-native-material-dropdown';
//import { Container, Header, Content, Picker, Form } from "native-base";

  
  export default class TeacherTimeTable extends Component{
      constructor(){
          super();
          this.state = {
            MonStartLec:'time',MonEndLec:'time',MonStartLab:'time',MonEndLab:'time',MonStartTute:'time',MonEndTute:'time',MonStartExtra1:'time',MonStartExtra2:'time',MonEndExtra1:'time',MonEndExtra2:'time',
            TueStartLec:'time',TueEndLec:'time',TueStartLab:'time',TueEndLab:'time',TueStartTute:'time',TueEndTute:'time',TueStartExtra1:'time',TueStartExtra2:'time',TueEndExtra1:'time',TueEndExtra2:'time',
            WedStartLec:'time',WedEndLec:'time',WedStartLab:'time',WedEndLab:'time',WedStartTute:'time',WedEndTute:'time',WedStartExtra1:'time',WedStartExtra2:'time',WedEndExtra1:'time',WedEndExtra2:'time',
            ThuStartLec:'time',ThuEndLec:'time',ThuStartLab:'time',ThuEndLab:'time',ThuStartTute:'time',ThuEndTute:'time',ThuStartExtra1:'time',ThuStartExtra2:'time',ThuEndExtra1:'time',ThuEndExtra2:'time',
            FriStartLec:'time',FriEndLec:'time',FriStartLab:'time',FriEndLab:'time',FriStartTute:'time',FriEndTute:'time',FriStartExtra1:'time',FriStartExtra2:'time',FriEndExtra1:'time',FriEndExtra2:'time',
            SatStartLec:'time',SatEndLec:'time',SatStartLab:'time',SatEndLab:'time',SatStartTute:'time',SatEndTute:'time',SatStartExtra1:'time',SatStartExtra2:'time',SatEndExtra1:'time',SatEndExtra2:'time',
              Id:'',courseNameForDatabase:''
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
              this.setState({Id:Id})
          }
      })
      }
      
    render(){
      let times = this.setData();
        return(
            <ScrollView>
            <View>
                <Text>TeacherTimeTable</Text>
                <TextInput placeholder="Course Code" onChangeText={(courseName)=>{let courseNameForDatabase = courseName.toUpperCase();this.setState({courseNameForDatabase:courseNameForDatabase})}}/>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                <View style={{flexDirection:'column',alignItems:'center'}}>
              <View style={{flexDirection:'row',alignItems:'center'}}>
              <Dropdown data={times} onChangeText={(chosenTime) => {this.setState({MonStartLec:chosenTime})}} containerStyle={{width:100}} value={this.state.MonStartLec} useNativeDriver={true}/>
              <Dropdown data={times} onChangeText={(chosenTime) => {this.setState({MonEndLec:chosenTime})}} containerStyle={{width:100}} value={this.state.MonEndLec} useNativeDriver={true}/>
              </View>
              
              <View style={{flexDirection:'row',alignItems:'center'}}>
              <Dropdown data={times} onChangeText={(chosenTime) => {this.setState({MonStartLab:chosenTime})}} containerStyle={{width:100}} value={this.state.MonStartLab} useNativeDriver={true}/>
              <Dropdown data={times} onChangeText={(chosenTime) => {this.setState({MonEndLab:chosenTime})}} containerStyle={{width:100}} value={this.state.MonEndLab} useNativeDriver={true}/>
              </View>
              <View style={{flexDirection:'row',alignItems:'center'}}>
              <Dropdown data={times} onChangeText={(chosenTime) => {this.setState({MonStartTute:chosenTime})}} containerStyle={{width:100}} value={this.state.MonStartTute} useNativeDriver={true}/>
              <Dropdown data={times} onChangeText={(chosenTime) => {this.setState({MonEndTute:chosenTime})}} containerStyle={{width:100}} value={this.state.MonEndTute} useNativeDriver={true}/>
              </View>
              
              <View style={{flexDirection:'row',alignItems:'center'}}>
              <Dropdown data={times} onChangeText={(chosenTime) => {this.setState({MonStartExtra1:chosenTime})}} containerStyle={{width:100}} value={this.state.MonStartExtra1} useNativeDriver={true}/>
              <Dropdown data={times} onChangeText={(chosenTime) => {this.setState({MonEndExtra1:chosenTime})}} containerStyle={{width:100}} value={this.state.MonEndExtra1} useNativeDriver={true}/>
              </View>
              <View style={{flexDirection:'row',alignItems:'center'}}>
              <Dropdown data={times} onChangeText={(chosenTime) => {this.setState({MonStartExtra2:chosenTime})}} containerStyle={{width:100}} value={this.state.MonStartExtra2} useNativeDriver={true}/>
              <Dropdown data={times} onChangeText={(chosenTime) => {this.setState({MonEndExtra2:chosenTime})}} containerStyle={{width:100}} value={this.state.MonEndExtra2} useNativeDriver={true}/>
              </View>
              
              </View>
                <Text>Monday</Text>
              </View>
                <Text>Tuesday</Text>
              <View style={{flexDirection:'row',alignItems:'center'}}>

    <View style={{flexDirection:'column',alignItems:'center'}}>
              <View style={{flexDirection:'row',alignItems:'center'}}>
              <Dropdown data={times} onChangeText={(chosenTime) => {this.setState({TueStartLec:chosenTime})}} containerStyle={{width:100}} value={this.state.TueStartLec} useNativeDriver={true}/>
              <Dropdown data={times} onChangeText={(chosenTime) => {this.setState({TueEndLec:chosenTime})}} containerStyle={{width:100}} value={this.state.TueEndLec} useNativeDriver={true}/>
              </View>
              
              <View style={{flexDirection:'row',alignItems:'center'}}>
              <Dropdown data={times} onChangeText={(chosenTime) => {this.setState({TueStartLab:chosenTime})}} containerStyle={{width:100}} value={this.state.TueStartLab} useNativeDriver={true}/>
              <Dropdown data={times} onChangeText={(chosenTime) => {this.setState({TueEndLab:chosenTime})}} containerStyle={{width:100}} value={this.state.TueEndLab} useNativeDriver={true}/>
              </View>
              <View style={{flexDirection:'row',alignItems:'center'}}>
              <Dropdown data={times} onChangeText={(chosenTime) => {this.setState({TueStartTute:chosenTime})}} containerStyle={{width:100}} value={this.state.TueStartTute} useNativeDriver={true}/>
              <Dropdown data={times} onChangeText={(chosenTime) => {this.setState({TueEndTute:chosenTime})}} containerStyle={{width:100}} value={this.state.TueEndTute} useNativeDriver={true}/>
              </View>
              
              <View style={{flexDirection:'row',alignItems:'center'}}>
              <Dropdown data={times} onChangeText={(chosenTime) => {this.setState({TueStartExtra1:chosenTime})}} containerStyle={{width:100}} value={this.state.TueStartExtra1} useNativeDriver={true}/>
              <Dropdown data={times} onChangeText={(chosenTime) => {this.setState({TueEndExtra1:chosenTime})}} containerStyle={{width:100}} value={this.state.TueEndExtra1} useNativeDriver={true}/>
              </View>
              <View style={{flexDirection:'row',alignItems:'center'}}>
              <Dropdown data={times} onChangeText={(chosenTime) => {this.setState({TueStartExtra2:chosenTime})}} containerStyle={{width:100}} value={this.state.TueStartExtra2} useNativeDriver={true}/>
              <Dropdown data={times} onChangeText={(chosenTime) => {this.setState({TueEndExtra2:chosenTime})}} containerStyle={{width:100}} value={this.state.TueEndExtra2} useNativeDriver={true}/>
              </View>
              
  </View>
    <Text>Tuesday</Text>
  </View>
                   <Text>Wednesday</Text>
              <View style={{flexDirection:'row',alignItems:'center'}}>
    <View style={{flexDirection:'column',alignItems:'center'}}>
  <View style={{flexDirection:'row',alignItems:'center'}}>
              <Dropdown data={times} onChangeText={(chosenTime) => {this.setState({WedStartLec:chosenTime})}} containerStyle={{width:100}} value={this.state.WedStartLec} useNativeDriver={true}/>
              <Dropdown data={times} onChangeText={(chosenTime) => {this.setState({WedEndLec:chosenTime})}} containerStyle={{width:100}} value={this.state.WedEndLec} useNativeDriver={true}/>
              </View>
              
              <View style={{flexDirection:'row',alignItems:'center'}}>
              <Dropdown data={times} onChangeText={(chosenTime) => {this.setState({WedStartLab:chosenTime})}} containerStyle={{width:100}} value={this.state.WedStartLab} useNativeDriver={true}/>
              <Dropdown data={times} onChangeText={(chosenTime) => {this.setState({WedEndLab:chosenTime})}} containerStyle={{width:100}} value={this.state.WedEndLab} useNativeDriver={true}/>
              </View>
              <View style={{flexDirection:'row',alignItems:'center'}}>
              <Dropdown data={times} onChangeText={(chosenTime) => {this.setState({WedStartTute:chosenTime})}} containerStyle={{width:100}} value={this.state.WedStartTute} useNativeDriver={true}/>
              <Dropdown data={times} onChangeText={(chosenTime) => {this.setState({WedEndTute:chosenTime})}} containerStyle={{width:100}} value={this.state.WedEndTute} useNativeDriver={true}/>
              </View>
              
              <View style={{flexDirection:'row',alignItems:'center'}}>
              <Dropdown data={times} onChangeText={(chosenTime) => {this.setState({WedStartExtra1:chosenTime})}} containerStyle={{width:100}} value={this.state.WedStartExtra1} useNativeDriver={true}/>
              <Dropdown data={times} onChangeText={(chosenTime) => {this.setState({WedEndExtra1:chosenTime})}} containerStyle={{width:100}} value={this.state.WedEndExtra1} useNativeDriver={true}/>
              </View>
              <View style={{flexDirection:'row',alignItems:'center'}}>
              <Dropdown data={times} onChangeText={(chosenTime) => {this.setState({WedStartExtra2:chosenTime})}} containerStyle={{width:100}} value={this.state.WedStartExtra2} useNativeDriver={true}/>
              <Dropdown data={times} onChangeText={(chosenTime) => {this.setState({WedEndExtra2:chosenTime})}} containerStyle={{width:100}} value={this.state.WedEndExtra2} useNativeDriver={true}/>
              </View>
              

  </View>
    <Text>Wednesday</Text>
  </View>
              <Text>Thursday</Text>
              <View style={{flexDirection:'row',alignItems:'center'}}>
    <View style={{flexDirection:'column',alignItems:'center'}}>
    <View style={{flexDirection:'row',alignItems:'center'}}>
              <Dropdown data={times} onChangeText={(chosenTime) => {this.setState({ThuStartLec:chosenTime})}} containerStyle={{width:100}} value={this.state.ThuStartLec} useNativeDriver={true}/>
              <Dropdown data={times} onChangeText={(chosenTime) => {this.setState({ThuEndLec:chosenTime})}} containerStyle={{width:100}} value={this.state.ThuEndLec} useNativeDriver={true}/>
              </View>
              
              <View style={{flexDirection:'row',alignItems:'center'}}>
              <Dropdown data={times} onChangeText={(chosenTime) => {this.setState({ThuStartLab:chosenTime})}} containerStyle={{width:100}} value={this.state.ThuStartLab} useNativeDriver={true}/>
              <Dropdown data={times} onChangeText={(chosenTime) => {this.setState({ThuEndLab:chosenTime})}} containerStyle={{width:100}} value={this.state.ThuEndLab} useNativeDriver={true}/>
              </View>
              <View style={{flexDirection:'row',alignItems:'center'}}>
              <Dropdown data={times} onChangeText={(chosenTime) => {this.setState({ThuStartTute:chosenTime})}} containerStyle={{width:100}} value={this.state.ThuStartTute} useNativeDriver={true}/>
              <Dropdown data={times} onChangeText={(chosenTime) => {this.setState({ThuEndTute:chosenTime})}} containerStyle={{width:100}} value={this.state.ThuEndTute} useNativeDriver={true}/>
              </View>
              
              <View style={{flexDirection:'row',alignItems:'center'}}>
              <Dropdown data={times} onChangeText={(chosenTime) => {this.setState({ThuStartExtra1:chosenTime})}} containerStyle={{width:100}} value={this.state.ThuStartExtra1} useNativeDriver={true}/>
              <Dropdown data={times} onChangeText={(chosenTime) => {this.setState({ThuEndExtra1:chosenTime})}} containerStyle={{width:100}} value={this.state.ThuEndExtra1} useNativeDriver={true}/>
              </View>
              <View style={{flexDirection:'row',alignItems:'center'}}>
              <Dropdown data={times} onChangeText={(chosenTime) => {this.setState({ThuStartExtra2:chosenTime})}} containerStyle={{width:100}} value={this.state.ThuStartExtra2} useNativeDriver={true}/>
              <Dropdown data={times} onChangeText={(chosenTime) => {this.setState({ThuEndExtra2:chosenTime})}} containerStyle={{width:100}} value={this.state.ThuEndExtra2} useNativeDriver={true}/>
              </View>
              

  </View>
    <Text>Thursday</Text>
  </View>
              <Text>Friday</Text>
              <View style={{flexDirection:'row',alignItems:'center'}}>
    <View style={{flexDirection:'column',alignItems:'center'}}>
    <View style={{flexDirection:'row',alignItems:'center'}}>
              <Dropdown data={times} onChangeText={(chosenTime) => {this.setState({FriStartLec:chosenTime})}} containerStyle={{width:100}} value={this.state.FriStartLec} useNativeDriver={true}/>
              <Dropdown data={times} onChangeText={(chosenTime) => {this.setState({FriEndLec:chosenTime})}} containerStyle={{width:100}} value={this.state.FriEndLec} useNativeDriver={true}/>
              </View>
              
              <View style={{flexDirection:'row',alignItems:'center'}}>
              <Dropdown data={times} onChangeText={(chosenTime) => {this.setState({FriStartLab:chosenTime})}} containerStyle={{width:100}} value={this.state.FriStartLab} useNativeDriver={true}/>
              <Dropdown data={times} onChangeText={(chosenTime) => {this.setState({FriEndLab:chosenTime})}} containerStyle={{width:100}} value={this.state.FriEndLab} useNativeDriver={true}/>
              </View>
              <View style={{flexDirection:'row',alignItems:'center'}}>
              <Dropdown data={times} onChangeText={(chosenTime) => {this.setState({FriStartTute:chosenTime})}} containerStyle={{width:100}} value={this.state.FriStartTute} useNativeDriver={true}/>
              <Dropdown data={times} onChangeText={(chosenTime) => {this.setState({FriEndTute:chosenTime})}} containerStyle={{width:100}} value={this.state.FriEndTute} useNativeDriver={true}/>
              </View>
              
              <View style={{flexDirection:'row',alignItems:'center'}}>
              <Dropdown data={times} onChangeText={(chosenTime) => {this.setState({FriStartExtra1:chosenTime})}} containerStyle={{width:100}} value={this.state.FriStartExtra1} useNativeDriver={true}/>
              <Dropdown data={times} onChangeText={(chosenTime) => {this.setState({FriEndExtra1:chosenTime})}} containerStyle={{width:100}} value={this.state.FriEndExtra1} useNativeDriver={true}/>
              </View>
              <View style={{flexDirection:'row',alignItems:'center'}}>
              <Dropdown data={times} onChangeText={(chosenTime) => {this.setState({FriStartExtra2:chosenTime})}} containerStyle={{width:100}} value={this.state.FriStartExtra2} useNativeDriver={true}/>
              <Dropdown data={times} onChangeText={(chosenTime) => {this.setState({FriEndExtra2:chosenTime})}} containerStyle={{width:100}} value={this.state.FriEndExtra2} useNativeDriver={true}/>
              </View>
              

  </View>
    <Text>Friday</Text>
  </View>
              <Text>Saturday</Text>
              <View style={{flexDirection:'row',alignItems:'center'}}>
    <View style={{flexDirection:'column',alignItems:'center'}}>
    <View style={{flexDirection:'row',alignItems:'center'}}>
              <Dropdown data={times} onChangeText={(chosenTime) => {this.setState({SatStartLec:chosenTime})}} containerStyle={{width:100}} value={this.state.SatStartLec} useNativeDriver={true}/>
              <Dropdown data={times} onChangeText={(chosenTime) => {this.setState({SatEndLec:chosenTime})}} containerStyle={{width:100}} value={this.state.SatEndLec} useNativeDriver={true}/>
              </View>
              
              <View style={{flexDirection:'row',alignItems:'center'}}>
              <Dropdown data={times} onChangeText={(chosenTime) => {this.setState({SatStartLab:chosenTime})}} containerStyle={{width:100}} value={this.state.SatStartLab} useNativeDriver={true}/>
              <Dropdown data={times} onChangeText={(chosenTime) => {this.setState({SatEndLab:chosenTime})}} containerStyle={{width:100}} value={this.state.SatEndLab} useNativeDriver={true}/>
              </View>
              <View style={{flexDirection:'row',alignItems:'center'}}>
              <Dropdown data={times} onChangeText={(chosenTime) => {this.setState({SatStartTute:chosenTime})}} containerStyle={{width:100}} value={this.state.SatStartTute} useNativeDriver={true}/>
              <Dropdown data={times} onChangeText={(chosenTime) => {this.setState({SatEndTute:chosenTime})}} containerStyle={{width:100}} value={this.state.SatEndTute} useNativeDriver={true}/>
              </View>
              
              <View style={{flexDirection:'row',alignItems:'center'}}>
              <Dropdown data={times} onChangeText={(chosenTime) => {this.setState({SatStartExtra1:chosenTime})}} containerStyle={{width:100}} value={this.state.SatStartExtra1} useNativeDriver={true}/>
              <Dropdown data={times} onChangeText={(chosenTime) => {this.setState({SatEndExtra1:chosenTime})}} containerStyle={{width:100}} value={this.state.SatEndExtra1} useNativeDriver={true}/>
              </View>
              <View style={{flexDirection:'row',alignItems:'center'}}>
              <Dropdown data={times} onChangeText={(chosenTime) => {this.setState({SatStartExtra2:chosenTime})}} containerStyle={{width:100}} value={this.state.SatStartExtra2} useNativeDriver={true}/>
              <Dropdown data={times} onChangeText={(chosenTime) => {this.setState({SatEndExtra2:chosenTime})}} containerStyle={{width:100}} value={this.state.SatEndExtra2} useNativeDriver={true}/>
              </View>
              

  </View>
    <Text>Saturday</Text>
  </View>
                <Button title="Save To Database" onPress={()=>{this.saveToDatabase()}}/>
                <Button title="Go to home" onPress={()=>{this.props.navigation.navigate('Auth')}} />
                
            </View>
            </ScrollView>
        )
    }

     saveToDatabase = ()=>{
      let tempCourses = [];
      let courseName = this.state.courseNameForDatabase;
      if(courseName == "")
      {
          alert("No course Entered");
          return;
      }
      console.log(courseName)
      this.pushCourse(courseName);
      /*
     let MondayStart = this.state.MondayStart;
     let MondayEnd = this.state.MondayEnd;
     let  MondayStartTut = this.state.MondayStartTut;
      let MondayEndTut = this.state.MondayEndTut;
      let MondayStartLab = this.state.MondayStartLab;
      let MondayEndLab = this.state.MondayEndLab;
      let MondayStartExtra1 = this.state.MondayStartExtra1;
      let MondayEndExtra1 = this.state.MondayEndExtra1;
      let MondayStartExtra2 = this.state.MondayStartExtra2
      let MondayEndExtra2 = this.state.MondayEndExtra2
      
      
      let TuesdayStart = this.state.TuesdayStart;
      let TuesdayEnd = this.state.TuesdayEnd;
      let  TuesdayStartTut = this.state.TuesdayStartTut;
       let TuesdayEndTut = this.state.TuesdayEndTut;
       let TuesdayStartLab = this.state.TuesdayStartLab;
       let TuesdayEndLab = this.state.TuesdayEndLab;
       let TuesdayStartExtra1 = this.state.TuesdayStartExtra1;
       let TuesdayEndExtra1 = this.state.TuesdayEndExtra1;
       let TuesdayStartExtra2 = this.state.TuesdayStartExtra2
       let TuesdayEndExtra2 = this.state.TuesdayEndExtra2
      
      
      
       let WednesdayStart = this.state.WednesdayStart;
       let WednesdayEnd = this.state.WednesdayEnd;
       let  WednesdayStartTut = this.state.WednesdayStartTut;
        let WednesdayEndTut = this.state.WednesdayEndTut;
        let WednesdayStartLab = this.state.WednesdayStartLab;
        let WednesdayEndLab = this.state.WednesdayEndLab;
        let WednesdayStartExtra1 = this.state.WednesdayStartExtra1;
        let WednesdayEndExtra1 = this.state.WednesdayEndExtra1;
        let WednesdayStartExtra2 = this.state.WednesdayStartExtra2
        let WednesdayEndExtra2 = this.state.WednesdayEndExtra2
      
        let ThursdayStart = this.state.ThursdayStart;
        let ThursdayEnd = this.state.ThursdayEnd;
        let  ThursdayStartTut = this.state.ThursdayStartTut;
         let ThursdayEndTut = this.state.ThursdayEndTut;
         let ThursdayStartLab = this.state.ThursdayStartLab;
         let ThursdayEndLab = this.state.ThursdayEndLab;
         let ThursdayStartExtra1 = this.state.ThursdayStartExtra1;
         let ThursdayEndExtra1 = this.state.ThursdayEndExtra1;
         let ThursdayStartExtra2 = this.state.ThursdayStartExtra2
         let ThursdayEndExtra2 = this.state.ThursdayEndExtra2
      
         let FridayStart = this.state.FridayStart;
         let FridayEnd = this.state.FridayEnd;
         let  FridayStartTut = this.state.FridayStartTut;
          let FridayEndTut = this.state.FridayEndTut;
          let FridayStartLab = this.state.FridayStartLab;
          let FridayEndLab = this.state.FridayEndLab;
          let FridayStartExtra1 = this.state.FridayStartExtra1;
          let FridayEndExtra1 = this.state.FridayEndExtra1;
          let FridayStartExtra2 = this.state.FridayStartExtra2
          let FridayEndExtra2 = this.state.FridayEndExtra2

          let SaturdayStart = this.state.SaturdayStart;
          let SaturdayEnd = this.state.SaturdayEnd;
          let  SaturdayStartTut = this.state.SaturdayStartTut;
           let SaturdayEndTut = this.state.SaturdayEndTut;
           let SaturdayStartLab = this.state.SaturdayStartLab;
           let SaturdayEndLab = this.state.SaturdayEndLab;
           let SaturdayStartExtra1 = this.state.SaturdayStartExtra1;
           let SaturdayEndExtra1 = this.state.SaturdayEndExtra1;
           let SaturdayStartExtra2 = this.state.SaturdayStartExtra2
           let SaturdayEndExtra2 = this.state.SaturdayEndExtra2
      */
      let Monday = [];
      let Tuesday = [];
      let Wednesday = [];
      let Thursday = [];
      let Friday = [];
      let Saturday =[];
      /*
      let MondayO = new Object();
      let TuesdayO = new Object();
      let WednesdayO = new Object();
      let ThursdayO = new Object();
      let FridayO = new Object();
      let SaturdayO = new Object();
      */
      
      if(true){
        if(this.state.MonStartLec!="time" && this.state.MonEndLec!="time"){
          Monday =[this.state.MonStartLec + "-" + this.state.MonEndLec] 
      }
      
      if(this.state.MonStartTute!="time" && this.state.MonEndTute!="time"){
          Monday.push(this.state.MonStartTute + "-" + this.state.MonEndTute)
      }
      
      if(this.state.MonStartLab!="time" && this.state.MonEndLab!="time"){
          Monday.push(this.state.MonStartLab + "-" + this.state.MonEndLab)
      }
      if(this.state.MonStartExtra1!="time" && this.state.MonEndExtra1!="time"){
          Monday.push(this.state.MonStartExtra1 + "-" + this.state.MonEndExtra1)
      }
      if(this.state.MonStartExtra2!="time" && this.state.MonEndExtra2!="time"){
          Monday.push(this.state.MonStartExtra2 + "-" + this.state.MonEndExtra2)
      }
      if(this.state.MonStartLec=="time" && this.state.MonEndLec=="time" && this.state.MonStartTute=="time" && this.state.MonEndTute=="time" && this.state.MonStartTute=="time" && this.state.MonEndTute=="time" && this.state.MonStartExtra1 == 'time' && this.state.MonEndExtra1=='time' && this.state.MonStartExtra2 == 'time' && this.state.MonEndExtra2=='time') 
      Monday.push(null);
      
      
      if(this.state.TueStartLec!="time" && this.state.TueEndLec!="time"){
        Tuesday =[this.state.TueStartLec + "-" + this.state.TueEndLec] 
      }
      
      if(this.state.TueStartTute!="time" && this.state.TueEndTute!="time"){
        Tuesday.push(this.state.TueStartTute + "-" + this.state.TueEndTute)
      }
      
      if(this.state.TueStartLab!="time" && this.state.TueEndLab!="time"){
        Tuesday.push(this.state.TueStartLab + "-" + this.state.TueEndLab)
      }
      if(this.state.TueStartExtra1!="time" && this.state.TueEndExtra1!="time"){
        Tuesday.push(this.state.TueStartExtra1 + "-" + this.state.TueEndExtra1)
      }
      if(this.state.TueStartExtra2!="time" && this.state.TueEndExtra2!="time"){
        Tuesday.push(this.state.TueStartExtra2 + "-" + this.state.TueEndExtra2)
      }
      if(this.state.TueStartLec=="time" && this.state.TueEndLec=="time" && this.state.TueStartTute=="time" && this.state.TueEndTute=="time" && this.state.TueStartTute=="time" && this.state.TueEndTute=="time" && this.state.TueStartExtra1 == 'time' && this.state.TueEndExtra1=='time' && this.state.TueStartExtra2 == 'time' && this.state.TueEndExtra2=='time') 
      Tuesday.push(null);
      
      if(this.state.WedStartLec!="time" && this.state.WedEndLec!="time"){
      Wednesday =[this.state.WedStartLec + "-" + this.state.WedEndLec] 
      }
      
      if(this.state.WedStartTute!="time" && this.state.WedEndTute!="time"){
      Wednesday.push(this.state.WedStartTute + "-" + this.state.WedEndTute)
      }
      
      if(this.state.WedStartLab!="time" && this.state.WedEndLab!="time"){
      Wednesday.push(this.state.WedStartLab + "-" + this.state.WedEndLab)
      }
      if(this.state.WedStartExtra1!="time" && this.state.WedEndExtra1!="time"){
      Wednesday.push(this.state.WedStartExtra1 + "-" + this.state.WedEndExtra1)
      }
      if(this.state.WedStartExtra2!="time" && this.state.WedEndExtra2!="time"){
      Wednesday.push(this.state.WedStartExtra2 + "-" + this.state.WedEndExtra2)
      }
      if(this.state.WedStartLec=="time" && this.state.WedEndLec=="time" && this.state.WedStartTute=="time" && this.state.WedEndTute=="time" && this.state.WedStartTute=="time" && this.state.WedEndTute=="time" && this.state.WedStartExtra1 == 'time' && this.state.WedEndExtra1=='time' && this.state.WedStartExtra2 == 'time' && this.state.WedEndExtra2=='time')   
      Wednesday.push(null);
      
              
      if(this.state.ThuStartLec!="time" && this.state.ThuEndLec!="time"){
      Thursday =[this.state.ThuStartLec + "-" + this.state.ThuEndLec] 
      }
      
      if(this.state.ThuStartTute!="time" && this.state.ThuEndTute!="time"){
      Thursday.push(this.state.ThuStartTute + "-" + this.state.ThuEndTute)
      }
      
      if(this.state.ThuStartLab!="time" && this.state.ThuEndLab!="time"){
      Thursday.push(this.state.ThuStartLab + "-" + this.state.ThuEndLab)
      }
      if(this.state.ThuStartExtra1!="time" && this.state.ThuEndExtra1!="time"){
      Thursday.push(this.state.ThuStartExtra1 + "-" + this.state.ThuEndExtra1)
      }
      if(this.state.ThuStartExtra2!="time" && this.state.ThuEndExtra2!="time"){
      Thursday.push(this.state.ThuStartExtra2 + "-" + this.state.ThuEndExtra2)
      }
      if(this.state.ThuStartLec=="time" && this.state.ThuEndLec=="time" && this.state.ThuStartTute=="time" && this.state.ThuEndTute=="time" && this.state.ThuStartTute=="time" && this.state.ThuEndTute=="time" && this.state.ThuStartExtra1 == 'time' && this.state.ThuEndExtra1=='time' && this.state.ThuStartExtra2 == 'time' && this.state.ThuEndExtra2=='time') 
      Thursday.push(null);
      
                  
      if(this.state.FriStartLec!="time" && this.state.FriEndLec!="time"){
        Friday=[this.state.FriStartLec + "-" + this.state.FriEndLec] 
        }
        
        if(this.state.FriStartTute!="time" && this.state.FriEndTute!="time"){
        Friday.push(this.state.FriStartTute + "-" + this.state.FriEndTute)
        }
        
        if(this.state.FriStartLab!="time" && this.state.FriEndLab!="time"){
        Friday.push(this.state.FriStartLab + "-" + this.state.FriEndLab)
        }
        if(this.state.FriStartExtra1!="time" && this.state.FriEndExtra1!="time"){
        Friday.push(this.state.FriStartExtra1 + "-" + this.state.FriEndExtra1)
        }
        if(this.state.FriStartExtra2!="time" && this.state.FriEndExtra2!="time"){
        Friday.push(this.state.FriStartExtra2 + "-" + this.state.FriEndExtra2)
        }
        if(this.state.FriStartLec=="time" && this.state.FriEndLec=="time" && this.state.FriStartTute=="time" && this.state.FriEndTute=="time" && this.state.FriStartTute=="time" && this.state.FriEndTute=="time" && this.state.FriStartExtra1 == 'time' && this.state.FriEndExtra1=='time' && this.state.FriStartExtra2 == 'time' && this.state.FriEndExtra2=='time') 
        Friday.push(null);
      
      
      
      if(this.state.SatStartLec!="time" && this.state.SatEnd!="time"){
      Saturday =[this.state.SatStartLec + "-" + this.state.SatEndLec] 
      }
      
      if(this.state.SatStartTute!="time" && this.state.SatEndTute!="time"){
      Saturday.push(this.state.SatStartTute + "-" + this.state.SatEndTute)
      }
      
      if(this.state.SatStartLab!="time" && this.state.SatEndLab!="time"){
      Saturday.push(this.state.SatStartLab + "-" + this.state.SatEndLab)
      }
      if(this.state.SatStartExtra1!="time" && this.state.SatEndExtra1!="time"){
      Saturday.push(this.state.SatStartExtra1 + "-" + this.state.SatEndExtra1)
      }
      if(this.state.SatStartExtra2!="time" && this.state.SatEndExtra2!="time"){
      Saturday.push(this.state.SatStartExtra2 + "-" + this.state.SatEndExtra2)
      }
      if(this.state.SatStartLec=="time" && this.state.SatEndLec=="time" && this.state.SatStartTute=="time" && this.state.SatEndTute=="time" && this.state.SatStartTute=="time" && this.state.SatEndTute=="time" && this.state.SatStartExtra1 == 'time' && this.state.SatEndExtra1=='time' && this.state.SatStartExtra2 == 'time' && this.state.SatEndExtra2=='time') 
      Saturday.push(null);
      }
      
                      
      database().ref("/Teacher/" + this.state.Id + "/" + courseName).set({
          Monday:Monday,
          Tuesday:Tuesday,
          Wednesday:Wednesday,
          Thursday:Thursday,
          Friday:Friday,
          Saturday:Saturday
      }).then(()=>{
          alert("Done saving")
      })
      
      /*
      if(true){
          if(MondayStart!="time" && MondayEnd!="time"){
              MondayO.Lecture = MondayStart + "-" + MondayEnd;
              
          }
          
          if(MondayStartTut!="time" && MondayEndTut!="time"){
                  MondayO.Tute = MondayStartTut + "-" + MondayEndTut
          }
          
          if(MondayStartLab!="time" && MondayEndLab!="time"){
                  MondayO.Lab = MondayStartLab + "-" + MondayEndLab
          }
          if(TuesdayStart!="time" && TuesdayEnd!="time"){
              TuesdayO.Lecture = TuesdayStart + "-" + TuesdayEnd;
              
          }
          
          if(TuesdayStartTut!="time" && TuesdayEndTut!="time"){
                  TuesdayO.Tute = TuesdayStartTut + "-" + TuesdayEndTut
          }
          
          if(TuesdayStartLab!="time" && TuesdayEndLab!="time"){
                  TuesdayO.Lab = TuesdayStartLab + "-" + TuesdayEndLab
          }
          if(WednesdayStart!="time" && WednesdayEnd!="time"){
              WednesdayO.Lecture = WednesdayStart + "-" + WednesdayEnd;
              
          }
          
          if(WednesdayStartTut!="time" && WednesdayEndTut!="time"){
                  WednesdayO.Tute = WednesdayStartTut + "-" + WednesdayEndTut
          }
          
          if(WednesdayStartLab!="time" && WednesdayEndLab!="time"){
                  WednesdayO.Lab = WednesdayStartLab + "-" + WednesdayEndLab
          }
          if(ThursdayStart!="time" && ThursdayEnd!="time"){
              ThursdayO.Lecture = ThursdayStart + "-" + ThursdayEnd;
              
          }
          
          if(ThursdayStartTut!="time" && ThursdayEndTut!="time"){
                  ThursdayO.Tute = ThursdayStartTut + "-" + ThursdayEndTut
          }
          
          if(ThursdayStartLab!="time" && ThursdayEndLab!="time"){
                  ThursdayO.Lab = ThursdayStartLab + "-" + ThursdayEndLab
          }
          if(FridayStart!="time" && FridayEnd!="time"){
              FridayO.Lecture = FridayStart + "-" + FridayEnd;
              
          }
          
          if(FridayStartTut!="time" && FridayEndTut!="time"){
                  FridayO.Tute = FridayStartTut + "-" + FridayEndTut
          }
          
          if(FridayStartLab!="time" && FridayEndLab!="time"){
                  FridayO.Lab = FridayStartLab + "-" + FridayEndLab
          }
          
          if(SaturdayStart!="time" && SaturdayEnd!="time"){
              SaturdayO.Lecture = SaturdayStart + "-" + SaturdayEnd;
              
          }
          
          if(SaturdayStartTut!="time" && SaturdayEndTut!="time"){
                  SaturdayO.Tute = SaturdayStartTut + "-" + SaturdayEndTut
          }
          
          if(SaturdayStartLab!="time" && SaturdayEndLab!="time"){
                  SaturdayO.Lab = SaturdayStartLab + "-" + SaturdayEndLab
          }
          
          }
          
      
          database().ref("/TeachersLLT/" + ID + "/" + courseName).set({
              Monday:MondayO,
              Tuesday:TuesdayO,
              Wednesday:WednesdayO,
              Thursday:ThursdayO,
              Friday:FridayO,
              Saturday:SaturdayO
          }).then(function(){
              alert("Done Saving");
          })
          */
      }
      setData(){
        let times = [];
        let obj = new Object();
        let start = "8:00"; let end = "18:30";
                while(start!=end){ // 20 strings of the form "8:00-8:30", "8:30-9:00" are compared with all the 1/2 hour slots of the user
                let tempSlotString = start // form a string to compare
                let tempObj = new Object();
                tempObj.label = tempSlotString;
                tempObj.value = tempSlotString;
                times.push(tempObj); 
                start = this.newTime(start); // increments start time for looping
                }
                return times;
    }
    newTime = (time)=>{

        let tempSplit = time.split(':');
        if(tempSplit[1]=="00"){
         tempSplit[1] = "30"
        let timeNew = tempSplit[0] +":" + tempSplit[1];
        return timeNew;
        }
        else if(tempSplit[1]=="30"){
         tempSplit[1] = "00";
         tempSplit[0] = (parseInt(tempSplit[0]) + 1).toString();
            let timeNew= tempSplit[0] +":" + tempSplit[1];
          return timeNew;
           }
           return
        }    
    pushCourse(courseName){
        database().ref("/TeachersCourses/" + this.state.Id).once('value').then((snap)=>{
            let i=0;
            if(snap.val()==null)
            {let tempArray = [courseName];
                database().ref("/TeachersCourses/" + this.state.Id).set({
                    courses:tempArray
                })
            }
            else{
                let tempArray = [];
                database().ref("/TeachersCourses/"+this.state.Id).once('value').then((snap)=>{
                    tempArray = snap.val().courses;
                    for(i=0;i<tempArray.length;++i){
                        if(tempArray[i]==courseName)
                        break;
                    }
                    if(i==tempArray.length){
                    tempArray.push(courseName)
                    database().ref("/TeachersCourses/"+this.state.Id).set({
                        courses:tempArray
                    })
                }
                else
                database().ref("/TeachersCourses/"+this.state.Id).set({
                    courses:tempArray
                })
                })
            }
           
        })
    /*
        database().ref("/TeachersCourses/" + this.state.Id).once('value').then(function(snap){
            if(snap.val()==null)
            {tempArray = [courseName];
                database().ref("/TeachersCourses/" + this.state.Id).set({
                    courses:tempArray
                })
            }
            else{
                tempArray = [];tempArray2=[]
                database().ref("/TeachersCourses/"+this.state.Id).once('value').then(function(snap){
                    tempArray = snap.val().courses;
                    tempArray.push(courseName)
                    database().ref("/TeachersCourses/"+this.state.Id).set({
                        courses:tempArray
                    })
                })
            }
           
        })
        */
    }
  }