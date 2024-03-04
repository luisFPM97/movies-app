const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');
const Genre = require('./Genre');
const Actor = require('./Actor');
const Director = require('./Director');

const Movie = sequelize.define('movie', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    synopsis: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    releaseYear: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

});


module.exports = Movie;
Movie.belongsToMany(Genre,{through: 'movie_genre'});
Genre.belongsToMany(Movie,{through: 'movie_genre'});

Movie.belongsToMany(Actor,{through: 'movie_actor'});
Actor.belongsToMany(Movie,{through: 'movie_actor'});

Movie.belongsToMany(Director,{through: 'movie_director'});
Director.belongsToMany(Movie,{through: 'movie_director'});
