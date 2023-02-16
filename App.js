import React, { useState, useEffect } from "react";
import {
   StyleSheet,
   View,
   Text,
   FlatList,
   TouchableOpacity,
} from "react-native";

// Define the words to search for
const words = ["OREO", "GATO", "BEBE", "STINK", "STANK", "BUNGHOLE", "LOMLS"];

// Define the grid of letters
const letters = [
   ["T", "A", "T", "I", "G", "A", "T", "O"],
   ["O", "R", "E", "O", "C", "X", "C", "V"],
   ["Z", "O", "S", "S", "K", "H", "J", "K"],
   ["B", "E", "B", "E", "S", "M", "L", "S"],
   ["S", "T", "I", "N", "K", "A", "T", "N"],
   ["B", "U", "N", "G", "H", "O", "L", "E"],
   ["O", "W", "R", "D", "A", "T", "A", "R"],
   ["L", "O", "M", "L", "S", "I", "D", "E"],
];

export default function App() {
   const [selectedLetters, setSelectedLetters] = useState([]);

   // Check if the selected letters form a valid word
   useEffect(() => {
      const selectedWord = selectedLetters.join("");
      if (words.includes(selectedWord)) {
         alert(`You found the word "${selectedWord}"!`);
      }
   }, [selectedLetters]);

   //  generates unique key based on the letter's positoin
   const keyExtractor = (item, index) => {
      const row = Math.floor(index / 8);
      const col = index % 8;
      return `${item}-${row}-${col}`;
   };

   const [foundWords, setFoundWords] = useState([]);

   useEffect(() => {
      const selectedWord = selectedLetters.join("");
      if (words.includes(selectedWord) && !foundWords.includes(selectedWord)) {
         alert(`You found the word "${selectedWord}"!`);
         setFoundWords([...foundWords, selectedWord]);
         setSelectedLetters([]);
      }
   }, [selectedLetters]);

   // Handle touch events on letters
   const handleLetterPress = (letter) => {
      if (selectedLetters.includes(letter)) {
         // If the letter is already selected, remove it from the array
         setSelectedLetters(selectedLetters.filter((l) => l !== letter));
      } else {
         // If the letter is not selected, add it to the end of the array
         setSelectedLetters([...selectedLetters, letter]);
      }
   };

   // Render a single letter in the grid
   const renderLetter = ({ item, index }) => {
      const key = `${item}-${index}`;
      return (
         <TouchableOpacity
            style={[
               styles.letter,
               selectedLetters.includes(item) && styles.selectedLetter,
            ]}
            onPress={() => handleLetterPress(item)}
            key={key}
         >
            <Text style={styles.letterText}>{item}</Text>
         </TouchableOpacity>
      );
   };

   // Return components
   return (
      <View style={styles.container}>
         <Text>Word Puzzle</Text>
         <FlatList
            data={letters.flat()}
            numColumns={8}
            renderItem={renderLetter}
            keyExtractor={keyExtractor}
            style={styles.grid}
         />
         <View style={styles.foundWords}>
            <Text style={styles.foundWordsHeader}>Words Found:</Text>
            {words.map((word) => (
               <Text
                  key={word}
                  style={[
                     styles.foundWord,
                     foundWords.includes(word) && styles.foundWordFound,
                  ]}
               >
                  {word}
               </Text>
            ))}
         </View>
      </View>
   );
}

// StyleSheet
const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "flex-start",
      paddingTop: 20,
   },
   grid: {
      marginVertical: 75,
   },
   letter: {
      width: 40,
      height: 40,
      margin: 2,
      backgroundColor: "#ccc",
      alignItems: "center",
      justifyContent: "center",
   },
   selectedLetter: {
      backgroundColor: "#f00",
   },
   letterText: {
      fontSize: 20,
   },
   foundWords: {
      marginTop: 0,
   },
   foundWordsHeader: {
      fontSize: 18,
      fontWeight: "bold",
   },
   foundWord: {
      fontSize: 12,
      marginVertical: 14,
   },
   foundWordFound: {
      textDecorationLine: "line-through",
   },
});
