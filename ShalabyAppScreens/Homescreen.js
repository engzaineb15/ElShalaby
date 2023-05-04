import * as React from 'react';
import { Text, View,Modal,Dimensions, StyleSheet ,Image,ScrollView ,TextInput,TouchableOpacity,StatusBar,Mod} from 'react-native'
 import Icon from 'react-native-vector-icons/FontAwesome5'

const {width,height}=Dimensions.get("screen");
import axios from 'axios';  
import Colors from '../constant/colors';
import AnimatedLottieView from 'lottie-react-native';
import {budget,Hello,price_list,homeicon} from '../constant/imagess'
export default class ShalabyApp extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
          // login:this.props.route.params.loggedIn
    }}

  

  render() {
    return (

      <>
<StatusBar  barStyle="light-content"/>
<View
style={{
    flex:1,
  backgroundColor:Colors.light_white,
}}>

<View
style={{
  width:"94%",
  shadowColor: 'black',
  shadowOpacity: 0.26,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 10,
  elevation: 3,
  backgroundColor:Colors.light_blue,
  marginVertical:10,
  borderRadius: 15,
  alignSelf:"center",
 // padding:5,
  flexDirection:"row",
// justifyContent:"space-between",
// backgroundColor:"#0f0",
  alignItems:"center",
 

}}>
  <View
  style={{
    padding:5,
 //backgroundColor:"#0ff",
  marginHorizontal:5
  }}
  >
<Image source={homeicon}

style={{
//padding:5,
 width:26,
resizeMode:"contain",
//backgroundColor:"#000"

}}/>
</View>
                          <View
                          
    style={{
    padding:5,
 // backgroundColor:"#0f0"
    }}>
       <Text 
       style={{
        fontSize:27,
        fontWeight:"bold",
        color:"#ffff"
       }}>الصفحة الرئسية</Text>                   
        </View>  



</View>

<View
            style={{
           
             alignItems: 'center',
              justifyContent: 'center',
    //   backgroundColor:"#0f0",
           marginVertical:5
            }}>
            <AnimatedLottieView
              source={Hello}
              autoPlay
              loop
              style={{height: 300, width: 350, alignSelf: 'center'}}
              resizeMode="contain"
            />
          </View> 



<View

  style={{
  //  backgroundColor:"#f00",
    flexDirection:"row",
    justifyContent:"space-between",
    marginBottom:20,
   paddingHorizontal:8,
    
}}>


<TouchableOpacity
style={{
  width:"100%",
  padding:10 ,
  shadowColor: 'black',
                  shadowOpacity: 0.26,
                  shadowOffset: {width: 0, height: 2},
                  shadowRadius: 10,
                  elevation: 3,
                  backgroundColor: 'white',
  justifyContent:"center",
  alignItems:"center",
  borderRadius:20,

}}
onPress={() => {

  this.props.navigation.navigate("ListPrice")

}}>

<Image source={price_list}

style={{
height:80,
width:80,
resizeMode:"contain",
//backgroundColor:"#000"

}}/>
<View
style={{
  padding:5,
}}
>
<Text
style={{
  fontSize:26,
  fontWeight:"800",
  color:Colors.light_blue,
 // marginTop:10
 
}}>قائمة الاسعار</Text>
</View>

</TouchableOpacity>

</View>



<View

  style={{
    
  //backgroundColor:"#f00",
    flexDirection:"row",
    justifyContent:"space-between",
    marginBottom:20,
    paddingHorizontal:8,
    
}}>


<TouchableOpacity
style={{
  width:"100%",
  padding:10,
  shadowColor: 'black',
                  shadowOpacity: 0.26,
                  shadowOffset: {width: 0, height: 2},
                  shadowRadius: 10,
                  elevation: 3,
                  backgroundColor: 'white',
  justifyContent:"center",
  alignItems:"center",
  borderRadius:20,
  



}}
onPress={() => {

  this.props.navigation.navigate("customerList")

}}>

<Image source={budget}

style={{
  height:80,
  width:80,
resizeMode:"stretch",
//backgroundColor:"#000"

}}/>
<View

style={{
  padding:5,
 // backgroundColor:"#00f"
}}
>
<Text
style={{
  fontSize:26,
  fontWeight:"800",
  color:Colors.light_blue,
 // marginTop:10
 
}}>قائمة الديون</Text>

</View>
</TouchableOpacity>

</View>





</View>
        

      </>
    );
  }
}

