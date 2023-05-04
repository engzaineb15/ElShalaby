import * as React from 'react';
import { View, Text, FlatList, TouchableOpacity, Dimensions,ActivityIndicator, TextInput, Image, ScrollView, Modal,StatusBar } from 'react-native';
import { SearchBar, IconProps } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Animatable from 'react-native-animatable';
import Colors from '../constant/colors';
import { FAB } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios'
import {  cancel,emptyData,no_connection } from '../constant/imagess'
const { width, height } = Dimensions.get("screen")

import NetInfo from '@react-native-community/netinfo';
import AnimatedLottieView from 'lottie-react-native';

export default class ShalabyApp extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
       
      custList :[],

      NewinputPricecust :'',
      NewinputNamecust:'',
      modalForcust:'تعديل',
      addModalcust:false,
      openIndexcust:-1,
      indexancelcust:-1,
      cancelmodelcust:false,
      Searchkeycust:"",
      current_id:'',

      loading:true,
      connectionType: '',
      networkConnection: true,

    }
  }

 

 

  componentDidMount(){
    this.NetworkFun()
  this.getData()
  
}



 NetworkFun(){ 
  
  NetInfo.addEventListener(state => {

  console.log('Connection type', state.type);
  // check if there is any connection even it hasn't real network
  console.log('Is connected?', state.isConnected);
  // check if there is Real Network
  console.log('Is connected?', state.isInternetReachable);

if(state.isConnected){
  this.getData()

}
  this.setState({
    connectionType: state.type,
    networkConnection: state.isInternetReachable,
  });
});

}  




reload_fun(){
  this.getData()
}


 

   addNewcust () {

    let data_to_send = {
      customer_name: this.state.NewinputNamecust,
      remaining_amount: this.state.NewinputPricecust,

    }
    axios.post("https://frist-test.000webhostapp.com/debt_list/add_cust.php", data_to_send).then(res => {
     console.log(res.data)
      if (res.data = "success") {
        this.getData()

       this.setState({NewinputPricecust :'' })
       this.setState({NewinputNamecust :'' })
     

      } else {
        alert("حاول كمان شوية يا بابا معلش ")
      }
    })
  }


   getData() {

    this.setState({loading :true})
    if(this.state.custList.length==0){
    axios.get("https://frist-test.000webhostapp.com/debt_list/select_all_cust.php").then(res => {
       console.log(res.data)
      let arr = res.data
      for (let i = 0; i < arr.length; i++) {
        arr[i].view = true
      }
      this.setState({custList:arr})
    this.setState({loading :false})
    })
    .catch(error => {
     console.log(error);
      this.setState({loading :false})
    });
  }
  
  }








   deletecust  () {

    

    let data_to_send = {
      customer_id: this.state.current_id
    };

   

   console.log(data_to_send)

    axios.post("https://frist-test.000webhostapp.com/debt_list/delete_cust.php", data_to_send).then(res => {

    console.log(res.data)
    //  const filteredCustomers = custList.filter(custList => custList.customer_id !== current_id);
    //  SetcustList(filteredCustomers);

     this.setState({loading :true})

      if (res.data == "success") {
          
      
        this.getData()
        
      
      } else {
        alert("حاول كمان شوية يا بابا معلش ")
      }
    })

    .catch(error => {
      console.log(error);
      this.setState({loading :false})
    });

   this.setState({cancelmodelcust :false})

  } 


  
   makeSearchRequestcust (searchText) {

    let list = this.state.custList

    for (let i = 0; i < this.state.custList.length; i++) {

      if (((list[i].customer_name).toUpperCase()).includes(searchText.toUpperCase())) {

        list[i].view = true

      } else {
        list[i].view = false
      }

    }
   this.setState({custList : list})

  }




  render() {

  return (
    <>
    <StatusBar  barStyle="light-content"/>
      <View style={{ flex: 1, backgroundColor: "#FBFBFB" }}>

        <View
          style={{
            // width:width/3,
            // backgroundColor:"#00f"
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

          //  lightTheme round editable={true}
        //   platform={"android"}

            value={this.state.Searchkeycust + ''}
            onChangeText={(value) => {
              this.makeSearchRequestcust(value)
             this.setState({Searchkeycust:value})
            }}/>

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

            }}>{'اسم العملاء'}</Text>

          <Text
            style={{
              fontSize: 24,
              fontWeight: "600",
              color: Colors.light_blue,
              // marginHorizontal:5

            }}>{'المتبقى'}</Text>


        </View>


        {this.state.networkConnection ? (
          <>

        {this.state.loading?(
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

          data={this.state.custList}
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

               {item.view  ?  (


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
                   //    backgroundColor:"#00f"
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
                          // console.log(item)
                         
                          this.props.navigation.navigate("customerDetials",{
                           custdata :{
                            cust_name: item.customer_name,
                            remaining_amount:item.remaining_amount,
                             date_receipt_goods:item.date_receipt_goods,
                           total_amount_due:item.total_amount_due,
                           paid_off:item.paid_off,
                           last_payment_date:item.last_payment_date,
                           customer_phone:item.customer_phone,
                           current_id:item.customer_id
                           
                           }, 
                           passed_reload_fun:this.reload_fun.bind(this)
                          
                          })
                          
                          }}>


                        <Text
                          style={{
                            fontSize: 23,
                            fontWeight: "600",
                            color: Colors.light_blue,
                            marginHorizontal: 5

                          }}>{item.customer_name}</Text>


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

                            }}>{item.remaining_amount}</Text>
                        </View>


                      </TouchableOpacity>

                      <TouchableOpacity

                        style={{
                          //     backgroundColor:"#000",
                          justifyContent: "center"
                        }}

                        onPress={() => {

                          
                            this.setState({current_id:item.customer_id})
                            this.setState({cancelmodelcust:true})
                            this.setState({indexancelcust:index})
                       

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

                ) : null }
                
                


<Modal
                        visible={this.state.cancelmodelcust}
                    //   animationType='fade'
                      
                        onRequestClose={() => {
                         
                          this.setState({cancelmodelcust:false})
                        }}
                        transparent={true}
                        >
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
                                }}>متأكد يا بابا أنك هتمسح العميل دا</Text>

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
                                             

                                      this.deletecust(item.customer_id)
                                      

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

                                      this.setState({cancelmodelcust:false})

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

            );

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
          }}
          />
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
          visible={this.state.addModalcust}
          onRequestClose={() => {
           
            this.setState({addModalcust:false})
          }}
          transparent={true}>
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View
              style={{
                width: '90%',
              //  height: height / 4,
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

                  }}>{this.state.modalForcust == "إضافة" ? "إضافة عميل" : " إضافة عميل"}</Text>


              </View>




              <Animatable.View animation={"bounceInLeft"}>

                <View

                  style={{
                    width: '98%',
                  //  height: height / 15,
                    borderRadius: 5,
                    alignSelf: "center",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems:"center",
                  //   backgroundColor:"#00f"
                  }}>


                  <TextInput
                    style={{
                      width: '90%',
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
                    value={(this.state.NewinputNamecust + '')}
                    onChangeText={(nameval) => {
                     this.setState({NewinputNamecust:nameval})
                    }}></TextInput>


                  <TextInput
                    style={{
                      width: '90%',
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
                    placeholder="السعر المتبقى"
                    placeholderTextColor={Colors.grey}
                    keyboardType="default"
                    value={(this.state.NewinputPricecust + '')}
                    onChangeText={(priceval) => {
                      this.setState({NewinputPricecust:priceval})
                     

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

                     
                       this.setState({addModalcust:false})

                      if (this.state.NewinputNamecust == '' ) {

                        alert("نسيت اسم العميل ي بابا")
                        this.setState({addModalcust:true})

                      } else if (this.state.NewinputPricecust == '') {
                        alert("ادخل القيمه المتبقية ي أبي ")
                       
                        this.setState({addModalcust:true})
                      }
                      else if (this.state.modalForcust == "إضافة") {
                        this.addNewcust()
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




        {this.state.loading?(

<View
style={{
  padding:20,
  alignItems:"center",
  justifyContent:"center",
//   backgroundColor:"#0f0"
}}>

<View
  style={{
    width:width/2,
   padding:7,
    alignItems: 'center',
   borderRadius: 30,
    backgroundColor: '#65a8ef',
  }}
  
  
  
onPress={() => {
  this.setState({addModalcust:true})
  this.setState({modalForcust:"إضافة"})
  
}} >
  <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
  إضافة عميل 
  </Text>
</View>
</View>
          
          
          ):(
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
              this.setState({addModalcust:true})
              this.setState({modalForcust:"إضافة"})
            }} >
              <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
              إضافة عميل 
              </Text>
            </TouchableOpacity>
          </View>
          )}
   
      </View>
    </>
  )
  }}

