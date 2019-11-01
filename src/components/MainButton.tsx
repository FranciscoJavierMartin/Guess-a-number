import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constants/colors';

interface IMainButtonProps {
  children: any;
  onPress: () => void;
}

const MainButton = (props: IMainButtonProps) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity activeOpacity={0.8} onPress={props.onPress}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>{props.children}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 25,
    overflow: 'hidden'
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'open-sans'
  }
});

export default MainButton;
