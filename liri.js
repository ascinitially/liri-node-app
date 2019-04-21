require("dotenv").config();

let request = require("request");

const moment = require("moment");

const fs = require("fs");

var keys = require("./keys.js");
//./
const Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var which = process.argv[2];
var what = process.argv.slice(3).join(" ");

function userInput(which,what) {
  var logFile = fs.createWriteStream('log.txt', { flags: 'a' });
  
  switch(which) {
    case "concert-this": goConcert();
      break;
    case "spotify-this-song": goSpotify();
      break;
    case "movie-this": goMovie();
      break;
    case "do-this": goFS();
      break;
    default: console.log("I don't understand.")
  }
}

userInput(which,what);

function goSpotify() {
  if (!what) {what = "the sign ace of base"};

  spotify.search({ type: 'track', query: what, limit:1 }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }

      var spotifyRes = data.tracks.items;

      for (var i = 0; i < spotifyRes.length; i ++) {
        console.log("Artist: " + data.tracks.items[i].album.artists[0].name);
        console.log("Song Name: " + data.tracks.items[i].name);
        console.log("Album: " + data.tracks.items[i].album.name);
        console.log("Link: " + data.tracks.items[i].external_urls.spotify);
      }
      // console.log("Artist: " + spotifyRes.album);
      // console.log("Song Name: " +);
      // console.log("Album: " +);
      // console.log("Link: " +);
       
  });


}

function goMovie() {
  var axios = require("axios");

  if (!what) {what="Mr Nobody"}
  
  var queryUrl = "http://www.omdbapi.com/?t=" + what + "&y=&plot=short&apikey=trilogy";

  axios.get(queryUrl).then(
  function(response) {
    console.table("The title of the movie is: " + response.data.Title);
    console.table("The movie was released in the year " + response.data.Year);
    console.table("IMDB Rating: " + response.data.imdbRating);
    console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
    console.log("Produced in: " + response.data.Country);
    console.log("Movie Language: " + response.data.Language);
    console.log("Plot: " + response.data.Plot);
    console.log("Actors: " + response.data.Actors);
  }
);

}

function goConcert() {
  // "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
  var queryUrl = "https://rest.bandsintown.com/artists/" + what + "/events?app_id=codingbootcamp";
 
  var axios = require("axios");
  axios.get(queryUrl).then(
    function(response) {

      var date = response.data[0].datetime;
      // console.log(moment(date).format("MM/DD/YYYY"));
      console.log("Artist: " + what);
      console.log("City: "+ response.data[0].venue.city);
      console.log("Name of Venue: " + response.data[0].venue.name);
      console.log("Date of the Show: " + moment(date).format("MM/DD/YYYY"))
      
      // let userArtist = JSON.parse(response);
      // if (userArtist.length > 0) {
      //   for (var i = 0; i<1; i++) {
      //     console.log(userArtist[i].lineup[0])
      //   }
      // }
    }
  );
}

function goFS() {
  fs.readFile("random.txt","utf-8", function(error,data) {
    if (error) {console.log(error)};
    let dataArray = data.split(",");

    which = dataArray[0];
    what = dataArray[1];

    userInput(which, what);


  })
}

   

  