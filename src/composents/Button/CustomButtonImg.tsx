import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  Pressable,
} from 'react-native';

type CustomButtonProps = {
  backgroundColor: string;
  logo: any;
  onPress: () => void;
};

export default function CustomButton(props: CustomButtonProps) {
  const [pressed, setPressed] = useState(false);

  const handlePress = () => {
    setPressed(!pressed);
    props.onPress();
  };

  const styles = StyleSheet.create({
    button: {
      width: 100,
      height: 40,
      backgroundColor: props.backgroundColor,
      borderRadius: 8,
      padding: 25,
      marginLeft: 'auto',
      marginRight: 'auto',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo: {
      width: 25,
      height: 25,
      marginRight: 5,
    },
  });

  return (
    <Pressable style={styles.button} onPress={handlePress}>
      <Image source={props.logo} style={styles.logo} />
    </Pressable>
  );
}
