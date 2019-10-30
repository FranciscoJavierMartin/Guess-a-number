import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface IBodyTextProps {
  children: string;
}

const BodyText = (props:IBodyTextProps) => (
  <Text style={styles.body}>{props.children}</Text>
)

const styles = StyleSheet.create({
  body: {
    fontFamily: 'open-sans-bold'
  }
});

export default BodyText;