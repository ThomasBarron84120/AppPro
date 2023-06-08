import React, { useState ,useEffect } from 'react';
import { ScrollView, SafeAreaView, StatusBar, StyleSheet, Text, useColorScheme, View, Image, Pressable, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationProp } from '@react-navigation/native';
import Login from '../auth/Login';
import CustomButtonProps from '../../composents/Button/CustomButtonProps';
import CustomButtonIcon from '../../composents/Button/CustomButtonIcon';
import CustomButtonProfil from '../../composents/Button/CustomButtonProfil';
import ItemProduct from '../../composents/Item/ItemProduct';
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

export default function acount({ navigation }: { navigation: any }) {
  const [user, setUser] = useState<User | null>(null);

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
      <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '5%',flexDirection:'row' }}>
        <Text style={{ fontWeight: 'bold' ,marginLeft: '45%' }}>Profile</Text>
        <CustomButtonIcon
          backgroundColor='#F3F3F3'
          logo={require('../../assets/Logout.png')}
          text=''
          onPressIcon={() => clearLocalStorage()}
        />
      </View>
      <View style={{ height: '46%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <View style={{ width:'80%' }}>
          <Text style={{ fontWeight: 'bold' ,fontSize:18, margin:5 }}>{user ? user.username : "none"}</Text>
          <Text>{user ? user.email : "none"}</Text>
        </View>
        <CustomButtonProfil 
          title='My Listings'
          text='Already have 10 listing'
          onPress={() => navigation.navigate('Listings')}
          margin={15}
        />
        <CustomButtonProfil 
          title='Settings'
          text='Account, FAQ, Contact'
          onPress={() => navigation.navigate('Settings')}
          margin={15}
        />
      </View>
      <View style={{ height: '6%' }}>
        <CustomButtonProps 
          color="white" 
          backgroundColor="#4F63AC" 
          text="Add a new listing" 
          textInput="go !"
          fontSize={20}
          onPress={() => navigation.navigate('newProduct')}
        />
      </View>
      <View style={{ backgroundColor: '#FFFFFF', height: Dimensions.get('window').height }}>
        <Footer page="acount" />
      </View>
    </SafeAreaView>
  );
}