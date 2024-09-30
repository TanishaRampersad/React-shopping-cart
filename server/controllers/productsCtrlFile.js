const { productList } = require('../products');


exports.productsCtrlFunction = (req, res) => {
    try {
        res.status(200).json({
            products: productList
        }) //status code that everything is okay

    } catch (error) {
        console.log(error)
    }
}