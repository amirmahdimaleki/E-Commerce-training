const {model, Schema} = require('mongoose')

const ProductSchema = new Schema({
    name : {
        type: String,
        required: [true, 'please provide a name'],
        trim: true,
        maxlength: [100, 'please provide a name with less than 100 characters']
    },
    price : {
        type: Number,
        required: [true, 'please provide a price'],
        default: 0
    },
    description : {
        type: String,
        required: [true, 'please describe your product'],
        maxlength: [1000, 'description should be less than 100 characters']
    },
    image : {
        type : String,
        default: '/uploads/example.jpeg',
        required : true
    },
    category : {
        type: String,
        required: [true, 'please provide product category'],
        enum: ['kitchen', 'office', 'bedroom']
    },
    company : {
        type: String,
        required: [true, 'please provide company'],
        enum: {
            values: ['ikea', 'liddy', 'morcos'],
            message: '{VALUE} is not supported'
        }
    },
    colors : {
        type: [String],
        required: true,

    },
    featured : {
        type: Boolean,
        default: false
    },
    freeShipping : {
        type: Boolean,
        default: false
    },
    inventory : {
        type: Number,
        required: true,
        default: 15
    },
    averageRating : {
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }
},
{timestamps:true}
)

module.exports = model('Product', ProductSchema)