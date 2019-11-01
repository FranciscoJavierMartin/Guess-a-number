import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  Dimensions
} from 'react-native';
import { ScreenOrientation } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import NumberContainer from '../components/NumberContainer';
import MainButton from '../components/MainButton';
import Card from '../components/Card';
import BodyText from '../components/BodyText';
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

const renderListItem = (value: number, numOfRound: number) => (
  <View key={value} style={styles.listItem}>
    <BodyText>#{numOfRound}</BodyText>
    <BodyText>{value}</BodyText>
  </View>
);

const GameScreen = (props: IGameScreenProps) => {
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  const initialGuess = generateRandomBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState<number>(initialGuess);
  const [pastGuesses, setPastGuesses] = useState<number[]>([initialGuess]);
  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(
    Dimensions.get('window').width
  );
  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
    Dimensions.get('window').height
  );
  const currentLow = useRef(1);
  const currentHigh = useRef(100);
  const { userChoice, onGameOver } = props;

  useEffect(() => {
    const updateLayout = () => {
      setAvailableDeviceWidth(Dimensions.get('window').width);
      setAvailableDeviceHeight(Dimensions.get('window').height);
    };
    Dimensions.addEventListener('change', updateLayout);

    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    };
  });

  useEffect(() => {
    if (currentGuess === props.userChoice) {
      onGameOver(pastGuesses.length);
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
    } else if (direction === Direction.lower) {
      currentHigh.current = currentGuess;
    } else if (direction === Direction.greater) {
      currentLow.current = currentGuess + 1;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    setPastGuesses(currentPastGuessed => [nextNumber, ...currentPastGuessed]);
  };

  let gameControls: JSX.Element;

  if (availableDeviceHeight < 500) {
    gameControls = (
      <View style={styles.controls}>
        <MainButton onPress={() => nextGuessHandler(Direction.lower)}>
          <Ionicons name='md-remove' size={24} color='white' />
        </MainButton>
        <MainButton onPress={() => nextGuessHandler(Direction.greater)}>
          <Ionicons name='md-add' size={24} color='white' />
        </MainButton>
      </View>
    );
  } else {
    gameControls = (
      <React.Fragment>
        <NumberContainer>{currentGuess}</NumberContainer>
        <Card
          style={{
            ...styles.buttonContainer,
            ...{ marginTop: availableDeviceWidth > 600 ? 20 : 5 }
          }}>
          <MainButton onPress={() => nextGuessHandler(Direction.lower)}>
            <Ionicons name='md-remove' size={24} color='white' />
          </MainButton>
          <MainButton onPress={() => nextGuessHandler(Direction.greater)}>
            <Ionicons name='md-add' size={24} color='white' />
          </MainButton>
        </Card>
      </React.Fragment>
    );
  }

  return (
    <View style={styles.screen}>
      <Text style={DefaultStyles.bodyText}>Opponent's Guess</Text>
      {gameControls}
      <View style={styles.listContainer}>
        <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess: number, index: number) =>
            renderListItem(guess, pastGuesses.length - index)
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    paddingVertical: 10
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 400,
    maxWidth: '90%'
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '80%'
  },
  listContainer: {
    flex: 1,
    width: Dimensions.get('window').width > 350 ? '60%' : '80%'
  },
  list: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  listItem: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%'
  }
});

export default GameScreen;
