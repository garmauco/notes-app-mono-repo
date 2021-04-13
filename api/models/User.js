const uniqueValidator = require('mongoose-unique-validator')
const { Schema, model } = require('mongoose')
const userSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  name: String,
  passwordHash: String,
  notes: [{
    type: Schema.Types.ObjectId,
    ref: 'Note'
  }]
})
//en note: definimos el tipo como array de tipo objetid y con referencia al modelo Note (models/Note.js) 

//transformamos el JSON que nos develve mongo agregando el .id y borrando los campos _id, __V y passwordHash
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

userSchema.plugin(uniqueValidator)

const User = model('User', userSchema)

module.exports = User