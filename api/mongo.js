const mongoose = require('mongoose')

const { MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV } = process.env

const connectionString = NODE_ENV === 'test'
  ? MONGO_DB_URI_TEST
  : MONGO_DB_URI

//conección mongoDB

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
  .then(() => {
    console.log('Database connected')
  }).catch(err => {
    console.log(err)
  })

//si se encuentra algun error, se cierra la conexion  
process.on('uncaughtException', (error) => {
  console.log(error)
  mongoose.disconnect()

})
// Note.find({}).then(result => { console.log(result); mongoose.connection.close() })

// const note = new Note({
//   content: 'Primer nota con mongoose',
//   date: new Date(),
//   important: true
// })

// note.save()
//   .then(result => {
//     console.log(result)
//     mongoose.connection.close()
//   }).catch(err => {
//     console.log(err)
//   })

