require('dotenv').config()
require('./mongo')
const express = require('express')
const Sentry = require('@sentry/node');
const Tracing = require("@sentry/tracing");
const logger = require('./middleware/loggerMiddleware')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())

app.use(logger)
const notesRouter = require('./controllers/notes')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const testingRouter = require('./controllers/testing')


const notFound = require('./middleware/notFound')
const handleErrors = require('./middleware/handleErrors')
//definimos la carpeta de archivos estaticos 
app.use(express.static('../app/build'))
Sentry.init({
  dsn: "https://c516285ad22f4554a5b10efa4db7ec21@o559023.ingest.sentry.io/5693318",
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app }),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());




app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
if (process.env.NODE_ENV === 'test') {
  app.use('/api/testing/', testingRouter)
}

app.use(notFound)
app.use(Sentry.Handlers.errorHandler());
app.use(handleErrors)



const PORT = process.env.PORT || 3001
const server = app.listen(PORT, () => {
  console.log(`Server runing on PORT: ${PORT}`)
})

module.exports = { app, server }