import {Schema,model,models} from 'mongoose'

const mySchema = new Schema({
    otp:{
      type:String,
      required: [true, 'Please enter a Username'],
      trim: true,
    },
    email:{
      type:String,
      required: [true, 'Please enter a Username'],
      trim: true,
    }
    
},
  {
    timestamps: true,
  })
const otp = models.otp || model('otp', mySchema)

export default otp;