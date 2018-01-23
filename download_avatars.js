var request = require('request');
var secrets = require('./secrets.js');
var fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');

function downloadImageByURL (url, filePath) {

  // resquet the file and pipe to filePath
  request.get(url)
         .on('error', function (err) {
           throw err;
         })
         .pipe(fs.createWriteStream(filePath));
}

function getRepoContributors(repoOwner, repoName, cb) {

  // Information for request
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token ' + secrets.GITHUB_TOKEN
    }
  };

  // resuest passing callback function
  request(options, function(err, res, body) {
    var dataContributors = JSON.parse(body);
    cb(err, dataContributors);
  });
}

// for loop to print each avarta_url
getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  // console.log(result);
  // for(var i = 0; i < result.length; i++) {
  //   console.log(result[i].avatar_url);
  // }
  for (var contributor in result) {
    console.log("avatar_url:", result[contributor].avatar_url);
  }
});