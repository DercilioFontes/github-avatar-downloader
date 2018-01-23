var functions = require('./download_avatars_modules/download_avatars_functions.js');

// get arguments from command line
var repoOwner = process.argv[2];
var repoName = process.argv[3];

// prints message to the user
console.log('Welcome to the GitHub Avatar Downloader!');

// for loop to print each avarta_url
functions.getRepoContributors(repoOwner, repoName, function(err, result) {
  console.log("Errors:", err);
  // for loop getting url and login name (+ .png) to make filePath in avatars/
  for (var contributor in result) {
    functions.downloadImageByURL(result[contributor].avatar_url, "avatars/" + result[contributor].login + ".png");
  }
  console.log("Download complete!");
});