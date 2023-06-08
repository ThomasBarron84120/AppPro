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

export default function Listings({ navigation }: { navigation: any }) {
  const [listings, setListings] = useState<Product[]>([]);
  const [products, setproducts] = useState<Product[]>([]);
  const [farvors, setfarvors] = useState<Product[]>([]);

  useEffect(() => {
    const fetchListingsData = async () => {
      try {
        const storedListingsData = await AsyncStorage.getItem('listings');
        const storedproductsData = await AsyncStorage.getItem('products');
        const storedfarvorsData = await AsyncStorage.getItem('farvors');

        if (storedListingsData) {
          setListings(JSON.parse(storedListingsData));
        } else {
          // Handle the case when data is not available in local storage
        }
        if (storedproductsData) {
          setproducts(JSON.parse(storedproductsData));
        } else {
          // Handle the case when data is not available in local storage
        }
        if (storedfarvorsData) {
          setfarvors(JSON.parse(storedfarvorsData));
        } else {
          // Handle the case when data is not available in local storage
        }
      } catch (error) {
        console.error('Error retrieving data from local storage: ', error);
      }
    };

    fetchListingsData();
  }, []);

  const handleRemoveListing = async (id: number, title: string) => {
    try {
      const updatedListings = listings.filter((listing) => listing.id !== id);
      const updatedProduct = products.filter((products) => products.title !== title);
      const updatedfarvors = farvors.filter((farvors) => farvors.title !== title);
      setListings(updatedListings);
      await AsyncStorage.setItem('listings', JSON.stringify(updatedListings));
      await AsyncStorage.setItem('products', JSON.stringify(updatedProduct));
      await AsyncStorage.setItem('farvors', JSON.stringify(updatedfarvors));
      Alert.alert('Produit supprimé avec succès');
    } catch (error) {
      console.error('Error removing listing from storage: ', error);
    }
  };

  return (
    <SafeAreaView>
      <StatusBar />
      <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '5%' }}>
        <Text style={{ fontWeight: 'bold' }}>My Listings</Text>
      </View>
      <View style={{ height: '52%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        {listings.length > 0 ? (
          <ScrollView style={{ overflow: 'hidden' }} showsVerticalScrollIndicator={true}>
            {listings.map((listing: Product) => (
              <Card
                key={listing.id}
                id={listing.id}
                image={listing.image}
                title={listing.title}
                category={listing.category}
                price={listing.price}
                icon='trash'
                onPress={() => {
                  handleRemoveListing(listing.id,listing.title);
                }}
              />
            ))}
          </ScrollView>
        ) : (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Aucune annonce disponible</Text>
          </View>
        )}
      </View>
      <View style={{ backgroundColor: '#FFFFFF', height: Dimensions.get('window').height }}>
        <Footer page="acount" />
      </View>
    </SafeAreaView>
  );
}
