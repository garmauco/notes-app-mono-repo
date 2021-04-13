const logger = (request, response, next) => {
  console.log(request.method)
  console.log(request.path)
  console.log(request.body)
  // console.log({ request })
  // request.on('error', (err) => {
  //   console.log("---------")
  //   console.log(err);
  // })
  next()
}

module.exports = logger