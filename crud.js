let title = document.getElementById('title')
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let counter = document.getElementById('ctr');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let input = document.querySelectorAll('input');
const myElement = document.getElementById("amir");
let search = document.getElementById('search')


let mood ='create';
let tmp;

// console.log(title,price,taxes,ads,discount,total,category,submit,counter)
// console.log(discount)





//1. get total price
 function getTotal() {

    if(price.value !=""){

       let result = (Number(price.value) + Number(taxes.value) + Number(ads.value)) - Number(discount.value)
       total.innerHTML= result
       total.style.background ='lightgreen'

    }else{
       total.innerHTML= ""
       total.style.background ='crimson'
    }
}

//3.save local storage
let Products;
if (localStorage.product != null ) {
   Products = JSON.parse(localStorage.product)
} else {
   Products = [];
}


//2. create a product
function createProduct() {

   let newProduct = {
      title: title.value.toLowerCase(),
      price: price.value,
      taxes: taxes.value,
      ads: ads.value,
      discount: discount.value,
      total: total.innerHTML,
      counter: counter.value,
      category: category.value.toLowerCase(),
   }

   // clean data
   if (title.value != ''  && price.value != '' && category.value != '' && counter.value <=100 ) {

         if (mood==="create") {
            //8# create more than product count
         if(newProduct.counter >1){
            
            for (let i = 0; i < newProduct.counter; i++) {
               Products.push(newProduct)
               }
            
         }else{
            //if one product
            Products.push(newProduct)
            } 
      
      
         } else {
            // -mood update---
            Products[tmp] = newProduct
            submit.innerHTML='create'
            counter.style.display="block"
            mood="create"
         }
         clearData()
   }else{
      alert("please enter title , price and value")
   }
  



   localStorage.setItem('product',JSON.stringify(Products))
   //4.clear inputs
   
   showData()  
   
}

//4. clear Data
function clearData( ) {
      title.value = ''
      price.value = ''
      taxes.value = ''
      ads.value = ''
      discount.value = ''
      total.innerHTML = ''
      counter.value = ''
      category.value = ''
}

//5.function_R : showData()
function showData( ) {
   let arr ='';

   for (let i = 0; i < Products.length; i++) {

      arr += `
<tr>
       <td>${i+1}</td>
       <td>${Products[i].title}</td>
       <td>${Products[i].price}</td>
       <td>${Products[i].taxes}</td>
       <td>${Products[i].ads}</td>
       <td>${Products[i].discount}</td>
       <td>${Products[i].total}</td>
       <td>${Products[i].category}</td>
       <td><button onclick='updateData(${i})' id='Updat' type="submit">update</button></td>
       <td><button onclick='deletePro(${i})' id='del' type="submit">delete</button></td>
   </tr>
`
      
}

   myElement.innerHTML=arr
   //#7.delete All
 let delAllData= document.getElementById('delAllData') 
 
 if (Products.length>0) {
    delAllData.innerHTML= `
    <button onclick='deleteAll()' id='dellAll' type="submit">Delete ALL(${Products.length})</button>
    `
 }else{
   delAllData.innerHTML=''
 }

   getTotal()
}
//5.1 call fnc showData
showData()  



//6# delete product
function deletePro(i) {
   Products.splice(i,1)
   localStorage.product = JSON.stringify(Products)
   showData()  
   
}



//7# delete All
function deleteAll() {
   localStorage.clear()
   Products.splice(0)
   showData()
}

//8# Update
function updateData(i) {
   submit.innerHTML='update'
   title.value = Products[i].title
   price.value =  Products[i].price
   taxes.value =  Products[i].taxes
   ads.value =    Products[i].ads
   discount.value =  Products[i].discount
    getTotal()
   counter.style.display='none'
   category.value =  Products[i].category
   mood='update'
   tmp=i;
   scroll({
      top:0,
      behavior:"smooth"
   })
}


//9# choose search
let searchMood ="title"
function searchBy(id) {
   if (id==="searchTitle") {
      searchMood ="title"
   } else {
      searchMood ="category"
   }
   search.placeholder = `search by ${searchMood} ..`
   search.focus()
   search.value=''
   showData()
}

//9.1#  search Data by•••
function searchData(value) {
   
   let arr =''
   
   for (let i = 0; i < Products.length; i++) {
         if (searchMood == 'title' ) {
               // loop case : title
               if (Products[i].title.includes(value.toLowerCase()) ) {
                  arr += 
                  `<tr>
                     <td>${i}</td>
                     <td>${Products[i].title}</td>
                     <td>${Products[i].price}</td>
                     <td>${Products[i].taxes}</td>
                     <td>${Products[i].ads}</td>
                     <td>${Products[i].discount}</td>
                     <td>${Products[i].total}</td>
                     <td><button onclick='updateData(${i})' id='Updat' type="submit">update</button></td>
                     <td><button onclick='deletePro(${i})' id='del' type="submit">delete</button></td>
                  </tr> `

               }

         } else {
               // loop case : category
                  if (Products[i].category.includes(value.toLowerCase()) ) {
                     arr += 
                     `<tr>
                        <td>${i}</td>
                        <td>${Products[i].title}</td>
                        <td>${Products[i].price}</td>
                        <td>${Products[i].taxes}</td>
                        <td>${Products[i].ads}</td>
                        <td>${Products[i].discount}</td>
                        <td>${Products[i].total}</td>
                        <td>${Products[i].category}</td>
                        <td><button onclick='updateData(${i})' id='Updat' type="submit">update</button></td>
                        <td><button onclick='deletePro(${i})' id='del' type="submit">delete</button></td>
                     </tr> `

                  }
               
         }
      }      
   

   myElement.innerHTML =arr
}