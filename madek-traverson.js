var f = require('underscore');
var eyes = require('eyes');
var traverson = require('traverson');


// madek JSON/HAL API entry point 
var api = traverson.jsonHal.from('http://test.madek.zhdk.ch/api/')
// var api = traverson.jsonHal.from('http://haltalk.herokuapp.com/')

api.newRequest()
  .withRequestOptions({
     'auth': {
       'user': 'javascript-client',
       'pass': 'xxx',
       'sendImmediately': true // needed! only send auth after 401
   },
   headers: {
     'Accept': 'application/hal+json',
     'Content-Type': 'application/json'
   }
  })
  .follow('madek:media_resources', 'madek:media_resource' ) // ,'madek:content_stream'
  .getResource(function(error, document) {
    if (error) {
    console.error('No luck :-)', error.httpStatus)
    } else {
    console.log('We have followed the path and reached our destination.')
    eyes.inspect(document);
  }
})