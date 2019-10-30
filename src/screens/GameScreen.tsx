import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import DefaultStyles from '../constants/default-styles';

enum Direction {
  lower,
  greater
}

interface IGameScreenProps {
  userChoice: number;
  onGameOver: (numOfRounds: number) => void;
}

const generateRandomBetween = (
  min: number,
  max: number,
  exclude: number
): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  return rndNum === exclude ? generateRandomBetween(min, max, exclude) : rndNum;
};

const GameScreen = (props: IGameScreenProps) => {
  const [currentGuess, setCurrentGuess] = useState<number>(
    generateRandomBetween(1, 100, props.userChoice)
  );
  const [rounds, setRounds] = useState<number>(0);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);
  const { userChoice, onGameOver } = props;

  useEffect(() => {
    if(currentGuess === props.userChoice){
      onGameOver(rounds);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = (direction: Direction) => {
    if (
      (direction === Direction.lower && currentGuess < props.userChoice) ||
      (direction === Direction.greater && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't lie!", 'You know that is wrong...', [
        { text: 'Sorry', style: 'cancel' }
      ]);
    } else if(direction === Direction.lower){
      currentHigh.current = currentGuess;
    } else if(direction === Direction.greater){
      currentLow.current = currentGuess;
    }
    const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
    setCurrentGuess(nextNumber);
    setRounds(curRounds => curRounds + 1);
  };

  return (
    <View style={styles.screen}>
      <Text style={DefaultStyles.bodyText}>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button
          title='Lower'
          onPress={() => nextGuessHandler(Direction.lower)}
        />
        <Button
          title='Greater'
          onPress={() => nextGuessHandler(Direction.greater)}
        />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: 300,
    maxWidth: '80%'
  }
});

export default GameScreen;
