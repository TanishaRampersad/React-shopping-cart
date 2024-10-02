
const { productList } = require('../products')

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

        })

        res.status(200).json({
            status: "success"
        })
    } catch (error) {
        //console.log(error)
    }
}