require('locus');

var request = require('request');
var halfred = require('halfred');
var eyes = require('eyes');

// very simple API client ^_^
var api_base = 'http://localhost:3000/api/';
var madek = request.defaults({
  json: true,
  'auth': {
    'user': 'a-fancy-application',
    'pass': 'd1e10c76-71b6-4467-8be3-21177ec0f14e',
    'sendImmediately': false // needed! only send auth after 401
  }
});
// console.log(request);

madek.get(api_base, function (err, res, body) {
  
  // parse HAL
  var hal = halfred.parse(body);
  // debug
  eyes.inspect(hal);
  
  // get 'media_resources' list
  madek.get('http://localhost:3000'+hal.link('madek:media_resources').href, 
    function (err, res, body) {
      
      var hal = halfred.parse(body);
      // debug
      // eyes.inspect(hal.allLinks());
      
      // get the first medium in list
      madek.get('http://localhost:3000'+hal.allLinks()['madek:media_resource'][0].href,
    function (err, res, body) {
      // eyes.inspect(body);
    })
      
    });
    
  // eval(locus);
  
});