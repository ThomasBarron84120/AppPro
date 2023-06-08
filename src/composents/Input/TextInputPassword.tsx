import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  Text,
  useColorScheme,
  View,
  Image,
  Pressable,
} from 'react-native';

type TextInputProps = {
  titre: string;
  onValueChange: (text: string) => void;
};

export default function TextInputComponent(props: TextInputProps) {
  const [value, setValue] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const onChangeText = (text: string) => {
    setValue(text);
    props.onValueChange(text);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const styles = StyleSheet.create({
    input: {
      height: 60,
      margin: 12,
      borderWidth: 1,
      borderRadius: 14,
      borderColor: '#8D9BB5',
      padding: 10,
      backgroundColor: '#FFFFFF',
    },
    label: {
      marginLeft: 15,
      color: '#8D9BB5',
      fontFamily: 'Montserrat',
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: 14,
      lineHeight: 17,
    },
    passwordVisibilityIcon: {
      position: 'absolute',
      top: 25,
      right: 15,
    },
  });

  return (
    <View style={{padding:5}}>
      <Text style={styles.label}>{props.titre}</Text>
      <View>
        <TextInput
          {...props}
          style={styles.input}
          onChangeText={onChangeText}
          value={value}
          placeholder={props.titre}
          secureTextEntry={!passwordVisible}
        />
        <Pressable
          style={styles.passwordVisibilityIcon}
          onPress={togglePasswordVisibility}>
          <Image
            source={
              passwordVisible
                ? require('../../assets/icon.png')
                : require('../../assets/eye.png')
            }
            style={{ width: 30, height: 30 }}
          />
        </Pressable>
      </View>
    </View>
  );
}
