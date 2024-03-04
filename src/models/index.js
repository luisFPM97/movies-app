const Actor = require("./Actor");
const Director = require("./Director");
const Genre = require("./Genre");
const Movie = require("./Movie");

Movie.belongsToMany(Genre,{through: 'movie_genre'});
Genre.belongsToMany(Movie,{through: 'movie_genre'});

Movie.belongsToMany(Actor,{through: 'movie_actor'});
Actor.belongsToMany(Movie,{through: 'movie_actor'});

Movie.belongsToMany(Director,{through: 'movie_director'});
Director.belongsToMany(Movie,{through: 'movie_director'});

Director.belongsToMany(Genre,{through: 'director_genre'});
Genre.belongsToMany(Director,{through: 'director_genre'});