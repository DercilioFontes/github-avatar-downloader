var request = require('request');
var secrets = require('./secrets.js');
var fs = require('fs');

// get arguments from command line
var repoOwner = process.argv[2];
var repoName = process.argv[3];

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

  if (repoOwner && repoName) {

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
  } else {
    console.log("Error: missing parameter!")
  }
}

// for loop to print each avarta_url
getRepoContributors(repoOwner, repoName, function(err, result) {
  console.log("Errors:", err);
  for (var contributor in result) {
    //console.log("avatar_url:", result[contributor].avatar_url);
    downloadImageByURL(result[contributor].avatar_url, "avatars/" + result[contributor].login + ".png");
  }
});