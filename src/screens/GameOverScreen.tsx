import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  ScrollView
} from 'react-native';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';
import Colors from '../constants/colors';

interface IGameOverProps {
  roundsNumber: number;
  userNumber: number;
  onRestart: () => void;
}

const GameOverScreen = (props: IGameOverProps) => {
  return (
    <ScrollView>
      <View style={styles.screen}>
        <TitleText>The game is over</TitleText>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/success.png')}
            style={styles.image}
            resizeMode='cover'
          />
        </View>
        <View style={styles.resultContainer}>
          <BodyText style={styles.resultText}>
            Your phone needed{' '}
            <Text style={styles.highlight}>
              {props.roundsNumber.toString()}
            </Text>{' '}
            rounds to guess the number{' '}
            <Text style={styles.highlight}>{props.userNumber}</Text>.
          </BodyText>
        </View>
        <MainButton onPress={props.onRestart}>New game</MainButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  imageContainer: {
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').width * 0.7,
    borderRadius: (Dimensions.get('window').width * 0.7) / 2,
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden',
    marginVertical: Dimensions.get('window').height / 30
  },
  highlight: {
    color: Colors.primary,
    fontFamily: 'open-sans-bold'
  },
  resultContainer: {
    marginHorizontal: 30,
    marginVertical: Dimensions.get('window').height / 60
  },
  resultText: {
    textAlign: 'center',
    fontSize: Dimensions.get('window').height < 400 ? 16 : 20
  }
});

export default GameOverScreen;
