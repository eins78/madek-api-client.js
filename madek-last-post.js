var traverson = require('traverson');

// madek JSON/HAL API entry point 
var api = traverson.jsonHal.from('http://localhost:3000/api')

api.newRequest()
   .follow('madek:media_resources')
   .withRequestOptions({'auth': {
     'user': 'a-fancy-application',
     'pass': 'd1e10c76-71b6-4467-8be3-21177ec0f14e',
     'sendImmediately': false // needed! only send auth after 401
   }})
   .getResource(function(error, document) {
  if (error) {
    console.error('No luck :-)', error)
  } else {
    console.log('We have followed the path and reached our destination.')
    console.log(JSON.stringify(document))
  }
})