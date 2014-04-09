// require('locus'); // binding.pry for node \o/

var url = require('url');
var f = require('underscore');
var request = require('request');
var halfred = require('halfred');
var eyes = require('eyes');

// very simple API client ^_^
var api_conf = {
  "endpoint": "/api/",
  "host": {
    "protocol": "http",
    "hostname": "test.madek.zhdk.ch",
    "port": "80",
  }
};

var madek = request.defaults({
  json: true,
  'auth': {
    'user': 'javascript-client',
    'pass': 'xxx',
    'sendImmediately': false // optional: only send auth after 401?
  }
});

// console.log(request);
var api_host = url.format(api_conf.host);
var api_entry = url.format(f.extend(api_conf.host,{
  "pathname": api_conf.endpoint
}));

console.log(api_host, api_entry);

madek.get(api_entry, function (err, res, body) {
  
  // parse HAL
  var hal = halfred.parse(body);
  // debug
  // eyes.inspect(err || res && body);
  // eyes.inspect(hal);
  // eyes.inspect(hal.allLinks());
  
  var links = Object.keys(hal.allLinks());
  eyes.inspect(links);
  
  // get 'media_resources' list
  var resources_link = url.format(f.extend(api_conf.host,{
  "pathname": hal.link('madek:media_resources').href
}));
console.log(resources_link);
  
 madek.get(resources_link, 
   function (err, res, body) {
      
     var hal = halfred.parse(body);
      // debug
      // eyes.inspect(err || res && body);
      eyes.inspect(hal.allLinks());
      var media = hal.allLinks()["madek:media_resource"].map(function (item) {
        return sid = item.href.replace(/\/api\/(media_entries|media_resources)\/([^-]*).*/, "$1:$2").split(":")
        .concat(item.href);
      });
      
      eyes.inspect(media.map(function (i) {
        return f.first(i, 2);
      }));
      
      // get the first entry in list
      var media_link = url.format(f.extend(api_conf.host,{
      "pathname": hal.allLinks()['madek:media_resource'][0].href
    }));
    console.log(media_link);
      
      madek.get(media_link,
      function (err, res, body) {
        eyes.inspect(err || res && body);
      });
      
    });
    
  // eval(locus);
  
});