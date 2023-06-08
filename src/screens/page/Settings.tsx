import React, { useState ,useEffect } from 'react';
import { ScrollView, SafeAreaView, StatusBar, StyleSheet, Text, useColorScheme, View, Image, Pressable, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationProp } from '@react-navigation/native';
import Login from '../auth/Login';
import CustomButtonProps from '../../composents/Button/CustomButtonProps';
import CardSettings from '../../composents/Card/CardSettings';
import CustomButtonProfil from '../../composents/Button/CustomButtonProfil';
import TextInput from '../../composents/Input/TextInput';
import { products } from '../../data/products';
import { categories } from '../../data/categories';
import Footer from '../../composents/Footer/Footer';

interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
}

export default function Settings({ navigation }: { navigation: any }) {
  const [user, setUser] = useState<User | null>(null);
  const [inputValueName, setInputValueName] = useState('');
  const [inputValueLastName, setinputValueLastName] = useState('');
  const [inputValueEmail, setinputValueEmail] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChangeName = (value: string) => {
    setInputValueName(value);
  };

  const handleInputChangeLastName = (value: string) => {
    setinputValueLastName(value);
  };

  const handleInputChangeEmail = (value: string) => {
    setinputValueEmail(value);
  };

  const checkUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        console.log(parsedUser);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des données utilisateur :', error);
    }
  };
  

  useEffect(() => {
    checkUser();
  }, []);

  const clearLocalStorage = async () => {
    try {
      await AsyncStorage.removeItem('token'); // Supprimer l'élément 'token'
      await AsyncStorage.removeItem('user'); // Supprimer l'élément 'user'
      console.log('Les éléments du stockage local ont été supprimés avec succès.');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Erreur lors de la suppression des éléments du stockage local :', error);
    }
  };

  return (
    <SafeAreaView>
      <StatusBar />
      <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '5%', flexDirection: 'row' }}>
        <Text style={{ fontWeight: 'bold' }}>Settings</Text>
      </View>
      <View style={{ height: '52%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <View style={{ width: '90%', display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
          {isEditing ? (
            <>
                <Text>Edit Information</Text>
                <Pressable onPress={() => setIsEditing(false)}>
                    <Image source={require('../../assets/Annuler.png')} style={{ width: 16, height: 16 }} />
                </Pressable>
            </>
          ) : (
            <>
                <Text>Personal Information</Text>
                <Pressable onPress={() => setIsEditing(true)}>
                    <Image source={require('../../assets/edit.png')} style={{ width: 16, height: 16 }} />
                </Pressable>
            </>
          )}
        </View>
        {isEditing ? (
          <View style={{width:'90%'}}>
            <TextInput titre="firstName" value={user ? user.firstName: 'none'} onValueChange={handleInputChangeName} />
            <TextInput titre="lastName"value={user ? user.lastName: 'none'} onValueChange={handleInputChangeLastName} />
            <TextInput titre="email"value={user ? user.email: 'none'} onValueChange={handleInputChangeEmail} />
            <CustomButtonProps 
                color="white" 
                backgroundColor="#4F63AC" 
                text="Change" 
                textInput="go Change !"
                fontSize={20}
                onPress={() => navigation.navigate('Login')}
            />
          </View>
        ) : (
          <>
            <CardSettings
              title='Name'
              text={user ? user.firstName + ' ' + user.lastName : 'none'}
            />
            <CardSettings
              title='Email'
              text={user ? user.email : 'none'}
            />
          </>
        )}
        <View style={{ width: '90%' }}>
          <Text>Help Center</Text>
        </View>
        <CustomButtonProfil
          title='FAQ'
          text=''
          onPress={() => navigation.navigate('Login')}
          margin={5}
        />
        <CustomButtonProfil
          title='Contact Us'
          text=''
          onPress={() => navigation.navigate('Login')}
          margin={5}
        />
        <CustomButtonProfil
          title='Privacy & Terms'
          text=''
          onPress={() => navigation.navigate('newProduct')}
          margin={5}
        />
      </View>
      <View style={{ backgroundColor: '#FFFFFF', height: Dimensions.get('window').height }}>
        <Footer page="acount" />
      </View>
    </SafeAreaView>
  );
}