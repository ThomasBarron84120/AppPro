import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  Pressable,
  Dimensions,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationProp } from '@react-navigation/native';
import Login from '../auth/Login';
import CustomButtonImg from '../../composents/Button/CustomButtonImg';
import CustomButtonIcon from '../../composents/Button/CustomButtonIcon';
import CustomButtonProps from '../../composents/Button/CustomButtonProps';
import ItemProduct from '../../composents/Item/ItemProduct';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from '../../composents/Footer/Footer';
import Card from '../../composents/Card/Card';

interface Product {
  id: number;
  title: string;
  image: string;
  category: number;
  price: string;
  description?: string;
}

export default function Favorites({ navigation }: { navigation: any }) {
  const [farvor, setFarvor] = useState<Product[]>([]);

  useEffect(() => {
    const fetchFarvorData = async () => {
      try {
        const storedFarvorData = await AsyncStorage.getItem('farvors');

        if (storedFarvorData) {
          setFarvor(JSON.parse(storedFarvorData));
        } else {
          // Handle the case when data is not available in local storage
        }
      } catch (error) {
        console.error('Error retrieving data from local storage: ', error);
      }
    };

    fetchFarvorData();
  }, []);

  useEffect(() => {
    const saveFarvorData = async () => {
      try {
        await AsyncStorage.setItem('farvors', JSON.stringify(farvor));
      } catch (error) {
        console.error('Error saving data to local storage: ', error);
      }
    };

    saveFarvorData();
  }, [farvor]);

  const handleRemoveFavorite = async (id: number) => {
    try {
      const updatedFavorites = farvor.filter((favor) => favor.id !== id);
      setFarvor(updatedFavorites);
      await AsyncStorage.setItem('farvors', JSON.stringify(updatedFavorites));
      Alert.alert('Favori supprimé avec succès');
    } catch (error) {
      console.error('Error removing favorite from storage: ', error);
    }
  };

  return (
    <SafeAreaView>
      <StatusBar />
      <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '5%' }}>
        <Text style={{ fontWeight: 'bold' }}>Favorites</Text>
      </View>
      <View style={{ height: '52%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        {farvor.length > 0 ? (
          <ScrollView style={{ overflow: 'hidden' }} showsVerticalScrollIndicator={true}>
            {farvor.map((favor: Product) => (
              <Card
                key={favor.id}
                id={favor.id}
                image={favor.image}
                title={favor.title}
                category={favor.category}
                price={favor.price}
                icon='Annuler'
                onPress={() => {
                  handleRemoveFavorite(favor.id);
                }}
              />
            ))}
          </ScrollView>
        ) : (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Ajouter des favoris</Text>
          </View>
        )}
      </View>
      <View style={{ backgroundColor: '#FFFFFF', height: Dimensions.get('window').height }}>
        <Footer page="favor" />
      </View>
    </SafeAreaView>
  );
}
