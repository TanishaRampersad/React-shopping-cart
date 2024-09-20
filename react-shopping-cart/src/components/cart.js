import { useEffect } from 'react';
import '../components/cart.css';
//import Home from '../components/home';
//import { Link } from 'react-router-dom';



export default function Cart() {
    useEffect( () => {

    //cart number remains the same after page refreshes
    function cartUpdate(){
        let productNumber = localStorage.getItem("cartNumber");

        if(productNumber){
            document.querySelector('.cart span').textContent = productNumber;
        }
    }



//add the product items to localstorage and update inCart number
function cartProducts(product){
        let cartProducts = localStorage.getItem("cartProducts");
        cartProducts = JSON.parse(cartProducts);

            if(cartProducts != null){

                if(cartProducts[product.tag] === undefined){
                    cartProducts = {
                        ...cartProducts,
                        [product.tag]: product
                    }
                }
                cartProducts[product.tag].inCart += 1;
            } else {
                product.inCart = 1;

                cartProducts = {
                    [product.tag]: product
                }
            }
            localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
        };

        function cartNumbers(product, action) {
            let productNumber = localStorage.getItem("cartNumber");
            productNumber = parseInt(productNumber);

            if(action === "decrease"){
                localStorage.setItem("cartNumber", productNumber - 1);
                document.querySelector(".cart span").textContent = productNumber - 1;
            } else if(productNumber){
                localStorage.setItem("cartNumber", productNumber + 1)
                document.querySelector('.cart span').textContent = productNumber + 1;
            } else {
                localStorage.setItem("cartNumber", 1)
                document.querySelector('.cart span').textContent = 1;
            }
            cartProducts(product);
        }


        function totalCost(product, action) {
            let totalCost = localStorage.getItem("totalCost")

            if(action === 'decrease'){
                localStorage.setItem("totalCost", +totalCost - product.price)
            } else if(totalCost != null){
                localStorage.setItem("totalCost", +totalCost + product.price)
            } else {
                localStorage.setItem("totalCost", product.price)
            }
        };


        function displayCart(){
            let cartProducts = localStorage.getItem("cartProducts");
            cartProducts = JSON.parse(cartProducts);
            let totalCost = localStorage.getItem("totalCost");
        
            let products = document.querySelector(".products");
        
            if(cartProducts && products){
                products.innerHTML = '';
        
                Object.values(cartProducts).map( item => {
                    products.innerHTML += `
                    <div class="productContainer">
        
                        <div class="product">
                            <ion-icon class="close-circle" name="close-circle-outline"></ion-icon>
                            <img src="./images/${item.tag}.jpg" alt="${item.name}"/>
                            <span>${item.name}</span>
                        </div>
        
                        <div class="price">
                            <p>R${item.price},00</p>
                        </div>
        
                        <div class="item-quantity">
                            <ion-icon class="decrease" name="arrow-back-circle"></ion-icon>
                            <p>${item.inCart}</p>
                            <ion-icon class="increase" name="arrow-forward-circle"></ion-icon>
                        </div>
        
                        <div class="cart-total">
                            <p>R${item.inCart * item.price},00</p>
                        </div>
        
                    </div>
                    `
                });
        
                products.innerHTML += `
                <div class="totalAmount">
                    <p class="basketTotalTitle">Basket Total</p>
                    <p class="basketTotal">R${totalCost},00</p>
                </div>
                `
            }
            deleteButtons(); //the delete button function needs to run whenever user wants to click on it
            manageQuantity();
        };


        //delete button for all items in cart
        function deleteButtons(){
            let deleteButton = document.querySelectorAll('.product ion-icon')
            let productNumbers = parseInt(localStorage.getItem("cartNumber"));
            let cartItems = localStorage.getItem("cartProducts");
            cartItems = JSON.parse(cartItems);
            let cartCost = parseFloat(localStorage.getItem("totalCost"));

            let productName;


            for(let i = 0; i < deleteButton.length; i++){
                deleteButton[i].addEventListener("click", () => {
                    productName = deleteButton[i].parentElement.textContent.trim().toLowerCase().replace(/ /g, "-");
                    // console.log(productName);

                    localStorage.setItem("cartNumber", productNumbers - cartItems[productName].inCart)
                    localStorage.setItem("totalCost", cartCost - (cartItems[productName].price * cartItems[productName].inCart) )

                    delete cartItems[productName];
                    
                    document.querySelector(".cart span").textContent = productNumbers;

                    localStorage.setItem("cartProducts", JSON.stringify(cartItems));

                    displayCart(); //we want to display the rest of the cart items after user deletes an item from the cart
                    cartUpdate();
                })
            }
        };


        //increase or decrease items in cart
        function manageQuantity(){
            let decrease = document.querySelectorAll(".decrease");
            let increase = document.querySelectorAll(".increase");
            let productsInCart = localStorage.getItem("cartProducts");
            let cartNumber = localStorage.getItem('cartNumber');
            cartNumber = parseInt(cartNumber); // Ensure it's an integer

            productsInCart = JSON.parse(productsInCart)
            let itemNumber = 0;

            for(let i = 0; i < decrease.length; i++) {
                decrease[i].addEventListener("click", () => {

                    itemNumber = decrease[i].parentElement.querySelector(".item-quantity p").textContent; //grab the number value between the arrows
                    //console.log(itemNumber)

                    let itemName = decrease[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLowerCase().replace(/ /g, '-').trim();
                    //console.log(itemName);

                    if(productsInCart[itemName].inCart > 1){
                        productsInCart[itemName].inCart -= 1; //change the local storage InCart 
                        cartNumber( productsInCart[itemName], "decrease"); //change local storage overall cart Number
                        totalCost( productsInCart[itemName], "decrease"); //change the local storage total Cost
                        localStorage.setItem("cartProducts", JSON.stringify(productsInCart));
                        displayCart(); //display rest of the items in cart
                    }
                })
            }



            for(let i = 0; i < increase.length; i++) {
                increase[i].addEventListener("click", () => {
                    itemNumber = increase[i].parentElement.querySelector(".item-quantity p").textContent; //grab the number value between the arrows
                    //console.log(itemNumber)

                    let itemName = increase[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLowerCase().replace(/ /g, '-').trim();
                    //console.log(itemName);

                    if(productsInCart[itemName].inCart >= 1){
                        productsInCart[itemName].inCart += 1; //change the local storage InCart 
                        cartNumbers( productsInCart[itemName]); //change local storage overall cart Number
                        totalCost( productsInCart[itemName]); //change the local storage total Cost
                        localStorage.setItem("cartProducts", JSON.stringify(productsInCart));
                        displayCart(); //display rest of the items in cart
                    }
                    //document.querySelector('.cart span').textContent = cartNumber;

                    
                })
            }

        };

        displayCart();
    })

    return(
        <div>

            <div class="products-container">
                <div class="product-header">
                    <h5 class="product-title">PRODUCT</h5>
                    <h5 class="product-price">PRICE</h5>
                    <h5 class="quantity">QUANTITY</h5>
                    <h5 class="total">TOTAL</h5>
                </div>

                <div class="products">

                    <div class="empty-cart">
                        <ion-icon class="cart-outline" name="cart-outline"></ion-icon>
                        <p>Your shopping cart is empty</p>
                    </div>

                </div>
        
            </div>

            <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
            

        </div>
    )
}

