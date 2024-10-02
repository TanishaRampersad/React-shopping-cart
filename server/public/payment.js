// Make sure you include the stage so our function shows on either url
//select the checkout button and add a array stored to a variable and push the new data to the array
//


stage = 'dev';
const host = stage === 'dev' ? 'http://localhost:5000' : 'https://prussian-and-co.vercel.app/';


//grab the payment button
const startCheckout = document.querySelector('.checkout');

startCheckout.addEventListener("click", () => {
    myProducts();
})


function myProducts() {

    let getProducts = JSON.parse(localStorage.getItem('cartProducts'));

    console.log(' buy button clicked')
    console.log(getProducts)

    const products = [];

    for(const property in getProducts){
        products.push({   //we're creating a new object to add to thr products array
            tag: getProducts[property].tag,
            inCart: getProducts[property].inCart,

        })
    }

    return products;
};