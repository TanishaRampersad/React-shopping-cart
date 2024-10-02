// Make sure you include the stage so our function shows on either url
//select the checkout button and add a array stored to a variable and push the new data to the array
// create function to send the data to the backend


stage = 'dev';
const host = stage === 'dev' ? 'http://localhost:5000' : 'https://prussian-and-co.vercel.app/';



//Stripe key
const stripe = Stripe('pk_test_51Q5R7lKFCmfaAXKFfrFdlRFcrb52SHSzAYBkNqhlS7Md2vDGYOd0S2w0jMZpBppHy7AcwAwP6cDdIJX8Ncxd7Jfu00ZS6axjfk')


//grab the payment button
const startCheckout = document.querySelector('.checkout');

startCheckout.addEventListener("click", () => {
    buyProducts(myProducts());
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


async function buyProducts(cartProducts){
    try {

        const body = JSON.stringify({
            products: cartProducts
        })

        const response = await axios.post(`${host}/checkout` , body, {  //post() is to send data to the backend
            headers: {
                Accept: 'application/json',  //acceopt json format
                "Content-Type": 'application/json'
            }
        })

        console.log(response.data)

    } catch (error) {
        console.log(error)
    }
}