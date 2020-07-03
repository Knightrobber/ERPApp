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
  import {Dropdown} from 'react-native-material-dropdown';
  import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';


  export default class AddCourses extends Component{
    constructor(){
        super();
        this.state = {
          MonStartLec:'time',MonEndLec:'time',MonStartLab:'time',MonEndLab:'time',MonStartTute:'time',MonEndTute:'time',MonStartExtra1:'time',MonStartExtra2:'time',MonEndExtra1:'time',MonEndExtra2:'time',
          TueStartLec:'time',TueEndLec:'time',TueStartLab:'time',TueEndLab:'time',TueStartTute:'time',TueEndTute:'time',TueStartExtra1:'time',TueStartExtra2:'time',TueEndExtra1:'time',TueEndExtra2:'time',
          WedStartLec:'time',WedEndLec:'time',WedStartLab:'time',WedEndLab:'time',WedStartTute:'time',WedEndTute:'time',WedStartExtra1:'time',WedStartExtra2:'time',WedEndExtra1:'time',WedEndExtra2:'time',
          ThuStartLec:'time',ThuEndLec:'time',ThuStartLab:'time',ThuEndLab:'time',ThuStartTute:'time',ThuEndTute:'time',ThuStartExtra1:'time',ThuStartExtra2:'time',ThuEndExtra1:'time',ThuEndExtra2:'time',
          FriStartLec:'time',FriEndLec:'time',FriStartLab:'time',FriEndLab:'time',FriStartTute:'time',FriEndTute:'time',FriStartExtra1:'time',FriStartExtra2:'time',FriEndExtra1:'time',FriEndExtra2:'time',
          SatStartLec:'time',SatEndLec:'time',SatStartLab:'time',SatEndLab:'time',SatStartTute:'time',SatEndTute:'time',SatStartExtra1:'time',SatStartExtra2:'time',SatEndExtra1:'time',SatEndExtra2:'time',
            Id:'',courseName:'',sem:'Select Semester',startDateOfCourse:null,saving:0
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
    let times = this.setData();
    let sem = [{label:'Selected Semester',value:'Selected Semester'},{label:'Midsem',value:'Midsem'},{label:'Endsem',value:'Endsem'}];
      return(
        <ScrollView>
        <View>
            <Text>Student Time Table</Text>
            <TextInput placeholder="Course Code" onChangeText={(courseCode)=>{let courseName = courseCode.toUpperCase();this.setState({courseName:courseName})}}/>
            <View style={{flexDirection:'row'}}>
            <Dropdown data={sem} onChangeText={(selectedVal)=>{this.setState({sem:selectedVal})}} value={this.state.sem} containerStyle={{width:150}}/>
            <DatePicker date={this.state.startDateOfCourse} format="YYYY-MM-DD" onDateChange={(date) => {this.setState({startDateOfCourse:date})}}  mode="date" placeholder="select date" />
            </View>
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
          
   
          

</View>
<Text>Saturday</Text>
</View>
            <Button title="Save To Database" onPress={()=>{this.saveToDatabase()}}/>
            <Button title="Go to home" onPress={()=>{this.props.navigation.navigate('Auth')}} />
            
        </View>
        </ScrollView>
      );
  }  


  setData(){
    let times = [];
    let obj = new Object();
    obj.label='time';obj.value='time';
    times.push(obj);
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


    saveToDatabase=()=>{ 
        let saving = this.state.saving   
        if(saving==1)
        {
            alert(" have paitence lol, your request is being processed");
            return;
        }
        else {
        this.setState({saving:1})
        alert("This message is being displayed to avoid you from pressing the save button while processing")
    };
        let tempCourses = [];
        let courseName = this.state.courseName;
        if(courseName =='')
        {
            alert("No course Code Entered");
            return;
        }
        console.log(courseName)
        if(this.state.sem == 'Select Semester')
        {
            alert("Please select duration of course");
            return;
        }
        
            
                database().ref("/DatesOfSem").once('value',(snap)=>{
                    let startDate = new Date(snap.val().Beginning);
                    let endDateMid = new Date(snap.val().MidSem);
                    let endDateEnd = new Date(snap.val().EndSem);
                    let endDate=this.state.sem;
                    if(endDate == "Select Semester")
                    {
                        alert("You haven't seleted end date for the course");
                        return;
                    }
                    else if(endDate=="Midsem")
                    endDate = endDateMid;
                    else if(endDate=="Endsem")
                    endDate = endDateEnd;

                    if(this.state.startDateOfCourse!=null)
                    startDate = new Date(this.state.startDateOfCourse);

                    
                
            
            
            

        this.pushCourse(courseName);
        /*
        MondayStart = document.getElementById("MondayStart").value
        MondayEnd = document.getElementById("MondayEnd").value
        MondayStartTut = document.getElementById("MondayStartTut").value
        MondayEndTut = document.getElementById("MondayEndTut").value
        MondayStartLab = document.getElementById("MondayStartLab").value
        MondayEndLab = document.getElementById("MondayEndLab").value
        
        TuesdayStart = document.getElementById("TuesdayStart").value
        TuesdayEnd = document.getElementById("TuesdayEnd").value
        TuesdayStartTut = document.getElementById("TuesdayStartTut").value
        TuesdayEndTut = document.getElementById("TuesdayEndTut").value
        TuesdayStartLab = document.getElementById("TuesdayStartLab").value
        TuesdayEndLab = document.getElementById("TuesdayEndLab").value
        
        WednesdayStart = document.getElementById("WednesdayStart").value
        WednesdayEnd = document.getElementById("WednesdayEnd").value
        WednesdayStartTut = document.getElementById("WednesdayStartTut").value
        WednesdayEndTut = document.getElementById("WednesdayEndTut").value
        WednesdayStartLab = document.getElementById("WednesdayStartLab").value
        WednesdayEndLab = document.getElementById("WednesdayEndLab").value
        
        ThursdayStart = document.getElementById("ThursdayStart").value
        ThursdayEnd = document.getElementById("ThursdayEnd").value
        ThursdayStartTut = document.getElementById("ThursdayStartTut").value
        ThursdayEndTut = document.getElementById("ThursdayEndTut").value
        ThursdayStartLab = document.getElementById("ThursdayStartLab").value
        ThursdayEndLab = document.getElementById("ThursdayEndLab").value
        
        FridayStart = document.getElementById("FridayStart").value
        FridayEnd = document.getElementById("FridayEnd").value
        FridayStartTut = document.getElementById("FridayStartTut").value
        FridayEndTut = document.getElementById("FridayEndTut").value
        FridayStartLab = document.getElementById("FridayStartLab").value
        FridayEndLab = document.getElementById("FridayEndLab").value
        
        SaturdayStart = document.getElementById("SaturdayStart").value
        SaturdayEnd = document.getElementById("SaturdayEnd").value
        SaturdayStartTut = document.getElementById("SaturdayStartTut").value
        SaturdayEndTut = document.getElementById("SaturdayEndTut").value
        SaturdayStartLab = document.getElementById("SaturdayStartLab").value
        SaturdayEndLab = document.getElementById("SaturdayEndLab").value
            */

           let Monday = [];
           let Tuesday = [];
           let Wednesday = [];
           let Thursday = [];
           let Friday = [];
           let Saturday =[];
           
           let MondayO = new Object();
           let TuesdayO = new Object();
           let WednesdayO = new Object();
           let ThursdayO = new Object();
           let FridayO = new Object();
           let SaturdayO = new Object();
           
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
          
          database().ref("/Students/" + this.state.Id + "/" + courseName).set({
            Monday:Monday,
            Tuesday:Tuesday,
            Wednesday:Wednesday,
            Thursday:Thursday,
            Friday:Friday,
            Saturday:Saturday
        }).catch((error)=>{alert("An error occured while saving, save again xD " + error);return;})


if(true){
    if(this.state.MonStartLec!="time" && this.state.MondEndLec!="time"){
        MondayO.Lecture = this.state.MonStartLec + "-" + this.state.MonEndLec;
    }
    
    if(this.state.MonStartTute!="time" && this.state.MonEndTute!="time"){
            MondayO.Tute = this.state.MonStartTute + "-" + this.state.MonEndTute
    }
    
    if(this.state.MonStartLab!="time" && this.state.MonEndLab!="time"){
            MondayO.Lab = this.state.MonStartLab + "-" + this.state.MonEndLab
    }
    
    
    if(this.state.TueStartLec!="time" && this.state.TuedEndLec!="time"){
        TuesdayO.Lecture = this.state.TueStartLec + "-" + this.state.TueEndLec;
    }
    
    if(this.state.TueStartTute!="time" && this.state.TueEndTute!="time"){
            TuesdayO.Tute = this.state.TueStartTute + "-" + this.state.TueEndTute
    }
    
    if(this.state.TueStartLab!="time" && this.state.TueEndLab!="time"){
            TuesdayO.Lab = this.state.TueStartLab + "-" + this.state.TueEndLab
    }
    
    if(this.state.WedStartLec!="time" && this.state.WeddEndLec!="time"){
        WednesdayO.Lecture = this.state.WedStartLec + "-" + this.state.WedEndLec;
    }
    
    if(this.state.WedStartTute!="time" && this.state.WedEndTute!="time"){
            WednesdayO.Tute = this.state.WedStartTute + "-" + this.state.WedEndTute
    }
    
    if(this.state.WedStartLab!="time" && this.state.WedEndLab!="time"){
            WednesdayO.Lab = this.state.WedStartLab + "-" + this.state.WedEndLab
    }
    
    
    if(this.state.ThuStartLec!="time" && this.state.ThudEndLec!="time"){
        ThursdayO.Lecture = this.state.ThuStartLec + "-" + this.state.ThuEndLec;
    }
    
    if(this.state.ThuStartTute!="time" && this.state.ThuEndTute!="time"){
            ThursdayO.Tute = this.state.ThuStartTute + "-" + this.state.ThuEndTute
    }
    
    if(this.state.ThuStartLab!="time" && this.state.ThuEndLab!="time"){
            ThursdayO.Lab = this.state.ThuStartLab + "-" + this.state.ThuEndLab
    }
    
    
    if(this.state.FriStartLec!="time" && this.state.FridEndLec!="time"){
        FridayO.Lecture = this.state.FriStartLec + "-" + this.state.FriEndLec;
    }
    
    if(this.state.FriStartTute!="time" && this.state.FriEndTute!="time"){
            FridayO.Tute = this.state.FriStartTute + "-" + this.state.FriEndTute
    }
    
    if(this.state.FriStartLab!="time" && this.state.FriEndLab!="time"){
            FridayO.Lab = this.state.FriStartLab + "-" + this.state.FriEndLab
    }
    
    
    if(this.state.SatStartLec!="time" && this.state.SatdEndLec!="time"){
        SaturdayO.Lecture = this.state.SatStartLec + "-" + this.state.SatEndLec;
    }
    
    if(this.state.SatStartTute!="time" && this.state.SatEndTute!="time"){
            SaturdayO.Tute = this.state.SatStartTute + "-" + this.state.SatEndTute
    }
    
    if(this.state.SatStartLab!="time" && this.state.SatEndLab!="time"){
            SaturdayO.Lab = this.state.SatStartLab + "-" + this.state.SatEndLab
    }
    }

    database().ref("/StudentsLLT/" + this.state.Id + "/" + courseName).set({
        Monday:MondayO,
        Tuesday:TuesdayO,
        Wednesday:WednesdayO,
        Thursday:ThursdayO,
        Friday:FridayO,
        Saturday:SaturdayO
    }).then(()=>{

       this.countLLT(this.state.Id,courseName,startDate,endDate).then(()=>{
        this.missableClasses(this.state.Id,this.state.courseName)
       })

    }).catch(()=>{alert('an error occured while saving, save again xD ' + error);return;})


    
})

        }

        pushCourse(courseName){
            database().ref("/Courses/" + this.state.Id).once('value').then((snap)=>{
                let i=0;
                if(snap.val()==null)
                {let tempArray = [courseName];
                    database().ref("/Courses/" + this.state.Id).set({
                        courses:tempArray
                    })
                }
                else{
                    let tempArray = [];
                    database().ref("/Courses/"+this.state.Id).once('value').then((snap)=>{
                        tempArray = snap.val().courses;
                        for(i=0;i<tempArray.length;++i){
                            if(tempArray[i]==courseName)
                            break;
                        }
                        if(i==tempArray.length){
                        tempArray.push(courseName)
                        database().ref("/Courses/"+this.state.Id).set({
                            courses:tempArray
                        })
                    }
                    else
                    database().ref("/Courses/"+this.state.Id).set({
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


        countLLT=(ID,courseName,startDate,endDate)=>{
            return new Promise((resolve,reject)=>{
            let classTypesCount = new Object();
            this.countLectures(ID,courseName,startDate,endDate).then((lectureCount)=>{
                classTypesCount.lectures=lectureCount;
            }).then(()=>{
                this.countLabs(ID,courseName,startDate,endDate).then((labCount)=>{
                    classTypesCount.labs=labCount;
                }).then(()=>{
                    this.countTutes(ID,courseName,startDate,endDate).then((tuteCount)=>{
                        classTypesCount.tutes = tuteCount;
                    }).then(()=>{
                        database().ref("/Attendance/" + ID +  "/" + courseName + "/" + "TotalClasses").set({
                          Lecture:classTypesCount.lectures,
                          Lab:classTypesCount.labs,
                          Tute:classTypesCount.tutes
                        }).then(()=>{
                            console.log("count resolved")
                            resolve();
                        })
                    })
                })
            })
        })
        }

        countLectures=(ID,courseName,startDate,endDate)=>{
            return new Promise((resolve,reject)=>{
                let daysOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
            let days = [];
            database().ref("/StudentsLLT/" + ID + "/" + courseName).once('value').then((snap)=>{
                snap.forEach((subSnap)=>{
                    if(subSnap.val().Lecture!=null){
                        days.push(subSnap.key)
                    }
                })
            }).then(()=>{
                
                let holidays;
                this.setHolidays().then((holidaysNew)=>{
                    holidays = holidaysNew;
                    let lectures = 0;
               
                
                startDate = moment(startDate,'YYYY-MM-DD');
                console.log("before lopp startdate " + startDate.format('YYYY-MM-DD'));
                endDate = moment(endDate,'YYYY-MM-DD');
                console.log("before lopp enddate " + endDate.format('YYYY-MM-DD'));
                
                while(endDate.diff(startDate)!=0)
                {   let startDay = daysOfWeek[startDate.day()];
                    let flag=0;
                    if(startDay!="Sunday"){
                        
                        for(let i=0;i<holidays.length;++i){
                            let diff = startDate.diff(moment(holidays[i],"YYYY-MM-DD"),'d');
                            
                            if(diff==0)
                            {
                                flag=1;
                                break;
                            }
                        }

                        if(flag==0)
                        {
                            for(let j=0;j<days.length;++j){
                                if(startDay == days[j]){
                                    ++lectures;
                                }
                            }
                            
                        }
                        
                    }
                  
                    startDate = startDate.add(1,'d');
                   
                    
                }
                
                resolve(lectures);
                })
                
            })
        
        });
            
        
        } // uses LLT

        countLabs=(ID,courseName,startDate,endDate)=>{
            return new Promise((resolve,reject)=>{
                let daysOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
            let days = [];
            database().ref("/StudentsLLT/" + ID + "/" + courseName).once('value').then((snap)=>{
                snap.forEach((subSnap)=>{
                    if(subSnap.val().Lab!=null){
                        days.push(subSnap.key)
                    }
                })
            }).then(()=>{
                
                let holidays;
                this.setHolidays().then((holidaysNew)=>{
                    holidays = holidaysNew;
                    let labs = 0;
                
                
                startDate = moment(startDate,'YYYY-MM-DD');
                console.log("before lopp startdate " + startDate.format('YYYY-MM-DD'));
                endDate = moment(endDate,'YYYY-MM-DD');
                console.log("before lopp enddate " + endDate.format('YYYY-MM-DD'));
                
                while(endDate.diff(startDate)!=0)
                {   let startDay = daysOfWeek[startDate.day()];
                    let flag=0;
                    if(startDay!="Sunday"){
                        
                        for(let i=0;i<holidays.length;++i){
                            let diff = startDate.diff(moment(holidays[i],"YYYY-MM-DD"),'d');
                           
                            if(diff==0)
                            {
                                flag=1;
                                break;
                            }
                        }
        
                        if(flag==0)
                        {
                            for(let j=0;j<days.length;++j){
                                if(startDay == days[j]){
                                    ++labs;
                                }
                            }
                            
                        }
                        
                    }
                    
                    startDate = startDate.add(1,'d');
                   
                }
                
                resolve(labs);
                })
                
            })
        
        });
            
        
        }

        countTutes=(ID,courseName,startDate,endDate)=>{
            return new Promise((resolve,reject)=>{
                let daysOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
            let days = [];
            database().ref("/StudentsLLT/" + ID + "/" + courseName).once('value').then((snap)=>{
                snap.forEach((subSnap)=>{
                    if(subSnap.val().Tute!=null){
                        days.push(subSnap.key)
                    }
                })
            }).then(()=>{
                
                let holidays;
                this.setHolidays().then((holidaysNew)=>{
                    holidays = holidaysNew;
                    let tutes = 0;
                
                
                startDate = moment(startDate,'YYYY-MM-DD');
                console.log("before lopp startdate " + startDate.format('YYYY-MM-DD'));
                endDate = moment(endDate,'YYYY-MM-DD');
                console.log("before lopp enddate " + endDate.format('YYYY-MM-DD'));
                
                while(endDate.diff(startDate)!=0)
                {   let startDay = daysOfWeek[startDate.day()];
                    let flag=0;
                    if(startDay!="Sunday"){
                        
                        for(let i=0;i<holidays.length;++i){
                            let diff = startDate.diff(moment(holidays[i],"YYYY-MM-DD"),'d');
                           
                            if(diff==0)
                            {
                                flag=1;
                                break;
                            }
                        }
        
                        if(flag==0)
                        {
                            for(let j=0;j<days.length;++j){
                                if(startDay == days[j]){
                                    ++tutes;
                                }
                            }
                            
                        }
                        
                    }
                    
                    startDate = startDate.add(1,'d');
                   
                    
                }
                
                resolve(tutes);
                })
                
            })
        
        });
            
        
        }

        missableClasses = (ID,courseName)=>{
            let lectures,tutes,labs,totalPoints,newTotal;
            let lecturesInitial,tutesInitial,labsInitial;
            let weightLecture,weightLab,weightTute;
            let flagL=0;let flagLab=0; let flagT=0;let flagTest = 0
            console.log("in missable classes");
            database().ref("/Attendance/" + ID + "/" + courseName + "/" + "TotalClasses").once('value').then((snap)=>{
              lectures = snap.val().Lecture;lecturesInitial=lectures
              labs = snap.val().Lab;labsInitial=labs;
              tutes = snap.val().Tute;tutesInitial=tutes;
              console.log(lectures + " " + labs + " " + tutes);
            }).then(()=>{
                this.checkWeight("Lecture",courseName).then((lectureWeight)=>{
                    weightLecture=lectureWeight;
                }).then(()=>{
                    this.checkWeight("Lab",courseName).then((labWeight)=>{
                        weightLab=labWeight;
                    }).then(()=>{
                        this.checkWeight("Tute",courseName).then((tuteWeight)=>{
                            weightTute=tuteWeight;
                        }).then(()=>{
                            
                        console.log("after checking weights")
                        totalPoints = findTotal(lectures,labs,tutes);
                        console.log(totalPoints)
                        newTotal = totalPoints;
                        let attendance = (newTotal/totalPoints)*100;
                        console.log(attendance);
                        while((flagL!=1 || flagLab!=1 || flagT!=1) && flagTest<15)
                        {
                            if(lectures!=0 && attendance>=75 && flagL!=1){
                                let tempAttendance;
                                lectures = lectures-1;
                                newTotal = findTotal(lectures,labs,tutes);
                                tempAttendance = attendance;
                                attendance = findAttendance(newTotal);
                                if(attendance<75){
                                    attendance = tempAttendance;
                                    lectures = lectures+1;flagL=1;
                                    console.log(flagL)
                                }
                            }
                            else 
                            flagL=1;
                            
                            
                            if(labs!=0 && attendance>=75 && flagLab!=1){
                                let tempAttendance;
                                labs = labs-1;
                                newTotal = findTotal(lectures,labs,tutes);
                                tempAttendance = attendance;
                                attendance = findAttendance(newTotal);
                                if(attendance<75){
                                    attendance = tempAttendance;
                                    labs = labs+1;flagLab=1;
                                }
                            }
                            else 
                            flagLab=1;
                            
                            if(tutes!=0 && attendance>=75 && flagT!=1){
                                let tempAttendance;
                                tutes = tutes-1;
                                newTotal = findTotal(lectures,labs,tutes);
                                tempAttendance = attendance;
                                attendance = findAttendance(newTotal);
                                if(attendance<75){
                                    attendance = tempAttendance;
                                    tutes = tutes+1;flagT=1;
                                }
                            }
                            else 
                            flagT=1
                
                            ++flagTest;
                        }
                        console.log(flagTest);console.log(flagL);console.log(flagLab);console.log(flagT)
                        console.log((lecturesInitial - lectures) + " " + (labsInitial - labs) + " "  + (tutesInitial - tutes))
                        let missableClasses = [lecturesInitial - lectures,labsInitial - labs,tutesInitial - tutes]
                        database().ref("/Attendance/" + ID + "/" + courseName + "/" + "MissableClasses").set({
                            Lecture:missableClasses[0],
                            Lab:missableClasses[1],
                            Tute:missableClasses[2]
        
                        }).then(()=>{
                            database().ref("/Attendance/" + ID + "/" + courseName + "/" + "TradePts").set({
                                AvailablePts:0
                            }).then(()=>{
                                database().ref("/Attendance/" + ID + "/" + courseName + "/" + "MissedClasses").set({
                                    Lecture:0,
                                    Lab:0,
                                    Tute:0
                                }).then(()=>{
                                    database().ref("/Attendance/" + ID + "/" + courseName + "/" + "CondonedClasses").set({
                                        Lecture:0,
                                        Lab:0,
                                        Tute:0
                                    }).then(()=>{
                                        alert("Done saving to database");
                                        this.setState({saving:0});
                                        //window.alert("Done saving " + courseName);
                                        //window.location.reload();
        
                                        
                                    })
                                })
        
                            })
                        })
                    })
                    })
                })
                })
             function findTotal(lectures,labs,tutes){
                return lectures*weightLecture + labs*weightLab + tutes*weightTute;
            }
             function findAttendance(newTotal){
                return (newTotal/totalPoints)*100;
            }
        }

         checkWeight=(subject,courseName)=>{
            let subjectTimings,brokenSlots;
            console.log("in check weight")
        return new Promise((resolve,reject)=>{
            database().ref("/StudentsLLT/" + this.state.Id  + "/" + courseName).once('value').then((snap)=>{
                snap.forEach((subSnap)=>{
                    
                    if(subject=="Lecture"){
                     
                    if(subSnap.val().Lecture!=null){
                        subjectTimings = subSnap.val().Lecture;
                        
                      }
                    }
                    else if(subject=="Lab"){
                        if(subSnap.val().Lab!=null){
                            subjectTimings = subSnap.val().Lab;
                            
                          }
                    }
                    else if(subject=="Tute"){
                        if(subSnap.val().Tute!=null){
                            subjectTimings = subSnap.val().Tute;
                            
                          }
                    }
                    
                })
                
            }).then(()=>{
                if(subjectTimings!=null){
                    
                brokenSlots = this.BreakTimings(subjectTimings)
                resolve(brokenSlots/2);
                }
                else
                resolve(0);
            })
        })
        }

        BreakTimings=(timings)=>{
            let totalLength = 0;
            let time = timings.split("-");
         let start = time[0];
         let end = time[1];
         while(start!=end)
         {
             let prevStart = start;
             let tempSplit = start.split(':');
             if(tempSplit[1]=="00"){
                 tempSplit[1] = "30"
                start = tempSplit[0] +":" + tempSplit[1];
                ++totalLength;
                }
                else if(tempSplit[1]=="30"){
                    tempSplit[1] = "00";
                    tempSplit[0] = (parseInt(tempSplit[0]) + 1).toString();
                   start = tempSplit[0] +":" + tempSplit[1];
                  ++totalLength;
                   }
         }
        
         return totalLength;
        }


        deleteCourse = ()=>{
            let courseName = this.state.courseName;
            if(courseName==null)
            {
                window.alert("No course name")
                return;
            }
            database().ref("/Attendance/" + this.state.Id + "/" + courseName).remove().then(function(){
                database().ref("/Students/" + this.state.Id + "/" + courseName).remove().then(function(){
                    database().ref("/StudentsLLT/" + this.state.Id + "/" + courseName).remove().then(function(){
                       let tempArray =[]; let i=0;
                        database().ref("/Courses/" + this.state.Id).once('value').then(function(snap){
                            tempArray = snap.val().courses;
                            for(i=0;i<tempArray.length;++i){
                                if(tempArray[i]==courseName)
                                break;
                            }
                            if(i!=tempArray.length){
                                tempArray.splice(i,1);
                            }
                            database().ref("/Courses/" + ID).set({
                                courses:tempArray
                            }).then(function(){
                                window.alert("Removal of " + courseName + " Done" );
                            })
                        })
                    })
                })
            })
            
        
        }




        setHolidays=()=>{
            return new Promise((resolve,reject)=>{
                database().ref("/Holidays").once('value',(snap)=>{
                    if(snap.val().holidays!=null){
                    let holidays = snap.val().holidays;
                    resolve(holidays);
                    }
                    else{
                        let holidays=[];
                        resolve(holidays);
                    }
                })
            })
        }
  }

