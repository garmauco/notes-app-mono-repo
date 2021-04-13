module.exports = (request, response) => {
  console.log(request.path)
  response.status(404).json({
    error: 'Not found'
  })
}