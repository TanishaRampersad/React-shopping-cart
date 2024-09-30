import './home.css';
import { useEffect } from 'react';
//import Cart from './cart';

import midnight from '../images/midnight-blue-suit.jpg';
import grey from '../images/grey-suit.jpg';
import black from'../images/black-suit.jpg';
import beige from'../images/light-beige-suit.jpg';
import allblack from'../images/allblack-suit.jpg';
import lightgrey from'../images/light-grey-suit.jpg';
import darkBeige from'../images/dark-beige-suit.jpg';
import darkBlue from'../images/dark-blue-suit.jpg';
import cream from'../images/cream-suit.jpg';
import green from'../images/green-suit.jpg';

export default function Home(){
        useEffect(() => {
            const addToCart = document.getElementsByClassName("add-to-cart");

            let products = [
                {
                    name: "Midnight Blue Suit",
                    tag: 'midnight-blue-suit',
                    price: 4999.00,
                    inCart: 0,
                },
                {
                    name: "Grey Suit",
                    tag: 'grey-suit',
                    price: 3699.00,
                    inCart: 0,
                },
                {
                    name: "Black Suit",
                    tag: 'black-suit',
                    price: 4699.00,
                    inCart: 0,
                },
                {
                    name: "Light Beige Suit",
                    tag: 'light-beige-suit',
                    price: 3599.00,
                    inCart: 0,
                },
                {
                    name: "All Black Suit",
                    tag: 'allblack-suit',
                    price: 4999.00,
                    inCart: 0,
                },
                {
                    name: "Light Grey Suit",
                    tag: 'light-grey-suit',
                    price: 4199.00,
                    inCart: 0,
                },
                {
                    name: "Dark Beige Suit",
                    tag: 'dark-beige-suit',
                    price: 4999.00,
                    inCart: 0,
                },
                {
                    name: "Dark Blue Suit",
                    tag: 'dark-blue-suit',
                    price: 5299.00,
                    inCart: 0,
                },
                {
                    name: "Cream Suit",
                    tag: 'cream-suit',
                    price: 4299.00,
                    inCart: 0,
                },
                {
                    name: "Green Suit",
                    tag: 'green-suit',
                    price: 4699.00,
                    inCart: 0,
                },
                

            ]


            for(let i = 0; i < addToCart.length; i++) {
                addToCart[i].addEventListener("click", () => {
                    cartNumbers(products[i])
                    totalCost(products[i])
                })
            }

            //update cart number in local storage and UI
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

            cartUpdate();

        });

        
    return(
        <div>
    
            <div className="section1">

                <div className="top-section">
                    <p>New Arrivals</p>
                </div>

                <div className="men-description">
                    <h5>Suits for Men</h5>
                    <br/>
                    <p>Discover our latest collection of refined men’s suits, designed for the modern gentleman. Crafted from premium fabrics with impeccable tailoring, these suits exude timeless elegance and sophistication. Perfect for formal occasions or elevating your everyday style, our new arrivals blend classic design with a contemporary touch, offering unmatched comfort and a flawless fit.</p>
                </div>

            </div>


            <div className="image-container">
                <div className="image">
                    <img src={midnight} alt="midnight blue suit"/>

                    <div className="content">
                        <div class="text-content">
                            <p>Midnight Blue</p>
                            <h4>Blazer & Trouser R4 999.00</h4>
                        </div>
                        
                        <button class="add-to-cart">Add to Cart</button>
                    </div>
                </div>

                <div className="image">
                    <img src={grey} alt="grey suit"/>

                    <div className="content">
                        <div className="text-content">
                            <p>Grey</p>
                            <h4>Blazer & Trouser R3 699.00</h4>
                        </div>

                            <button className="add-to-cart">Add to Cart</button>
                    </div>
                </div>

                <div className="image">
                    <img src={black} alt="black suit"/>

                    <div className="content">
                        <div className="text-content">
                            <p>Black</p>
                            <h4>Blazer & Trouser R4 699.00</h4>
                        </div>

                        <button className="add-to-cart">Add to Cart</button>
                    </div>
                    
                </div>

                <div className="image">
                    <img src={beige} alt="light beige"/>

                    <div className="content">
                        <div className="text-content">
                            <p>Light Beige</p>
                            <h4>Blazer & Trouser R3 599.00</h4>
                        </div>

                            <button className="add-to-cart">Add to Cart</button>
                    </div>
                    
                </div>

                <div className="image">
                    <img src={allblack} alt="all black suit"/>

                    <div className="content">
                        <div className="text-content">
                            <p>All Black</p>
                            <h4>Blazer & Trouser R4 999.00</h4>
                        </div>

                            <button className="add-to-cart">Add to Cart</button>
                    </div>
                
                </div>

                <div className="image">
                    <img src={lightgrey} alt="light grey suit"/>

                    <div className="content">
                        <div className="text-content">
                            <p>Light Grey</p>
                            <h4>Blazer & Trouser R4 199.00</h4>
                        </div>

                            <button className="add-to-cart">Add to Cart</button>
                    </div>
                    
                </div>

                <div className="image">
                    <img src={darkBeige} alt="dark beige suit"/>

                    <div className="content">
                        <div className="text-content">
                            <p>Dark Beige</p>
                            <h4>Blazer & Trouser R4 999.00</h4>
                        </div>

                            <button className="add-to-cart">Add to Cart</button>
                    </div>
                    
                </div>

                <div className="image">
                    <img src={darkBlue} alt="dark blue suit"/>

                    <div className="content">
                        <div className="text-content">
                            <p>Dark Blue</p>
                            <h4>Blazer & Trouser R5 299.00</h4>
                        </div>

                            <button className="add-to-cart">Add to Cart</button>
                    </div>
                    
                </div>

                <div className="image">
                    <img src={cream} alt="cream suit"/>

                    <div className="content">
                        <div className="text-content">
                            <p>Cream</p>
                            <h4>Blazer & Trouser R4 299.00</h4>
                        </div>

                            <button className="add-to-cart">Add to Cart</button>
                    </div>
                    
                </div>

                <div className="image">
                    <img src={green} alt="green suit"/>

                    <div className="content">
                        <div className="text-content">
                            <p>Green</p>
                            <h4>Blazer & Trouser R4 699.00</h4>
                        </div>

                            <button className="add-to-cart">Add to Cart</button>
                    </div>
                </div>
            </div>


        </div>
    )
}