import {Schema,model,models} from 'mongoose'

const mySchema = new Schema({
    owner:{
      type:String,
      required: [true, 'Please enter a Username'],
      trim: true,
    },
    refferals:{
        type:[String],
    },
    myreferrer:{
        type:String,
    }
    
},
  {
    timestamps: true,
  })

const referral = models.referrals || model('referrals', mySchema)

export default referral;