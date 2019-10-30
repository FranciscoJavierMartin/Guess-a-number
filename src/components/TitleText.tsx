import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface ITitleTextProps {
  children: string;
  style?:  any;
}

const TitleText = (props:ITitleTextProps) => (
  <Text style={{...styles.body, ...props.style}}>{props.children}</Text>
)

const styles = StyleSheet.create({
  body: {
    fontFamily: 'open-sans-bold',
    fontSize: 18
  }
});

export default TitleText;