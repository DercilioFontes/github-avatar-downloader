var request = require('request');
var fs = require('fs');
var secrets = require('../secrets.js');

module.exports =  {
  // resquet the file and pipe to filePath
  downloadImageByURL: function(url, filePath) {
    request.get(url)
           .on('error', function (err) { throw err; })
           .pipe(fs.createWriteStream(filePath));
  },

  getRepoContributors: function(repoOwner, repoName, cb) {

    // checks if is all arguments
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
      console.log("Error: missing parameter!");
    }
  }
};