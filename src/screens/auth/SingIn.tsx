import React, { useState, useEffect } from 'react';
import { View, Dimensions, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TextInput from '../../composents/Input/TextInput';
import CustomButtonProps from '../../composents/Button/CustomButtonProps';
import CustomButtonGoogle from '../../composents/Button/CustomButtonImg';
import TextInputPassword from '../../composents/Input/TextInputPassword';
import LigneHorizontaleInfos from '../../composents/Other/LigneHorizontaleInfo';
import { products } from '../../data/products';
import { farvor } from '../../data/favor';
import { listings } from '../../data/listings';

export default function Singin({ navigation }: { navigation: any }) {
  const [inputValueName, setInputValueName] = useState('');
  const [inputValuePasse, setInputValuePasse] = useState('');

  const handleInputChangeName = (value: string) => {
    setInputValueName(value);
  };

  const handleInputChangePasse = (value: string) => {
    setInputValuePasse(value);
  };

  const checkTokenAndNavigate = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      Navig();
    }
  };

  const Navig = async () => {
    // Store the products list in the local storage
    try {
      await AsyncStorage.setItem('products', JSON.stringify(products));
      await AsyncStorage.setItem('farvor', JSON.stringify(farvor));
      await AsyncStorage.setItem('listings', JSON.stringify(listings));
      console.log(' stored in local storage.');
    } catch (error) {
      console.error('Error storing products in local storage: ', error);
    }

    navigation.navigate('Home');
  };

  const onSubmit = async () => {
    //await AsyncStorage.setItem('token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsInVzZXJuYW1lIjoia21pbmNoZWxsZSIsImVtYWlsIjoia21pbmNoZWxsZUBxcS5jb20iLCJmaXJzdE5hbWUiOiJKZWFubmUiLCJsYXN0TmFtZSI6IkhhbHZvcnNvbiIsImdlbmRlciI6ImZlbWFsZSIsImltYWdlIjoiaHR0cHM6Ly9yb2JvaGFzaC5vcmcvYXV0cXVpYXV0LnBuZz9zaXplPTUweDUwJnNldD1zZXQxIiwiaWF0IjoxNjM1NzczOTYyLCJleHAiOjE2MzU3Nzc1NjJ9.n9PQX8w8ocKo0dMCw3g8bKhjB8Wo7f7IONFBDqfxKhs");
    //await AsyncStorage.setItem('user', JSON.stringify({
    //  "id": 15,
    //  "username": "kminchelle",
    //  "email": "kminchelle@qq.com",
    //  "firstName": "Jeanne",
    //  "lastName": "Halvorson",
    //  "gender": "female",
    //  "image": "https://robohash.org/autquiaut.png?size=50x50&set=set1",
    //  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsInVzZXJuYW1lIjoia21pbmNoZWxsZSIsImVtYWlsIjoia21pbmNoZWxsZUBxcS5jb20iLCJmaXJzdE5hbWUiOiJKZWFubmUiLCJsYXN0TmFtZSI6IkhhbHZvcnNvbiIsImdlbmRlciI6ImZlbWFsZSIsImltYWdlIjoiaHR0cHM6Ly9yb2JvaGFzaC5vcmcvYXV0cXVpYXV0LnBuZz9zaXplPTUweDUwJnNldD1zZXQxIiwiaWF0IjoxNjM1NzczOTYyLCJleHAiOjE2MzU3Nzc1NjJ9.n9PQX8w8ocKo0dMCw3g8bKhjB8Wo7f7IONFBDqfxKhs"
    //}));

    if (inputValueName && inputValuePasse) {
      try {
        const response = await fetch('https://dummyjson.com/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: inputValueName,// 'kminchelle',
            password: inputValuePasse, // '0lelplR',
          }),
        });

        const data = await response.json();

        if (data.token) {
          // Sauvegarder le token dans le stockage local
          await AsyncStorage.setItem('token', data.token);
          await AsyncStorage.setItem('user', JSON.stringify(data));
          console.log(data);
          Navig();
        } else {
          Alert.alert(data.message);
        }
      } catch (error) {
        console.error('Error: ', error);
      }
    } else {
      Alert.alert('Veuillez remplir les champs');
    }
  };

  useEffect(() => {
    checkTokenAndNavigate();
  }, []);

  return (
    <View style={{ backgroundColor: '#FFFFFF', height: Dimensions.get('window').height }}>
      <TextInput titre="E-mail" value="..." onValueChange={handleInputChangeName} />
      <TextInputPassword titre="Password" onValueChange={handleInputChangePasse} />
      <CustomButtonProps
        color="white"
        backgroundColor="#4F63AC"
        text="Sign In"
        textInput="Yes Sign In !"
        fontSize={20}
        onPress={onSubmit}
      />
      <LigneHorizontaleInfos textInput="Or sign up with" />
      <CustomButtonGoogle
        backgroundColor="#3F4A59"
        logo={require('../../assets/Vector.png')}
        onPress={() => navigation.navigate('Home')}
      />
      <CustomButtonProps
        color="#4F63AC"
        backgroundColor="white"
        text="Already have an account? Sign Up"
        textInput="go !"
        fontSize={15}
        onPress={() => navigation.navigate('SingUp')}
      />
    </View>
  );
}
