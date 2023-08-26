import React from 'react'
import {FlatList, Text, TextInput, View, Image, StyleSheet, Button, Pressable} from "react-native"




const Settings = () => {
  return (
        <View style={styles.container}>
         <Text style={{fontSize: 40}}> 
             Settings
        </Text> 
        </View>
  )
}

export default Settings

const styles = StyleSheet.create({
    container: {
      backgroundColor: "grey",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      fontSize: 40,
    }
    });