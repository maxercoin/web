import {Schema,model,models} from 'mongoose'
const AmountSchema = new Schema({
    Amount:{
      type:Number
    },
    coin:{
      type:String
    }

})

const mySchema = new Schema({
    Name:{
      type:String,
      required: [true, 'Please enter a Username'],
      trim: true,
    },
    Amount:{
      type:Number,
      required: [true, 'Please enter an amount'],
      trim: true,
    },
    roi:{
      type:Number,
      required: [true, 'Please enter Return On Investment(ROI)'],
      trim: true,
    },
    yieldPeriod:{
      type:Number,
      required: [true, 'Please enter Return On Investment(ROI)'],
      trim: true,
    },
    primarycolor:{
      type:String,
      trim: true,
    },
    textsColor:{
      type:String,
      trim: true,
    },
    
},
  {
    timestamps: true,
  })

const packageModel = models.packages || model('packages', mySchema)

export default packageModel;