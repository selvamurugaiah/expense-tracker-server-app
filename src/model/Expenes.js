const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const ExpenseSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true, "Title is required"],
        trim:true,
        maxLength:50
    },
    amount:{
        type:Number,
        required:[true, "Amount is required"],
        trim:true
    },
    type:{
        type:String,
        default:"expense"
    },
    date:{
        type:Date,
        required:[true, "Date is required"],
        trim:true,

    },
    category:{
        type:String,
        required:[true, "Category is required"],
        trim:true
    },
    description:{
       type:String,
       required:true,
       maxLength:100,
       trim:true 
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true,"UserId is required"],
    }
},
{
    timestamps:true,
    toJSON:{
        virtuals:true
    },
    toObject:{
        virtuals:true
    },
})


//pagination
ExpenseSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Expense',ExpenseSchema)