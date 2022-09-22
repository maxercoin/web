import {Schema,model,models} from 'mongoose'

const mySchema = new Schema({
    userName:{
      type:String,
      required: [true, 'Please enter a Username'],
      minlength: 3,
      trim: true,
    },
    firstName:{
      type:String,
      required: [true, 'Please enter Your first Name'],
      minlength: 3,
      default: '',
      trim: true,
    },
    lastName:{
      type:String,
      required: [true, 'Please enter Your last name'],
      minlength: 3,
      default: '',
      trim: true,
    },
    role:{
      type:String,
      required: true,
      minlength: 3,
      default: '',
      trim: true,
    },
    activated:{
      type:Boolean
    },
    email:{
        type:String,
        required:[true, 'Please enter a email'],
        unique:true,
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          'Please enter a valid email address',
        ],
    },
    password:{
        type:String,
        required: [true, 'Please enter a Password'],
        minlength: 6,
    }
},
  {
    timestamps: true,
  })

const admin = models.admins || model('admins', mySchema)

export default admin;