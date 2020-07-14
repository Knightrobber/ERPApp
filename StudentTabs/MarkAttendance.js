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
              missableRunning:'',submitAttendanceRunning:'',
              missedLecture:false,missedLab:false,missedTute:false,
              condonedLecture:false,condonedLab:false,condonedTute:false,
              noClassLecture:false,noClassLab:false,noClassTute:false,
              extraClassLecture:false,extraClassLab:false,extraClassTute:false,
              doYouHaveAHoliday:false
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
            <View style={{ backgroundColor: '#102138', flex: 1}}>
            <View style={styles.card1}>
            <View style={{justifyContent:'center', alignItems: 'center'}}>
                <View style={styles.inline}>
                    <Text style={styles.text}>Choose Course</Text>
                    <Dropdown data={myCourses} onChangeText={(courseName)=>{this.setState({courseName:courseName})}} containerStyle={{width:'30%'}}/>
                </View>
                <View>
                    <View style={styles.inline}>
                        <Text style={styles.text}>Current Attendance </Text>
                        <Text style={styles.text2}>: 100</Text>
                    </View >

                    <View style={styles.inline}>
                        <Text style={styles.text}>Final Attendance </Text>
                        <Text style={styles.text2}>: 100</Text>
                    </View>
                </View>
                </View>
                </View>


                <View style={styles.card2}>
                <Text style={styles.texthead}>Missable Classes</Text>
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
                    <Text style={styles.text}>Tutorials</Text>
                    <Text style={styles.text2}>: {this.state.missableTutes}</Text>
                    </View>
                </View>
                <Text style={styles.text2}>{this.state.missableRunning}</Text>
                </View>


            <View style={styles.card3}>
                <View style={{alignItems: 'center'}}>
                <Text style={styles.texthead}>
                    Mark attendance
                </Text>
                {/* <Text style={styles.text}>
                    selected course To be displayed here
                </Text> */}
                
            </View>
            <View>
                <View style={styles.inline2}>
                    <Text style={styles.text}> Choose Category</Text>
                    <Text>Category dropdown hereß</Text>
                </View>

                <View>
                       
                       <View style={styles.inline2}>
                       <CheckBox
                         disabled={false}
                         value={this.state.missedLecture}
                         onValueChange={(value)=>{this.setState({missedLecture:value});}}
                       />
                       <Text style={styles.text2}>Lecture </Text>
                       </View>
                       <View style={styles.inline2}>
                       <CheckBox
                         disabled={false}
                         value={this.state.missedLab}
                         onValueChange={(value)=>{this.setState({missedLab:value});}} style={{color: '#fff'}}
                       />
                       <Text style={styles.text2}>Lab </Text>
                       </View>
                       <View style={styles.inline2}>
                       <CheckBox
                         disabled={false}
                         value={this.state.missedTute}
                         onValueChange={(value)=>{this.setState({missedTute:value});}}
                       />
                       <Text style={styles.text2}>Tutorials</Text>
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
                <Text>{this.state.submitAttendanceRunning}</Text>
            </View>
            </View>

            </View>
        );

    }



    submitAttendance=()=>{
        let courseName = this.state.courseName;
        if(courseName =='')
        {
            alert("Course Hasn't been chosen");
            return;
        }
        console.log(courseName);
        this.extraClass(this.state.Id,courseName).then(()=>{this.missableClassesNew(this.state.Id,courseName).then(()=>{
            this.showMissableClasses();
        })
    })
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
            
            this.setState({
                missableLectures:snap.val().Lecture,
                missableLabs:snap.val().Lab,
                missableTutes:snap.val().Tute
            },()=>{
                this.setState({missableRunning:'Done'});
            })
            
        })
            
        
    }

        missed=(ID,courseName)=>{
        let lecture,lab,tute;
       // let missableLectures, missableLabs, missableTutes;
        let missedLect =0; let missedLab=0; let missedTut=0;
        lecture = this.state.missedLecture
        lab = this.state.missedLab
        tute =this.state.missedTute
     /*  let  missableLecturesD = document.getElementById("missableLectures");
        missableLabsD = document.getElementById("missableLabs");
        missableTutesD = document.getElementById("missableTutes");
        */
        return new Promise((resolve,reject)=>{
        if(lecture == true || lab == true || tute == true){
            database().ref("/Attendance/" + ID + "/" + courseName + "/" + "TotalClasses").once('value').then((snap)=>{
    
            if(lecture== true){
                 if(snap.val().Lecture!=0)
                 missedLect=1
                 else
                 {
                     alert("Lecture doesn't exist for " + courseName);
                     return;
                 }
        }
            if(lab== true){
                if(snap.val().Lab!=0)    
                 missedLab=1
                else{
                    alert("Lab doesn't exist for " + courseName);
                     return;
                }
                }
            if(tute == true){
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

        condoned=(ID,courseName)=>{
            console.log("in condoned")
        let lecture,lab,tute;
        let TotalLectures,TotalLabs,TotalTutes;
        let condonedL =0 ; let condonedLab = 0; let condonedT=0;
        lecture = this.state.condonedLecture;
        lab = this.state.condonedLab
        tute = this.state.condonedTute;
        return new Promise((resolve,reject)=>{
        if(lecture == true || lab == true || tute == true){
         
        database().ref("/Attendance" + "/" + ID + "/" + courseName + "/" + "TotalClasses").once('value').then((snap)=>{
            TotalLectures = snap.val().Lecture; 
            TotalLabs = snap.val().Lab; 
            TotalTutes= snap.val().Tute;
            console.log("Total classes before condement " + TotalLectures + " labs " + TotalLabs +" Tutes" + TotalTutes);
            if(lecture == true){ 
                if(TotalLectures!=0){
                TotalLectures = TotalLectures -1;
                condonedL=1;
                }
                else{
                alert(courseName + " " + "does not have a lecture to be condoned")
                return;}
            }
                if(lab == true){
                    if(TotalLabs!=0){
                        TotalLabs = TotalLabs -1;
                        condonedLab=1;
                        }
                        else{
                            alert(courseName + " " + "does not have a lab to be condoned")
                            return;
                        }
    
            }
                if(tute == true){
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

 noClass=(ID,courseName)=>{
        let lecture,lab,tute
        let TotalLectures,TotalLabs,TotalTutes;
        lecture = this.state.noClassLecture
        lab = this.state.noClassLab
        tute = this.state.noClassTute
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

     extraClass(ID,courseName){
        let lecture,lab,tute
        let TotalLectures,TotalLabs,TotalTutes;
        lecture = this.state.extraClassLecture
        lab = this.state.extraClassLab
        tute = this.state.extraClassTute
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

    missableClassesNew=(ID,courseName)=>{

        /*let missableLecturesD = document.getElementById("missableLectures");
        let missableLabsD = document.getElementById("missableLabs");
        let missableTutesD = document.getElementById("missableTutes");
        let missedLecture=0;let missedLab = 0; let missedTute =0;
        */
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
          }).then(()=>{2
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
                    totalPoints = findTotal(lecturesInitial,labsInitial,tutesInitial);
                    console.log(totalPoints)
                    newTotal = findTotal(lectures,labs,tutes);
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
            borderRadius: 10
        },

        inline:{
            flexDirection: 'row',
            marginTop: 10
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
            
            backgroundColor: '#36D6BD',
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
            borderRadius: 10,
        },
    });