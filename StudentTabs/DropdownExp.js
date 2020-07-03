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
  import {Dropdown} from 'react-native-material-dropdown';
  export default class AddCourses extends Component{
      constructor(){
          super();
          this.state = {
              time:'',
              Start:'time',
              End:'time',
              //Days_MappingCount:[6][5],
              Days_MappingCount:[],
              Days_Classes:[],
          }
      }

      componentDidMount(){
          
        this.setState(state=>{
          
            let newStructure = state.Days_MappingCount;
            for(let i=0;i<6;++i)
            {
              newStructure = [...newStructure,[0,2,4,6,8]];
            }
            
            let newStructureDays=state.Days_Classes;

              for(let i=0;i<6;++i)
             {
                newStructureDays = [...newStructureDays,["time","time","time","time","time","time","time","time","time","time"]];
             }
             
             this.setState({
                Days_MappingCount:newStructure,
                Days_Classes:newStructureDays
            })

              
          })
          
      }
    render(){
        let count =[0,1,2,3];
        let times = this.setData();
        
        return(
            <View>
                <Button title="press" onPress={()=>{this.gimmeDropdowns1()}} />
                
            </View>
        )
    }

    gimmeDropdowns1 = ()=>{
        let times = this.setData(); 
        console.log("checking states" + this.state.Days_Classes[0][0]);
        return(
            <View>
                <Text>Hey</Text>
                <Dropdown data={times} onChangeText={(chosenTime) => {this.setState({Start:chosenTime})}} containerStyle={{width:100}} value={this.state.Start} useNativeDriver={true}/>
            </View>
        );
    }

    gimmeDropdowns = ()=>{
        let times = this.setData();
        this.state.Days_MappingCount.map((element,index) =>{
            element.map((count)=>{ console.log(count)
                return(
                <View>
                    <Dropdown data={times} value= {this.state.Days_Classes[index][count]} onChangeText={(time)=>{this.setTimeOfDropdown(time,index,count)}} containerStyle={{width:120}}/>
                    <Text>To</Text>
                    <Dropdown data={times} value= {this.state.Days_Classes[index][count+1]} onChangeText={(time)=>{this.setTimeOfDropdown(time,index,count+1)}} containerStyle={{width:120}}/>
                </View>
                );
            })
        })
    }

    setTimeOfDropdown(time,row,column){
        this.setState(state=>{
            let newStructure = state.Days_Classes;
            newStructure[row,column] = time;
            this.setState({Days_Classes:newStructure});
        })
    }
    
    setData(){
        let times = [];
        let obj = new Object();
        let start = "8:00"; let end = "18:00";
                while(start!=end){ // 20 strings of the form "8:00-8:30", "8:30-9:00" are compared with all the 1/2 hour slots of the user
                let tempSlotString = start; // form a string to compare
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
  }