import * as React from 'react';
import { View, Text, FlatList, TouchableOpacity, Dimensions, TextInput, Image, ScrollView, Modal,StatusBar, Alert } from 'react-native';
import { SearchBar, IconProps } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Animatable from 'react-native-animatable';
import Colors from '../constant/colors';


import AnimatedLottieView from 'lottie-react-native';


import Icon from 'react-native-vector-icons/FontAwesome5';
const { width, height } = Dimensions.get("screen")
import {logo} from '../constant/imagess'
export default class ShalabyApp extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
    
   }
  }


 async componentDidMount(){

  let data = await AsyncStorage.getItem("loged")
//   data = JSON.parse(data)
// console.log(JSON.stringify(data))
if(data == '1'){
    this.props.navigation.navigate('Home');

}else{
    this.props.navigation.navigate('login');

}

  }

  
 

  render() {
  return (
    <>
    <StatusBar  barStyle="light-content"/>
    <View
style={{
    flex:1,
  backgroundColor:Colors.light_white,
  alignItems:"center",
  justifyContent:"center"
}}>

<Image source={logo}

style={{
//padding:5,
 width:width/1.3,
resizeMode:"contain",
//backgroundColor:"#000"

}}/>


</View>

      <>
      </>
    </>
  )
      }}