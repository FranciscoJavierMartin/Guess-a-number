import React from 'react';
import { View, StyleSheet } from 'react-native';

interface ICardProps {
  children: any;
  style?: any;
}

const Card = (props: ICardProps) => (
  <View style={{...styles.card, ...props.style}}>{props.children}</View>
);

const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    backgroundColor: 'white',
    elevation: 5,
    padding: 20,
    borderRadius: 10
  }
});
export default Card;
