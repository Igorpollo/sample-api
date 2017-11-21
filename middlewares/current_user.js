function current_user(req, res, next) {

  var token = req.get('token');

  if(token) {

  return  console.log('teste')
  next()
  }

next()

}
