import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';

type ItemProduct = {
  id: number;
  title: string;
  image: string;
  category: number;
  price: string;
  onPress: () => void;
};

export default function ItemProduct(props: ItemProduct) {
  const [pressed, setPressed] = useState(false);

  const handlePress = () => {
    setPressed(!pressed);
    props.onPress();
  };

  const styles = StyleSheet.create({
    button: {
      width: '45%',
      height: 270,
    },
    logo: {
      width: '100%',
      height: '80%',
      borderRadius: 8,
    },
  });

  return (
    <Pressable style={styles.button} onPress={handlePress}>
      <Image source={{ uri: props.image }} style={styles.logo} />
      <Text>{props.title}</Text>
      <Text style={{ fontWeight: 'bold' }}>{props.price}</Text>
    </Pressable>
  );
}
