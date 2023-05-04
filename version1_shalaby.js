import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, TouchableOpacity, Dimensions, TextInput, Image, ScrollView, Modal, Asyn } from 'react-native';
import { SearchBar, IconProps } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Animatable from 'react-native-animatable';
import Colors from './constant/colors';
import { FAB } from 'react-native-elements';

import Icon from 'react-native-vector-icons/FontAwesome5';

import { plusShala, cancel } from './constant/imagess'
const { width, height } = Dimensions.get("screen")


const ShalabyApp = () => {


  const [listArr, SetlistArr] = useState([])
 
  const modelData = () => {
    [

      {
        item_name: '',
        item_price: ''
      }

    ]
  }


  // const [inputPrice, SetinputPrice] = useState("")
  // const [inputName, SetinputName] = useState("")

  const [NewinputPrice, SetNewinputPrice] = useState("")
  const [NewinputName, SetNewinputName] = useState("")
  const [modalFor, SetmodalFor] = useState("تعديل")
  const [addModal, SetaddModal] = useState(false)
  const [openIndex, SetopenIndex] = useState(-1)
  const [indexcancel, Setindexcancel] = useState(-1)
  const [cancelmodel, Setcancelmodel] = useState(false)
  const [Searchkey, SetSearchkey] = useState('')





  // تخزين الداتا الانشيل

  // const setPriceList = async () => {

  //   let arr = [{
    //   item_name: "طحنه",
    //   item_price: 120
    // },
    // {
    //   item_name: "سمنه",
    //   item_price: 190
    // },
    // {
    //   item_name: "زيت",
    //   item_price: 30
    // },
    // {
    //   item_name: "فلفل",
    //   item_price: 120
    // },
    // {
    //   item_name: "طحنه",
    //   item_price: 120
    // },
  //   ]

  //   await AsyncStorage.setItem("priceList", JSON.stringify(arr))
  // }


  const getPriceList = async () => {

    let arr = await AsyncStorage.getItem("priceList")

    if (arr == null) {

      arr = []

    } else {

      arr = JSON.parse(arr)
    //    for (let i = 0; i < arr.length; i++) {
    //     arr[i].view = true

    // }
    //   console.log(arr)
      SetlistArr(arr)
    }

    // console.log(await AsyncStorage.getItem("priceList"))
  }


  const storePriceList = async (arr) => {



    await AsyncStorage.setItem("priceList", JSON.stringify(arr))

   // console.log(arr)
  }



  const addProduct = () => {
    let arr = [...listArr]
    let inputObj = {
      item_name: NewinputName,
      item_price: NewinputPrice,
      view: true
    }
    arr.push(inputObj)

    SetlistArr(arr)
    SetNewinputPrice('')
    SetNewinputName('')
    SetaddModal(false)
    storePriceList(arr)
  }


  const editProduct = () => {

    let arr = [...listArr]

    let inputObj = {
      item_name: NewinputName,
      item_price: NewinputPrice,
      view: true
    }


    arr[openIndex] = inputObj


    SetlistArr(arr)
    SetNewinputPrice('')
    SetNewinputName('')
    SetaddModal(false)
    storePriceList(arr)

  }



  const deleteProduct = (index) => {

    let arr = [...listArr]
    arr.splice(index, 1)
    SetlistArr(arr)
    storePriceList(arr)


  }




  React.useEffect(() => {

    // let list = [...listArr]

    // for (let i = 0; i < listArr.length; i++) {
    //   list[i].view = true

    // }
    // SetlistArr(list)
   // setPriceList()
    getPriceList()

  }, [])



  const makeSearchRequest = (searchText) => {

    let list = [...listArr]

    for (let i = 0; i < listArr.length; i++) {

      if (((list[i].item_name).toUpperCase()).includes(searchText.toUpperCase())) {

        list[i].view = true

      } else {
        list[i].view = false
      }

    }
    SetlistArr(list)

  }







  return (
    <>
      <View style={{ flex: 1, backgroundColor: "#FBFBFB", }}>

        <View
          style={{
            // width:width/3,
            // backgroundColor:"#00f"
          }}
        >
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

            lightTheme round editable={true}
            platform={"android"}

            value={Searchkey + ''}
            onChangeText={(value) => {
              makeSearchRequest(value)
              SetSearchkey(value)
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

                          SetmodalFor('تعديل'), SetNewinputPrice(item.item_price), SetNewinputName(item.item_name), SetopenIndex(index), SetaddModal(true)


                        }}>


                        <Text
                          style={{
                            fontSize: 23,
                            fontWeight: "600",
                            color: Colors.light_blue,
                            marginHorizontal: 5

                          }}>{item.item_name}</Text>


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

                            }}>{item.item_price}</Text>
                        </View>


                      </TouchableOpacity>

                      <TouchableOpacity

                        style={{
                          //     backgroundColor:"#000",
                          justifyContent: "center"
                        }}

                        onPress={() => {

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
                     //   animationType='slide'
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

                                      deleteProduct(index)
                                      Setcancelmodel(false)

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




          }} />



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
                        addProduct()
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





<View
            style={{
              padding:20,
              alignItems:"center",
              justifyContent:"center",
          //   backgroundColor:"#0f0"
            }}>
            
            <TouchableOpacity
              style={{
                width:width/2,
               padding:7,
                alignItems: 'center',
               borderRadius: 30,
                backgroundColor: '#4198f7',
              }}
              
              
              
            onPress={() => {
              SetaddModal(true)
              SetmodalFor('إضافة')
            }} >
              <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
                اضافة منتج 
              </Text>
            </TouchableOpacity>
          </View>

   
      </View>
    </>
  )
}

export default ShalabyApp;