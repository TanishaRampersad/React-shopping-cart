import { useEffect } from 'react';
import './cart.css';



export default function Cart() {
   useEffect( () => {

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
                        <img src="/images/${item.tag}.jpg" alt="${item.name}"/>
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
                return products;
            });
    
            products.innerHTML += `
            <div class="totalAmount">
                <p class="basketTotalTitle">Basket Total</p>
                <p class="basketTotal">R${totalCost},00</p>
            </div>

            <div class="checkout">
                <button>Checkout</button>
            </div>
            `;

            if (totalCost === 0 || totalCost === "0") {
                emptyCart();
            }
        }
        deleteButtons(); //the delete button function needs to run whenever user wants to click on it
        manageQuantity();
        checkoutButton();
    };


    document.addEventListener("DOMContentLoaded", () => {
        checkoutButton();
    });
    

    function checkoutButton(){
        let button = document.querySelector(".checkout button");

        if (button) { // Ensure button exists
            button.addEventListener("click", () => {
                console.log('Button clicked');
                button.style.backgroundColor = 'rgb(240, 240, 240)';
                button.style.border = '2px solid black';
                button.innerHTML = `<p style="color: black; background-color: rgb(240, 240, 240);">Processing..</p>`;
            });
        } else {
            console.error("Button not found");
        }
    }


    //we're remmoving the cart basketTotal from the page and rendering the innerHTML if there is nothing in the cart
    function emptyCart(){
        
        cartUpdate(); //update the cart shopping bag innerHTML first

        //remove the local storage items
        localStorage.removeItem("cartProducts");
        localStorage.removeItem("cartNumber");
        localStorage.removeItem("totalCost");

        // Remove the basket total section
        let totalAmountSection = document.querySelector(".totalAmount");
        if (totalAmountSection) {
            totalAmountSection.remove();
        }

        // Check if the products container exists before trying to modify it
        let products = document.querySelector('.products');
        if (!products) {  //If there are no cart items. NOTE: we dont want the function to loop through or render cart Items, which is why we exit the function early. If we add the innerHTML within the function it will throw an error because the products class mentioned in the return statement is looking for cartItems 
            return; //Exit early to prevent any further attempts to render cart items that don't exist.
        };

        products.innerHTML = `
                <div class="empty-cart">
                    <ion-icon class="cart-outline" name="cart-outline"></ion-icon>
                    <p>Your shopping cart is empty</p>
                </div>
            `;
    };
    

    //cart number remains the same after page refreshes
    function cartUpdate(){
        let productNumber = localStorage.getItem("cartNumber");

        if(productNumber){
            document.querySelector('.cart span').textContent = productNumber;
        }
    }


    // Update the total cart number in local storage
    function updateCartNumber(newCount) {
        localStorage.setItem("cartNumber", newCount);
        document.querySelector(".cart span").textContent = newCount;
    }


    // Update the total cart number in local storage
    function updateTotalCost(newCost) {
        localStorage.setItem("totalCost", newCost);
        document.querySelector(".cart-total").textContent = newCost;
    }


    function calculateTotalCost(cartProducts) {
        let total = 0;
        Object.values(cartProducts).forEach(item => {
            total += item.price * item.inCart;
        });
        localStorage.setItem("totalCost", total);
        return total;
    }

    function updateBasketTotal(total) {
        document.querySelector(".basketTotal").textContent = `R${total},00`;
    }




    
    //delete button for all items in cart
    function deleteButtons(){
        let deleteButton = document.querySelectorAll('.product ion-icon')
        let productNumbers = parseInt(localStorage.getItem("cartNumber"));
        let cartItems = localStorage.getItem("cartProducts");
        cartItems = JSON.parse(cartItems);
        let cartCost = parseFloat(localStorage.getItem("totalCost"));
    
        //let productName;
    
    
        for(let i = 0; i < deleteButton.length; i++){
            deleteButton[i].addEventListener("click", () => {
                let productName = deleteButton[i].parentElement.textContent.trim().toLowerCase().replace(/ /g, "-");
                // console.log(productName);
    
                localStorage.setItem("cartNumber", productNumbers - cartItems[productName].inCart)
                localStorage.setItem("totalCost", cartCost - (cartItems[productName].price * cartItems[productName].inCart) )
    
                delete cartItems[productName];
                
                document.querySelector(".cart span").textContent = productNumbers;
    
                localStorage.setItem("cartProducts", JSON.stringify(cartItems));

                const newTotalCost = calculateTotalCost(cartItems);
                updateBasketTotal(newTotalCost);

                displayCart(); //we want to display the rest of the cart items after user deletes an item from the cart
                cartUpdate();


            })
        }
    }
    
    


    
    //increase or decrease items in cart
    function manageQuantity(){
        let decrease = document.querySelectorAll(".decrease");
        let increase = document.querySelectorAll(".increase");
        let productsInCart = localStorage.getItem("cartProducts");
        //let totalCost = localStorage.getItem("totalCost");
        //let cartNumber = localStorage.getItem('cartNumber');
        //cartNumber = parseInt(cartNumber); // Ensure it's an integer
    
        productsInCart = JSON.parse(productsInCart)
        //let itemNumber = 0;
    
        for(let i = 0; i < decrease.length; i++) {
            decrease[i].addEventListener("click", () => {
    
                //itemNumber = decrease[i].parentElement.querySelector(".item-quantity p").textContent; //grab the number value between the arrows
                //console.log(itemNumber)
    
                let itemName = decrease[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLowerCase().replace(/ /g, '-').trim();
                //console.log(itemName);
    
                if(productsInCart[itemName].inCart > 1){
                    productsInCart[itemName].inCart -= 1; //change the local storage InCart 
                    //cartNumber( productsInCart[itemName], "decrease"); //change local storage overall cart Number
                    updateCartNumber(parseInt(localStorage.getItem("cartNumber")) - 1);
                    updateTotalCost( productsInCart[itemName], "decrease"); //change the local storage total Cost
                    localStorage.setItem("cartProducts", JSON.stringify(productsInCart));
                    
                    // Update total cost
                    const newTotalCost = calculateTotalCost(productsInCart);
                    updateBasketTotal(newTotalCost);

                    displayCart(); //display rest of the items in cart
                }
            })
        }
    
    
    
        for(let i = 0; i < increase.length; i++) {
            increase[i].addEventListener("click", () => {
                //itemNumber = increase[i].parentElement.querySelector(".item-quantity p").textContent; //grab the number value between the arrows
                //console.log(itemNumber)
    
                let itemName = increase[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLowerCase().replace(/ /g, '-').trim();
                //console.log(itemName);
    
                if(productsInCart[itemName].inCart >= 1){
                    productsInCart[itemName].inCart += 1; //change the local storage InCart 
                    //cartNumber( productsInCart[itemName]); //change local storage overall cart Number
                    updateCartNumber(parseInt(localStorage.getItem("cartNumber")) + 1);
                    updateTotalCost( productsInCart[itemName]); //change the local storage total Cost
                    localStorage.setItem("cartProducts", JSON.stringify(productsInCart));

                    // Update total cost
                    const newTotalCost = calculateTotalCost(productsInCart);
                    updateBasketTotal(newTotalCost);

                    displayCart(); //display rest of the items in cart
                }
                //document.querySelector('.cart span').textContent = cartNumber;
    
                
            })
        }
    
    };


    displayCart();
    checkoutButton();
    
   })

    return(
        <div>

            <div className="products-container">
                <div className="product-header">
                    <h5 className="product-title">PRODUCT</h5>
                    <h5 className="product-price">PRICE</h5>
                    <h5 className="quantity">QUANTITY</h5>
                    <h5 className="total">TOTAL</h5>
                </div>

                <div className="products">

                    <div className="empty-cart">
                        <ion-icon className="cart-outline" name="cart-outline"></ion-icon>
                        <p>Your shopping cart is empty</p>
                    </div>

                </div>
        
            </div>

            <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
            

        </div>
    )
}

