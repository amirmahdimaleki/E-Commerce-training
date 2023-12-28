const Product = require('../models/Product');
const {StatusCodes} = require('http-status-codes')
const CustomError = require('../errors')
const path = require('path')


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
    if(!req.files){
        throw new CustomError.BadRequestError('no files uploaded')
    }
    const productImage = req.files.image

    if (!productImage.mimetype.startsWith('image')) {
      throw new CustomError.BadRequestError('Please Upload Image')
    }
  
    const maxSize = 1024 * 1024;
  
    if (productImage.size > maxSize) {
      throw new CustomError.BadRequestError(
        'Please upload image smaller than 1MB'
      )
    }
  
    const imagePath = path.join(
      __dirname,
      '../public/uploads/' + `${productImage.name}`
    )
    await productImage.mv(imagePath)
    res.status(StatusCodes.OK).json({ image: `/uploads/${productImage.name}` })
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