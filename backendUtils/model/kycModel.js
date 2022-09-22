import {Schema,model,models} from 'mongoose'

const mySchema = new Schema({
    owner:{
      type:Schema.Types.ObjectId,
      ref: "users",
      required: [true, 'Please enter Owner id'],
      minlength: 5,
    },
    Name:{
      type:String,
    },
    ownerId:{
        type:String,
        required: [true, 'Please enter Owner id'],
    },
    idNumber:{
      type:String,
      required: [true, 'Please enter a Username'],
      minlength: 5,
      trim: true,
    },
    frontUrl:{
      type:String,
      required: [true, 'Please enter Id front image Url'],
      minlength: 5,
      trim: true,
    },
    backUrl:{
      type:String,
      required: [true, 'Please enter Id back imageImage Url'],
      minlength: 5,
      trim: true,
    },
    status:{
      type:String,
      required: [true, 'Please add status'],
      trim: true,
    },
    
},
  {
    timestamps: true,
  })

const kyc = models.kyc || model('kyc', mySchema)

export default kyc;