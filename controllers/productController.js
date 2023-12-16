const Product = require('../models/Product');
const {StatusCodes} = require('http-status-codes')
const CustomError = require('../errors')


const createProduct = async (req, res) => {

}

const getAllProducts = async (req, res) => {
    const products = await Product.find({})
    res.status(StatusCodes.OK).json({ products })
}

const getSingleProduct = async (req, res) => {
    const product = await Product.findOne({_id: req.params.id})
    if(!product){
        throw new CustomError(`no product with the id of ${req.params.id} found`)
    }
    res.status(StatusCodes.OK).json({ product })
}

const updateProduct = async (req, res) => {
    
}

const deleteProduct = async (req, res) => {
    
}

const uploadImage = async (req, res) => {
    
}