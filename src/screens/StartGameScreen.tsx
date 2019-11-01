import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';
import Card from '../components/Card';
import Colors from '../constants/colors';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';

interface IStartGameScreen {
  onStartGame: (selectedNumber: number) => void;
}

const StartGameScreen = (props: IStartGameScreen) => {
  const [enteredValue, setEnteredValue] = useState<string>('');
  const [confirmed, setConfirmed] = useState<boolean>(false);
  const [selectedNumber, setSelectedNumber] = useState<number>();
  const [buttonWidth, setButtonWidth] = useState<number>(
    Dimensions.get('window').width / 4
  );

  const numberInputHandler = (inputText: string) => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ''));
  };

  const resetInputHandler = () => {
    setEnteredValue('');
    setConfirmed(false);
  };

  useEffect(() => {
    const updateLayout = () => {
      setButtonWidth(Dimensions.get('window').width / 4);
    };
  
    Dimensions.addEventListener('change', updateLayout);

    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    };
  });

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if (!isNaN(chosenNumber) && chosenNumber > 0 && chosenNumber <= 99) {
      setConfirmed(true);
      setEnteredValue('');
      setSelectedNumber(chosenNumber);
      Keyboard.dismiss();
    } else {
      Alert.alert(
        'Invalid number!',
        'Number has to be a number between 1 and 99.',
        [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }]
      );
    }
  };

  let confirmedOutput = confirmed ? (
    <Card style={styles.summaryContainer}>
      <BodyText>You selected</BodyText>
      <NumberContainer>{selectedNumber}</NumberContainer>
      <MainButton onPress={() => props.onStartGame(selectedNumber)}>
        Start game
      </MainButton>
    </Card>
  ) : null;

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.screen}>
            <TitleText style={styles.title}>Start a new game!</TitleText>
            <Card style={styles.inputContainer}>
              <BodyText>Select a number</BodyText>
              <Input
                style={styles.input}
                blurOnSubmit
                autoCorrect={false}
                keyboardType='number-pad'
                maxLength={2}
                onChangeText={numberInputHandler}
                value={enteredValue}
              />
              <View style={styles.buttonContainer}>
                <View style={{width: buttonWidth}}>
                  <Button
                    title='Reset'
                    color={Colors.accent}
                    onPress={resetInputHandler}
                  />
                </View>
                <View style={{width: buttonWidth}}>
                  <Button
                    title='Confirm'
                    color={Colors.primary}
                    onPress={confirmInputHandler}
                  />
                </View>
              </View>
            </Card>
            {confirmedOutput}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: 'open-sans-bold'
  },
  inputContainer: {
    width: '80%',
    minWidth: 300,
    maxWidth: '95%',
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15
  },
  button: {
    width: Dimensions.get('window').width / 4
  },
  input: {
    width: 50,
    textAlign: 'center'
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: 'center'
  },
  text: {
    fontFamily: 'open-sans'
  }
});

export default StartGameScreen;
