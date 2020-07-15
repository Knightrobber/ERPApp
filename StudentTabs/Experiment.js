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
        date:null,
        Id:'',
        courseName:'',
        missableLectures:0,missableLabs:0,missableTutes:0,
        missableRunning:'',submitAttendanc1eRunning:'',
        missedLecture:false,missedLab:false,missedTute:false,
        condonedLecture:false,condonedLab:false,condonedTute:false,
        noClassLecture:false,noClassLab:false,noClassTute:false,
        extraClassLecture:false,extraClassLab:false,extraClassTute:false,
        doYouHaveAHoliday:false,
        category:'None', LectureC:0,LabC:0,TuteC:0,
          currentAttendance:0,endOfCourseAttendance:0,
        showScreen:0,advanced:0, TotalClasses:new Object(),MissedClasses:new Object(),MissableClasses:new Object(),CondonedClasses:new Object(),
        TradePts:new Object(),StartDate:new Object(),Holidays:[],Weight:new Object(),
        tempObj:new Object(),performedOperations:[],Courses:new Object(),EndDate:new Date("February 22 2020")
    };
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
          this.setState({Id:Id},()=>{this.mountEverything().then(()=>{
              console.log("Final mounting done");
              this.setState({showScreen:1});
          })});
      }
  })

 
  
  }
  render() {
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

    let Splash_Screen = (
        
        <View>
          <View style={styles.card1}>

              <View style={styles.inline}>
                <Text style={styles.text}>Choose Course</Text>
                <Dropdown data={myCourses} onChangeText={(courseName)=>{this.setState({courseName:courseName},()=>{this.onCourseChange(courseName)})}} containerStyle={{width:'30%'}}/>
              </View>
              <View>
                <View style={styles.inline}>
                  <Text style={styles.text}>Current Attendance </Text>
                  <Text style={styles.text2}>: {this.state.currentAttendance}</Text>
                </View>

                <View style={styles.inline}>
                  <Text style={styles.text}>Final Attendance </Text>
                  <Text style={styles.text2}>: {this.state.endOfCourseAttendance}</Text>
                </View>
              </View>
            
          </View>

          <View style={styles.card2}>
            <Text style={styles.texthead}>Missable Classes</Text>
            <Text style={{color:'white',fontSize:14}}>{this.state.courseName}</Text>
            <View>
              <View style={styles.inlineMargin}>
                <Text style={styles.text}>Lectures</Text>
                <Text style={styles.text2}>
                  : {this.state.missableLectures}
                </Text>
                <TouchableHighlight
                  style={styles.TradeButtonStyle}
                  activeOpacity={0.5}
                  onPress={()=>{this.TradeForLecture()}}>
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
                 onPress={()=>{this.TradeForLab()}}>
                  {/* <LinearGradient
                    colors={['#36D6BD', '#007E7B']}
                    start={{x: 0, y: 1}}
                    style={styles.Linear_G}> */}
                  <Text style={styles.SubmitTextStyle}>Trade</Text>
                  {/* </LinearGradient> */}
                </TouchableHighlight>
              </View>

              <View style={styles.inlineMargin}>
                <Text style={styles.text}>Tutes</Text>
                <Text style={styles.text2}>: {this.state.missableTutes}</Text>
                <TouchableHighlight
                  style={styles.TradeButtonStyle}
                  activeOpacity={0.5}
                  onPress={()=>{this.TradeForTute()}}>
                  {/* <LinearGradient
                    colors={['#36D6BD', '#007E7B']}
                    start={{x: 0, y: 1}}
                    style={styles.Linear_G}> */}
                  <Text style={styles.SubmitTextStyle}>Trade</Text>
                  {/* </LinearGradient> */}
                </TouchableHighlight>
              </View>
            </View>
           
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
              {/* <Text>advanced manipulations below</Text> */}
              {/* <Button
                title="Advanced"
                onPress={() => {
                  this.toggleAdvanced();
                }}
              /> */}
              <TouchableHighlight
                style={styles.AdvanceButtonStyle}
                activeOpacity={0.5}
                onPress={() => {
                  this.toggleAdvanced();
                }}>
                {/* <LinearGradient
                    colors={['#36D6BD', '#007E7B']}
                    start={{x: 0, y: 1}}
                    style={styles.Linear_G}> */}
                <Text style={styles.TextStyle}>Advanced</Text>
                {/* </LinearGradient> */}
              </TouchableHighlight>
            </View>
            {this.showAdvanced()}
          </View>
        </View>
      
    )
    
    
    
    let before_splash = (
        <View style={{backgroundColor: '#102138', flex: 1,justifyContent:'center',alignContent:'center',alignItems:'center'}}>
            <Text style={{fontSize:30,color:"white"}}>Holã Amigö!! </Text>
            <Text style={{fontSize:30,color:"white"}}>Your Playground's Lodinn!</Text>
            
 
        </View>
    )

    return (
        
        <ScrollView style={{backgroundColor: '#102138', flex: 1}}>
        {(this.state.showScreen == 1) ? Splash_Screen : before_splash}
        </ScrollView>
        
    );
  }

  showAdvanced = () => {
    let AttendanceCategory = [
        {label:"None", value:"None"},
        {label:"Missed", value:"Missed"},
        {label:"Condoned", value:"Condoned"},
        {label:"Missed But Condoned", value:"MnC"},
    ]


    if (this.state.advanced)
      return (
        <View style={styles.card3}>
          <Text style={styles.texthead}>Check Missable Classes</Text>
          <Text style={{color:'white',fontSize:14}}>{this.state.courseName}</Text>
          <View style={styles.inlineMarginHeading}>
            <Text style={styles.text}> Choose Category</Text>
            <Dropdown data={AttendanceCategory} onChangeText={(category)=>{this.setState({category:category})}} containerStyle={{width:'30%'}}/>
          </View>
          <View style={styles.inlineMargin}>
            <View style={{width: '30%'}}>
              <View style={{flexDirection: 'row'}}>
                <CheckBox
                   disabled={false}
                   value={this.state.LectureC}
                   onValueChange={(value)=>{this.setState({LectureC:value});}}
                  tintColors={{true: 'white', false: 'white'}}
                />
                <Text style={styles.textCheckbox}>Lecture</Text>
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
                  <Text style={styles.text3}>M</Text>
                  <Text style={styles.text3} >{(this.state.courseName != '') ? this.state.MissedClasses[this.state.courseName]["Lecture"] : "F"}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <Text style={styles.text3}>C</Text>
                  <Text style={styles.text3}>{(this.state.courseName != '') ? this.state.CondonedClasses[this.state.courseName]["Lecture"] : "F"}</Text>
                </View>
                
              </View>
            </View>

            <View style={{width: '33%'}}>
              <View style={{flexDirection: 'row'}}>
                <CheckBox
                  disabled={false}
                  value={this.state.LabC}
                  onValueChange={(value)=>{this.setState({LabC:value});}}
                  tintColors={{true: 'white', false: 'white'}}
                />
                <Text style={styles.textCheckbox}>Lab</Text>
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
                  <Text style={styles.text3}>M</Text>
                  <Text style={styles.text3}>{(this.state.courseName != '') ? this.state.MissedClasses[this.state.courseName]["Lab"] : "F"}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <Text style={styles.text3}>C</Text>
                  <Text style={styles.text3}>{(this.state.courseName != '') ? this.state.CondonedClasses[this.state.courseName]["Lab"] : "F"}</Text>
                </View>
                
              </View>
            </View>

            <View style={{width: '33%'}}>
              <View style={{flexDirection: 'row'}}>
                <CheckBox
                  disabled={false}
                  value={this.state.TuteC}
                  onValueChange={(value)=>{this.setState({TuteC:value});}}
                  tintColors={{true: 'white', false: 'white'}}
                />
                <Text style={styles.textCheckbox}>Tute</Text>
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
                  <Text style={styles.text3}>M</Text>
                  <Text style={styles.text3}>{(this.state.courseName != '') ? this.state.MissedClasses[this.state.courseName]["Tute"] : "F"}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <Text style={styles.text3}>C</Text>
                  <Text style={styles.text3}>{(this.state.courseName != '') ? this.state.CondonedClasses[this.state.courseName]["Tute"] : "F"}</Text>
                </View>
               
              </View>
            </View>
          </View>
          <View style={styles.inlineMargin}>
            <TouchableHighlight
              style={styles.UndoButtonStyle}
              activeOpacity={0.5}
              onPress={()=>{this.undoOperation()}}>
              {/* <LinearGradient
                    colors={['#36D6BD', '#007E7B']}
                    start={{x: 0, y: 1}}
                    style={styles.Linear_G}> */}
              <Text style={styles.SubmitTextStyle}>Undo</Text>
              {/* </LinearGradient> */}
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.SeeButtonStyle}
              activeOpacity={0.5}
              onPress = {()=>{this.CheckMissableClasses()}}>
              {/* <LinearGradient
                    colors={['#36D6BD', '#007E7B']}
                    start={{x: 0, y: 1}}
                    style={styles.Linear_G}> */}
              <Text style={styles.SubmitTextStyle}>See Missable Classes</Text>
              {/* </LinearGradient> */}
            </TouchableHighlight>
          </View>
        </View>
      );
  };

  



  toggleAdvanced = ()=>{
    this.setState({
        advanced:!this.state.advanced
    })
}

mountEverything = ()=>{
    let TotalClasses = new Object();let MissedClasses = new Object();let MissableClasses = new Object(); let CondonedClasses = new Object();
    let TradePts = new Object(); let Holidays;let Weight = new Object(); let StartDate = new Object(); let children = 0;let flagLec=0,flagLab=0,flagTut =0;
    let Courses = new Object();
    return new Promise((resolve,reject)=>{
        database().ref("/StudentsLLT/" + this.state.Id).once('value',(snap)=>{
            Courses = snap.val();
            this.setState({
                Courses:Courses
            })
        })
        database().ref("/Attendance/" + this.state.Id).once('value',(snap)=>{
            let tempCountLec =0,tempCountLab=0,tempCountTut=0,tempCount=0;
            children = snap.numChildren();
            let childrenTemp = children*3;
            console.log("The number of courses are " + snap.numChildren());
            snap.forEach((subSnap)=>{
                
                TotalClasses[subSnap.key] = new Object();
                TotalClasses[subSnap.key] = subSnap.val().TotalClasses;
                
                if(subSnap.val().MissedClasses!=null){
                    
                MissedClasses[subSnap.key] = new Object();
                MissedClasses[subSnap.key] = subSnap.val().MissedClasses;
                }
                else{
                    console.log(subSnap.key + " has missed no classes");
                    MissedClasses[subSnap.key] = new Object();
                    MissedClasses[subSnap.key]["Lecture"] = 0;
                    MissedClasses[subSnap.key]["Lab"] = 0;
                    MissedClasses[subSnap.key]["Tute"] = 0;
                }
                
                MissableClasses[subSnap.key] = new Object();
                MissableClasses[subSnap.key] = subSnap.val().MissableClasses;

                if(subSnap.val().CondonedClasses!=null){
                    //console.log(subSnap.key + " has no condoned classes");
                    CondonedClasses[subSnap.key] = new Object();
                    CondonedClasses[subSnap.key] = subSnap.val().CondonedClasses;
                    }
                    else{
                        CondonedClasses[subSnap.key] = new Object();
                        CondonedClasses[subSnap.key]["Lecture"] = 0;
                        CondonedClasses[subSnap.key]["Lab"] = 0;
                        CondonedClasses[subSnap.key]["Tute"] = 0;
                    }

                    TradePts[subSnap.key] = new Object();
                    TradePts[subSnap.key] = subSnap.val().TradePts; //check

                    if(subSnap.val().Dates!=null){
                        StartDate[subSnap.key] = new Object();
                        StartDate[subSnap.key] = subSnap.val().Dates.StartDate;// check
                    }
                    else{
                        database().ref("DatesOfSem").once('value',(snap)=>{
                            StartDate[subSnap.key] = new Object();
                            StartDate[subSnap.key] = snap.val().Beginning // check
                        })
                    }
                    database().ref("Holidays").once('value',(snap)=>{
                        Holidays = snap.val().holidays; //check
                    });
                    Weight[subSnap.key]= new Object();
                    this.checkWeight("Lecture",subSnap.key).then((weightLecture)=>{
                        //Weight[subSnap.key]= new Object();
                        Weight[subSnap.key]["Lecture"] = weightLecture;
                        ++tempCountLec;
                        if(tempCountLec==children){
                            console.log("Flags "  + flagLec + " " + flagLab + " " + flagTut);
                            flagLec =1;
                            if(flagLab && flagTut){
                            //console.log("mounting done");
                            console.log(subSnap.key);
                            console.log("Weights" + Weight[subSnap.key]["Lecture"] + " " +Weight[subSnap.key]["Lab"]+ " " + Weight[subSnap.key]["Tute"]);
                            this.setState({
                                TotalClasses:TotalClasses,
                                MissableClasses:MissableClasses,
                                MissedClasses:MissedClasses,
                                TradePts:TradePts,
                                CondonedClasses:CondonedClasses,
                                Holidays:Holidays,
                                StartDate:StartDate,
                                Weight:Weight

                            },()=>{resolve()})
                            }
                        }
                        
                    });
                    this.checkWeight("Lab",subSnap.key).then((weightLab)=>{
                        //Weight[subSnap.key]= new Object();
                        Weight[subSnap.key]["Lab"] = weightLab;
                        ++tempCountLab;
                        if(tempCountLab==children){
                            console.log("Flags "  + flagLec + " " + flagLab + " " + flagTut);
                            flagLab =1;
                            if(flagLec && flagTut){
                            console.log("mounting done");
                            this.setState({
                                TotalClasses:TotalClasses,
                                MissableClasses:MissableClasses,
                                MissedClasses:MissedClasses,
                                TradePts:TradePts,
                                CondonedClasses:CondonedClasses,
                                Holidays:Holidays,
                                StartDate:StartDate,
                                Weight:Weight
                            },()=>{resolve()})
                            }
                        }
                    });
                    this.checkWeight("Tute",subSnap.key).then((weightTute)=>{
                        console.log("Flags "  + flagLec + " " + flagLab + " " + flagTut);
                        //Weight[subSnap.key]= new Object();
                        Weight[subSnap.key]["Tute"] = weightTute;
                        ++tempCountTut;
                        if(tempCountTut==children){
                            flagTut =1;
                            if(flagLec && flagTut){
                            console.log("mounting done");
                            this.setState({
                                TotalClasses:TotalClasses,
                                MissableClasses:MissableClasses,
                                MissedClasses:MissedClasses,
                                TradePts:TradePts,
                                CondonedClasses:CondonedClasses,
                                Holidays:Holidays,
                                StartDate:StartDate,
                                Weight:Weight
                            },()=>{
                                
                            resolve();
                        })
                            }
                        }
                    });

            })
        })
    })
   
}

onCourseChange = (courseName) => {
    this.setState({courseName:courseName});
    this.showMissableClasses();
    this.setState({performedOperations:[]});
    this.checkAttendance(moment(new Date(this.state.StartDate[courseName])),this.state.EndDate);
    /*
    database().ref("/Attendance/" + this.state.Id + "/" + courseName + "/Dates").once('value',(snap)=>{
        if(snap.val()!=null)
        {
            // startDate = new Date(snap.val().StartDate);
            startDate = moment(new Date(snap.val().StartDate),"YYYY-MM-DD");
            console.log("the start date is " + startDate);
        }
        else
        {
            database().ref("DatesOfSem").once('value',(snap)=>{
                startDate = new Date(snap.val().Beginning);
                console.log("Date of beginning sem "+ startDate);
            })
        }
        this.checkAttendance(startDate,endDate);
    })
    */
}

showMissableClasses=()=>{
    let courseName=this.state.courseName;
    console.log(this.state.Id);
    console.log(courseName)
    if(courseName=='')
    {
        alert("No course has been chosen");
        return;
    }
    this.setState({missableRunning:'Running'})
    console.log("The name of the fuking course is " + courseName + "/MissableClasses")
       console.log("Missable " + this.state.MissableClasses[courseName]["Lecture"]);
        this.setState({
            missableLectures:this.state.MissableClasses[courseName]["Lecture"],
            missableLabs:this.state.MissableClasses[courseName]["Lab"],
            missableTutes:this.state.MissableClasses[courseName]["Tute"]
        },()=>{
            this.setState({missableRunning:'Done'});
            
        })
        
    
        
    
}

missableClassesNew=()=>{ // DEAL WITH THIS

    /*let missableLecturesD = document.getElementById("missableLectures");
    let missableLabsD = document.getElementById("missableLabs");
    let missableTutesD = document.getElementById("missableTutes");
    let missedLecture=0;let missedLab = 0; let missedTute =0;
    */
   let ID = this.state.Id;let courseName = this.state.courseName;
    let lectures,tutes,labs,totalPoints,newTotal;
    let lecturesInitial,tutesInitial,labsInitial;
    let lectureMissedInitial=0;
    let labMissedInitial=0;
    let tuteMissedInitial=0;
    let weightLecture,weightLab,weightTute;
    let flagL=0;let flagLab=0; let flagT=0;let flagTest = 0
    console.log("in missable classes");
    console.log(courseName);

      lectures = this.state.TotalClasses[courseName]["Lecture"];lecturesInitial=lectures
      labs = this.state.TotalClasses[courseName]["Lab"];labsInitial=labs;
      tutes = this.state.TotalClasses[courseName]["Tute"];tutesInitial=tutes;
      

      console.log(lectures + " " + labs + " " + tutes + "before subtracting missed classes");
              lectures = lectures - this.state.MissedClasses[courseName]["Lecture"]; lectureMissedInitial=lectures;
              labs = labs - this.state.MissedClasses[courseName]["Lab"];labMissedInitial=labs;
              tutes = tutes- this.state.MissedClasses[courseName]["Tute"];tuteMissedInitial=tutes;
              console.log("The missed classes are " + this.state.MissedClasses[courseName]["Lecture"] + " " + this.state.MissedClasses[courseName]["Lab"] +" " + this.state.MissedClasses[courseName]["Tute"])
          
      
      console.log(lectures + " " + labs + " " + tutes + "after subtracting missed classes");
            weightLecture=this.state.Weight[courseName]["Lecture"];
            weightLab=this.state.Weight[courseName]["Lab"];
            weightTute=this.state.Weight[courseName]["Tute"];
                    
                console.log("after checking weights")
                console.log(weightLecture + " " + weightLab + " " + weightTute);

                totalPoints = findTotal(lecturesInitial,labsInitial,tutesInitial);
                console.log("total points without " +totalPoints )
                newTotal = findTotal(lectures,labs,tutes);
                let attendance = (newTotal/totalPoints)*100;
                console.log("Initial attendance " +attendance);
                while((flagL!=1 || flagLab!=1 || flagT!=1) && flagTest<15)
                {
                    if(lectures!=0 && attendance>=75 && flagL!=1){
                        let tempAttendance;
                        lectures = lectures-1;
                        newTotal = findTotal(lectures,labs,tutes);
                        tempAttendance = attendance;
                        attendance = findAttendance(newTotal);
                        //console.log("Attendance at lecture " + attendance);
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
                        console.log("Attendance at lab " + attendance);
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
                console.log(lectureMissedInitial);
                console.log(lectures)
                console.log((lectureMissedInitial - lectures) + " " + (labMissedInitial - labs) + " "  + (tuteMissedInitial - tutes))
                let missableClasses = [lectureMissedInitial - lectures, labMissedInitial - labs , tuteMissedInitial - tutes]
                
                    console.log("At the end of missable classes new");
                    let tempMissableClasses = this.state.MissableClasses;
                    tempMissableClasses[courseName]["Lecture"] = missableClasses[0];
                    tempMissableClasses[courseName]["Lab"] = missableClasses[1];
                    tempMissableClasses[courseName]["Tute"] = missableClasses[2];
                    console.log()
                    this.setState({
                        MissableClasses:tempMissableClasses,
                        missableLectures:tempMissableClasses[courseName]["Lecture"],
                        missableLabs:tempMissableClasses[courseName]["Lab"],
                        missableTutes:tempMissableClasses[courseName]["Tute"]
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
           // console.log(subjectTimings);
        brokenSlots = this.BreakTimings(subjectTimings)
        console.log("the weight " + brokenSlots/2)
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
// console.log("end " + end);
 while(start!=end)
 {
     let prevStart = start;
     let tempSplit = start.split(':');
     if(tempSplit[1]=="00"){
         tempSplit[1] = "30"
        start = tempSplit[0] +":" + tempSplit[1];
       // console.log("Start " + start)
        ++totalLength;
        }
        else if(tempSplit[1]=="30"){
            tempSplit[1] = "00";
            tempSplit[0] = (parseInt(tempSplit[0]) + 1).toString();
           start = tempSplit[0] +":" + tempSplit[1];
       //    console.log("Start " + start)
          ++totalLength;
           }
 }
// console.log("total length of broken time " + totalLength);
 return totalLength;
}


missed=(ID,courseName,LectureC,LabC,TuteC,operationObj)=>{ //checking
    let lecture,lab,tute;
   // let missableLectures, missableLabs, missableTutes;
    let missedLect =0; let missedLab=0; let missedTut=0;
    lecture = LectureC;
    lab = LabC;
    tute = TuteC;
 /*  let  missableLecturesD = document.getElementById("missableLectures");
    missableLabsD = document.getElementById("missableLabs");
    missableTutesD = document.getElementById("missableTutes");
    */
   
    console.log("Missed classes of " + courseName + this.state.MissedClasses[courseName]["Lecture"] +this.state.MissedClasses[courseName]["Lab"]+this.state.MissedClasses[courseName]["Tute"])
    if(lecture  || lab  || tute ){ 

        if(lecture){
             if(this.state.TotalClasses[courseName]["Lecture"]!=0)
             missedLect=1
             else
             {
                 alert("Lecture doesn't exist for " + courseName);
                 return;
             }
             
    }
        if(lab){
            if(this.state.TotalClasses[courseName]["Lab"]!=0)    
             missedLab=1
            else{
                alert("Lab doesn't exist for " + courseName);
                 return;
            }
            }
        if(tute){
            if(this.state.TotalClasses[courseName]["Tute"]!=0)
            missedTut=1
            else
            {
                alert("Tute doesn't exist for " + courseName);
                return;
            }
    }

                    let performedOperations = this.state.performedOperations //for undo
                    performedOperations.push(operationObj)
                    this.setState({
                        performedOperations:performedOperations
                    });


                    if(missedLect ==1)
                    missedLect = this.state.MissedClasses[courseName]["Lecture"]+1;
                    else
                    missedLect = this.state.MissedClasses[courseName]["Lecture"];
                    if(missedLab==1)
                    missedLab = this.state.MissedClasses[courseName]["Lab"] +1;
                    else
                    missedLab = this.state.MissedClasses[courseName]["Lab"];
                    if(missedTut==1)
                    missedTut = this.state.MissedClasses[courseName]["Tute"] +1;
                    else
                    missedTut = this.state.MissedClasses[courseName]["Tute"];

                    let tempMissedClasses = this.state.MissedClasses;
                    tempMissedClasses[courseName]["Lecture"] = missedLect;
                    tempMissedClasses[courseName]["Lab"] = missedLab;
                    tempMissedClasses[courseName]["Tute"] = missedTut;
                    this.setState({
                        MissedClasses:tempMissedClasses
                    });

}


}
undoMissed=(ID,courseName,LectureC,LabC,TuteC)=>{ //checking
    let lecture,lab,tute;
   // let missableLectures, missableLabs, missableTutes;
    let missedLect =0; let missedLab=0; let missedTut=0;
    lecture = LectureC;
    lab = LabC;
    tute = TuteC;
 /*  let  missableLecturesD = document.getElementById("missableLectures");
    missableLabsD = document.getElementById("missableLabs");
    missableTutesD = document.getElementById("missableTutes");
    */
    console.log("Missed classes of " + courseName + this.state.MissedClasses[courseName]["Lecture"] +this.state.MissedClasses[courseName]["Lab"]+this.state.MissedClasses[courseName]["Tute"])
    if(lecture  || lab  || tute ){ 
        if(lecture){
            
             missedLect=1
             
    }
        if(lab){
                
             missedLab=1
           
            }
        if(tute){

            missedTut=1
         
    }
                
                    if(missedLect ==1)
                    missedLect = this.state.MissedClasses[courseName]["Lecture"]-1;
                    else
                    missedLect = this.state.MissedClasses[courseName]["Lecture"];
                    if(missedLab==1)
                    missedLab = this.state.MissedClasses[courseName]["Lab"] -1;
                    else
                    missedLab = this.state.MissedClasses[courseName]["Lab"];
                    if(missedTut==1)
                    missedTut = this.state.MissedClasses[courseName]["Tute"] -1;
                    else
                    missedTut = this.state.MissedClasses[courseName]["Tute"];

                    let tempMissedClasses = this.state.MissedClasses; 
                    tempMissedClasses[courseName]["Lecture"] = missedLect;
                    tempMissedClasses[courseName]["Lab"] = missedLab;
                    tempMissedClasses[courseName]["Tute"] = missedTut;
                    this.setState({
                        MissedClasses:tempMissedClasses
                    });

}


}


condoned=(ID,courseName,LectureC,LabC,TuteC,operationObj)=>{
    console.log("in condoned")
let lecture,lab,tute;
let TotalLectures,TotalLabs,TotalTutes;
let condonedL =0 ; let condonedLab = 0; let condonedT=0;
lecture = LectureC;
lab = LabC;
tute = TuteC;

if(lecture  || lab  || tute ){
    TotalLectures = this.state.TotalClasses[courseName]["Lecture"]; 
    TotalLabs = this.state.TotalClasses[courseName]["Lab"]; 
    TotalTutes= this.state.TotalClasses[courseName]["Tute"];
    console.log("Total classes before condement " + TotalLectures + " labs " + TotalLabs +" Tutes" + TotalTutes);
    if(lecture ){ 
        if(TotalLectures!=0){
        TotalLectures = TotalLectures -1;
        condonedL=1;
        }
        else{
        alert(courseName + " " + "does not have a lecture to be condoned")
        return;}
    }
        if(lab ){
            if(TotalLabs!=0){
                TotalLabs = TotalLabs -1;
                condonedLab=1;
                }
                else{
                    alert(courseName + " " + "does not have a lab to be condoned")
                    return;
                }

    }
        if(tute ){
            if(TotalTutes!=0){
                TotalTutes = TotalTutes -1;
                condonedT=1;
                }
                else{
                    alert(courseName + " " + "does not have a tute to be condoned")
                    return;
                }
            }
            console.log("total classes after conding " + TotalLectures + " " + TotalLabs + " " + TotalTutes );
            let tempTotalClasses = this.state.TotalClasses;
            tempTotalClasses[courseName]["Lecture"] = TotalLectures;
            tempTotalClasses[courseName]["Lab"] = TotalLabs;
            tempTotalClasses[courseName]["Tute"] = TotalTutes;
            

            let performedOperations = this.state.performedOperations //for undo
            performedOperations.push(operationObj)
            this.setState({
                performedOperations:performedOperations
            });

                            if(condonedL==1)
                        condonedL = this.state.CondonedClasses[courseName]["Lecture"] + 1;
                        else
                        condonedL = this.state.CondonedClasses[courseName]["Lecture"];
                        if(condonedLab ==1)
                        condonedLab = this.state.CondonedClasses[courseName]["Lab"] + 1;
                        else
                        condonedLab = this.state.CondonedClasses[courseName]["Lab"];
                        if(condonedT ==1)
                        condonedT = this.state.CondonedClasses[courseName]["Tute"] + 1;
                        else
                        condonedT = this.state.CondonedClasses[courseName]["Tute"];

                        let tempCondonedClasses = this.state.CondonedClasses;
                        tempCondonedClasses[courseName]["Lecture"] = condonedL;
                        tempCondonedClasses[courseName]["Lab"] = condonedLab;
                        tempCondonedClasses[courseName]["Tute"] = condonedT;
                        
                        this.setState({
                            CondonedClasses:tempCondonedClasses,
                            TotalClasses:tempTotalClasses
                        });
}






}
undoCondoned=(ID,courseName,LectureC,LabC,TuteC)=>{
console.log("in condoned")
let lecture,lab,tute;
let TotalLectures,TotalLabs,TotalTutes;
let condonedL =0 ; let condonedLab = 0; let condonedT=0;
lecture = LectureC;
lab = LabC;
tute = TuteC;

if(lecture  || lab  || tute ){
TotalLectures = this.state.TotalClasses[courseName]["Lecture"]; 
TotalLabs = this.state.TotalClasses[courseName]["Lab"]; 
TotalTutes= this.state.TotalClasses[courseName]["Tute"];
console.log("Total classes before condement " + TotalLectures + " labs " + TotalLabs +" Tutes" + TotalTutes);
if(lecture ){ 
 
    TotalLectures = TotalLectures +1;
    condonedL=1;
    
    
}
    if(lab ){

            TotalLabs = TotalLabs +1;
            condonedLab=1;
            
            

}
    if(tute ){
       
            TotalTutes = TotalTutes +1;
            condonedT=1;
            
          
        }
        console.log("total classes after conding " + TotalLectures + " " + TotalLabs + " " + TotalTutes );
        let tempTotalClasses = this.state.TotalClasses;
        tempTotalClasses[courseName]["Lecture"] = TotalLectures;
        tempTotalClasses[courseName]["Lab"] = TotalLabs;
        tempTotalClasses[courseName]["Tute"] = TotalTutes;

                    if(condonedL==1)
                    condonedL = this.state.CondonedClasses[courseName]["Lecture"] - 1;
                    else
                    condonedL = this.state.CondonedClasses[courseName]["Lecture"];
                    if(condonedLab ==1)
                    condonedLab = this.state.CondonedClasses[courseName]["Lab"] - 1;
                    else
                    condonedLab = this.state.CondonedClasses[courseName]["Lab"];
                    if(condonedT ==1)
                    condonedT = this.state.CondonedClasses[courseName]["Tute"] - 1;
                    else
                    condonedT = this.state.CondonedClasses[courseName]["Tute"];

                    let tempCondonedClasses = this.state.CondonedClasses;
                    tempCondonedClasses[courseName]["Lecture"] = condonedL;
                    tempCondonedClasses[courseName]["Lab"] = condonedLab;
                    tempCondonedClasses[courseName]["Tute"] = condonedT;
                    
                    this.setState({
                        CondonedClasses:tempCondonedClasses,
                        TotalClasses:tempTotalClasses
                    });
}






}


MnC = (ID,courseName,LectureC,LabC,TuteC,operationObj) =>{
let lecture,lab,tute
let MnCLect = 0;let MnCLab = 0;let MnCTut = 0;
lecture = LectureC;
lab = LabC;
tute = TuteC;

console.log("Checked classes " + lecture + lab + tute);

//let temp1 = new Object();let temp2 = new Object();
//temp1.Lecture = 1;temp1.Lab =1;temp1.Tute = 1;
//temp2.Lecture = 1;temp2.Lab =1;temp2.Tute = 1;

        let TotalClasses = this.state.TotalClasses[courseName];
        if(this.state.MissedClasses[courseName]["Lecture"]==0 && this.state.MissedClasses[courseName]["Lab"]==0 && this.state.MissedClasses[courseName]["Tute"]==0)
        {alert("You haven't missed any classes to get them condoned ");return;}
        let MissedClasses = this.state.MissedClasses[courseName];
        let CondonedClasses = this.state.CondonedClasses[courseName];
        /*
        if(snap.val().CondonedClasses == null){
            CondonedClasses = new Object();
            CondonedClasses.Lecture = 0;CondonedClasses.Lab = 0;CondonedClasses.Tute = 0;
        }
        else
        CondonedClasses = snap.val().CondonedClasses;
        */

        //console.log(TotalClasses.Lecture);
        console.log("Total lectures before alert "  +this.state.TotalClasses[courseName]["Lecture"]);
if(lecture||lab||tute){
        if(lecture){
            if(MissedClasses.Lecture>0 && TotalClasses.Lecture!=null)
            MnCLect =1;
            else
            {alert("You havn't missed any lectures in " + courseName + " to be condoned");return;}

            /*
            if(MissedClasses.Lecture>0 && TotalClasses.Lecture!=null)
            MissedClasses.Lecture = MissedClasses.Lecture -1;
            else
            {if(!MissedClasses.Lecture>0)
                alert("You havn't missed any lectures in " + courseName + " to be condoned ");
            if(TotalClasses.Lecture==null)
            alert(courseName + " does not have lectures");
            return}

            if(TotalClasses.Lecture!=null)
            TotalClasses.Lecture = TotalClasses.Lecture -1;
            else
            {alert(courseName + " does not have lectures");return}

            CondonedClasses.Lecture = CondonedClasses.Lecture +1;
            */

        }


        if(lab){
            if(MissedClasses.Lab>0 && TotalClasses.Lab!=null)
            MnCLab = 1;
            else
            {alert("You havn't missed any Labs in " + courseName + " to be condoned ");return;}
            /*
            if(MissedClasses.Lab>0 && TotalClasses.Lab!=null)
            MissedClasses.Lab = MissedClasses.Lab -1;
            else
            {   if(!MissedClasses.Lab>0)
                alert("You havn't missed any Labs in " + courseName + " to be condoned ");
                if( TotalClasses.Lab==null)
                alert(courseName + " does not have Labs");
                return
            }
            CondonedClasses.Lab = CondonedClasses.Lab +1;

            if(TotalClasses.Lab!=null)
            TotalClasses.Lab = TotalClasses.Lab -1;
            else
            {alert(courseName + " does not have Labs");return}
            */
            

        }
        

        if(tute){
            if(MissedClasses.Tute>0 && TotalClasses.Tute!=null)
            MnCTut =1;
            else
            { alert("You havn't missed any Tutes in " + courseName + " to be condoned ");return;}
            /*
            if(MissedClasses.Tute>0 && TotalClasses.Tute!=null)
            MissedClasses.Tute = MissedClasses.Tute -1;
            else
            {
                if(!MissedClasses.Tute>0)
                alert("You havn't missed any Tutes in " + courseName + " to be condoned ");
                if(TotalClasses.Tute==null)
                alert(courseName + " does not have Tutes");
            console.log("total classes after alert " + this.state.TotalClasses[courseName]["Lecture"]);
            console.log("Im returning");
            return
        }

            if(TotalClasses.Tute!=null)
            TotalClasses.Tute = TotalClasses.Tute -1;
            else
            {alert(courseName + " does not have Tutes");return}

            
            CondonedClasses.Tute = CondonedClasses.Tute +1;
            console.log("i didn't return");
        */
        }

        if(MnCLect){
            TotalClasses.Lecture = TotalClasses.Lecture -1;
            MissedClasses.Lecture = MissedClasses.Lecture -1;
            CondonedClasses.Lecture = CondonedClasses.Lecture +1;
        }
        if(MnCLab){
            TotalClasses.Lecture = TotalClasses.Lecture -1;
            MissedClasses.Lecture = MissedClasses.Lecture -1;
            CondonedClasses.Lecture = CondonedClasses.Lecture +1;
        }
        if(MnCTut){
            TotalClasses.Tute = TotalClasses.Tute -1;
            MissedClasses.Tute = MissedClasses.Tute -1;
            CondonedClasses.Tute = CondonedClasses.Tute +1;
        }


    }

        let performedOperations = this.state.performedOperations //for undo
                    performedOperations.push(operationObj)
                    this.setState({
                        performedOperations:performedOperations
                    });
                    
        let tempTotalClasses = this.state.TotalClasses;
        tempTotalClasses[courseName]["Lecture"] = TotalClasses.Lecture;
        tempTotalClasses[courseName]["Lab"] = TotalClasses.Lab;
        tempTotalClasses[courseName]["Tute"] = TotalClasses.Tute;
                    
        let tempMissedClasses = this.state.MissedClasses;
        tempMissedClasses[courseName]["Lecture"] = MissedClasses.Lecture;
        tempMissedClasses[courseName]["Lab"] = MissedClasses.Lab
        tempMissedClasses[courseName]["Tute"] = MissedClasses.Tute;

        let tempCondonedClasses = this.state.CondonedClasses;
        tempCondonedClasses[courseName]["Lecture"] = CondonedClasses.Lecture;
        tempCondonedClasses[courseName]["Lab"] = CondonedClasses.Lab;
        tempCondonedClasses[courseName]["Tute"] = CondonedClasses.Tute;

        this.setState({
            TotalClasses:tempTotalClasses,
            MissedClasses:tempMissedClasses,
            CondonedClasses:tempCondonedClasses
        })

}
undoMnC = (ID,courseName,LectureC,LabC,TuteC) =>{
let lecture,lab,tute
let TotalLectures,TotalLabs,TotalTutes;
let MissedLectures,missedLabs,MissedTutes;
lecture = LectureC;
lab = LabC;
tute = TuteC;

//let temp1 = new Object();let temp2 = new Object();
//temp1.Lecture = 1;temp1.Lab =1;temp1.Tute = 1;
//temp2.Lecture = 1;temp2.Lab =1;temp2.Tute = 1;

        let TotalClasses = this.state.TotalClasses[courseName];
        let MissedClasses = this.state.MissedClasses[courseName];
        let CondonedClasses = this.state.CondonedClasses[courseName];
        /*
        if(snap.val().CondonedClasses == null){
            CondonedClasses = new Object();
            CondonedClasses.Lecture = 0;CondonedClasses.Lab = 0;CondonedClasses.Tute = 0;
        }
        else
        CondonedClasses = snap.val().CondonedClasses;
        */

        //console.log(TotalClasses.Lecture);

        if(lecture){
            console.log("undoing missed classes LEcture")
            TotalClasses.Lecture = TotalClasses.Lecture +1;
            MissedClasses.Lecture = MissedClasses.Lecture +1;
            CondonedClasses.Lecture = CondonedClasses.Lecture -1;

        }


        if(lab){

            TotalClasses.Lab = TotalClasses.Lab +1;
            MissedClasses.Lab = MissedClasses.Lab +1;
            CondonedClasses.Lab = CondonedClasses.Lab -1;

        }
        

        if(tute){
            console.log("undoing missed Tutes");
            TotalClasses.Tute = TotalClasses.Tute +1;
            MissedClasses.Tute = MissedClasses.Tute +1;
            CondonedClasses.Tute = CondonedClasses.Tute -1;

        }
        let tempTotalClasses = this.state.TotalClasses;
        tempTotalClasses[courseName]["Lecture"] = TotalClasses.Lecture;
        tempTotalClasses[courseName]["Lab"] = TotalClasses.Lab;
        tempTotalClasses[courseName]["Tute"] = TotalClasses.Tute;
                    
        let tempMissedClasses = this.state.MissedClasses;
        tempMissedClasses[courseName]["Lecture"] = MissedClasses.Lecture;
        tempMissedClasses[courseName]["Lab"] = MissedClasses.Lab
        tempMissedClasses[courseName]["Tute"] = MissedClasses.Tute;

        let tempCondonedClasses = this.state.CondonedClasses;
        tempCondonedClasses[courseName]["Lecture"] = CondonedClasses.Lecture;
        tempCondonedClasses[courseName]["Lab"] = CondonedClasses.Lab;
        tempCondonedClasses[courseName]["Tute"] = CondonedClasses.Tute;

        this.setState({
            TotalClasses:tempTotalClasses,
            MissedClasses:tempMissedClasses,
            CondonedClasses:tempCondonedClasses
        })

}
undoOperation=()=>{
console.log("name of course in undo " + this.state.courseName);
if(this.state.performedOperations.length==0){
    alert("No operations performed to be undone");
    return;
}
console.log(this.state.performedOperations)
let Obj = this.state.performedOperations.pop();
if(Obj.operation=="missed")
    this.undoMissed(this.state.Id,this.state.courseName,Obj.checked[0],Obj.checked[1],Obj.checked[2]);

else if(Obj.operation=="condoned")
    this.undoCondoned(this.state.Id,this.state.courseName,Obj.checked[0],Obj.checked[1],Obj.checked[2]);

else if(Obj.operation=="MnC")
    this.undoMnC(this.state.Id,this.state.courseName,Obj.checked[0],Obj.checked[1],Obj.checked[2]);

    this.missableClassesNew();
    this.checkAttendance(moment(new Date(this.state.StartDate[this.state.courseName])),this.state.EndDate);
}

CheckMissableClasses=()=>{
  
    console.log(this.state.StartDate["DOM105"])
    this.countLectures(this.state.Id,"DOM105",moment(new Date(this.state.StartDate["DOM105"])),new Date("February 22 2020"));
   
    
    let courseName = this.state.courseName;
    let category = this.state.category;
    if(courseName =='' || category=="None")
    {
        alert("Course or Attendance category hasn't been chosen ");
        return;
    }
    
    console.log(courseName);console.log("Category " + category);
    let LectureC = this.state.LectureC,LabC = this.state.LabC, TuteC = this.state.TuteC; 
    if(!LectureC && !LabC && !TuteC)
    {alert("Neither of lecture lab or tute have been selected ");return;}
    if(category == "Missed"){
    //this.missed(this.state.Id,this.state.courseName,LectureC,LabC,TuteC).then(()=>{this.missableClassesNew().then(()=>{this.attendanceAfterSubmit(courseName)})});
    let ObjArr = [LectureC,LabC,TuteC];
    let Obj = new Object();Obj.operation="missed";Obj.checked = ObjArr;
    this.missed(this.state.Id,this.state.courseName,LectureC,LabC,TuteC,Obj);this.missableClassesNew();
    }
    if(category == "Condoned"){
        let ObjArr = [LectureC,LabC,TuteC];
        let Obj = new Object();Obj.operation="condoned";Obj.checked = ObjArr;
       
    this.condoned(this.state.Id,this.state.courseName,LectureC,LabC,TuteC,Obj);this.missableClassesNew();
    }
    if(category == "MnC"){
        let ObjArr = [LectureC,LabC,TuteC];
        let Obj = new Object();Obj.operation="MnC";Obj.checked = ObjArr;
      
    this.MnC(this.state.Id,this.state.courseName,LectureC,LabC,TuteC,Obj);this.missableClassesNew();
    }
    this.checkAttendance(moment(new Date(this.state.StartDate[courseName])),this.state.EndDate);
    
    

    /*
    this.missed(this.state.Id,courseName).then(()=>{
        this.condoned(this.state.Id,courseName).then(()=>{
            this.noClass(this.state.Id,courseName).then(()=>{
                this.extraClass(this.state.Id,courseName).then(()=>{
                    this.missableClassesNew(this.state.Id,courseName);
                })
            })
        })
    })
    */
}

checkAttendance = (startDate,endDate)=>{

    
    // let date = new Date().getTime();
     let ID = this.state.Id;
     let courseName = this.state.courseName;
     if(courseName=='')
     {
     alert('No course Entered');
     return;
     }
    // database().ref("/Attendance/" + ID + "/" + courseName)
     let currentAttendance = this.state.currentAttendance
     let endOfCourseAttendance = this.state.endOfCourseAttendance
     //let missableLectures = document.getElementById("missableLectures");
     //let missableLabs = document.getElementById("missableLabs");
     //let missableTutes = document.getElementById("missableTutes");
     let Total = new Object(); let Missed = new Object(); let Condoned = new Object();let Missable = new Object(); let Attended = new Object(); let soFar = new Object();
     let Weight = new Object();
     let AttendanceSofar; let AttendanceTotal;
     Total.Lecture = 0;Total.Lab =0; Total.Tute=0;
     Missable.Lecture = 0;Missable.Lab=0;Missable.Tute=0;
     Missed.Lecture =0; Missed.Lab=0;Missed.Tute=0
     Condoned.Lecture=0; Condoned.Lab=0; Condoned.Tute=0;
     Attended.Lecture=0;Attended.Lab=0;Attended.Tute=0;
     soFar.Lecture=0;soFar.Lab=0;soFar.Tute=0;
     Weight.Lecture = 0; Weight.Lab = 0; Weight.Tute = 0;
     
     let TotalClasses = this.state.TotalClasses[courseName]; //MissableClasses = snap.val().MissableClasses;
     Total.Lecture = TotalClasses.Lecture;Total.Lab = TotalClasses.Lab;Total.Tute = TotalClasses.Tute;
     // Missable.Lecture = MissableClasses.Lecture ; Missable.Lab=MissableClasses.Lab ; Missable.Tute=MissableClasses.Tute;
    
     let MissedClasses = this.state.MissedClasses[courseName]
     Missed.Lecture = MissedClasses.Lecture; Missed.Lab = MissedClasses.Lab ;Missed.Tute = MissedClasses.Tute;
     
     
         let CondonedClasses = this.state.CondonedClasses[courseName];
         Condoned.Lecture=CondonedClasses.Lecture; Condoned.Lab = CondonedClasses.Lab ; Condoned.Tute = CondonedClasses.Tute;
     
   //  let  startDate = new Date(snap.val().Dates.StartDate);
   // let  endDate = new Date("February 22 2020");

             Weight.Lecture = this.state.Weight[courseName]["Lecture"]
             Weight.Lab = this.state.Weight[courseName]["Lab"]
             Weight.Tute = this.state.Weight[courseName]["Tute"]

                     soFar.Lecture = this.countLectures(ID,courseName,startDate,endDate)
                     soFar.Lab =  this.countLabs(ID,courseName,startDate,endDate)
                     soFar.Tute =  this.countTutes(ID,courseName,startDate,endDate)
                         soFar.Lecture = soFar.Lecture - Condoned.Lecture;
                         soFar.Lab = soFar.Lab - Condoned.Lab;
                         soFar.Tute = soFar.Tute - Condoned.Tute;
                         
                         Attended.Lecture = soFar.Lecture - Missed.Lecture; Attended.Lab = soFar.Lab - Missed.Lab; Attended.Tute = soFar.Tute - Missed.Tute;
                         console.log("is the negative here " + Attended.Lecture);console.log(Attended.Lab);console.log(Attended.Tute);
                         AttendanceSofar = ((Attended.Lecture*Weight.Lecture + Attended.Lab * Weight.Lab + Attended.Tute*Weight.Tute)/(soFar.Lecture*Weight.Lecture + soFar.Lab*Weight.Lab + soFar.Tute*Weight.Tute))*100;
                         console.log(AttendanceSofar);
                         //currentAttendance.value = AttendanceSofar
                         let temp = new Object();
                         temp.Lecture = Total.Lecture - Missed.Lecture; temp.Lab = Total.Lab - Missed.Lab; temp.Tute = Total.Tute - Missed.Tute;
                         console.log(temp.Lecture + " " + temp.Lab + " " + temp.Tute);
                         AttendanceTotal = ((temp.Lecture*Weight.Lecture + temp.Lab*Weight.Lab + temp.Tute*Weight.Tute)/(Total.Lecture*Weight.Lecture + Total.Lab * Weight.Lab + Total.Tute * Weight.Tute))*100;
                         console.log(AttendanceTotal);
                         console.log(Weight.Lecture + " " + Weight.Lab + " " + Weight.Tute);
                         //endOfCourseAttendance.value = AttendanceTotal;
     
                         this.setState({currentAttendance:Math.floor(AttendanceSofar),endOfCourseAttendance:Math.floor(AttendanceTotal)});
                        // missableLectures.value = Missable.Lecture; missableLabs.value = Missable.Lab; missableTutes.value = Missable.Tute;
                     
                 
             
         
     
     
     
     
     
     
     
     
     }

     countLectures=(ID,courseName,startDate,endDate)=>{

            let daysOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        let days = [];
            let course = this.state.Courses[courseName];
            let keys = Object.keys(course);
            for(let i=0;i<keys.length;++i){
                if(course[keys[i]].Lecture!=null)
                days.push(keys[i]);
            }
            
            let holidays;
            holidays = this.state.Holidays;
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
            return lectures;

    } // uses LLT

    countLabs=(ID,courseName,startDate,endDate)=>{
            let daysOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        let days = [];
        let course = this.state.Courses[courseName];
        let keys = Object.keys(course);
        for(let i=0;i<keys.length;++i){
            if(course[keys[i]].Lecture!=null)
            days.push(keys[i]);
        }

            
            let holidays;
            holidays = this.state.Holidays;
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

            return labs;

    }

    countTutes=(ID,courseName,startDate,endDate)=>{

            let daysOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        let days = [];
        let course = this.state.Courses[courseName];
        let keys = Object.keys(course);
        for(let i=0;i<keys.length;++i){
            if(course[keys[i]].Lecture!=null)
            days.push(keys[i]);
        }
            
            let holidays;
            holidays = this.state.Holidays;
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
            
            return tutes;
    }

 TradeForLecture=()=>{
        let date =new Date().getTime();
        let courseName = this.state.courseName
        if(courseName=='')
    {
        alert('No course Selected');
        return;
    }
                /*
                    missableLecturesD = document.getElementById("missableLectures"); // to display the missable classes
                    missableLabsD = document.getElementById("missableLabs");
                    missableTutesD = document.getElementById("missableTutes");
                    */
                    let missableLectures, missableLabs, missableTutes;
                    let weightLecture, weightLab, weightTute;
                    let tradePts = 0;
                    let AvailablePts = 0;
                 
                        let MissableClasses = this.state.MissableClasses;
                        let TradePtsObj = this.state.TradePts;
                        missableLectures = MissableClasses[courseName].Lecture;  missableLabs = MissableClasses[courseName].Lab;   missableTutes = MissableClasses[courseName].Tute;
                        
              
                                weightLecture = this.state.Weight[courseName].Lecture;
                                if(weightLecture==0)
                                {
                                    alert(courseName + " " + "does not have a lecture");
                                    return;
                                }
                                        weightLab = this.state.Weight[courseName].Lab;
                                        weightTute = this.state.Weight[courseName].Tute;
                                        AvailablePts = TradePtsObj[courseName].AvailablePts;
                                        
                                        if(missableLabs!=0){
                                        if(weightLab >= weightLecture){
                                           let trade = Math.floor(weightLab/weightLecture);
                                            missableLectures = missableLectures + trade;
                                            missableLabs = missableLabs -1;
                                            
                                                tradePts = AvailablePts + (weightLab - trade*weightLecture);
                                                
                                                if(tradePts >=weightLab || tradePts >= weightTute || tradePts >= weightLecture){
                                                    
                                                    if(tradePts >=weightTute){
                                                        if(weightTute!=0){
                                                           let trade = Math.floor(tradePts/weightTute);
                                                            tradePts = tradePts - trade*weightTute;
                                                            missableTutes = missableTutes + trade;
                                                        }
                                                    }
                                                    if(tradePts >=weightLab){
                                                        
                                                        if(weightLab!=0){
                                                       let trade = Math.floor(tradePts/weightLab);
                                                        tradePts = tradePts - trade*weightLab;
                                                        missableLabs = missableLabs + trade;
                                                        
                                                        }
                                                    }
                                                    
                                                }
                                            
                                        }
                                        else{
                                           let trade = Math.ceil(weightLecture/weightLab)
                                            if(missableLabs >=trade){
                                                missableLabs = missableLabs - trade
                                                missableLectures = missableLectures + 1
                                                
                                                    tradePts = AvailablePts + (trade*weightLab - weightLecture);
                                                    if(tradePts >=weightLab || tradePts >= weightTute || tradePts >= weightLecture){
                                                        
                                                        if(tradePts >=weightTute){
                                                            if(weightTute!=0){
                                                               let trade = Math.floor(tradePts/weightTute);
                                                                tradePts = tradePts - trade*weightTute;
                                                                missableTutes = missableTutes + trade;
                                                            }
                                                        }
                                                        if(tradePts >=weightLab){
                                                            if(weightLab!=0){
                                                           let trade = Math.floor(tradePts/weightLab);
                                                            tradePts = tradePts - trade*weightLab;
                                                            missableLabs = missableLabs + trade;
                                                            }
                                                        }
                                                        
                
                
                                                    }
                                                
                                            }
                                            else{
                                                let weight1 = weightLab*missableLabs;
                                                if(missableTutes==0){
                                                    this.finalCheck("Lecture",courseName,weightLecture,weightLab,weightTute);
                                                    return;
                                            }
                                                else{
                                                    if(weightTute >=weightLecture){
                                                       let trade = Math.floor(weightTute/weightLecture);
                                                        missableLectures = missableLectures + trade;
                                                        missableTutes = missableTutes -1;
                                                        
                                                            tradePts = AvailablePts + (weightTute - trade*weightLecture);
                                                            if(tradePts >=weightLab || tradePts >= weightTute || tradePts >= weightLecture){
                                                            if(tradePts >=weightLab){
                                                                if(weightLab!=0){
                                                               let trade = Math.floor(tradePts/weightLab);
                                                                tradePts = tradePts - trade*weightLab;
                                                                missableLabs = missableLabs + trade;
                                                                }
                                                            }
                                                            if(tradePts >=weightTute){
                                                                if(weightTute!=0){
                                                                   let trade = Math.floor(tradePts/weightTute);
                                                                    tradePts = tradePts - trade*weightTute;
                                                                    missableTutes = missableTutes + trade;
                                                                }
                                                            }
                                                        }
                                                        
                    
                                                    }
                                                    else if(weightTute < weightLecture){
                                                       let trade = Math.ceil(weightLecture/weightTute);
                                                        if(missableTutes >= trade){
                                                            missableTutes = missableTutes - trade;
                                                            missableLectures = missableLectures + 1;
                                                           
                                                                tradePts = AvailablePts + (trade*weightTute - weightLecture);
                                                                if(tradePts >=weightLab || tradePts >= weightTute || tradePts >= weightLecture){
                                                                if(tradePts >=weightLab){
                                                                    if(weightLab!=0){
                                                                   let trade = Math.floor(tradePts/weightLab);
                                                                    tradePts = tradePts - trade*weightLab;
                                                                    missableLabs = missableLabs + trade;
                                                                    }
                                                                }
                                                                if(tradePts >=weightTute){
                                                                    if(weightTute!=0){
                                                                       let trade = Math.floor(tradePts/weightTute);
                                                                        tradePts = tradePts - trade*weightTute;
                                                                        missableTutes = missableTutes + trade;
                                                                    }
                                                                }
                                                            }
                
                                                            
                                                        }
                                                        else {
                                                            if(missableTutes*weightTute + weight1 >= weightLecture){
                                                            let i;
                                                            for(i=1;i<=missableTutes;++i){
                                                               let trade = Math.ceil(weightLecture/(weight1 + i*weightTute))
                                                                if(trade ==1)
                                                                break;
                                                            }
                                                            missableTutes = missableTutes - i;
                                                            missableLabs = 0;
                                                            missableLectures = missableLectures +1;
                                                            
                                                                tradePts = AvailablePts + (i*weightTute  + weight1) - weightLecture;
                                                                if(tradePts >=weightLab || tradePts >= weightTute || tradePts >= weightLecture){
                                                                if(tradePts >=weightLab){
                                                                    if(weightLab!=0){
                                                                   let trade = Math.floor(tradePts/weightLab);
                                                                    tradePts = tradePts - trade*weightLab;
                                                                    missableLabs = missableLabs + trade;
                                                                    }
                                                                }
                                                                if(tradePts >=weightTute){
                                                                    if(weightTute!=0){
                                                                       let trade = Math.floor(tradePts/weightTute);
                                                                        tradePts = tradePts - trade*weightTute;
                                                                        missableTutes = missableTutes + trade;
                                                                    }
                                                                }
                                                            }
                                                            
                
                
                                                        }
                                                        else{
                                                            this.finalCheck("Lecture",courseName,weightLecture,weightLab,weightTute);
                                                            return;
                                                        }
                                                        }
                                                    }
                                                    
                                                    
                                                }
                                            }
                    
                                        }
                                       
                                    
                                        
                                }
                                else {
                                    if(missableTutes==0){
                                        this.finalCheck("Lecture",courseName,weightLecture,weightLab,weightTute);
                                        return;
                                    }
                                    else{
                                        if(weightTute >=weightLecture){
                                           let trade = Math.floor(weightTute/weightLecture);
                                            missableLectures = missableLectures + trade;
                                            missableTutes = missableTutes -1;
                                          
                                                       
                                                            tradePts = AvailablePts + (weightTute - trade*weightLecture);
                                                            if(tradePts >=weightLab || tradePts >= weightTute || tradePts >= weightLecture){
                                                            if(tradePts >=weightLab){
                                                                if(weightLab!=0){
                                                               let trade = Math.floor(tradePts/weightLab);
                                                                tradePts = tradePts - trade*weightLab;
                                                                missableLabs = missableLabs + trade;
                                                                }
                                                            }
                                                            if(tradePts >=weightTute){
                                                                if(weightTute!=0){
                                                                   let trade = Math.floor(tradePts/weightTute);
                                                                    tradePts = tradePts - trade*weightTute;
                                                                    missableTutes = missableTutes + trade;
                                                                }
                                                            }
                                                        }
                                                        
                        
                                        }
                                        else if(weightTute < weightLecture){
                                           let trade = Math.ceil(weightLecture/weightTute);
                                            if(missableTutes >= trade){
                                                missableTutes = missableTutes - trade;
                                                missableLectures = missableLectures + 1;
                                              
                                                            
                                                                tradePts = AvailablePts + (trade*weightTute - weightLecture);
                                                                if(tradePts >=weightLab || tradePts >= weightTute || tradePts >= weightLecture){
                                                                if(tradePts >=weightLab){
                                                                    if(weightLab!=0){
                                                                   let trade = Math.floor(tradePts/weightLab);
                                                                    tradePts = tradePts - trade*weightLab;
                                                                    missableLabs = missableLabs + trade;
                                                                    }
                                                                }
                                                                if(tradePts >=weightTute){
                                                                    if(weightTute!=0){
                                                                       let trade = Math.floor(tradePts/weightTute);
                                                                        tradePts = tradePts - trade*weightTute;
                                                                        missableTutes = missableTutes + trade;
                                                                    }
                                                                }
                                                            }
                                                                
                
                                                            
                                            }
                                            else {
                                                this.finalCheck("Lecture",courseName,weightLecture,weightLab,weightTute);
                                                return;
                                            }
                                        }
                                        
                                    }
                                }
                                console.log(missableLectures + " " + missableLabs + " " + missableTutes);
                                MissableClasses[courseName].Lecture = missableLectures;MissableClasses[courseName].Lab = missableLabs;MissableClasses[courseName].Tute = missableTutes;
                                TradePtsObj[courseName].AvailablePts = tradePts;
                                this.setState({
                                    MissableClasses:MissableClasses,
                                    TradePts:TradePtsObj,
                                    missableLectures:missableLectures,
                                    missableLabs:missableLabs,
                                    missableTutes:missableTutes
                                });
                                
                
                           
                        
                        
                        /*database().ref("/Attendance/" + ID + "/" + courseName + "/" + "MissableClasses").set({
                            Lecture:missableLectures,
                            Lab:missableLabs,
                            Tute:missableTutes
                        }).then(function(){
                            console.log()
                        })
                        */
                    
                
            
    
        
    }

    TradeForLab=()=>{
        let courseName = this.state.courseName;
        if(courseName=='')
        {
            alert('No course Selected');
            return;
        }
          
        let missableLectures, missableLabs, missableTutes;
        let weightLecture, weightLab, weightTute;
        let tradePts = 0;
        let AvailablePts = 0;
    /*
        missableLecturesD = document.getElementById("missableLectures");
        missableLabsD = document.getElementById("missableLabs");
        missableTutesD = document.getElementById("missableTutes");
    */
        
            let MissableClasses = this.state.MissableClasses;
            let TradePtsObj = this.state.TradePts;
    
            missableLectures = MissableClasses[courseName].Lecture;  missableLabs = MissableClasses[courseName].Lab;   missableTutes = MissableClasses[courseName].Tute;
            
            
                
                    weightLecture = this.state.Weight[courseName].Lecture;
                    
                        weightLab = this.state.Weight[courseName].Lab;
                        if(weightLab == 0){
                           alert(courseName + " " + "does not have a lab");
                        return;
                        }
                        
                            weightTute = this.state.Weight[courseName].Tute;
                            
                                AvailablePts = TradePtsObj[courseName].AvailablePts;
                                
                            if(missableLectures!=0){
                            let trade;
                            if(weightLecture >= weightLab){
                                trade = Math.floor(weightLecture/weightLab);
                                missableLabs = missableLabs + trade;
                                missableLectures = missableLectures -1;
    
                                tradePts = AvailablePts + (weightLecture - trade*weightLab);
                                if(tradePts >=weightLab || tradePts >= weightTute || tradePts >= weightLecture){
                                    if(tradePts >=weightTute){
                                        if(weightTute!=0){
                                            trade = Math.floor(tradePts/weightTute);
                                            tradePts = tradePts - trade*weightTute;
                                            missableTutes = missableTutes + trade;
                                        }
                                    }
                                    if(tradePts>=weightLecture){
                                        if(weightLecture!=0){
                                            trade = Math.floor(tradePts/weightLecture);
                                            tradePts = tradePts - trade*weightLecture;
                                            missableLectures = missableLectures + trade;
                                        }
                                    }
    
                                }
                                
                            }
                            else{
                                trade = Math.ceil(weightLab/weightLecture)
                                if(missableLectures >=trade){
                                    missableLectures = missableLectures - trade
                                    missableLabs = missableLabs + 1
                                    tradePts = AvailablePts + (trade*weightLecture - weightLab);
                                    if(tradePts >=weightLab || tradePts >= weightTute || tradePts >= weightLecture){
                                        if(tradePts >=weightTute){
                                            if(weightTute!=0){
                                                trade = Math.floor(tradePts/weightTute);
                                                tradePts = tradePts - trade*weightTute;
                                                missableTutes = missableTutes + trade;
                                            }
                                        }
                                        if(tradePts>=weightLecture){
                                            if(weightLecture!=0){
                                                trade = Math.floor(tradePts/weightLecture);
                                                tradePts = tradePts - trade*weightLecture;
                                                missableLectures = missableLectures + trade;
                                            }
                                        }
                                    }
    
                                }
                                else{
                                    let weight1 = weightLecture*missableLectures;
                                    if(missableTutes==0){
                                        this.finalCheck("Lab",courseName,weightLecture,weightLab,weightTute);
                                    return;
                                }
                                    else{
                                        if(weightTute >=weightLab){
                                            trade = Math.floor(weightTute/weightLab);
                                            missableLabs = missableLabs + trade;
                                            missableTutes = missableTutes -1;
    
                                            tradePts = AvailablePts + (weightTute - trade*weightLab);
                                            if(tradePts >=weightLab || tradePts >= weightTute || tradePts >= weightLecture){
                                                if(tradePts >=weightTute){
                                                    if(weightTute!=0){
                                                        trade = Math.floor(tradePts/weightTute);
                                                        tradePts = tradePts - trade*weightTute;
                                                        missableTutes = missableTutes + trade;
                                                    }
                                                }
                                                if(tradePts>=weightLecture){
                                                    if(weightLecture!=0){
                                                        trade = Math.floor(tradePts/weightLecture);
                                                        tradePts = tradePts - trade*weightLecture;
                                                        missableLectures = missableLectures + trade;
                                                    }
                                                }
                                            }
        
                                        }
                                        else if(weightTute < weightLab){
                                            trade = Math.ceil(weightLab/weightTute);
                                            if(missableTutes >= trade){
                                                missableTutes = missableTutes - trade;
                                                missableLabs = missableLabs + 1;
    
                                                tradePts = AvailablePts + (trade*weightTute - weightLab);
                                                if(tradePts >=weightLab || tradePts >= weightTute || tradePts >= weightLecture){
                                                    if(tradePts >=weightTute){
                                                        if(weightTute!=0){
                                                            trade = Math.floor(tradePts/weightTute);
                                                            tradePts = tradePts - trade*weightTute;
                                                            missableTutes = missableTutes + trade;
                                                        }
                                                    }
                                                    if(tradePts>=weightLecture){
                                                        if(weightLecture!=0){
                                                            trade = Math.floor(tradePts/weightLecture);
                                                            tradePts = tradePts - trade*weightLecture;
                                                            missableLectures = missableLectures + trade;
                                                        }
                                                    }
                                                }
                                            }
                                            else {
                                                if(missableTutes*weightTute + weight1 >= weightLab){
                                                let i;
                                                for(i=1;i<=missableTutes;++i){
                                                    trade = Math.ceil(weightLab/(weight1 + i*weightTute))
                                                    if(trade ==1)
                                                    break;
                                                }
                                                missableTutes = missableTutes - i;
                                                missableLectures = 0;
                                                missableLabs = missableLabs +1
    
                                                tradePts = AvailablePts + (i*weightTute  + weight1) - weightLab;
                                                if(tradePts >=weightLab || tradePts >= weightTute || tradePts >= weightLecture){
                                                    if(tradePts >=weightTute){
                                                        if(weightTute!=0){
                                                            trade = Math.floor(tradePts/weightTute);
                                                            tradePts = tradePts - trade*weightTute;
                                                            missableTutes = missableTutes + trade;
                                                        }
                                                    }
                                                    if(tradePts>=weightLecture){
                                                        if(weightLecture!=0){
                                                            trade = Math.floor(tradePts/weightLecture);
                                                            tradePts = tradePts - trade*weightLecture;
                                                            missableLectures = missableLectures + trade;
                                                        }
                                                    }
                                                }
                                            }
                                            else{
                                                this.finalCheck("Lab",courseName,weightLecture,weightLab,weightTute);
                                                return;
                                            }
                                            }
                                        }
                                        
                                        
                                    }
                                }
        
                            }
                           
                        
                            
                    }
                    else {
                        if(missableTutes==0){
                            this.finalCheck("Lab",courseName,weightLecture,weightLab,weightTute);
                                    return;
                        }
                        else{
                            if(weightTute >=weightLab){
                                
                                let trade = Math.floor(weightTute/weightLab);
                                missableLabs = missableLabs + trade;
                                missableTutes = missableTutes -1;
    
                                tradePts = AvailablePts + (weightTute - trade*weightLab);
                                if(tradePts >=weightLab || tradePts >= weightTute || tradePts >= weightLecture){
                                    if(tradePts>=weightLecture){
                                        if(weightLecture!=0){
                                            trade = Math.floor(tradePts/weightLecture);
                                            tradePts = tradePts - trade*weightLecture;
                                            missableLectures = missableLectures + trade;
                                        }
                                    }
                                    if(tradePts >=weightTute){
                                        if(weightTute!=0){
                                            trade = Math.floor(tradePts/weightTute);
                                            tradePts = tradePts - trade*weightTute;
                                            missableTutes = missableTutes + trade;
                                        }
                                    }
                                }
            
                            }
                            else if(weightTute < weightLab){
                               let trade = Math.ceil(weightLab/weightTute);
                                if(missableTutes >= trade){
                                    missableTutes = missableTutes - trade;
                                    missableLabs = missableLabs + 1;
    
                                    tradePts = AvailablePts + (trade*weightTute - weightLab);
                                    if(tradePts >=weightLab || tradePts >= weightTute || tradePts >= weightLecture){
                                        if(tradePts>=weightLecture){
                                            if(weightLecture!=0){
                                                trade = Math.floor(tradePts/weightLecture);
                                                tradePts = tradePts - trade*weightLecture;
                                                missableLectures = missableLectures + trade;
                                            }
                                        }
                                        if(tradePts >=weightTute){
                                            if(weightTute!=0){
                                                trade = Math.floor(tradePts/weightTute);
                                                tradePts = tradePts - trade*weightTute;
                                                missableTutes = missableTutes + trade;
                                            }
                                        }
                                    }
    
    
                                }
                                else {
                                    this.finalCheck("Lab",courseName,weightLecture,weightLab,weightTute);
                                    return;
                                }
                            }
                            
                        }
                    }
                    console.log(missableLectures + " " + missableLabs + " " + missableTutes);
    
                    MissableClasses[courseName].Lecture = missableLectures;MissableClasses[courseName].Lab = missableLabs;MissableClasses[courseName].Tute = missableTutes;
                    TradePtsObj[courseName].AvailablePts = tradePts;
                    this.setState({
                        MissableClasses:MissableClasses,
                        TradePts:TradePtsObj,
                        missableLectures:missableLectures,
                        missableLabs:missableLabs,
                        missableTutes:missableTutes
                    });
                 
                
                
                        
                
                
            
            
            
            /*firebase.database().ref("/Attendance/" + ID + "/" + courseName + "/" + "MissableClasses").set({
                Lecture:missableLectures,
                Lab:missableLabs,
                Tute:missableTutes
            }).then(function(){
                console.log()
            })
            */
       
                    
                
       
    
    }

    TradeForTute=()=>{
        let courseName = this.state.courseName;
        if(courseName=='')
        {
            alert('No course Selected');
            return;
        }
            /*
                        missableLecturesD = document.getElementById("missableLectures");
                        missableLabsD = document.getElementById("missableLabs");
                        missableTutesD = document.getElementById("missableTutes");
                        */
                        let missableLectures, missableLabs, missableTutes;
                        let weightLecture, weightLab, weightTute;
                        let tradePts = 0;
                        let AvailablePts = 0;
                        
                            let MissableClasses = this.state.MissableClasses;
                            let TradePtsObj = this.state.TradePts;
            
                            missableLectures = MissableClasses[courseName].Lecture;  missableLabs = MissableClasses[courseName].Lab;   missableTutes = MissableClasses[courseName].Tute;
                    
                            
                                
                                     weightLecture = this.state.Weight[courseName].Lecture;
                                    
                                        weightLab = this.state.Weight[courseName].Lab;
                                        
                                           weightTute = this.state.Weight[courseName].Tute;
                                            if(weightTute==0){
                                                alert(courseName + " " + "does not have a Tute")
                                                return;
                                            }
                                            
                                                AvailablePts =TradePtsObj[courseName].AvailablePts;
                    
                                            if(missableLectures!=0){
                                            let trade;
                                            if(weightLecture >= weightTute){
                                                trade = Math.floor(weightLecture/weightTute);
                                                missableTutes = missableTutes + trade;
                                                missableLectures = missableLectures -1;
                    
                                                tradePts = AvailablePts + (weightLecture - trade*weightTute);
                                                    
                                                if(tradePts >=weightLab || tradePts >= weightTute || tradePts >= weightLecture){
                                                    if(tradePts >=weightLab){
                                                        
                                                        if(weightLab!=0){
                                                        trade = Math.floor(tradePts/weightLab);
                                                        tradePts = tradePts - trade*weightLab;
                                                        missableLabs = missableLabs + trade;
                                                        }
                                                    }
                                                    if(tradePts>=weightLecture){
                                                        if(weightLecture!=0){
                                                            trade = Math.floor(tradePts/weightLecture);
                                                            tradePts = tradePts - trade*weightLecture;
                                                            missableLectures = missableLectures + trade;
                                                        }
                                                    }
                    
                                                }
                                            }
                                            else{
                                                trade = Math.ceil(weightTute/weightLecture)
                                                if(missableLectures >=trade){
                                                    missableLectures = missableLectures - trade
                                                    missableTutes = missableTutes + 1
                    
                                                    tradePts = AvailablePts + (trade*weightLecture - weightTute);
                                                    if(tradePts >=weightLab || tradePts >= weightTute || tradePts >= weightLecture){
                                                        if(tradePts >=weightLab){
                                                        
                                                            if(weightLab!=0){
                                                            trade = Math.floor(tradePts/weightLab);
                                                            tradePts = tradePts - trade*weightLab;
                                                            missableLabs = missableLabs + trade;
                                                            }
                                                        }
                                                        if(tradePts>=weightLecture){
                                                            if(weightLecture!=0){
                                                                trade = Math.floor(tradePts/weightLecture);
                                                                tradePts = tradePts - trade*weightLecture;
                                                                missableLectures = missableLectures + trade;
                                                            }
                                                        }
                                                }
                                            }
                                                else{
                                                    let weight1 = weightLecture*missableLectures;
                                                    if(missableLabs==0){
                                                    this.finalCheck("Tute",courseName,weightLecture,weightLab,weightTute);
                                                    return;
                                                }
                                                    else{
                                                        if(weightLab >=weightTute){
                                                            trade = Math.floor(weightLab/weightTute);
                                                            missableTutes = missableTutes + trade;
                                                            missableLabs = missableLabs -1;
                    
                                                            tradePts = AvailablePts + (weightLab - trade*weightTute);
                                                            if(tradePts >=weightLab || tradePts >= weightTute || tradePts >= weightLecture){
                                                                if(tradePts>=weightLecture){
                                                                    if(weightLecture!=0){
                                                                        trade = Math.floor(tradePts/weightLecture);
                                                                        tradePts = tradePts - trade*weightLecture;
                                                                        missableLectures = missableLectures + trade;
                                                                    }
                                                                }
                                                                if(tradePts >=weightLab){
                                                        
                                                                    if(weightLab!=0){
                                                                    trade = Math.floor(tradePts/weightLab);
                                                                    tradePts = tradePts - trade*weightLab;
                                                                    missableLabs = missableLabs + trade;
                                                                    console.log(missableLabs);
                                                                    }
                                                                }
                    
                                                            }
                        
                                                        }
                                                        else if(weightLab < weightTute){
                                                            trade = Math.ceil(weightTute/weightLab);
                                                            if(missableLabs >= trade){
                                                                missableLabs = missableLabs - trade;
                                                                missableTutes = missableTutes + 1;
                    
                                                                tradePts = AvailablePts + (trade*weightLab - weightTute);
                                                                    if(tradePts >=weightLab || tradePts >= weightTute || tradePts >= weightLecture){
                                                                        if(tradePts>=weightLecture){
                                                                            if(weightLecture!=0){
                                                                                trade = Math.floor(tradePts/weightLecture);
                                                                                tradePts = tradePts - trade*weightLecture;
                                                                                missableLectures = missableLectures + trade;
                                                                            }
                                                                        }
                                                                        if(tradePts >=weightLab){
                                                                
                                                                            if(weightLab!=0){
                                                                            trade = Math.floor(tradePts/weightLab);
                                                                            tradePts = tradePts - trade*weightLab;
                                                                            missableLabs = missableLabs + trade;
                                                                            }
                                                                        }
                                                                    }
                                                            }
                                                            else {
                                                                if(missableLabs*weightLab + weight1 >= weightTute){
                                                                let i;
                                                                for(i=1;i<=missableLabs;++i){
                                                                    trade = Math.ceil(weightTute/(weight1 + i*weightLab))
                                                                    if(trade ==1)
                                                                    break;
                                                                }
                                                                missableLabs = missableLabs - i;
                                                                missableLectures = 0;
                                                                missableTutes = missableTutes +1
                    
                                                                tradePts = AvailablePts + (i*weightLab  + weight1) - weightTute;
                                                                if(tradePts >=weightLab || tradePts >= weightTute || tradePts >= weightLecture){
                                                                    if(tradePts>=weightLecture){
                                                                        if(weightLecture!=0){
                                                                            trade = Math.floor(tradePts/weightLecture);
                                                                            tradePts = tradePts - trade*weightLecture;
                                                                            missableLectures = missableLectures + trade;
                                                                        }
                                                                    }
                                                                    if(tradePts >=weightLab){
                                                            
                                                                        if(weightLab!=0){
                                                                        trade = Math.floor(tradePts/weightLab);
                                                                        tradePts = tradePts - trade*weightLab;
                                                                        missableLabs = missableLabs + trade;
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                            else{
                                                                this.finalCheck("Tute",courseName,weightLecture,weightLab,weightTute);
                                                                return;
                                                            }
                                                            }
                                                        }
                                                        
                                                        
                                                    }
                                                }
                        
                                            }
                                           
                                        
                                            
                                    }
                                    else {
                                        if(missableLabs==0){
                                            this.finalCheck("Tute",courseName,weightLecture,weightLab,weightTute);
                                                    return;
                                        }
                                        else{
                                            if(weightLab >=weightTute){
                                                
                                                let trade = Math.floor(weightLab/weightTute);
                                                missableTutes = missableTutes + trade;
                                                missableLabs = missableLabs -1;
                    
                                                tradePts = AvailablePts + (weightLab - trade*weightTute);
                                                if(tradePts >=weightLab || tradePts >= weightTute || tradePts >= weightLecture){
                                                    if(tradePts>=weightLecture){
                                                        if(weightLecture!=0){
                                                            trade = Math.floor(tradePts/weightLecture);
                                                            tradePts = tradePts - trade*weightLecture;
                                                            missableLectures = missableLectures + trade;
                                                        }
                                                    }
                                                    if(tradePts >=weightLab){
                                            
                                                        if(weightLab!=0){
                                                        trade = Math.floor(tradePts/weightLab);
                                                        tradePts = tradePts - trade*weightLab;
                                                        missableLabs = missableLabs + trade;
                                                        }
                                                    }
                                                }
                            
                                            }
                                            else if(weightLab < weightTute){
                                               let trade = Math.ceil(weightTute/weightLab);
                                                if(missableLabs >= trade){
                                                    missableLabs = missableLabs - trade;
                                                    missableTutes = missableTutes + 1;
                                                    tradePts = AvailablePts + (trade*weightLab - weightTute);
                                                    if(tradePts >=weightLab || tradePts >= weightTute || tradePts >= weightLecture){
                                                        if(tradePts>=weightLecture){
                                                            if(weightLecture!=0){
                                                                trade = Math.floor(tradePts/weightLecture);
                                                                tradePts = tradePts - trade*weightLecture;
                                                                missableLectures = missableLectures + trade;
                                                            }
                                                        }
                                                        if(tradePts >=weightLab){
                                                
                                                            if(weightLab!=0){
                                                            trade = Math.floor(tradePts/weightLab);
                                                            tradePts = tradePts - trade*weightLab;
                                                            missableLabs = missableLabs + trade;
                                                            
                                                            }
                                                        }
                                                 }
                                                   
                                                }
                                                else {
                                                    this.finalCheck("Tute",courseName,weightLecture,weightLab,weightTute);
                                                    return;
                                                }
                                            }
                                            
                                        }
                                    }
                                    console.log(missableLectures + " " + missableLabs + " " + missableTutes);
    
                            MissableClasses[courseName].Lecture = missableLectures;MissableClasses[courseName].Lab = missableLabs;MissableClasses[courseName].Tute = missableTutes;
                            TradePtsObj[courseName].AvailablePts = tradePts;
                            this.setState({
                                MissableClasses:MissableClasses,
                                TradePts:TradePtsObj,
                                missableLectures:missableLectures,
                                missableLabs:missableLabs,
                                missableTutes:missableTutes
                            });
                         
                                
                                
                                        
                                
                                
                            
                            
                            
                            /*firebase.database().ref("/Attendance/" + ID + "/" + courseName + "/" + "MissableClasses").set({
                                Lecture:missableLectures,
                                Lab:missableLabs,
                                Tute:missableTutes
                            }).then(function(){
                                console.log()
                            })
                            */
    
                    
    
        
       
    }
    finalCheck(subject,courseName,lectureWeight,labWeight,tuteWeight){
        console.log("in here")
        /*
        missableLecturesD = document.getElementById("missableLectures");
        missableLabsD = document.getElementById("missableLabs");
        missableTutesD = document.getElementById("missableTutes");
        */
        let Total = new Object(); let Missed = new Object(); let Attended = new Object(); let tradePts; let attendance = 0; let Missable = new Object();
        Attended.Lecture = 0; Attended.Lab =0; Attended.Tute=0;

            let TotalClasses = this.state.TotalClasses;let MissedClasses = this.state.MissedClasses;let MissableClasses = this.state.MissableClasses;
            let TradePts = this.state.TradePts;
            Total.Lecture = TotalClasses[courseName].Lecture; Total.Lab = TotalClasses[courseName].Lab; Total.Tute = TotalClasses[courseName].Tute;
            Missed.Lecture = MissedClasses[courseName].Lecture; Missed.Lab = MissedClasses[courseName].Lab; Missed.Tute = MissedClasses[courseName].Tute;
            Missable.Lecture = MissableClasses[courseName].Lecture; Missable.Lab = MissableClasses[courseName].Lab; Missable.Tute = MissableClasses[courseName].Tute;
            tradePts = TradePts[courseName].AvailablePts;
           
            if(subject == "Lecture"){
                Attended.Lecture = Total.Lecture - Missed.Lecture - Missable.Lecture; Attended.Lab = Total.Lab - Missed.Lab ; Attended.Tute = Total.Tute - Missed.Tute ;
                Missable.Lab =0; Missable.Tute=0;
                let temp = Attended.Lecture -1;
                console.log(temp);
                attendance = ((temp*lectureWeight + Attended.Lab * labWeight + Attended.Tute*tuteWeight )/(Total.Lecture*lectureWeight + Total.Lab*labWeight + Total.Tute *tuteWeight))*100;
                console.log(attendance);
                if(attendance>=75){
                    Missable.Lecture = Missable.Lecture +1;
                    MissableClasses[courseName].Lecture = Missable.Lecture;MissableClasses[courseName].Lab = Missable.Lab;MissableClasses[courseName].Tute = Missable.Tute;
                    this.setState({
                        missableLectures:Missable.Lecture,
                        missableLabs:Missable.Lab,
                        missableTutes:Missable.Tute,
                        MissableClasses:MissableClasses
                    });
                }
                else{
                    alert("Nigga F");
                    return;
                }
            }
            else if(subject == "Lab"){
                Attended.Lecture = Total.Lecture - Missed.Lecture ; Attended.Lab = Total.Lab - Missed.Lab - Missable.Lab; Attended.Tute = Total.Tute - Missed.Tute;
                Missable.Lecture =0; Missable.Tute = 0;
                let temp = Attended.Lab -1;
                console.log(temp);
                attendance = ((Attended.Lecture*lectureWeight + temp * labWeight + Attended.Tute*tuteWeight )/(Total.Lecture*lectureWeight + Total.Lab*labWeight + Total.Tute *tuteWeight))*100;
                console.log(attendance);
                
                if(attendance>=75){
                    Missable.Lab = Missable.Lab +1;
                    MissableClasses[courseName].Lecture = Missable.Lecture;MissableClasses[courseName].Lab = Missable.Lab;MissableClasses[courseName].Tute = Missable.Tute;
                    this.setState({
                        missableLectures:Missable.Lecture,
                        missableLabs:Missable.Lab,
                        missableTutes:Missable.Tute,
                        MissableClasses:MissableClasses
                    });
                    
                }
                else{
                    alert("Nigga F");
                    return;
                }
            }
            else if(subject =="Tute"){
                Attended.Lecture = Total.Lecture - Missed.Lecture ; Attended.Lab = Total.Lab - Missed.Lab; Attended.Tute = Total.Tute - Missed.Tute - Missable.Tute;
                Missable.Lecture =0; Missable.Lab = 0;
                let temp = Attended.Tute -1;
                console.log(temp);
                attendance = ((Attended.Lecture*lectureWeight + Attended.Lab * labWeight + temp*tuteWeight )/(Total.Lecture*lectureWeight + Total.Lab*labWeight + Total.Tute *tuteWeight))*100;
                console.log(attendance);
                if(attendance>=75){
                    Missable.Tute = Missable.Tute +1;
                    MissableClasses[courseName].Lecture = Missable.Lecture;MissableClasses[courseName].Lab = Missable.Lab;MissableClasses[courseName].Tute = Missable.Tute;

                    this.setState({
                        missableLectures:Missable.Lecture,
                        missableLabs:Missable.Lab,
                        missableTutes:Missable.Tute,
                        MissableClasses:MissableClasses
                    });
                }
                else{
                    alert("Nigga F");
                    return;
                }
            }
    
 
    }






}



const styles = StyleSheet.create({
  card1: {
    backgroundColor: '#102138',
    borderColor: '#fff',
    alignItems: 'center',
    borderWidth: 2,
    padding: 10,
    margin: 10,
    flexDirection:'column',
    justifyContent:'space-between',
  },

  card2: {
    backgroundColor: '#102138',
    borderColor: '#fff',
    alignItems: 'center',
    borderWidth: 2,
    padding: 10,
    margin: 10,
  },

  card3: {
    backgroundColor: '#102138',
    borderColor: '#fff',
    alignItems: 'center',
    borderWidth: 2,
    padding: 10,
    margin: 10,
  },

  inline: {
    flexDirection: 'row',
    alignItems:'center'
  },

  inlineMargin: {
    flexDirection: 'row',
    marginTop: 15,
    // alignItems: 'center',
  },
  inlineMarginHeading: {
    flexDirection: 'row',
    alignItems:'baseline',

    
    // alignItems: 'center',
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

  text3: {
    fontSize: 15,
    width: '30%',
    justifyContent: 'center',
    color: '#fff',
    fontFamily: 'Roboto-Light',
  },

  textCheckbox: {
    fontSize: 13,
    width: '45%',
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

  AdvanceButtonStyle: {
    backgroundColor: '#102138',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#36D6BD',
    width: 150,
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

  SeeButtonStyle: {
    backgroundColor: '#102138',
    borderRadius: 10,
    borderWidth: 2,
    width: 180,
    marginTop: 10,
    borderColor: '#36D6BD',
    marginLeft: 10,
  },

  UndoButtonStyle: {
    backgroundColor: '#102138',
    borderRadius: 10,
    borderWidth: 2,
    width: 60,
    marginTop: 10,
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