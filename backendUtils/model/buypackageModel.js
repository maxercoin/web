import {Schema,model,models} from 'mongoose'
const TxHistory = new Schema({
    ownerid:{
        type:String,
        required:[true,'Please enter the owner Id']
    },
    ownerUserName:{
        type:String,
        required:[true,'Please enter the owner username']
    },
    package:{
        type:String,
        required:[true,"Please enter package name"]
    },
    instructionType:{
        type:String,
        trim:true
    },
    instruction:{
        type:String,
        trim:true
    },
    txBscId:{
        type:String
    },
    ownerSendingOrRecievingAddress:{
        type:String
    },
    paymentdate:{
        type:String
    },
    block_height: {
        type:Number
    },
    value_quote: {
        type:Number
    },
    coin:{
        type:String
    }
})
const BalancesSchema = new Schema({
    Amount:{
        type:Number,
    },
    coin:{
        type:String
    }
})
const PackagesSchema = new Schema({
    Name:{
        type:String,
        required:[true,'Please enter package name'],
        trim:true
    },
    roi:{
        type:Number,
        required:[true,'Please enter package roi'],
    },
    investAmount:{
        type:Number,
        required:[true,'Please enter amount']
    },
    Balance:{
        type:Number,
        required:[true,'Please enter Balance']
    },
    yieldPeriod:{
        type:Number,
        requireed:[true,'Please enter yield period']
    },
    nextYieldDate:{
        type:Number,
        required:[true,'Please enter next yield date']
    },
    lastYieldDate:{
        type:Number
    },
    profit:{
        type:Number,
    },
    status:{
        type:String,
    },
    coin:{
        type:String
    }
})
const mySchema = new Schema({
    ownerid:{
        type:String,
        required:[true,'Please enter the owner Id']
    },
    ownerUserName:{
        type:String,
        required:[true,'Please enter the owner username']
    },
    packagesBought:{
      type:[String],
      required: [true, 'Please enter at least a package'],
      trim: true,
    },
    packages:{
        type:[PackagesSchema]
    },
    Balance:{
      type:[BalancesSchema],
      required: [true, 'Must have a balance'],
      trim: true,
    },
    roi:{
      type:Number,
      required: [true, 'Please enter Return On Investment(ROI)'],
      trim: true,
    },
    investments:{
        type:[Number],
    },
    history:{
        type:[TxHistory]
    },
    historyTxIds:{
        type:[String]
    },
    hasPendingWithdrawal:{
        type:Boolean,
    }
    
},
  {
    timestamps: true,
  })

const buypackageModel = models.buypackage || model('buypackage', mySchema)

export default buypackageModel;