const Product = require('../models/Product');
const {StatusCodes} = require('http-status-codes')
const CustomError = require('../errors')


const createProduct = async (req, res) => {
    req.body.user = req.body.userId
    const product = await Product.create(req.body)
    res.status(StatusCodes.CREATED).json({ product })
}  

const getAllProducts = async (req, res) => {
    const products = await Product.find({})
    res.status(StatusCodes.OK).json({ products, count: products.length })
}

const getSingleProduct = async (req, res) => {
    const product = await Product.findOne({_id: req.params.id})

    if(!product){
        throw new CustomError(`no product with the id of ${req.params.id} found`)
    }

    res.status(StatusCodes.OK).json({ product })
}

const updateProduct = async (req, res) => {
    // just destructuring the id
    const {id:ProductId} = req.params
    const product = await Product.findOneAndUpdate({_id: ProductId}, req.body, {new: true, runValidators : true})

    if(!product){
        throw new CustomError(`no product with the id of ${req.params.id} found`)
    }
    res.status(StatusCodes.OK).json({product})
}

const deleteProduct = async (req, res) => {
    const {id:ProductId} = req.params
    const product = await Product.findOne({_id: ProductId})

    if(!product){
        throw new CustomError(`no product with the id of ${req.params.id} found`)
    }

    await product.remove()
    res.status(StatusCodes.OK).json({ message : 'product removed successfully' })
}

const uploadImage = async (req, res) => {
    res.send('uploadImage')

}

module.exports = {
    getAllProducts,
    getSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    uploadImage
}