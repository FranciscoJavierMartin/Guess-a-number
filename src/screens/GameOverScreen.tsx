import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

interface IGameOverProps{
  roundsNumber: number;
  userNumber: number;
  onRestart: () => void;
}

const GameOverScreen = (props: IGameOverProps) => {
  return(
    <View style={styles.screen}>
      <Text>The game is over</Text>
      <Text>Number of rounds: {props.roundsNumber}</Text>
      <Text>Number was: {props.userNumber}</Text>
      <Button title="New game" onPress={props.onRestart}/>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default GameOverScreen;