import * as React from 'react';
import { View, Text, FlatList, TouchableOpacity, Dimensions, TextInput, Image, ScrollView, Modal, StatusBar, Alert } from 'react-native';
import { SearchBar, IconProps } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Animatable from 'react-native-animatable';
import Colors from '../constant/colors';


import AnimatedLottieView from 'lottie-react-native';


import Icon from 'react-native-vector-icons/FontAwesome5';
const { width, height } = Dimensions.get("screen")
import { welcome } from '../constant/imagess'
export default class ShalabyApp extends React.Component {

  constructor(props) {
    super(props)

    this.state = {

      Username: '',
      Pass: '',
      loggedIn: false
    }
  }




  componentDidMount() {
    //  this.IsloggedIn()
    this.login()

  }


  





  async login() {
    await AsyncStorage.setItem('Username', 'AymanShalaby');
    await AsyncStorage.setItem('Pass', 'Ayman01207');

  }



  async IsloggedIn() {
    let Username = await AsyncStorage.getItem('Username');
    // Username = JSON.parse(Username)
    let Pass = await AsyncStorage.getItem('Pass');
    //  Pass = JSON.parse(Pass)

    // console.log(this.state.Username + "--" + Username)
    // console.log(this.state.Pass + "--" + Pass)

    if (this.state.Pass.trim() == Pass.trim() && this.state.Username.trim() == Username.trim()) {

      this.setState({ loggedIn: true })
      await AsyncStorage.setItem('loged' , "1");
      this.props.navigation.navigate("Home",
        { loggedIn: true }

      );

      

    } else if (this.state.Pass !== Pass) {
      alert("هناك خطأ في كلمة السر");

    } else if (this.state.Username !== Username) {
      alert("هناك خطأ في اسم المستخدم");
    }

    //    this.setState({ Username: '', Pass: '' });
  }




  render() {
    return (
      <>
        <StatusBar barStyle="light-content" />
        <ScrollView showsHorizontalScrollIndicator={false} >
        <View

          style={{ flex: 1, backgroundColor: "#FBFBFB", }}>

          <View
            style={{

              alignItems: 'center',
              justifyContent: 'center',
              //     backgroundColor:"#0f0",
              marginVertical: 10
            }}>
            <AnimatedLottieView
              source={welcome}
              autoPlay
              loop
              style={{ height: 300, width: 300, alignSelf: 'center' }}
              resizeMode="contain"
            />
          </View>

          <View
            style={{
              padding: 10,
              // backgroundColor:"#0ff",
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 10

            }}>
            <Text
              style={{
                fontSize: 35,
                fontWeight: "800",
                color: Colors.light_blue,

              }}>مرحبا بيك يا أبي</Text>


          </View>

          <View
            style={{

              flexDirection: "column",

              //  backgroundColor:"#00f",

            }}>
            <TextInput
              style={{
                width: width / 1.1,
                padding: 12,
                borderRadius: 20,
                borderWidth: 2,
                alignSelf: "center",
                borderColor: Colors.light_blue,
                backgroundColor: Colors.light_white,
                //backgroundColor:"#00f",
                // marginTop:30,
                //  alignItems:"center",
                fontSize: 18,
                color: "#61867c",
                // paddingHorizontal:10
                marginVertical: 5
              }}
              placeholder="اسم المستخدم"

              value={this.state.Username + ""}
              onChangeText={(userVal) => {

                this.setState({ Username: userVal })

              }} />


            <TextInput
              style={{
                width: width / 1.1,
                padding: 12,
                borderRadius: 20,
                borderWidth: 2,
                alignSelf: "center",
                borderColor: Colors.light_blue,
                backgroundColor: Colors.light_white,
                //backgroundColor:"#00f",
                // marginTop:30,
                //  alignItems:"center",
                fontSize: 18,
                color: "#61867c",
                // paddingHorizontal:10,
                marginVertical: 5
              }}
              placeholder="كلمة السر"
              keyboardType='visible-password'
              value={this.state.Pass + ""}
              onChangeText={(passVal) => {
                this.setState({ Pass: passVal })

              }} />
          </View>


          <View
            style={{
              // flexDirection:"row"
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                alignSelf: "center",
                textDecorationLine: "underline"

              }}>هل نسيت كلمة السر ؟</Text>

          </View>


          <TouchableOpacity
            style={{
              width: width / 1.5,
              padding: 5,
              borderRadius: 20,
              borderWidth: 2,
              alignSelf: "center",
              borderColor: Colors.light_blue,
              backgroundColor: Colors.light_blue,
              alignItems: "center",
              marginVertical: 50
            }}
            onPress={() => {
              this.IsloggedIn()
              //   this.props.navigation.navigate("Home")
            }}
          >
            <Text
              style={{
                fontSize: 23,
                fontWeight: "bold",
                color: "#ddd",

              }}>دخول</Text>
          </TouchableOpacity>
        </View>
        </ScrollView>
      </>
    )
  }
}