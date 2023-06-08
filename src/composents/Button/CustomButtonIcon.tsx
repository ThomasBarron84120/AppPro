import React, { useState } from 'react';
import CustomButtonImg from '../../composents/Button/CustomButtonImg';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';

type CustomButtonIconProps = {
  backgroundColor: string;
  logo: any;
  text: string;
  onPressIcon: () => void;
};

export default function CustomButtonIcon(props: CustomButtonIconProps) {
  const [pressed, setPressed] = useState(false);
  const handlePress = () => {
    setPressed(!pressed);
    props.onPressIcon();
  };

  const styles = StyleSheet.create({
    div: {
      width: 50,
      height: 50,
      backgroundColor: props.backgroundColor,
      borderRadius: 12,
      marginLeft: 10,
      marginRight: 10,
    },
    text: {
      marginLeft: 'auto',
      marginRight: 'auto',
      fontSize:12
    },
    button: {
      width: 50,
      height: 50,
      borderRadius: 8,
      marginLeft: 'auto',
      marginRight: 'auto',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logoContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo: {
      resizeMode: 'contain',
    },
  });

  return (
    <View style={styles.div}>
      <Pressable style={styles.button} onPress={handlePress}>
        <View style={styles.logoContainer}>
          <Image source={props.logo} style={styles.logo} />
        </View>
      </Pressable>
      <Text style={styles.text}>{props.text}</Text>
    </View>
  );
}
