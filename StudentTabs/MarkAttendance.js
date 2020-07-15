import React,{Component} from 'react';
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
  import moment from "moment";
  import database from '@react-native-firebase/database';
  import auth from '@react-native-firebase/auth';
  import DatePicker from 'react-native-datepicker';
  import {Dropdown} from 'react-native-material-dropdown';
  import CheckBox from '@react-native-community/checkbox';
  import LinearGradient from 'react-native-linear-gradient';
  export default class MarkAttendance extends Component{
      constructor(){
          super();
          this.state ={
            date:null,
            Id:'',
            courseName:'',
            missableLectures:0,missableLabs:0,missableTutes:0,
            missableRunning:'',submitAttendanceRunning:'',Running:'',
            missedLecture:false,missedLab:false,missedTute:false,
            condonedLecture:false,condonedLab:false,condonedTute:false,
            noClassLecture:false,noClassLab:false,noClassTute:false,
            extraClassLecture:false,extraClassLab:false,extraClassTute:false,
            doYouHaveAHoliday:false, 
            category:'None', LectureC:0,LabC:0,TuteC:0,
            currentAttendance:0,endOfCourseAttendance:0,EndDate:new Date("February 22 2020")
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

        let AttendanceCategory = [
            {label:"None", value:"None"},
            {label:"Missed", value:"Missed"},
            {label:"Condoned", value:"Condoned"},
            {label:"Missed But Condoned", value:"MnC"},
            {label:"Extra Class", value:"ExtraClass"},
            {label:"NoClass", value:"NoClass"}
        ]

        return(
            
            <ScrollView style={{ backgroundColor: '#102138', flex: 1}}>
            <View style={styles.card1}>
            <View style={{justifyContent:'center', alignItems: 'center'}}>
                <View style={styles.inlineHeading}>
                    <Text style={styles.text}>Choose Course</Text>
                    <Dropdown data={myCourses} onChangeText={(courseName)=>{this.onCourseChange(courseName)}} containerStyle={{width:'30%'}}/>
                </View>
                <View>
                    <View style={styles.inline}>
                        <Text style={styles.text}>Current Attendance </Text>
                        <Text style={styles.text2}>: {this.state.currentAttendance}</Text>
                    </View >

                    <View style={styles.inline}>
                        <Text style={styles.text}>Final Attendance </Text>
                        <Text style={styles.text2}>: {this.state.endOfCourseAttendance}</Text>
                    </View>
                </View>
                </View>
                </View>


                <View style={styles.card2}>
                <Text style={styles.texthead}>Missable Classes</Text>
                <Text style={{color:'white',fontSize:14}}>{this.state.courseName}</Text>
                <View style={{justifyContent:'center', alignItems: 'center'}}>
                    <View style={styles.inline}>
                    <Text style={styles.text}>Lectures</Text>
                    <Text style={styles.text2}>: {this.state.missableLectures}</Text>
                    </View>

                    <View style={styles.inline}>
                    <Text style={styles.text}>Labs</Text>
                    <Text style={styles.text2}>: {this.state.missableLabs}</Text>
                    </View>

                    <View style={styles.inline}>
                    <Text style={styles.text}>Tutes</Text>
                    <Text style={styles.text2}>: {this.state.missableTutes}</Text>
                    </View>
                </View>
                <Text style={styles.text2}>{this.state.missableRunning}</Text>
                </View>


            <View style={styles.card3}>
                <View style={{alignItems: 'center',}}>
                <Text style={styles.texthead}>
                    Mark attendance
                </Text>
                <View style={{alignSelf:'center'}}>
                <Text style={{color:'white',fontSize:14}}>{this.state.courseName}</Text>
                </View>

                {/* <Text style={styles.text}>
                    selected course To be displayed here
                </Text> */}
                
            </View>
            <View>
                <View style={styles.inline2}>
                    <Text style={styles.text}> Choose Category</Text>
                    <Dropdown data={AttendanceCategory} onChangeText={(category)=>{this.setState({category:category})}} containerStyle={{width:'30%'}}/>
                </View>

                <View>
                       
                       <View style={styles.inline2}>
                       <CheckBox
                         disabled={false}
                         value={this.state.LectureC}
                         onValueChange={(value)=>{this.setState({LectureC:value});}}
                         tintColors={{true: '#fff', false: '#fff'}}
                       />
                       <Text style={styles.text2}>Lecture </Text>
                       </View>
                       <View style={styles.inline2}>
                       <CheckBox
                         disabled={false}
                         value={this.state.LabC}
                         onValueChange={(value)=>{this.setState({LabC:value});}}
                         style={{color: '#fff'}} 
                         tintColors={{true: '#fff', false: '#fff'}}
                       />
                       <Text style={styles.text2}>Lab </Text>
                       </View>
                       <View style={styles.inline2}>
                       <CheckBox
                         disabled={false}
                         value={this.state.TuteC}
                         onValueChange={(value)=>{this.setState({TuteC:value});}}
                         tintColors={{true: '#fff', false: '#fff'}}
                       />
                       <Text style={styles.text2}>Tutes</Text>
                       </View>
                       </View>
            </View>
            <View style={{alignItems: 'center'}}>
            <TouchableHighlight style={styles.SubmitButtonStyle} activeOpacity = { 0.5 } onPress={()=>{this.submitAttendance()}} >
            <LinearGradient colors={['#36D6BD','#007E7B']} start={{ x:0, y:1}} style={ styles.Linear_G }>
              <Text style={styles.TextStyle}>SUBMIT</Text>
            </LinearGradient>
            </TouchableHighlight>
                {/* <Button onPress={()=>{this.submitAttendance()}} title="Submit attendance"/> */}
               
            </View>
            </View>
            <View style={{justifyContent:'center',flexDirection:'row'}}>
            <Text style={{fontSize:18,color:'white'}}>{this.state.Running}</Text>
            </View>
            </ScrollView>
            
        );

    }



    onCourseChange = (courseName) => {
        this.setState({courseName:courseName,Running:"Changing Course to " + courseName});
        this.missableClassesNew();
        let startDate,endDate;
        endDate = new Date("February 22 2020");
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
    }

    attendanceAfterSubmit  = (courseName) => {
       //this.setState({courseName:courseName});
        this.missableClassesNew();
        let startDate,endDate;
        endDate = this.state.EndDate;
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
    }



    submitAttendance=()=>{
        /*
        courses["CSD101"] = new Object();
        courses["CSD101"] = Weight;
        console.log(courses["CSD101"][fruit].Lecture);
        */
       this.setState({Running:"Checking Attendance"});
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
        if(category == "Missed")
        this.missed(this.state.Id,this.state.courseName,LectureC,LabC,TuteC).then(()=>{this.missableClassesNew().then(()=>{this.attendanceAfterSubmit(courseName)})});
        if(category == "Condoned")
        this.condoned(this.state.Id,this.state.courseName,LectureC,LabC,TuteC).then(()=>{this.missableClassesNew().then(()=>{this.attendanceAfterSubmit(courseName)})});
        if(category == "MnC")
        this.MnC(this.state.Id,this.state.courseName,LectureC,LabC,TuteC).then(()=>{this.missableClassesNew().then(()=>{this.attendanceAfterSubmit(courseName)})})
        if(category == "NoClass")
        this.noClass(this.state.Id,this.state.courseName,LectureC,LabC,TuteC).then(()=>{this.missableClassesNew().then(()=>{this.attendanceAfterSubmit(courseName)})});
        if(category == "ExtraClass")
        this.extraClass(this.state.Id,this.state.courseName,LectureC,LabC,TuteC).then(()=>{this.missableClassesNew().then(()=>{this.attendanceAfterSubmit(courseName)})});
        

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
        database().ref("/Attendance/" + this.state.Id + "/" + courseName + "/MissableClasses").once('value',(snap)=>{
            console.log(snap.val().Lecture + " " + snap.val().Lab + " " + snap.val().Tute);
            this.setState({
                missableLectures:snap.val().Lecture,
                missableLabs:snap.val().Lab,
                missableTutes:snap.val().Tute
            },()=>{
                this.setState({missableRunning:'Done'});
                
            })
            
        })
            
        
    }

        missed=(ID,courseName,LectureC,LabC,TuteC)=>{
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
        return new Promise((resolve,reject)=>{
        if(lecture  || lab  || tute ){
            console.log
            database().ref("/Attendance/" + ID + "/" + courseName + "/" + "TotalClasses").once('value').then((snap)=>{
    
            if(lecture){
                 if(snap.val().Lecture!=0)
                 missedLect=1
                 else
                 {
                     alert("Lecture doesn't exist for " + courseName);
                     return;
                 }
        }
            if(lab){
                if(snap.val().Lab!=0)    
                 missedLab=1
                else{
                    alert("Lab doesn't exist for " + courseName);
                     return;
                }
                }
            if(tute){
                if(snap.val().Tute!=0)
                missedTut=1
                else
                {
                    alert("Tute doesn't exist for " + courseName);
                    return;
                }
        }
    
        
                database().ref("/Attendance/" + ID + "/" + courseName + "/" + "MissedClasses").once('value').then((snap)=>{
                    if(snap.val()==null){
                        
                    database().ref("/Attendance/" + ID + "/" + courseName + "/" + "MissedClasses").set({
                        Lecture:missedLect,
                        Lab:missedLab,
                        Tute:missedTut
                    })
                }
                    else
                    {   if(missedLect ==1)
                        missedLect = snap.val().Lecture +1;
                        else
                        missedLect = snap.val().Lecture
                        if(missedLab==1)
                        missedLab = snap.val().Lab +1;
                        else
                        missedLab = snap.val().Lab
                        if(missedTut==1)
                        missedTut = snap.val().Tute +1;
                        else
                        missedTut = snap.val().Tute;
                        database().ref("/Attendance/" + ID + "/" + courseName + "/" + "MissedClasses").set({
                            Lecture:missedLect,
                            Lab:missedLab,
                            Tute:missedTut
                        }).then(()=>{
                            resolve();
                        })
                    }
    
                })
            })
               
            
    
    
        
    
    }
    else
    resolve();
    })
    
    }

        condoned=(ID,courseName,LectureC,LabC,TuteC)=>{
            console.log("in condoned")
        let lecture,lab,tute;
        let TotalLectures,TotalLabs,TotalTutes;
        let condonedL =0 ; let condonedLab = 0; let condonedT=0;
        lecture = LectureC;
        lab = LabC;
        tute = TuteC;
        return new Promise((resolve,reject)=>{
        if(lecture  || lab  || tute ){
         
        database().ref("/Attendance" + "/" + ID + "/" + courseName + "/" + "TotalClasses").once('value').then((snap)=>{
            TotalLectures = snap.val().Lecture; 
            TotalLabs = snap.val().Lab; 
            TotalTutes= snap.val().Tute;
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
                    database().ref("/Attendance/" + ID + "/" + courseName + "/" + "TotalClasses").set({
                        Lecture:TotalLectures,
                        Lab:TotalLabs,
                        Tute:TotalTutes
                    }).then(()=>{
                        database().ref("/Attendance/" + ID + "/" + courseName + "/" + "CondonedClasses").once('value').then((snap)=>{
                            if(snap.val()==null){
                                database().ref("/Attendance/" + ID + "/" + courseName + "/" + "CondonedClasses").set({
                                    Lecture:condonedL,
                                    Lab:condonedLab,
                                    Tute:condonedT
                                })
                            }
                            else{
                                if(condonedL==1)
                                condonedL = snap.val().Lecture + 1
                                else
                                condonedL = snap.val().Lecture
                                if(condonedLab ==1)
                                condonedLab = snap.val().Lab + 1
                                else
                                condonedLab = snap.val().Lab
                                if(condonedT ==1)
                                condonedT = snap.val().Tute + 1
                                else
                                condonedT = snap.val().Tute
    
                                database().ref("/Attendance/" + ID + "/" + courseName + "/" + "CondonedClasses").set({
                                    Lecture:condonedL,
                                    Lab: condonedLab,
                                    Tute:condonedT
                                }).then(()=>{
                                    //missableClasses(ID,courseName);
                                    resolve();
                                })
                            }
                        })
                    })
    
        })
    
    }
    else 
    resolve();
    })
    
    
    
    
    }

    MnC = (ID,courseName,LectureC,LabC,TuteC) =>{
        let lecture,lab,tute
        let TotalLectures,TotalLabs,TotalTutes;
        let MissedLectures,missedLabs,MissedTutes;
        lecture = LectureC;
        lab = LabC;
        tute = TuteC;

        let temp1 = new Object();let temp2 = new Object();
        temp1.Lecture = 1;temp1.Lab =1;temp1.Tute = 1;
        temp2.Lecture = 1;temp2.Lab =1;temp2.Tute = 1;

        
        
        return new Promise((resolve,reject)=>{
            database().ref("/Attendance" + "/" + ID + "/" + courseName).once('value',(snap)=>{
                let TotalClasses = snap.val().TotalClasses;
                if(snap.val().MissedClasses==null)
                {alert("You haven't missed any classes to get them condoned ");return;}
                let MissedClasses = snap.val().MissedClasses;
                let CondonedClasses;
                if(snap.val().CondonedClasses == null){
                    CondonedClasses = new Object();
                    CondonedClasses.Lecture = 0;CondonedClasses.Lab = 0;CondonedClasses.Tute = 0;
                }
                else
                CondonedClasses = snap.val().CondonedClasses;
    
                //console.log(TotalClasses.Lecture);
    
                if(lecture){
                    if(TotalClasses.Lecture!=null)
                    TotalClasses.Lecture = TotalClasses.Lecture -1;
                    else
                    {alert(courseName + " does not have lectures");return}
    
                    if(MissedClasses.Lecture>0)
                    MissedClasses.Lecture = MissedClasses.Lecture -1;
                    else
                    {alert("You havn't missed any lectures in " + courseName + " to be condoned ");return}
                    CondonedClasses.Lecture = CondonedClasses.Lecture +1;
    
                }
    
    
                if(lab){
                    if(TotalClasses.Lab!=null)
                    TotalClasses.Lab = TotalClasses.Lab -1;
                    else
                    {alert(courseName + " does not have Labs");return}
    
                    if(MissedClasses.Lab>0)
                    MissedClasses.Lab = MissedClasses.Lab -1;
                    else
                    {alert("You havn't missed any Labs in " + courseName + " to be condoned ");return}
                    CondonedClasses.Lab = CondonedClasses.Lab +1;
    
                }
                
    
                if(tute){
                    if(TotalClasses.Tute!=null)
                    TotalClasses.Tute = TotalClasses.Tute -1;
                    else
                    {alert(courseName + " does not have Tutes");return}
    
                    if(MissedClasses.Tute>0)
                    MissedClasses.Tute = MissedClasses.Tute -1;
                    else
                    {alert("You havn't missed any Tutes in " + courseName + " to be condoned ");return}
                    CondonedClasses.Tute = CondonedClasses.Tute +1;
    
                }

                let Dates = snap.val().Dates; let MissableClasses = snap.val().MissableClasses; let TradePts = snap.val().TradePts;
                database().ref("/Attendance/" + ID + "/" + courseName).set({
                    CondonedClasses:CondonedClasses,
                    Dates:Dates,
                    MissableClasses:MissableClasses,
                    MissedClasses:MissedClasses,
                    TotalClasses:TotalClasses,
                    TradePts:TradePts
                },()=>{console.log("Done");resolve()})
            })
        })
        

    }

 noClass=(ID,courseName,LectureC,LabC,TuteC)=>{
        let lecture,lab,tute
        let TotalLectures,TotalLabs,TotalTutes;
        lecture = LectureC;
        lab = LabC;
        tute = TuteC;
     return new Promise((resolve,reject)=>{
        if(lecture || lab || tute){
        database().ref("/Attendance" + "/" + ID + "/" + courseName + "/" + "TotalClasses").once('value').then((snap)=>{
            if(lecture){
                if(TotalLectures!=0)
                    TotalLectures = snap.val().Lecture - 1;
                else{
                alert(courseName + " does not have a lecture");
                return;    
            }
            }
            else
            TotalLectures = snap.val().Lecture
            if(lab){
                if(TotalLabs!=0)
                    TotalLabs = snap.val().Lab - 1;
                else{
                alert(courseName + " does not have a Lab");
                return;
            }
            }
            else
            TotalLabs = snap.val().Lab
                if(tute){
                    if(TotalTutes!=0)
                    TotalTutes = snap.val().Tute - 1;
                else{
                alert(courseName + " does not have a Tute");
                return;
            }
        }
            else
            TotalTutes = snap.val().Tute
    
            database().ref("/Attendance" + "/" + ID + "/" + courseName + "/" + "TotalClasses").set({
                Lecture:TotalLectures,
                Lab:TotalLabs,
                Tute:TotalTutes
            }).then(()=>{
             //missableClasses(ID,courseName)
             resolve();
            })
    
        })
    }
    else 
    resolve();
    })
    
    
    }

     extraClass(ID,courseName,LectureC,LabC,TuteC){
        let lecture,lab,tute
        let TotalLectures,TotalLabs,TotalTutes;
        lecture = LectureC;
        lab = LabC;
        tute = TuteC;
        return new Promise((resolve,reject)=>{
        if(lecture || lab || tute){
        database().ref("/Attendance" + "/" + ID + "/" + courseName + "/" + "TotalClasses").once('value').then((snap)=>{

            TotalLectures = snap.val().Lecture; 
            TotalLabs = snap.val().Lab; 
            TotalTutes= snap.val().Tute;

            if(lecture){
                if(TotalLectures!=0)
                    TotalLectures = snap.val().Lecture + 1;
                else{
                alert(courseName + " does not have a lecture");
                return;    
            }
            }
            else
            TotalLectures = snap.val().Lecture
            if(lab){
                if(TotalLabs!=0)
                    TotalLabs = snap.val().Lab + 1;
                else{
                alert(courseName + " does not have a Lab");
                return;
            }
            }
            else
            TotalLabs = snap.val().Lab
                if(tute){
                    if(TotalTutes!=0)
                    TotalTutes = snap.val().Tute + 1;
                else{
                alert(courseName + " does not have a Tute");
                return;
            }
        }
            else
            TotalTutes = snap.val().Tute

            database().ref("/Attendance" + "/" + ID + "/" + courseName + "/" + "TotalClasses").set({
                Lecture:TotalLectures,
                Lab:TotalLabs,
                Tute:TotalTutes
            }).then(()=>{
                //missableClasses(ID,courseName);
                resolve();
            })
    
        })
        }
        else
        resolve();
    })
    
    }

    missableClassesNew=()=>{

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
        return new Promise((resolve,reject)=>{
        database().ref("/Attendance/" + ID + "/" + courseName + "/" + "TotalClasses").once('value').then((snap)=>{
          lectures = snap.val().Lecture;lecturesInitial=lectures
          labs = snap.val().Lab;labsInitial=labs;
          tutes = snap.val().Tute;tutesInitial=tutes;
          database().ref("/Attendance/" + ID + "/" + courseName + "/" + "MissedClasses").once('value').then((snap)=>{
              if(snap.val()!=null){
                  lectures = lectures - snap.val().Lecture; lectureMissedInitial=lectures;
                  console.log(lectureMissedInitial)
                  labs = labs - snap.val().Lab;labMissedInitial=labs;
                  tutes = tutes- snap.val().Tute;tuteMissedInitial=tutes;
              }
              else{
                lectureMissedInitial=lectures;
                labMissedInitial=labs;
                tuteMissedInitial=tutes;
              }
          }).then(()=>{
          console.log(lectures + " " + labs + " " + tutes);
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
                    database().ref("/Attendance/" + ID + "/" + courseName + "/" + "MissableClasses").set({
                        Lecture:missableClasses[0],
                        Lab:missableClasses[1],
                        Tute:missableClasses[2]
                    }).then(()=>{
                        console.log("At the end of missable classes new");
                        this.setState({
                            missableLectures:missableClasses[0],
                            missableLabs:missableClasses[1],
                            missableTutes:missableClasses[2]
                        })
                       resolve();
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
                console.log(subjectTimings);
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
     console.log("end " + end);
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
    console.log("total length of broken time " + totalLength);
     return totalLength;
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
        database().ref("/Attendance/" + ID + "/" + courseName).once('value').then((snap)=>{
        let TotalClasses = snap.val().TotalClasses; //MissableClasses = snap.val().MissableClasses;
        Total.Lecture = TotalClasses.Lecture;Total.Lab = TotalClasses.Lab;Total.Tute = TotalClasses.Tute;
        // Missable.Lecture = MissableClasses.Lecture ; Missable.Lab=MissableClasses.Lab ; Missable.Tute=MissableClasses.Tute;
        if(snap.val().MissedClasses!=null){
        let MissedClasses = snap.val().MissedClasses
        Missed.Lecture = MissedClasses.Lecture; Missed.Lab = MissedClasses.Lab ;Missed.Tute = MissedClasses.Tute;
        }
        if(snap.val().CondonedClasses!=null){
            let CondonedClasses = snap.val().CondonedClasses;
            Condoned.Lecture=CondonedClasses.Lecture; Condoned.Lab = CondonedClasses.Lab ; Condoned.Tute = CondonedClasses.Tute;
        }
      //  let  startDate = new Date(snap.val().Dates.StartDate);
      // let  endDate = new Date("February 22 2020");
        this.checkWeight("Lecture",courseName).then((lectureWeight)=>{
        Weight.Lecture = lectureWeight;
        this.checkWeight("Lab",courseName).then((labWeight)=>{
            Weight.Lab = labWeight
            this.checkWeight("Tute",courseName).then((tuteWeight)=>{
                Weight.Tute = tuteWeight;
                this.countLectures(ID,courseName,startDate,endDate).then((lectures)=>{
                    soFar.Lecture = lectures
                    this.countLabs(ID,courseName,startDate,endDate).then((labs)=>{
                        soFar.Lab = labs;
                        this.countTutes(ID,courseName,startDate,endDate).then((tutes)=>{
                        soFar.Tute = tutes;
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
                            let running;
                            if(this.state.Running == ("Changing Course to " + this.state.courseName))
                            running = "Done Changing course"
                            else
                            running = "Done Checking Attendance"
                            this.setState({currentAttendance:Math.floor(AttendanceSofar),endOfCourseAttendance:Math.floor(AttendanceTotal),Running:running});
                           // missableLectures.value = Missable.Lecture; missableLabs.value = Missable.Lab; missableTutes.value = Missable.Tute;
                        })
                    })
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

const styles = StyleSheet.create(
    {        
        card1: {
            alignItems: 'center',
            margin: 10
        },

        card2: {
            alignItems: 'center',
            margin: 10,
            borderColor: '#fff',
            borderWidth: 2,
            borderRadius: 10
        },


        card3: {
            alignItems: 'center',
            margin: 10,
            borderColor: '#fff',
            borderWidth: 2,
            borderRadius: 10,
            
        },

        inline:{
            flexDirection: 'row',
            marginTop: 10
        },
        inlineHeading:{
            flexDirection: 'row',
            marginTop: 10,
            alignItems:'baseline'
        },

        inline2:{
            flexDirection: 'row',
            width: '80%',
            alignItems: "center",
            marginRight: 50,
            marginLeft: 50,
            marginTop: 10
        },

        texthead: {
            fontSize: 18,
            fontWeight: '700',
            alignItems: 'center',
            color: '#fff'
        },

        text: {
            fontSize: 18,
            fontWeight: '100',
            fontFamily: 'Roboto-Black',
            width: '60%',
            justifyContent: 'center',
            color: '#fff'
        }, 
        
        text2: {
            fontSize: 15,
            fontWeight: '100',
            width: '20%',
            justifyContent: 'center',
            color: '#fff'
        }, 

        SubmitButtonStyle: {
            
            borderRadius: 5,
            borderWidth: 0,
            width: 130,
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
    });
