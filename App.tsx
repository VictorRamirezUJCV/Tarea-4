import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Card from './Card';

const cards = [
  '🍉',
  '🍓',
  '🍒',
  '🫐',
  '🍇',
  '🍍'
];

export default function App() {
  const [board, setBoard] = useState(() => shuffle([...cards, ...cards]));
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (selectedCards.length < 2) return;
    const [firstIndex, secondIndex] = selectedCards;
    const firstCard = board[firstIndex];
    const secondCard = board[secondIndex];
    
    if (firstCard === secondCard) {
      setMatchedCards([...matchedCards, firstIndex, secondIndex]);
      setSelectedCards([]);
      setScore(score + 1);
    } else {
      const timeoutId = setTimeout(() => setSelectedCards([]), 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [selectedCards]);

  const handleTapCard = (index) => {
    if (selectedCards.length >= 2 || selectedCards.includes(index) || matchedCards.includes(index)) return;
    setSelectedCards([...selectedCards, index]);
  };

  const handleReset = () => {
    setBoard(shuffle([...cards, ...cards]));
    setSelectedCards([]);
    setMatchedCards([]);
    setScore(0);
    setGameOver(false);
  };

  const didPlayerWin = () => matchedCards.length === board.length;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{didPlayerWin() ? '¡Felicidades, has ganado!' : '¡Memory Game!'}</Text>
      <Text style={styles.title}>Score: {score}</Text>
      <View style={styles.board}>
        {board.map((card, index) => {
          const isTurnedOver = selectedCards.includes(index) || matchedCards.includes(index);
          return (
            <Card
              key={index}
              isTurnedOver={isTurnedOver}
              onPress={() => handleTapCard(index)}>
              {card}
            </Card>
          );
        })}
      </View>
      {didPlayerWin() && (
        <TouchableOpacity style={styles.button} onPress={handleReset}>
          <Text style={styles.buttonText}>Reiniciar</Text>
        </TouchableOpacity>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F70C0", 
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    color: "#05E3AC", 
    fontWeight: "bold",
    marginBottom: 20,
  },
  board: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  button: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#FFA500", 
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: "#FFFFFF", 
    fontWeight: "bold",
  },
});

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
}

