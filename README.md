# liri-node-app
----OVERVIEW----

In this App, the user can use the command line to query APIs in 4 different ways.  

There are Four Commands:
1.  "concert-this" followed by the name of a musical artist will pull info on that artist's upcoming show from the BandsInTown API. 

2.  "spotify-this-song" followed by the name of a track will pull info on that track from the Spotify API.

3.  "movie-this" followed by the name of a movie will pull information on that movie from the OMDB API.  

4.  "do-this" will pull text from a .txt file and interpret commands if they are given within the text file.  



----COMMAND LINE FORMAT----

"node liri.js " + command + art/artist of interest

example:
node liri.js spotify-this-song I want it that way