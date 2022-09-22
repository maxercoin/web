import {Schema,model,models} from 'mongoose'

const mySchema = new Schema({
    userName:{
      type:String,
      required: [true, 'Please enter a Username'],
      minlength: 3,
      trim: true,
      unique:true,
      dropDups: true,
    },
    referrer:{
      type:String,
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
    activated:{
      type:Boolean
    },
    email:{
        type:String,
        required:[true, 'Please enter a email'],
        unique:true,
        dropDups: true,
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          'Please enter a valid email address',
        ],
    },
    password:{
        type:String,
        required: [true, 'Please enter a Password'],
        minlength: 6,
    },
    walletAddress:{
        type:String,
        required: [true, 'Please enter a bnb or eth address from your trust wallet or metamask or any decentralized wallet.'],
        trim:true
    },
    walletkeyStore:{
      type:Object,
      required:[true,"Please try again, there might be some network error while creating the wallet."]
    }
},
  {
    timestamps: true,
  })

const user = models?.users || model('users', mySchema)

export default user;