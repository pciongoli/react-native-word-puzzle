import React, { useState, useEffect } from "react";
import {
   StyleSheet,
   View,
   Text,
   FlatList,
   TouchableOpacity,
   Dimensions,
   PixelRatio,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

// Define the words to search for
const words = ["OREO", "GATO", "BEBE", "STINK", "BUNGHOLE", "LOMLS"];

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

const letterSize = Math.floor(
   Dimensions.get("window").width / 3.5 / PixelRatio.get()
);
const marginSize = Math.floor(4 / PixelRatio.get());

export default function App() {
   const [selectedIndexes, setSelectedIndexes] = useState([]);

   // Check if the selected letters form a valid word
   useEffect(() => {
      const selectedLetters = selectedIndexes.map(
         (index) => letters.flat()[index]
      );
      const selectedWord = selectedLetters.join("");
      if (words.includes(selectedWord) && !foundWords.includes(selectedWord)) {
         alert(`You found the word "${selectedWord}"!`);
         setFoundWords([...foundWords, selectedWord]);
         setSelectedIndexes([]);
      }
   }, [selectedIndexes]);

   //  generates unique key based on the letter's position
   const keyExtractor = (item, index) => index.toString();

   const [foundWords, setFoundWords] = useState([]);

   // Handle touch events on letters
   const handleLetterPress = (index) => {
      if (selectedIndexes.length === 0) {
         // If no letter has been selected, add the selected letter's index to the array
         setSelectedIndexes([index]);
      } else {
         const lastIndex = selectedIndexes[selectedIndexes.length - 1];
         const row1 = Math.floor(index / 8);
         const col1 = index % 8;
         const row2 = Math.floor(lastIndex / 8);
         const col2 = lastIndex % 8;
         const isAdjacent =
            Math.abs(row1 - row2) <= 1 && Math.abs(col1 - col2) <= 1;
         if (isAdjacent) {
            // If the selected letter is adjacent to the previously selected letter, add its index to the array
            setSelectedIndexes([...selectedIndexes, index]);
         }
      }
   };

   // Render a single letter in the grid
   const renderLetter = ({ item, index }) => {
      const key = keyExtractor(item, index);
      const isSelected = selectedIndexes.includes(index);
      return (
         <TouchableOpacity
            style={[styles.letter, isSelected && styles.selectedLetter]}
            onPress={() => handleLetterPress(index)}
            key={key}
         >
            <Text style={styles.letterText}>{item}</Text>
         </TouchableOpacity>
      );
   };

   // Get the device's pixel density
   const pixelDensity = PixelRatio.get();

   // Calculate the size of the letters and the margin based on the screen size
   const { width } = Dimensions.get("window");
   const letterSize = Math.floor(width / 2 / pixelDensity);
   const marginSize = Math.floor(2 / pixelDensity);

   // Return components
   return (
      <LinearGradient
         colors={["#4c669f", "#3b5998", "#192f6a"]}
         style={styles.container}
      >
         <Text style={styles.title}>Word Puzzle</Text>
         <FlatList
            data={letters.flat()}
            numColumns={8}
            renderItem={renderLetter}
            keyExtractor={keyExtractor}
            contentContainerStyle={styles.gridContainer}
            columnWrapperStyle={styles.gridRow}
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
      </LinearGradient>
   );
}

// StyleSheet
const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: "center",
      paddingTop: 70,
      paddingBottom: 50, // adjust this value to move the puzzle closer to the bottom
   },
   title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
      color: "white",
   },
   gridContainer: {
      marginVertical: 100, // adjust this value to make the puzzle larger
      marginHorizontal: 50,
   },
   gridRow: {
      justifyContent: "space-between",
   },
   letter: {
      width: letterSize,
      height: letterSize,
      margin: marginSize,
      backgroundColor: "#ccc",
      alignItems: "center",
      justifyContent: "center",
   },
   selectedLetter: {
      backgroundColor: "#eb4034",
   },
   letterText: {
      fontSize: letterSize / 2,
   },
   foundWords: {
      marginTop: 10,
   },
   foundWordsHeader: {
      fontSize: 18,
      fontWeight: "bold",
      color: "white",
   },
   foundWord: {
      fontSize: 12,
      marginVertical: 5,
      color: "white",
   },
   foundWordFound: {
      textDecorationLine: "line-through",
      color: "white",
   },
});
