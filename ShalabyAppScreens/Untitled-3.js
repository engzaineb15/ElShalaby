const deleteProduct = (current_id) => {


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
  
  Setcancelmodel(false)
}