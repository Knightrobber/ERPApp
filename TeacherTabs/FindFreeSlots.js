import React,{Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  Text,
  Alert,
  Button,
  TouchableHighlight,
  TextInput
  } from 'react-native';
  import auth, { firebase } from '@react-native-firebase/auth';
  import database from '@react-native-firebase/database';

import { Container, Header, Content, Form, Item, Input } from 'native-base';
import {Dropdown} from 'react-native-material-dropdown';
import LinearGradient from 'react-native-linear-gradient';

  export default class FindFreeSlots extends Component{
    constructor(){
        super();
        this.state={
            Id:'',
            courseName:'',
            dayOfTheWeek:'',
            freeTimings:'',
            selectedCourse:'',
            courseName1:''
            
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
        let myCourses = [];
        console.log("Id in render "+this.state.Id) 
        database().ref("/TeachersCourses/" + this.state.Id + "/courses").once('value',(snap)=>{
            let courses = snap.val();
            console.log(courses);
            console.log("length of courses " + courses.length)
            for(let i=0;i<courses.length;++i){
                let obj = new Object();
                obj.label = courses[i];
                obj.value = courses[i];
                myCourses.push(obj);
            }

        })

        let daysOfTheWeek = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        let daysOfTheWeekObj = [];
        for(let i=0;i<daysOfTheWeek.length;++i){
            let obj= new Object();
            obj.label=daysOfTheWeek[i];
            obj.value=daysOfTheWeek[i];
            daysOfTheWeekObj.push(obj);
        }

            
        return(
            <SafeAreaView style = { styles.MainContainer }>
        <SafeAreaView style={styles.FormBox}>
          <Text style = { styles.textInput_Style }>Course Code :</Text>
          <Dropdown data={myCourses} value={this.state.courseName} onChangeText={(courseName)=>{this.setState({courseName:courseName},()=>{console.log(this.state.courseName)})}} label="Course Code" 
                containerStyle={{width:"50%"}}  baseColor={"white"}     itemTextStyle={{color:'red'}} useNativeDriver={true}/>
        </SafeAreaView>
        <SafeAreaView style={styles.FormBox}>
          <Text style = { styles.textInput_Style }>Day of the Week :</Text>
          <Dropdown data={daysOfTheWeekObj} value={this.state.dayOfTheWeek} onChangeText={(day)=>{this.setState({dayOfTheWeek:day},()=>{console.log(this.state.dayOfTheWeek)})}} label="Day Of the week" 
                containerStyle={{width:"50%"}} baseColor={"white"} useNativeDriver={true}/>
        </SafeAreaView>
        <SafeAreaView style={styles.Button_align}>
        <TouchableHighlight style={styles.SubmitButtonStyle} activeOpacity = { 0.5 } onPress={()=>{this.startProcession()}} >
        <LinearGradient colors={['#36D6BD','#007E7B']} start={{ x:0, y:1}} style={ styles.Linear_G }>
          <Text style={styles.TextStyle}>FIND</Text>
        </LinearGradient>
        </TouchableHighlight>
        <SafeAreaView style={styles.timing}>
          <Text style={styles.textOutput}>Timings</Text>
          <Text style={styles.textOutputdisplay}>{this.state.freeTimings}</Text>
        </SafeAreaView>

        </SafeAreaView>
       </SafeAreaView>
        )
    }

    signOut(){
        auth().signOut().then(()=>{
            console.log("User signed Out");
            this.props.navigation.navigate('Auth')}).catch((error)=>{
                console.log("An error occured while signing out " + error);
            })
    }
     startProcession = () =>{
         

   let user = this.state.Id;
    let courseName = this.state.courseName;
    let dayOfTheWeek = this.state.dayOfTheWeek;
    if(courseName=='' || dayOfTheWeek =='')
    {
        alert("You haven't selected the course or the day of the week");
        return;
    }
     
let promise = this.runAllStudentsPromise(courseName);
let freeTimesArray = [];
let overallFreeTime = []
promise.then((allStudents)=>{
console.log(" The students enrolled in the course are " + allStudents);
if(allStudents.length==0){
    alert("No students enrolled in this course ");
    return;
}
this.findAllFreeTimes(allStudents,dayOfTheWeek).then((freeTimes)=>{
    freeTimesArray = freeTimes;
    console.log("free times of all students " + freeTimesArray);

 let teacherProm = this.runTeacherFreeTimePromise(user,dayOfTheWeek)
 teacherProm.then((teachersFreeTime)=>{
     console.log("free times of teacher " +  teachersFreeTime)
     overallFreeTime = this.cmpFreeTimes(freeTimesArray,teachersFreeTime)
 }).then(()=>{
     console.log("overall free time "  + overallFreeTime)
    let temp = this.joinSlots(overallFreeTime);
    this.setState({freeTimings:temp});
     console.log(temp);
 })
 
})

})

    }

    runAllStudentsPromise = (courseName) =>{
        return new Promise((resolve,reject)=>{
            let studentsEnrolled = []
       database().ref("/Courses").once('value',(snap)=>{
        snap.forEach((subSnap)=>{
           let courses = subSnap.val().courses;
       for(let i=0;i<courses.length;++i){
          if(courses[i]==courseName){
          studentsEnrolled.push(subSnap.key);
          break;}
        }
        })
       
       }).then(()=>{
        resolve(studentsEnrolled)
       })
        })
       }

       findAllFreeTimes =(allStudents,dayOfTheWeek)=>{
        let FreeTimesArray =[];
            return new Promise((resolve,reject)=>{
                if(allStudents!=null){
                this.runFreeTimePromise(allStudents[0],dayOfTheWeek).then((freeTimes)=>{
                   FreeTimesArray = freeTimes;
                   console.log(allStudents.length);
                   let p=0;
                   for(let i=1;i<allStudents.length;++i){
                    console.log(i);
                       this.runFreeTimePromise(allStudents[i],dayOfTheWeek).then((tempFreeTime)=>{
                           ++p;
                        FreeTimesArray = this.cmpFreeTimes(FreeTimesArray,tempFreeTime);
                        if(p==allStudents.length-1)
                        resolve(FreeTimesArray);
                       })
                   }
                   if(allStudents.length ==1){
                       this.runFreeTimePromise(allStudents[0],dayOfTheWeek).then((freeTime)=>{
                           resolve(freeTime);
                       })
                   }
                })
            }
            else
            {
                alert("No Studetns enrolled in the Course ");
                resolve();
            }
            })
        }


        runFreeTimePromise = (user,dayOfTheWeek)=>{
            return new Promise((resolve,reject)=>{
            
            let timings = [];
            let freeTimings = []
            
            
            if(dayOfTheWeek == "Monday" || dayOfTheWeek == "monday" ){  
            
            database().ref("/StudentsLLT/" + user).once('value',(snap)=>{
                snap.forEach((subSnap)=>{
                    if(subSnap.val().Monday!=null){
                       let courses = subSnap.val().Monday;
                        if(courses.Lecture!=null)
                        timings.push(courses.Lecture);
                        if(courses.Lab!=null)
                        timings.push(courses.Lab);
                        if(courses.Tute!=null)
                        timings.push(courses.Tute);
            
                    }
                })
            }).then(()=>{
                freeTimings = this.findFreeTime(timings,"Student"); // gives free timings of monday
                resolve(freeTimings);
            })
            /*
            database().ref("/Students/" + user).once("value",function(snapshot){
             
             snapshot.forEach(function(snapshot){ // for each child (each course in this case)
             if(snapshot.val().Monday!=null) // all timings on monday(lecture lab and tute) are pushed into timings array
             timings.push(snapshot.val().Monday);
            })
            }).then(function(){
                console.log(timings)
                
             freeTimings = this.findFreeTime(timings); // gives free timings of monday
             resolve(freeTimings);
             
            })
            */
            }
            else if(dayOfTheWeek == "Tuesday" || dayOfTheWeek == "tuesday" ){
                database().ref("/StudentsLLT/" + user).once('value',(snap)=>{
                    snap.forEach((subSnap)=>{
                        if(subSnap.val().Tuesday!=null){
                           let courses = subSnap.val().Tuesday;
                            if(courses.Lecture!=null)
                            timings.push(courses.Lecture);
                            if(courses.Lab!=null)
                            timings.push(courses.Lab);
                            if(courses.Tute!=null)
                            timings.push(courses.Tute);
                
                        }
                    })
                }).then(()=>{
                    freeTimings = this.findFreeTime(timings,"Student"); // gives free timings of Tuesday
                    resolve(freeTimings);
                })
                    
            /*
             database().ref("/Students/" + user).once("value",function(snapshot){
                 snapshot.forEach(function(snapshot){
                 if(snapshot.val().Tuesday!=null)
                 timings.push(snapshot.val().Tuesday);
             })
             }).then(function(){
                
                console.log("busy times of " + user + " " + timings);
                 freeTimings = this.findFreeTime(timings);
                 console.log(" free timings of " + user + " " + freeTimings);
             resolve(freeTimings);
             })
             */
            }
            else if(dayOfTheWeek == "Wednesday" || dayOfTheWeek == "wednesday"){  
                database().ref("/StudentsLLT/" + user).once('value',(snap)=>{
                    snap.forEach((subSnap)=>{
                        if(subSnap.val().Wednesday!=null){
                          let  courses = subSnap.val().Wednesday;
                            if(courses.Lecture!=null)
                            timings.push(courses.Lecture);
                            if(courses.Lab!=null)
                            timings.push(courses.Lab);
                            if(courses.Tute!=null)
                            timings.push(courses.Tute);
                
                        }
                    })
                }).then(()=>{
                    freeTimings = this.findFreeTime(timings,"Student"); // gives free timings of Wednesday
                    resolve(freeTimings);
                })
                    
                /*
             database().ref("/Students/" + user).once("value",function(snapshot){
                 snapshot.forEach(function(snapshot){
                 if(snapshot.val().Wednesday!=null)
                 timings.push(snapshot.val().Wednesday);
             })
             }).then(function(){
                 freeTimings = this.findFreeTime(timings);
             resolve(freeTimings);
             })
             */
            }
            else if(dayOfTheWeek == "Thursday" || dayOfTheWeek == "thursday" ){  
                database().ref("/StudentsLLT/" + user).once('value',(snap)=>{
                    snap.forEach((subSnap)=>{
                        if(subSnap.val().Thursday!=null){
                           let courses = subSnap.val().Thursday;
                            if(courses.Lecture!=null)
                            timings.push(courses.Lecture);
                            if(courses.Lab!=null)
                            timings.push(courses.Lab);
                            if(courses.Tute!=null)
                            timings.push(courses.Tute);
                
                        }
                    })
                }).then(()=>{
                    freeTimings = this.findFreeTime(timings,"Student"); // gives free timings of Thursday
                    resolve(freeTimings);
                })
                    
                /*
             database().ref("/Students/" + user).once("value",function(snapshot){
                 snapshot.forEach(function(snapshot){
                 if(snapshot.val().Thursday!=null)
                 timings.push(snapshot.val().Thursday);
             })
             }).then(function(){
                 console.log(timings);
                 freeTimings = this.findFreeTime(timings);
             resolve(freeTimings);
             })
             */
            }
            else if(dayOfTheWeek == "Friday" || dayOfTheWeek == "friday" ){  
                database().ref("/StudentsLLT/" + user).once('value',(snap)=>{
                    snap.forEach((subSnap)=>{
                        if(subSnap.val().Friday!=null){
                           let courses = subSnap.val().Friday;
                            if(courses.Lecture!=null)
                            timings.push(courses.Lecture);
                            if(courses.Lab!=null)
                            timings.push(courses.Lab);
                            if(courses.Tute!=null)
                            timings.push(courses.Tute);
                
                        }
                    })
                }).then(()=>{
                    freeTimings = this.findFreeTime(timings,"Student"); // gives free timings of Friday
                    resolve(freeTimings);
                })
                    
                /*
             database().ref("/Students/" + user).once("value",function(snapshot){
                 snapshot.forEach(function(snapshot){
                 if(snapshot.val().Friday!=null)
                 timings.push(snapshot.val().Friday);
             })
             }).then(function(){
                 freeTimings = this.findFreeTime(timings);
             resolve(freeTimings);
             })
             */
            }
            else if(dayOfTheWeek == "Saturday" || dayOfTheWeek == "saturday"){
                database().ref("/StudentsLLT/" + user).once('value',(snap)=>{
                    snap.forEach((subSnap)=>{
                        if(subSnap.val().Saturday!=null){
                           let courses = subSnap.val().Saturday;
                            if(courses.Lecture!=null)
                            timings.push(courses.Lecture);
                            if(courses.Lab!=null)
                            timings.push(courses.Lab);
                            if(courses.Tute!=null)
                            timings.push(courses.Tute);
                
                        }
                    })
                }).then(()=>{
                    freeTimings = this.findFreeTime(timings,"Student"); // gives free timings of Saturday
                    resolve(freeTimings);
                })
                    
            }
            
            
            });
            }

        findFreeTime = (timings,userType)=>{
                let TotalSlots = 20;
                let FreeTimings = [];
                
                let BusyTimings = this.BreakTimings(timings,userType); // breaks all the timings of the user into 1/2 hour slots
                console.log("Length of busy timings, should be 0 for teacher"+BusyTimings.length)
                let start = "8:00"; let end = "8:30";
                for(let i=0;i<=20;++i){ // 20 strings of the form "8:00-8:30", "8:30-9:00" are compared with all the 1/2 hour slots of the user
                let tempSlotString = start + "-" + end; // form a string to compare 
                let busyTimingsCount = 0;
                for(let j=0;j<BusyTimings.length;++j){
                if(tempSlotString!=BusyTimings[j]) 
                ++busyTimingsCount;
                else
                break;
                }
                if(busyTimingsCount==BusyTimings.length){ // if the 1/2 hour slot doesn't match wiht any of users slots its pushed into a freetime array
                 FreeTimings.push(tempSlotString)
                }
                
                start = this.newTime(start); // increments start time for looping
                
                end = this.newTime(end);  // increments end time for looping
                
                
                }
                
                return FreeTimings;
                }

                BreakTimings = (classTimings,userType)=>{
                    let noOfClasses = classTimings.length;
                    console.log("no of student classes " + noOfClasses);
                    let brokenTimings = [];
                    if(userType=="Student"){
                    for(let i=0;i<noOfClasses;++i){
                        let time=classTimings[i].split("-");
                        let startTime = time[0];
                        let endTime = time[1];
                        while(startTime!=endTime)
                        {
                            let prevStart = startTime;
                            let tempSplit = startTime.split(':');
                            if(tempSplit[1]=="00"){
                                tempSplit[1] = "30"
                               startTime = tempSplit[0] +":" + tempSplit[1];
                               let tempString = prevStart+"-"+startTime;
                               brokenTimings.push(tempString);
                               }
                               else if(tempSplit[1]=="30"){
                                   tempSplit[1] = "00";
                                   tempSplit[0] = (parseInt(tempSplit[0]) + 1).toString();
                                  startTime = tempSplit[0] +":" + tempSplit[1];
                                  let tempString = prevStart+"-"+startTime;
                                  brokenTimings.push(tempString);
                                  }
                        }
                    }
                    }
                    else if(userType=="Teacher"){
                        console.log(classTimings);
                        if(classTimings !=[]){
                        for(let i=0;i<classTimings.length;++i){
                     if(classTimings[i].length ==1){
                     let time = classTimings[i][0].split("-");
                     let start = time[0];
                     let end = time[1];
                     while(start!=end)
                     {
                         let prevStart = start;
                         let tempSplit = start.split(':');
                         if(tempSplit[1]=="00"){
                             tempSplit[1] = "30"
                            start = tempSplit[0] +":" + tempSplit[1];
                            let tempString = prevStart+"-"+start;
                            brokenTimings.push(tempString);
                            }
                            else if(tempSplit[1]=="30"){
                                tempSplit[1] = "00";
                                tempSplit[0] = (parseInt(tempSplit[0]) + 1).toString();
                               start = tempSplit[0] +":" + tempSplit[1];
                               let tempString = prevStart+"-"+start;
                               brokenTimings.push(tempString);
                               }
                     }
                    }
                    else if(classTimings[i].length>1)
                    {
                        for(let j=0;j<classTimings[i].length;++j){
                            let time = classTimings[i][j].split("-");
                            let start = time[0];
                            let end = time[1];
                            while(start!=end)
                            {
                                let prevStart = start;
                                let tempSplit = start.split(':');
                                if(tempSplit[1]=="00"){
                                    tempSplit[1] = "30"
                                   start = tempSplit[0] +":" + tempSplit[1];
                                   let tempString = prevStart+"-"+start;
                                   brokenTimings.push(tempString);
                                   }
                                   else if(tempSplit[1]=="30"){
                                       tempSplit[1] = "00";
                                       tempSplit[0] = (parseInt(tempSplit[0]) + 1).toString();
                                      start = tempSplit[0] +":" + tempSplit[1];
                                      let tempString = prevStart+"-"+start;
                                      brokenTimings.push(tempString);
                                      }
                            }
                        }
                    }
                    }
                    }
                    }
                    return brokenTimings;
                    }
                    cmpFreeTimes=(freeTimeArray1,freeTimeArray2)=>{
                        let newFreeTimeArray = []
                        for(let i=0;i<freeTimeArray1.length;++i){
                         for(let j=0;j<freeTimeArray2.length;++j){
                                 if(freeTimeArray1[i]==freeTimeArray2[j]){
                                     newFreeTimeArray.push(freeTimeArray2[j])
                                     break;
                                 }
                         }
                        }
                        return newFreeTimeArray;
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
                            runTeacherFreeTimePromise=(user,dayOfTheWeek)=>{
                                return new Promise((resolve,reject)=>{
                                console.log("In teachers Free Time")
                                let timings = [];
                                let freeTimings = []
                                console.log("The user in teacher is " + user)
                                console.log("the day of the week is " + dayOfTheWeek);
                                
                                
                                if(dayOfTheWeek == "Monday" || dayOfTheWeek == "monday" ){  
                                    /* commented every section in case we need teachers database structured in Lab,Lecture and Tute.
                                    database().ref("/TeachersLLT/" + user).once('value',(snap)=>{
                                        snap.forEach(function(subSnap){
                                            if(subSnap.val().Monday!=null){
                                                courses = subSnap.val().Monday;
                                                if(courses.Lecture!=null)
                                                timings.push(courses.Lecture);
                                                if(courses.Lab!=null)
                                                timings.push(courses.Lab);
                                                if(courses.Tute!=null)
                                                timings.push(courses.Tute);
                                    
                                            }
                                        })
                                    }).then(function(){
                                        freeTimings = findFreeTime(timings); // gives free timings of monday
                                        resolve(freeTimings);
                                    })
                                    */
                                
                                database().ref("/Teacher/" + user).once("value",(snapshot)=>{
                                 snapshot.forEach((snapshot)=>{ // for each child (each course in this case)
                                 if(snapshot.val().Monday!=null) // all timings on monday(lecture lab and tute) are pushed into timings array
                                 timings.push(snapshot.val().Monday);
                                })
                                }).then(()=>{
                                 
                                 freeTimings = this.findFreeTime(timings,"Teacher"); // gives free timings of monday
                                 resolve(freeTimings);
                                })
                                
                                }
                                else if(dayOfTheWeek == "Tuesday" || dayOfTheWeek == "tuesday" ){  

                                    /*
                                    database().ref("/TeachersLLT/" + user).once('value',(snap)=>{
                                        snap.forEach(function(subSnap){
                                            if(subSnap.val().Tuesday!=null){
                                                courses = subSnap.val().Tuesday;
                                                if(courses.Lecture!=null)
                                                timings.push(courses.Lecture);
                                                if(courses.Lab!=null)
                                                timings.push(courses.Lab);
                                                if(courses.Tute!=null)
                                                timings.push(courses.Tute);
                                    
                                            }
                                        })
                                    }).then(function(){
                                        freeTimings = findFreeTime(timings); // gives free timings of Tuesday
                                        resolve(freeTimings);
                                    })
                                    */
                                    console.log("In tuesday of teacher");
                                    console.log("The user in Tuesday " + user);
                                 database().ref("/Teacher/" + user).once("value",(snapshot)=>{
                                     snapshot.forEach((snapshot)=>{
                                     if(snapshot.val().Tuesday!=null)
                                     timings.push(snapshot.val().Tuesday);
                                 })
                                 }).then(()=>{
                                     freeTimings = this.findFreeTime(timings,"Teacher");
                                 resolve(freeTimings);
                                 })
                                 
                                }
                                else if(dayOfTheWeek == "Wednesday" || dayOfTheWeek == "wednesday"){  
                                    /*
                                    database().ref("/TeachersLLT/" + user).once('value',(snap)=>{
                                        snap.forEach(function(subSnap){
                                            if(subSnap.val().Wednesday!=null){
                                                courses = subSnap.val().Wednesday;
                                                if(courses.Lecture!=null)
                                                timings.push(courses.Lecture);
                                                if(courses.Lab!=null)
                                                timings.push(courses.Lab);
                                                if(courses.Tute!=null)
                                                timings.push(courses.Tute);
                                    
                                            }
                                        })
                                    }).then(function(){
                                        freeTimings = findFreeTime(timings); // gives free timings of Wednesday
                                        resolve(freeTimings);
                                    })
                                    */
                                    
                                 database().ref("/Teacher/" + user).once("value",(snapshot)=>{
                                     snapshot.forEach((snapshot)=>{
                                     if(snapshot.val().Wednesday!=null)
                                     timings.push(snapshot.val().Wednesday);
                                 })
                                 }).then(()=>{
                                     freeTimings = this.findFreeTime(timings,"Teacher");
                                 resolve(freeTimings);
                                 })
                                 
                                }
                                else if(dayOfTheWeek == "Thursday" || dayOfTheWeek == "thursday"){  
                            /*
                            database().ref("/TeachersLLT/" + user).once('value',(snap)=>{
                                snap.forEach(function(subSnap){
                                    if(subSnap.val().Thursday!=null){
                                        courses = subSnap.val().Thursday;
                                        if(courses.Lecture!=null)
                                        timings.push(courses.Lecture);
                                        if(courses.Lab!=null)
                                        timings.push(courses.Lab);
                                        if(courses.Tute!=null)
                                        timings.push(courses.Tute);
                            
                                    }
                                })
                            }).then(function(){
                                freeTimings = findFreeTime(timings); // gives free timings of Thursday
                                resolve(freeTimings);
                            })
                            */
                                    
                                 database().ref("/Teacher/" + user).once("value",(snapshot)=>{
                                     snapshot.forEach((snapshot)=>{
                                     if(snapshot.val().Thursday!=null)
                                     timings.push(snapshot.val().Thursday);
                                 })
                                 }).then(()=>{
                                     freeTimings = this.findFreeTime(timings,"Teacher");
                                 resolve(freeTimings);
                                 })
                                 
                                }
                                else if(dayOfTheWeek == "Friday" || dayOfTheWeek == "friday"){  
                                    /*
                                    database().ref("/TeachersLLT/" + user).once('value',(snap)=>{
                                        snap.forEach(function(subSnap){
                                            if(subSnap.val().Friday!=null){
                                                courses = subSnap.val().Friday;
                                                if(courses.Lecture!=null)
                                                timings.push(courses.Lecture);
                                                if(courses.Lab!=null)
                                                timings.push(courses.Lab);
                                                if(courses.Tute!=null)
                                                timings.push(courses.Tute);
                                    
                                            }
                                        })
                                    }).then(function(){
                                        freeTimings = findFreeTime(timings); // gives free timings of Friday
                                        resolve(freeTimings);
                                    })
                                    */
                                    
                                    
                                 database().ref("/Teacher/" + user).once("value",(snapshot)=>{
                                     snapshot.forEach((snapshot)=>{
                                     if(snapshot.val().Friday!=null)
                                     timings.push(snapshot.val().Friday);
                                 })
                                 }).then(()=>{
                                     freeTimings = this.findFreeTime(timings,"Teacher");
                                 resolve(freeTimings);
                                 })
                                }
                            
                            
                                else if(dayOfTheWeek=="Saturday" || dayOfTheWeek=="saturday"){
                                    /*
                                    database().ref("/TeachersLLT/" + user).once('value',(snap)=>{
                                        snap.forEach(function(subSnap){
                                            if(subSnap.val().Saturday!=null){
                                                courses = subSnap.val().Saturday;
                                                if(courses.Lecture!=null)
                                                timings.push(courses.Lecture);
                                                if(courses.Lab!=null)
                                                timings.push(courses.Lab);
                                                if(courses.Tute!=null)
                                                timings.push(courses.Tute);
                                    
                                            }
                                        })
                                    }).then(function(){
                                        freeTimings = findFreeTime(timings); // gives free timings of Saturday
                                        resolve(freeTimings);
                                    })
                                    */
                                    database().ref("/Teacher/" + user).once("value",(snapshot)=>{
                                        snapshot.forEach((snapshot)=>{
                                        if(snapshot.val().Saturday!=null)
                                        timings.push(snapshot.val().Saturday);
                                    })
                                    }).then(()=>{
                                        freeTimings = this.findFreeTime(timings,"Teacher");
                                    resolve(freeTimings);
                                    })
                                }
                                });
                            }
                            joinSlots=(data)=>{
                                let output=[];
                                let prev = data[0];
                                for (let i = 1; i < data.length; i++) {
                                    let curr = data[i];
                                    let mer = this.slotMerge(prev, curr);
                                    if (mer) {
                                      output.push(mer);
                                      prev = i + 1 < data.length ? data[i + 1] : undefined;
                                      i += 1;
                                    } else {
                                      output.push(prev);
                                      prev = curr;
                                    }
                                  }
                                  if (prev) {
                                    output.push(prev);
                                  }
                                  return output;
                                }
                                slotMerge=(str1,str2)=>{
                                  let  [start1, end1] = str1.split("-");
                                  let  [start2, end2] = str2.split("-");
                                    return end1 === start2 ? ` ${start1}-${end2} | ` : "";
                                }
                        



     
    
    parentFindCourses = ()=>{
      let promise = this.findCourses
    }
     findCourses(){
       /*let snap = await database().ref("/TeachersCourses/" + this.state.Id).once('value');
       return snap.val();
       
      return new Promise((resolve,reject)=>{
          database().ref("/TeachersCourses/" + this.state.Id).once('value').then((snap)=>{resolve(snap.val())})
      })
      */
     return new Promise((resolve,reject)=>{
        resolve("Nigga");
    })
    }
    
  }

  const styles = StyleSheet.create(
    {
      MainContainer:
      {
        flex: 1,
        justifyContent: 'space-evenly',
        backgroundColor: '#102138',
      },

      FormBox:
      {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'baseline',
        marginTop: -150,
      },

      textInput_Style:
      {
        borderWidth: 0,
        fontSize: 20,
        color: '#fff',
        fontFamily: 'Roboto-Thin',
        paddingBottom: 0,
      },

      textInputdisplay_Style:
      {
        borderWidth: 0,
        borderBottomColor: '#fff',
        borderBottomWidth: 2,
        fontSize: 20,
        color: '#fff',
        width: 175,
        textAlign: 'center',
        fontFamily: 'Roboto-Thin',
        paddingBottom: 0
      },

      textOutput_Style:
      {
        borderWidth: 0,
        borderBottomColor: '#fff',
        borderBottomWidth: 2,
        fontSize: 25,
        color: '#fff',
        width: 270,
        fontFamily: 'Roboto-Thin',
        padding: 0
      },
      textOutput:
      {
        fontSize: 25,
        color: '#fff',
        fontFamily: 'Roboto-Thin',
        paddingBottom: 0,
      },

      textOutputdisplay:
      {
        fontSize: 16,
        color: '#fff',
        fontFamily: 'Roboto-Thin',
        paddingBottom: 0,
        borderColor: '#fff',
        borderWidth: 1,
        height: 150,
        width: 300
      },

      timing:
      {
        flex: 0,
        marginTop: 10
      },
      SubmitButtonStyle: {
        padding: 0,
        backgroundColor: '#36D6BD',
        borderRadius: 10,
        borderWidth: 0,
        width: 200
      },

      TextStyle:{
        color:'#fff',
        textAlign:'center',
        fontSize: 25,
        fontWeight: '100',
        fontFamily: 'Roboto-Light'

      },

      Linear_G:
      {
        borderRadius: 10,
      },

      Button_align:
      {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginTop: -100
      },
      LogoutButtonStyle: {

        position: 'relative',
        flex: 0,
        padding: 0,
        backgroundColor: '#36D6BD',
        borderRadius: 10,
        borderWidth: 0,
        width: 250
      },
      LogoutTextStyle:{
        color:'#fff',
        textAlign:'center',
        fontSize: 30,
        fontWeight: '100',
        fontFamily: 'Roboto-Light'

      },
    });

  