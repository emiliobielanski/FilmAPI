import React, { useState } from 'react'
import {FlatList, Text, TextInput, View, Image, StyleSheet, Button, Pressable} from "react-native"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';import 'react-native-gesture-handler';



function MovieList({navigation}) {
    // Fetches the movielist from API
    
    const [movies, setMovies] = useState([])
    const fetchMovies = async (text) => {
        try {

          const response = await fetch(`https://www.omdbapi.com/?apikey=28d44ad8&s=${text}`);
          const data = await response.json(); // Parse the response body
          if (data.Search) {
            setMovies(data.Search);
          }
        } catch (error) {   
          console.log('Error Fetching Movies:', error);
        }
      };
      // "Destructures" the movie list, sort of like .map function
    const renderMovieItem =  ({ item }) => (
        <View  style={styles.container}>
            <Image style={styles.image} source={{uri: item.Poster}}/> 
           <View style={styles.textContainer}>
           <Text style={styles.title} ellipsizeMode='tail' >{item.Title}</Text>
            <Text style={styles.year}> ({item.Year})</Text>
              <Pressable style={styles.button}  onPress={() => navigation.navigate('Details', 
              {movie: item.imdbID})} >
             <Text style={styles.buttonText}>

             <Entypo name="arrow-with-circle-right" size={32} color="white" />

             </Text>
              </Pressable>
              </View> 
            
        </View>
    )

    // console.log(movies)

  return (
    <View style={styles.mainContainer}>
        <TextInput 
        style={styles.searchInput}
        placeholder='Search for a movie title'
        onChangeText={(text) => (fetchMovies(text))}
        />

       <FlatList 
       style={styles.list}
       data={movies}
       renderItem={renderMovieItem}
       keyExtractor={(item) => (item.imdbID)}
       />

    </View>
  )
}

export default MovieList

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "grey",
    height: "100%",
  },
    container:{
        marginTop: 20,
        height: 124,
        marginHorizontal: 20,
        backgroundColor: "black",
        flexDirection: "row",
        borderColor: "black",
        borderWidth: 1,
        overflow: "hidden",
        color: "white",
        borderRadius: 10,
        borderBottomLeftRadius: 1,
        borderTopLeftRadius: 1,
        elevation: 5,
    },
    textContainer:{
      padding: 10,
      flexDirection: "column",
      gap: 8,
    
    },
    searchInput: {
        padding: 5,
        paddingLeft: 20,
        backgroundColor: "black",
        color: "white",
        borderColor: 'grey',
        borderWidth: 1,
        height: 50,
        marginTop: 25,
        marginHorizontal: 10,
        borderRadius: 10,
        fontSize: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white", 
    },
    image: {
        height: 120,
        width: 120,
    },
   button:{
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 80,
    elevation: 3,
    backgroundColor: 'black',
    width: 40,
    height: 40,
   },
   buttonText:{
    color: "white",
    fontSize: 16,
    alignContent: "center",
   },
   year: {
    color: "white",

   }
  });