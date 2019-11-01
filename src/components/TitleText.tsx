import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface ITitleTextProps {
  children: string;
  style?:  any;
}

const TitleText = (props:ITitleTextProps) => (
  <Text style={{...styles.title, ...props.style}}>{props.children}</Text>
)

const styles = StyleSheet.create({
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 18
  }
});

export default TitleText;