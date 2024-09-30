const addToCart = document.getElementsByClassName("add-to-cart");

let products = [];

//makign a query to the backend with a get request
async function getProducts() {
    const response = await axios.get('http://localhost:5000/products')
    console.log(response.data)

    products = response.data.products

    populateProducts();
}

getProducts();


function populateProducts() {
    const container = document.querySelector('.image-container');

    const productsHtml = products.map((product, i) => {
        return (
            `
            <div class="image">
                <img src="${product.image}" alt="${product.name}"/>

                <div class="content">
                    <div class="text-content">
                        <p>${product.name}</p>
                        <h4>Blazer & Trouser R${product.price}</h4>
                    </div>
                
                <button class="add-to-cart cart${i}">Add to Cart</button>
                </div>
            </div>
            `
        )
    })

    if(container){  //this renders the products html on the page
        container.innerHTML += productsHtml.toString().replaceAll(',', '')
    }

    for(let i = 0; i < addToCart.length; i++) {
        addToCart[i].addEventListener("click", () => {
            cartNumbers(products[i])
            totalCost(products[i])
        })
    }

}




//update cart number in local storage and UI
function cartNumbers(product, action) {
    let productNumber = localStorage.getItem("cartNumber");
    productNumber = parseInt(productNumber);

    if(action == "decrease"){
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

        if(cartProducts[product.tag] == undefined){
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


function totalCost(product, action) {
    let totalCost = localStorage.getItem("totalCost")

    if(action == 'decrease'){
        localStorage.setItem("totalCost", +totalCost - product.price)
    } else if(totalCost != null){
        localStorage.setItem("totalCost", +totalCost + product.price)
    } else {
        localStorage.setItem("totalCost", product.price)
    }
}




/* -------- Cart HTML Javascript --------- */

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
}


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
}


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
                cartNumbers( productsInCart[itemName], "decrease"); //change local storage overall cart Number
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

}

cartUpdate();
displayCart();


