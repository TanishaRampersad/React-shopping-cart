
// const { productList } = require('../products');
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// exports.checkoutCtrlFunction = async (req, res) => {
//     try {
//         //console.log(req.body.products);
//         const productsFromFrontend = req.body.products;
//         console.log(productList)

//          function productsToBuy(){
//             let products = [];

//             productList.forEach( singleProductList => {  //we're looping through the product.js file 
//                 productsFromFrontend.forEach(singleProductFrontend => {   //we're also looping through the products from the payment.js file
//                     if(singleProductList.tag === singleProductFrontend.tag) {
//                         products.push({
//                             name: singleProductList.name,
//                             description: singleProductList.description,
//                             images: [singleProductList.image],
//                             amount: singleProductList.price * 100,
//                             currency: 'zar',
//                             quantity: singleProductFrontend.inCart
//                         })
//                     }
//                 })
//             })
//             return products;
//         }

//         //here we make the call to stripe
//         const session = await stripe.checkout.sessions.create({
//             payment_method_types: ['card'],
//             success_url: `${req.protocol}://${req.get('host')}/checkout/success`,
//             cancel_url: `${req.protocol}://${req.get('host')}/cart`,
//             shipping_address_collection: {
//                 allowed_countries: ['SA','US'],
//             },
//             line_items: productsToBuy()
//         })

//         res.status(200).json({
//             status: "success",
//             session: session
//         })
//     } catch (error) {
//         //console.log(error)
//     }
// }





//response is when the backend makes a response to the frontend (backend is responding to the frontend). Request is actually whats coming from the frontend and we need to grab it on the backend (backend requesting something from the frontend)

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const { productList } = require('../products');
//const Email = require('../utils/email')
//const Order = require('../models/orderModel');

exports.checkoutCtrlFunction =  async (req, res) => {
    try {
        const productsFromFrontend = req.body.products;
        console.log(productList)

        function productsToBuy(){
            let products = [];

            productList.forEach( singleProductList => {  //this will grab each item object listed within the productList
                productsFromFrontend.forEach(singleProductFrontend => {
                    if( singleProductList.tag === singleProductFrontend.tag ){
                        products.push({
                            // name: singleProductList.name,
                            // description: singleProductList.description,
                            // images: [singleProductList.image],
                            // amount: singleProductList.price * 100, //stripe dont work with normal numbers so we have to mutiply by 100. They work in cents not dollars. $1 is 100 cents.
                            // currency: 'usd',
                            // quantity: singleProductFrontend.inCart

                            quantity: singleProductFrontend.inCart,
                            price_data: {
                                currency: 'zar',
                                unit_amount: singleProductList.price * 100,
                                product_data: {
                                    name: singleProductList.name,
                                    description: singleProductList.description,
                                    images: [singleProductList.image]
                                }
                            }
       
                        })
                    }
                })
            })
            
            return products
        }

        //here we making the call to stripe
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],  //means we are accepting card payment
            success_url: `${req.protocol}://${req.get('host')}/checkout/success`, //if the user payment went well we want to redirect them to another page
            cancel_url: `${req.protocol}://${req.get('host')}/cart`, //this is the back button on the stripe payment page
            shipping_address_collection: {  //will show the countries that we accept on the payment page
                allowed_countries: ['ZA', 'US', 'GB']
            },
            line_items: productsToBuy(), //these are the product items that are in cart that the user wants to buy
            mode: 'payment',
        });
        res.status(200).json({
            status: "success",
            sessionId: session.id,
            session: session
        })
    } catch (error) {
        console.log(error)
    }
};


exports.cartSuccessFunction = (req, res) => {
    res.render('thankyouPage');
}

exports.finishOrder = async (req, res) => {
    const session = await stripe.checkout.sessions.retrieve(
        req.params.id
    )
    console.log("My paymemnt was ", session)

    if(session.payment_status === 'paid') {
        localStorage.clear(); 
        //save transaction into database

        //send an email

        return res.status(200).json({
            success: true
        })
    } else {
        res.status(200).json({
            success:false
        })
    }
}