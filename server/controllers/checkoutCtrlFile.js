
const { productList } = require('../products');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.checkoutCtrlFunction = async (req, res) => {
    try {
        //console.log(req.body.products);
        const productsFromFrontend = req.body.products;
        console.log(productList)

         function productsToBuy(){
            let products = [];

            productList.forEach( singleProductList => {  //we're looping through the product.js file 
                productsFromFrontend.forEach(singleProductFrontend => {   //we're also looping through the products from the payment.js file
                    if(singleProductList.tag === singleProductFrontend.tag) {
                        products.push({
                            name: singleProductList.name,
                            description: singleProductList.description,
                            images: [singleProductList.image],
                            amount: singleProductList.price * 100,
                            currency: 'zar',
                            quantity: singleProductFrontend.inCart
                        })
                    }
                })
            })
        }

        //here we make the call to stripe
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            success_url: `${req.protocol}://${req}`
        })

        res.status(200).json({
            status: "success"
        })
    } catch (error) {
        //console.log(error)
    }
}