import {Schema,model,models} from 'mongoose'

const mySchema = new Schema({
    title:{
      type:String,
      required: [true, 'Please enter a Username'],
      minlength: 5,
      trim: true,
    },
    content:{
      type:String,
      required: [true, 'Please enter a Username'],
      minlength: 5,
      trim: true,
    },
    
},
  {
    timestamps: true,
  })

const faq = models.faqs || model('faqs', mySchema)

export default faq;