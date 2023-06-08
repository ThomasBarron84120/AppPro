import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';

type Card = {
  id: number;
  title: string;
  image: string;
  category: number;
  price: string;
  icon: string;
  onPress: () => void;
};

export default function Card(props: Card) {
  const [pressed, setPressed] = useState(false);

  const handlePress = () => {
    setPressed(!pressed);
    props.onPress();
  };

  const styles = StyleSheet.create({
    card: {
        width: '80%',
        height: 100,
        borderRadius: 8,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor: '#F6F6F6',
        margin:15
    },
    divImage: {
        width: '30%',
        height: '100%',
        borderRadius: 8,
    },
    logo: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
  });

  return (
    <View style={styles.card}>
        <View style={styles.divImage}>
            <Image source={{ uri: props.image }} style={styles.logo} />
        </View>
        <View>
            <Text>{props.title}</Text>
            <Text style={{ fontWeight: 'bold' }}>{props.price}</Text>
        </View>
        <View>
            {props.icon == 'Annuler' ? (
                <Pressable onPress={handlePress}>
                    <Image source={require('../../assets/Annuler.png')} style={{ width: 24, height: 24 }} />
                </Pressable>
            ) : (
                <Pressable onPress={handlePress}>
                    <Image source={require('../../assets/trash.png')} style={{ width: 24, height: 24 }} />
                </Pressable>
            )}
        </View>
    </View>
  );
}
