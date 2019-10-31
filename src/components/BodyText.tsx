import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface IBodyTextProps {
  children: any;
  style?: any;
}

const BodyText = (props: IBodyTextProps) => (
  <Text style={{ ...styles.body, ...props.style }}>{props.children}</Text>
);

const styles = StyleSheet.create({
  body: {
    fontFamily: 'open-sans-bold'
  }
});

export default BodyText;
