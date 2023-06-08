/**
 * Sample React Native Login
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, {useState} from 'react';

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
  color: string;
  backgroundColor: string;
  text: string;
  textInput: string;
  fontSize: number;
  onPress: () => void;
};

export default function CustomButtonProps(props: CustomButtonProps) {
  const [pressed, setPressed] = useState(false);

 

  const handlePress = () => {
    setPressed(!pressed);
    props.onPress();
  };

    const styles = StyleSheet.create({
    button: {
        width: 303,
        height: 60,
        backgroundColor : props.backgroundColor,
        borderRadius: 8,
        padding: 10,
        marginLeft: 'auto',
        marginRight: 'auto', 
    },
    textButton: {
      textAlign: 'center',
      justifyContent: 'center',
      color: props.color,
      fontSize: props.fontSize,
    },
    });

    return (
        <Pressable 
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
            },
            styles.button,
          ]}
          onPress={handlePress}> 
          {({pressed}) => (
            <Text style={styles.textButton}>{pressed ? props.textInput : props.text}</Text>
          )} 
        </Pressable>
  );
}


