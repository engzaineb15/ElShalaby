import * as React from 'react';
import { View, Text, FlatList, TouchableOpacity, Dimensions, TextInput, Image, ScrollView, Modal, StatusBar } from 'react-native';
import { SearchBar, IconProps } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Animatable from 'react-native-animatable';
import Colors from '../constant/colors';
import { FAB } from 'react-native-elements';
import axios from 'axios'
import NetInfo from '@react-native-community/netinfo';
import Icon from 'react-native-vector-icons/FontAwesome5';
const { width, height } = Dimensions.get("screen")
import { user, telephone, editicon } from '../constant/imagess'

export default class ShalabyApp extends React.Component {

  constructor(props) {
    super(props)

    this.state = {

      cust_data: this.props.route.params.custdata,

      Cust_data_model: false,
      NewinputName: '',
      inputPhoneNum: '',
      Newdate_receipt_goods: '',

      Payments_details_model: false,

      Newtotal_amount_due: '',
      Newpaid_off: '',
      Newremaining_amount: '',
      Newlast_payment_date: '',
      current_id: ''

      
    }
  }





  componentWillUnmount() {
    // alert("hi")
    let fun = this.props.route.params.passed_reload_fun
    // console.log(fun)
    fun()

  }



  editCustData() {

    let data_to_send = {
      customer_name: this.state.NewinputName,
      remaining_amount:this.state.Newremaining_amount,
      total_amount_due: this.state.Newtotal_amount_due,
      paid_off: this.state.Newpaid_off,
      last_payment_date: this.state.Newlast_payment_date,   
      date_receipt_goods:this.state.Newdate_receipt_goods,
      customer_phone:this.state.inputPhoneNum,
      customer_id: this.state.cust_data.current_id,

    }
//    console.log(data_to_send)
    axios.post("https://frist-test.000webhostapp.com/debt_list/update_cust_data.php", data_to_send).then(res => {
  //    console.log(res.data)
      if (res.data = "success") {
        
        // alert("تم التعديل بنجاح")

        setTimeout(() => {

          this.props.navigation.navigate("customerList"), {
            onGoBack: () => this.refresh(),
          };

        }, 1000);

     //  this.setState({ NewinputName: '', inputPhoneNum: '', Newdate_receipt_goods: '' })

      } else {
        alert("حاول كمان شوية يا بابا معلش ")
      }
    })
    this.setState({ Cust_data_model: false })

  }





  render() {
    return (
      <>
        <StatusBar barStyle="light-content" />
        <View

          style={{ flex: 1, backgroundColor: "#FBFBFB", }}>
          <View
            style={{
              width: "95%",
              shadowColor: 'black',
              shadowOpacity: 0.26,
              shadowOffset: { width: 0, height: 2 },
              shadowRadius: 10,
              elevation: 3,
              backgroundColor: 'white',
              marginVertical: 15,
              borderRadius: 15,
              alignSelf: "center",
              padding: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              /// backgroundColor:"#0f0",
              alignItems: "center",


            }}>

            <View

              style={{
                padding: 5,
                // backgroundColor:"#0f0"
              }}>
              <Text
                style={{
                  fontSize: 27,
                  fontWeight: "bold",
                  color: "#000"

                }}>صفحة العميل</Text>
            </View>



          </View>


          <View
            style={{
              width: width / 1.1,
              shadowColor: 'black',
              shadowOpacity: 0.26,
              shadowOffset: { width: 0, height: 2 },
              shadowRadius: 10,
              elevation: 3,
              backgroundColor: 'white',
              padding: 10,
              marginVertical: 10,
              borderRadius: 10,
              alignSelf: "center",

            }}>
            <View
              style={{
                padding: 3,
                // backgroundColor:"#f0f",
                flexDirection: "row-reverse",
                justifyContent: "space-between",
                marginVertical: 5

              }}>

              <TouchableOpacity
                style={{
                  padding: 5,
                  //backgroundColor:"#ff0",
                  // alignSelf:"flex-end"

                }}

                onPress={() => {
                  this.setState({ Cust_data_model: true, NewinputName : this.state.cust_data.cust_name, Newremaining_amount:this.state.cust_data.remaining_amount, inputPhoneNum: this.state.cust_data.customer_phone, Newdate_receipt_goods: this.state.cust_data.date_receipt_goods,  Newtotal_amount_due : this.state.cust_data.total_amount_due,  Newpaid_off : this.state.cust_data.paid_off, Newlast_payment_date :this.state.cust_data.last_payment_date   })

                }}>
                <Image
                  source={editicon}
                  style={{
                    width: 33,
                    height: 33,
                    resizeMode: "cover",
                    //  backgroundColor:"#000",
                    //     alignSelf:"center"
                  }} />
              </TouchableOpacity>


              <View
                style={{
                  padding: 10,
                //    backgroundColor:"#0f0",

                    shadowColor: 'black',
                    shadowOpacity: 0.26,
                    shadowOffset: { width: 0, height: 2 },
                    shadowRadius: 10,
                    elevation: 3,
                    backgroundColor: Colors.color_2,
                  //  marginVertical: 15,
                    borderRadius: 15,
                    alignSelf: "center",
                   // padding: 10,
                }}>
                <Text
                  style={{
                    fontSize: 23,
                    fontWeight: "bold",
                    color: "#000"

                  }}>بيانات العميل</Text>

              </View>



            </View>

            <View
              style={{

                // backgroundColor:"#0ff",
                flexDirection: "row",
                //alignItems:"center",
                marginVertical: 5,


              }}>
              <View
                style={{

                  padding: 5,
                  // backgroundColor:"#f00",

                }}>
                <Image
                  source={user}
                  style={{
                    width: 30,
                    height: 30,
                    resizeMode: "cover",
                    //  backgroundColor:"#000",
                    //    alignSelf:"center"
                  }} />
              </View>
              <View
                style={{
                  padding: 5,
                  //  backgroundColor:"#0f0"
                }}>
                <Text
                  style={{
                    fontSize: 23,
                    fontWeight: "bold",
                    color: "#000"

                  }}>{this.state.cust_data.cust_name}</Text>

              </View>




            </View>






            <View
              style={{

                // backgroundColor:"#0ff",
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 5



              }}
            >
              <View
                style={{

                  padding: 5,
                  //   backgroundColor:"#ff0",

                }}
              >
                <Image
                  source={telephone}
                  style={{
                    width: 25,
                    height: 25,
                    resizeMode: "cover",
                    //  backgroundColor:"#000",
                    //     alignSelf:"center"
                  }} />
              </View>
              <View
                style={{
                  padding: 3,
                  /// backgroundColor:"#f0f"
                }}>
                <Text
                  style={{
                    fontSize: 23,
                    fontWeight: "bold",
                    color: "#000"

                  }}>{this.state.cust_data.customer_phone}</Text>
              </View>
            </View>




            <View
              style={{

                //backgroundColor:"#0ff",
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 5



              }}
            >

              <View
                style={{
                  padding: 3,
                  /// backgroundColor:"#f0f"
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: "#000"

                  }}>تاريخ استلام البضاعة : {this.state.cust_data.date_receipt_goods}</Text>

              </View>

           
              </View>


              <View
                style={{
             width:width/2,
                //  padding: 5,
                  flexDirection:"column",
                  shadowColor: 'black',
                  shadowOpacity: 0.26,
                  shadowOffset: { width: 0, height: 2 },
                  shadowRadius: 10,
                  elevation: 3,
                  backgroundColor: Colors.color_2,
                 marginVertical: 15,
                  borderRadius: 15,
                 // alignSelf: "center",
                  padding: 10,
                  // backgroundColor:"#0f0"
                }}>
                <Text
                  style={{
                    fontSize: 23,
                    fontWeight: "bold",
                    color: "#000"

                  }}>تفاصيل المدفوعات </Text>
              
            </View>

            <View
              style={{
                //backgroundColor:"#0ff",
                flexDirection: "row",
                //alignItems:"center",
                marginVertical: 5,


              }}>

              <View
                style={{
                  padding: 5,
                  //  backgroundColor:"#0f0"
                }}>
                <Text
                  style={{
                    fontSize: 21,
                    fontWeight: "bold",
                    color: "#000"

                  }}>المبلغ المطلوب تسديده : {this.state.cust_data.total_amount_due} </Text>

              </View>
            </View>

            <View
              style={{

                // backgroundColor:"#0ff",
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 5



              }}>

              <View
                style={{
                  padding: 3,
                  /// backgroundColor:"#f0f"
                }}>
                <Text
                  style={{
                    fontSize: 21,
                    fontWeight: "bold",
                    color: "#000"

                  }}>ما تم تسديده :{this.state.cust_data.paid_off}</Text>
              </View>
            </View>
            <View
              style={{

                // backgroundColor:"#0ff",
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 5



              }}>

              <View
                style={{
                  padding: 3,
                  /// backgroundColor:"#f0f"
                }}>
                <Text
                  style={{
                    fontSize: 21,
                    fontWeight: "bold",
                    color: "#000"

                  }}> المبلغ المتبقي : {this.state.cust_data.remaining_amount}</Text>
              </View>

            </View>

            <View
              style={{

                // backgroundColor:"#0ff",
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 5



              }}>

              <View
                style={{
                  padding: 3,
                  /// backgroundColor:"#f0f"
                }}>
                <Text
                  style={{
                    fontSize: 21,
                    fontWeight: "bold",
                    color: "#000"

                  }}> تاريخ تسديد اخر دفعه: {this.state.cust_data.last_payment_date}</Text>
              </View>
            </View>


          </View>



          <Modal
            visible={this.state.Cust_data_model}
            onRequestClose={() => {
              this.setState({ Cust_data_model: false })
            }}
            transparent={true}>
            <View
              style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <View
                style={{
                  width: '90%',
                  // height: height / 4,
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

                    }}>{"تعديل البيانات"}</Text>


                </View>




                <Animatable.View animation={"bounceInLeft"}>

                  <View

                    style={{
                      width: '98%',
                      // height: height / 15,
                      //padding:10,
                      borderRadius: 5,
                      alignSelf: "center",
                      flexDirection: "column",
                      justifyContent: "center",
                      //  backgroundColor:"#00f"
                    }}>


                    <TextInput
                      style={{
                        // width: '40%',
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
                      placeholder="اسم العميل"
                      placeholderTextColor={Colors.grey}
                      keyboardType="default"
                      value={(this.state.NewinputName + '')}
                      onChangeText={(nameval) => {
                        this.setState({ NewinputName: nameval })
                      }}></TextInput>


                    <TextInput
                      style={{
                        //   width: '40%',
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
                      placeholder="تليفون العميل"
                      placeholderTextColor={Colors.grey}
                      keyboardType="default"
                      value={(this.state.inputPhoneNum)}
                      onChangeText={(PhoneNumval) => {
                        this.setState({ inputPhoneNum: PhoneNumval })
                      }}></TextInput>

                    <TextInput
                      style={{
                        //   width: '40%',
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
                      placeholder="تاريه استلام البضاعة"
                      placeholderTextColor={Colors.grey}
                      keyboardType="default"
                      value={(this.state.Newdate_receipt_goods)}
                      onChangeText={(dateval) => {
                        this.setState({ Newdate_receipt_goods: dateval })
                      }}></TextInput>
  
  
  <TextInput
                      style={{
                        // width: '40%',
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
                      placeholder="المبلغ المطلوب تسديده"
                      placeholderTextColor={Colors.grey}
                      keyboardType="default"
                      value={(this.state.Newtotal_amount_due + '')}
                      onChangeText={(topaidval) => {
                        this.setState({ Newtotal_amount_due: topaidval })
                      }}></TextInput>


                    <TextInput
                      style={{
                        // width: '40%',
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
                      placeholder="ما تم تسديده"
                      placeholderTextColor={Colors.grey}
                      keyboardType="default"
                      value={(this.state.Newpaid_off + '')}
                      onChangeText={(paidval) => {
                        this.setState({ Newpaid_off: paidval })
                      }}></TextInput>


                    <TextInput
                      style={{
                        //   width: '40%',
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
                      placeholder="المبلغ التبقى"
                      placeholderTextColor={Colors.grey}
                      keyboardType="default"
                      value={(this.state.Newremaining_amount)}
                      onChangeText={(rempriceval) => {
                        this.setState({ Newremaining_amount: rempriceval })
                      }}></TextInput>
  <TextInput
                      style={{
                        //   width: '40%',
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
                      placeholder="تاريخ سداد أخر دفعه"
                      placeholderTextColor={Colors.grey}
                      keyboardType="default"
                      value={(this.state.Newlast_payment_date)}
                      onChangeText={(lastdata) => {
                        this.setState({ Newlast_payment_date : lastdata })
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

                     this.setState({ Cust_data_model: false })

                        if (this.state.Newdate_receipt_goods === ' ') 
                              {

                            alert("ادخل تاريخ استلام البضاعة يا بابا")

                            this.setState({ Cust_data_model: true })

                                }  

                              else if (this.state.inputPhoneNum === " ")
                               {

                                alert("نسيت رقم التلفون, لو مفيش اكتب : لا يوجد")

                                this.setState({ Cust_data_model: true })

                              }

                              else if (this.state.Newtotal_amount_due === ' ') {

                            alert("يجب أدخل المبلغ المطلوب تسديده")

                            this.setState({ Cust_data_model: true })

                              } else if (this.state.Newpaid_off === ' ') {
                                alert("يجب أدخال المبلغ الذي تم تسديده حتي الان")
                                this.setState({ Cust_data_model: true })
                              }
                              else if (this.state.Newremaining_amount === ' ') {
                                alert("يجب أدخال المبلغ المتبقي , اذا لما يتبقي  يمكنك كتابة أنه خلص")
                                this.setState({ Cust_data_model: true })

                              } else if (this.state.Newdate_last_payment === ' ') {
                                alert("يجب أدخال تاريخ سدادأخر دفعة")
                                this.setState({ Cust_data_model: true })
                              } else {
                                this.editCustData()
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






          {/* {///////////////////////////} */}


        






        </View>
      </>
    )
  }
}