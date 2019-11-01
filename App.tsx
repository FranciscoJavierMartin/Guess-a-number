import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import Header from './src/components/Header';
import StartGameScreen from './src/screens/StartGameScreen';
import GameScreen from './src/screens/GameScreen';
import GameOverScreen from './src/screens/GameOverScreen';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {
  const [userNumber, setUserNumber] = useState<number>();
  const [guessRounds, setGuessRounds] = useState<number>(0);
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);
  let mainScreen: JSX.Element;

  if (!dataLoaded) {
    mainScreen = (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={error => console.error(error)}
      />
    );
  } else {
    const configureNewGameHandler = () => {
      setGuessRounds(0);
      setUserNumber(null);
    };

    const startGameHandler = (selectedNumber: number): void => {
      setGuessRounds(0);
      setUserNumber(selectedNumber);
    };

    const gameOverHandler = (numOfRounds: number) => {
      setGuessRounds(numOfRounds);
    };

    let content: JSX.Element;

    if (userNumber && guessRounds <= 0) {
      content = (
        <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
      );
    } else if (guessRounds > 0) {
      content = (
        <GameOverScreen
          roundsNumber={guessRounds}
          userNumber={userNumber}
          onRestart={configureNewGameHandler}
        />
      );
    } else {
      content = <StartGameScreen onStartGame={startGameHandler} />;
    }

    mainScreen = (
      <SafeAreaView style={styles.screen}>
        <Header title='Guess a number' />
        {content}
      </SafeAreaView>
    );
  }

  return mainScreen;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
