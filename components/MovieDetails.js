import React, { useEffect, useState } from 'react'
import { Text, View, Image, StyleSheet, ImageBackground } from 'react-native'


function MovieDetails({route}) {

  const movieID  = route.params.movie;

  useEffect(() => {
    fetchMovies();
  }, []);

  const [movie, setMovie] = useState([])
  // const [headerColor, setHeaderColor] = useState("white")
  const fetchMovies = async () => {
    try {
      const response = await fetch(`https://www.omdbapi.com/?apikey=28d44ad8&i=${movieID}`);
      const data = await response.json(); // Parse the response body
      if (data) {
        setMovie(data);
        console.log(movie)
      }
    } catch (error) {   
      console.log('Error Fetching Movies:', error);
    }
  };

console.log(movie)
const styleFirstWord = (text, style) => {
  const words = text.split(' ');
  const firstWord = words.shift();
  const restOfText = words.join(' ');
  return (
    <Text>
      <Text style={style}>{firstWord}</Text>
      <Text>{restOfText}</Text>
    </Text>
  );
};

return (
  <ImageBackground style={styles.image} source={{ uri: movie.Poster }}>
    <View style={styles.transparentOverlay}>
      <View style={styles.textcontainer}>
        <Text style={styles.title}>{movie.Title} ({movie.Year})</Text>
        <Text style={styles.text}>
          {styleFirstWord('Director:', styles.firstWord)} {movie.Director}
        </Text>
        <Text style={styles.text}>
          {styleFirstWord('Writer(s):', styles.firstWord)} {movie.Writer}
        </Text>
        <Text style={styles.text}>
          {styleFirstWord('Plot:', styles.firstWord)} {movie.Plot}
        </Text>
        <Text style={styles.text}>
          {styleFirstWord('Genre:', styles.firstWord)} {movie.Genre}
        </Text>
        <Text style={styles.text}>
          {styleFirstWord('Actors:', styles.firstWord)} {movie.Actors}
        </Text>
        <Text style={styles.text}>
          {styleFirstWord('Awards:', styles.firstWord)} {movie.Awards}
        </Text>
        <Text style={styles.text}>
          {styleFirstWord('Country:', styles.firstWord)} {movie.Country}
        </Text>
      
        

      </View>
      <View style={styles.ratingBox}>
      <Text style={styles.ratingTitle}>Ratings</Text>
       {movie.Ratings &&
        movie.Ratings.map((rating) => (
          <Text style={styles.ratingText} key={rating.Source}>
            {rating.Source}: {rating.Value}
          </Text>
        ))}
    </View>
    </View>
  </ImageBackground>
);
}

export default MovieDetails

const styles = StyleSheet.create({
  transparentOverlay: {
    backgroundColor:'rgba(255,255,255, 0.8)',
    resizeMode: "cover",
    flex: 1,
  },
  textcontainer:{
    padding: 20,
    gap: 8,
  },
  firstWord: {
    fontWeight: 'bold', // Style the first word differently
  },
  image:{
      height: "100%",
      width: "100%",
      flexDirection: "row",
      borderColor: "black",
      resizeMode: "cover",
  }, 
  title: {
    marginTop: 30,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 26,
  },
  text: {
    color: 'black',
    fontSize: 18,
  },
  ratingBox:{
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    borderWidth: 5,
    borderRadius: 20,
    marginHorizontal: 20,
    padding: 10,
    textDecorationLine: 'underline',
    maxHeight: 150,
  },
  ratingText:{
    fontWeight: "bold",
    fontSize: 22,

  },
  ratingTitle: {
    fontWeight: "bold",
    fontSize: 22,
    textDecorationLine: 'underline',
  },

});