import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, TouchableOpacity, Dimensions, ActivityIndicator, TextInput, Image, ScrollView, Modal, StatusBar,ToastAndroid } from 'react-native';
import { SearchBar } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Animatable from 'react-native-animatable';
import Colors from '../constant/colors';
import { FAB } from 'react-native-elements';

import NetInfo from '@react-native-community/netinfo';

// import Icon from 'react-native-vector-icons/FontAwesome5';

import AnimatedLottieView from 'lottie-react-native';
import axios from 'axios'
import {emptyData,no_connection,cancel} from '../constant/imagess'
const { width, height } = Dimensions.get("screen")


const ShalabyApp = ({ navigation }) => {


  const [listArr, SetlistArr] = useState([])

  const modelData = () => {
    [

      {
        item_name: '',
        item_price: ''
      }

    ]
  }



  const [NewinputPrice, SetNewinputPrice] = useState("")
  const [NewinputName, SetNewinputName] = useState("")
  const [modalFor, SetmodalFor] = useState("تعديل")
  const [addModal, SetaddModal] = useState(false)
  const [openIndex, SetopenIndex] = useState(-1)
  const [indexcancel, Setindexcancel] = useState(-1)
  const [cancelmodel, Setcancelmodel] = useState(false)
  const [Searchkeyitem, SetSearchkeyitem] = useState('')
  const [loading, setloading] = useState(true)
  const [current_id, setcurrent_id] = useState('')
  const [networkConnection, SetnetworkConnection] = useState(true)
  const [connectionType, SetconnectionType] = useState('')



  React.useEffect(() => {

    NetworkFun()
    getData()
   
  }, [])


  const NetworkFun = () => { 
  
    NetInfo.addEventListener(state => {

    console.log('Connection type', state.type);
    // check if there is any connection even it hasn't real network
    console.log('Is connected?', state.isConnected);
    // check if there is Real Network
    console.log('Is connected?', state.isInternetReachable);
    

  if(state.isConnected){
    getData();
  
  }
  SetconnectionType(state.type);
  SetnetworkConnection(state.isInternetReachable);
    
  });

  
  
  } 



  const addNewItem = () => {

    let data_to_send = {
      porduct_name: NewinputName,
      porduct_price: NewinputPrice,

    }
    axios.post("https://frist-test.000webhostapp.com/price_list/add_item.php", data_to_send).then(res => {
     console.log(res.data)
      if (res.data = "success") {

        getData()

        SetNewinputName('')
        SetNewinputPrice('')

      } else {
        alert("حاول كمان شوية يا بابا معلش ")
      }
    })
    .catch(error => {
         console.log(error);
         setloading(false);
       });
  }



  function getData() {
    setloading(true);
    if(listArr.length==0){
    axios.get("https://frist-test.000webhostapp.com/price_list/select_all_items.php").then(res => {
     console.log(res.data)
      let arr = res.data
      for (let i = 0; i < arr.length; i++) {
        arr[i].view = true
      }
      setloading(false)
      SetlistArr(arr)

    })
      .catch(error => {
       console.log(error);
     //   setloading(false);
      });
    }
  }




  const editProduct = () => {

    let data_to_send = {
      porduct_name: NewinputName,
      porduct_price: NewinputPrice,
      product_id: current_id

    }
    console.log(data_to_send)

    axios.post("https://frist-test.000webhostapp.com/price_list/update_item.php", data_to_send).then(res => {
      console.log(res.data)
      if (res.data = "success") {
        getData()

        SetNewinputName('')
        SetNewinputPrice('')

      } else {
        alert("حاول كمان شوية يا بابا معلش ")
      }
    }) .catch(error => {
        console.log(error);
         setloading(false);
       });
    
    SetaddModal(false)
   

  }



  const deleteProduct = () => {


    let data_to_send = {

      product_id: current_id

    }

     console.log(data_to_send)

    axios.post("https://frist-test.000webhostapp.com/price_list/delete_item.php", data_to_send).then(res => {

    console.log(res.data)

      if (res.data = "success") {

        getData()
      

      } else {
        alert("حاول كمان شوية يا بابا معلش ")
      }
    })
    .catch(error => {
    console.log(error);
      setloading(false);
    });

    Setcancelmodel(false)
  }






  const makeSearchRequestlist = (searchText) => {

    let list = [...listArr]

    for (let i = 0; i < listArr.length; i++) {

      if (((list[i].product_name).toUpperCase()).includes(searchText.toUpperCase())) {

        list[i].view = true

      } else {
        list[i].view = false
      }

    }
    SetlistArr(list)

  }







  return (
    <>

      <StatusBar barStyle="light-content" />
      <View style={{ flex: 1, backgroundColor: "#FBFBFB", }}>


        <View
          style={{
          //  padding:5,
            // width:width/3,
           // backgroundColor: "#00f"
          }}>

          <SearchBar
            placeholder="ابحث هنا..."

            containerStyle={{
              //   width:width/1.2,
              padding: 10,
              backgroundColor: Colors.light_blue,

            }}

            inputContainerStyle={{
              // width:width/1.1,
              backgroundColor: Colors.light_white,
              borderRadius: 15,
              alignSelf: "center"


            }}

            searchIcon={{
              size: 30
            }}

          //   lightTheme round editable={false}
            //  platform={"android"}

            value={Searchkeyitem + ''}
            onChangeText={(value) => {
              makeSearchRequestlist(value)
              SetSearchkeyitem(value)
            }}

          />

        </View>




        <View

          style={{
            width: width / 1.3,
            marginLeft: 30,
            flexDirection: "row",
            padding: 10,
            // marginVertical:5,
            justifyContent: "space-between",
            alignSelf: "center",
            // backgroundColor:"#0f0",
            borderBottomColor: Colors.light_blue,
            borderBottomWidth: 1
          }}>

          <Text
            style={{
              fontSize: 24,
              fontWeight: "600",
              color: Colors.light_blue,
              // marginHorizontal:5

            }}>{'اسم المنتج'}</Text>

          <Text
            style={{
              fontSize: 24,
              fontWeight: "600",
              color: Colors.light_blue,
              // marginHorizontal:5

            }}>{'السعر'}</Text>


        </View>





        {networkConnection ? (
          <>
        {loading ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              padding: 10,
            }}>
            <ActivityIndicator size="large" color={Colors.color_3} />
          </View>

        ) : (
          <FlatList

            data={listArr}
            contentContainerStyle={{
              marginTop: 10,
              paddingHorizontal: 10,
              paddingBottom: 20,
            }}

            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => `pro-${index}`}
            renderItem={({ item, index }) => {

              return (
                <>
                  {item.view ? (


                    <Animatable.View
                      animation={"bounceInLeft"}
                    // key={index}
                    // delay={index * 10}
                    >
                      <View

                        style={{
                          flexDirection: "row-reverse",
                          paddingHorizontal: 10,
                          marginVertical: 5,
                          justifyContent: "space-between",
                          //  backgroundColor:"#00f"
                        }}>

                        <TouchableOpacity
                          style={{
                            width: width / 1.25,
                            shadowColor: 'black',
                            shadowOpacity: 0.26,
                            shadowOffset: { width: 0, height: 2 },
                            shadowRadius: 10,
                            elevation: 3,
                            backgroundColor: 'white',
                            padding: 10,
                            borderRadius: 10,
                            flexDirection: "row",
                            justifyContent: "space-between"
                          }}
                          onPress={() => {

                            SetmodalFor('تعديل'),
                              SetNewinputPrice(item.product_price), SetNewinputName(item.product_name),
                              SetopenIndex(index), SetaddModal(true)
                            setcurrent_id(item.product_id)


                          }}>


                          <Text
                            style={{
                              fontSize: 23,
                              fontWeight: "600",
                              color: Colors.light_blue,
                              marginHorizontal: 5

                            }}>{item.product_name}</Text>


                          <View
                            style={{

                              padding: 4,
                              backgroundColor: "#FFBF73",
                              borderRadius: 10,

                            }}>

                            <Text
                              style={{
                                fontSize: 23,
                                fontWeight: "500",
                                color: Colors.blue,
                                marginHorizontal: 5

                              }}>{item.product_price}</Text>
                          </View>


                        </TouchableOpacity>

                        <TouchableOpacity

                          style={{
                            //     backgroundColor:"#000",
                            justifyContent: "center"
                          }}

                          onPress={() => {
                            // set_id_delete(item.product_id)
                            setcurrent_id(item.product_id)

                            Setcancelmodel(true)
                            Setindexcancel(index)

                          }}>
                          <Image
                            source={cancel}
                            style={{
                              width: 30,
                              height: 30,
                              resizeMode: "cover",
                              //  backgroundColor:"#000",
                              justifyContent: "center"
                            }} />


                        </TouchableOpacity>





                      </View>
                    </Animatable.View>

                  ) : null}


                  <Modal
                    visible={cancelmodel}
                    //  animationType='slide'

                    onRequestClose={() => {
                      Setcancelmodel(false)
                    }}
                    transparent={true}>
                    <View
                      style={{
                        flex: 1, alignItems: 'center', justifyContent: 'center',
                        //  backgroundColor: 'rgba(0,0,0,.6)' 
                      }}>
                      <View
                        style={{
                          width: '90%',
                          // height: height / 6,
                          padding: 10,
                          backgroundColor: "#fff",
                          elevation: 10,
                          borderRadius: 15,

                        }}>
                        <View
                          style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 10,
                            //backgroundColor: '#0ff',
                          }}>
                          <Text
                            style={{
                              fontSize: 22,
                              fontWeight: "bold",
                              color: Colors.light_blue
                            }}>متأكد يا بابا أنك هتمسح المنتج دا</Text>

                        </View>



                        <View

                          style={{
                            width: '80%',
                            height: height / 15,
                            borderRadius: 5,
                            alignSelf: "center",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            // backgroundColor:"#00f",
                            paddingHorizontal: 10,
                            marginVertical: 10
                          }}>



                          <View
                            style={{
                              width: width / 4,
                              height: height / 20,
                              borderRadius: 10,
                              alignSelf: 'center',
                              justifyContent: "center",
                              backgroundColor: Colors.color_2,
                            }}>
                            <TouchableOpacity
                              style={{ alignItems: 'center', justifyContent: 'center', }}
                              onPress={() => {

                                deleteProduct()


                              }}>
                              <Text
                                style={{

                                  color: '#fff',
                                  fontSize: 22,
                                }}>
                                نعم
                              </Text>
                            </TouchableOpacity>
                          </View>



                          <View
                            style={{
                              width: width / 4,
                              height: height / 20,
                              borderRadius: 10,

                              alignSelf: 'center',
                              justifyContent: "center",

                              backgroundColor: Colors.color_2,
                            }}>
                            <TouchableOpacity
                              style={{ alignItems: 'center', justifyContent: 'center', }}
                              onPress={() => {

                                Setcancelmodel(false)

                              }}>
                              <Text
                                style={{
                                  //fontFamily: 'Janna LT Bold',
                                  color: '#fff',
                                  fontSize: 22,
                                }}>
                                لا
                              </Text>
                            </TouchableOpacity>
                          </View>



                        </View>



                      </View>
                    </View>


                  </Modal>


                </>

              )
  }}
  ListEmptyComponent={() => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <AnimatedLottieView
          source={emptyData}
          autoPlay
          loop
          style={{ height: 300, width: '100%' }}
          resizeMode="contain"
        />
        <Text
          style={{
          
            textAlign: 'center',
            color: "#000",
        //    fontFamily: 'LamaSans-Medium',
          }}>
          لا توجد بيانات لعرضها
        </Text>
      </View>
    );
  }} />
 )}
 </>
  ) : (
    <>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <AnimatedLottieView
          source={no_connection}
          autoPlay
          loop
          style={{ height: 300, width: '100%' }}
          resizeMode="contain"
        />
        <Text
          style={{
            textAlign: 'center',
            color:"#000",
         //   fontFamily: 'LamaSans-Medium',
          }}>
          لا يوجد إتصال بالإنترنت
        </Text>
      </View>
    </>
  )}
        <Modal
          visible={addModal}
          onRequestClose={() => {
            SetaddModal(false)
          }}
          transparent={true}>
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View
              style={{
                width: '90%',
                height: height / 4,
                padding: 10,
                backgroundColor: "#fff",
                elevation: 22,
                borderRadius: 15,
              }}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 10,
                  //    backgroundColor: '#0ff',
                }}>

                <Text
                  style={{
                    fontSize: 23,
                    fontWeight: "800",
                    color: '#000',

                  }}>{modalFor == "إضافة" ? "إضافة منتج" : "تعديل المنتج"}</Text>


              </View>




              <Animatable.View animation={"bounceInLeft"}>

                <View

                  style={{
                    width: '98%',
                    height: height / 15,
                    borderRadius: 5,
                    alignSelf: "center",
                    flexDirection: "row",
                    justifyContent: "center",
                    // backgroundColor:"#00f"
                  }}>


                  <TextInput
                    style={{
                      width: '40%',
                      borderWidth: 2,
                      borderColor: Colors.color_2,
                      borderStyle: "solid",
                      backgroundColor: 'white',
                      borderRadius: 10,
                      marginVertical: 5,
                      marginHorizontal: 5,
                      color: "#000",
                      textAlign: "center"

                    }}
                    placeholder="اسم المنتج"
                    placeholderTextColor={Colors.grey}
                    keyboardType="default"
                    value={(NewinputName + '')}
                    onChangeText={(nameval) => {
                      SetNewinputName(nameval)
                    }}></TextInput>


                  <TextInput
                    style={{
                      width: '40%',
                      borderWidth: 2,
                      borderColor: Colors.color_2,
                      borderStyle: "solid",
                      backgroundColor: 'white',
                      borderRadius: 10,
                      marginVertical: 5,
                      marginHorizontal: 5,
                      color: "#000",
                      textAlign: "center"
                    }}
                    placeholder="السعر"
                    placeholderTextColor={Colors.grey}
                    keyboardType="default"
                    value={(NewinputPrice + '')}
                    onChangeText={(priceval) => {
                      SetNewinputPrice(priceval)
                    }}></TextInput>


                </View>

              </Animatable.View>



              <Animatable.View animation={"bounceInRight"}>

                <View
                  style={{
                    alignSelf: 'center',
                    width: '90%',
                    borderWidth: 1.5,
                    borderColor: Colors.color_3,
                  }} />

                <View
                  style={{
                    width: width / 5,
                    height: height / 20,
                    borderRadius: 10,

                    alignSelf: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 7,
                    backgroundColor: Colors.color_2,
                  }}>
                  <TouchableOpacity
                    style={{ alignItems: 'center', justifyContent: 'center', }}
                    onPress={() => {

                      SetaddModal(false)

                      if (NewinputPrice == 0) {

                        alert("ادخل قيمه لسعر المنتج ي أبي الغالي ")

                        SetaddModal(true)

                      } else if (NewinputName == '') {
                        alert("نسيت اسم المنتج ي بابا")
                        SetaddModal(true)
                      }
                      else if (modalFor == "إضافة") {
                        addNewItem()
                      } else {
                        editProduct()
                      }

                    }}>
                    <Text
                      style={{

                        color: '#fff',
                        fontSize: 20,
                      }}>
                      حفظ
                    </Text>
                  </TouchableOpacity>
                </View>
              </Animatable.View>

            </View>
          </View>


        </Modal>



        {loading ? (
          <View
            style={{
              padding: 20,
              alignItems: "center",
              justifyContent: "center",
              //  backgroundColor:"#0f0"
            }}>

            <View
              style={{
                width: width / 2,
                padding: 7,
                alignItems: 'center',
                borderRadius: 30,
                backgroundColor: '#65a8ef',
              }}


              onPress={() => {
                SetaddModal(true)
                SetmodalFor('إضافة')

              }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
              إضافة منتج
              </Text>
            </View>
          </View>
        ) : (

          <View
            style={{
              padding: 20,
              alignItems: "center",
              justifyContent: "center",
              //  backgroundColor:"#0f0"
            }}>

            <TouchableOpacity
              style={{
                width: width / 2,
                padding: 7,
                alignItems: 'center',
                borderRadius: 30,
                backgroundColor: '#4198f7',
              }}

              onPress={() => {
                SetaddModal(true)
                SetmodalFor('إضافة')

              }} >
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
              إضافة منتج
              </Text>
            </TouchableOpacity>
          </View>
        )}

      </View>
    </>
  )
}

export default ShalabyApp;
