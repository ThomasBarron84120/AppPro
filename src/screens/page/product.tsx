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
  TextInput,
  TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationProp } from '@react-navigation/native';
import Login from '../auth/Login';
import CustomButtonIconProps from '../../composents/Button/CustomButtonIcon';
import CustomButtonImg from '../../composents/Button/CustomButtonImg';
import CustomButtonIcon from '../../composents/Button/CustomButtonIcon';
import CustomButtonProps from '../../composents/Button/CustomButtonProps';
import ItemProduct from '../../composents/Item/ItemProduct';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from '../../composents/Footer/Footer';
import { products } from '../../data/products';
import { categories } from '../../data/categories';

interface Product {
  id: number;
  title: string;
  image: string;
  images?: string[];
}

interface Category {
  id: number;
  title: string;
  image: string;
}

export default function Product({ navigation, route }: { navigation: any; route: any }) {
  const [like, setLike] = useState<boolean>(false);
  const { idProduit } = route.params;
  const product: Product = products[idProduit];
  const images = product.images || [];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImagePress = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleSearchIconPress = async () => {
    setLike(!like);
    try {
      const storedFarvorData = await AsyncStorage.getItem('farvors');
      let farvors: Product[] = [];
      if (storedFarvorData) {
        farvors = JSON.parse(storedFarvorData);
        if (like) {
          // Remove the product from favorites
          farvors = farvors.filter((fav: Product) => fav.id !== product.id);
        } else {
          // Add the product to favorites
          farvors.push(product);
        }
      } else {
        // No favorites found, add the product as the first favorite
        farvors.push(product);
      }
      await AsyncStorage.setItem('farvors', JSON.stringify(farvors));
      navigation.navigate('favor');
    } catch (error) {
      console.error('Error saving data to local storage: ', error);
    }
  };

  useEffect(() => {
    const fetchFarvorData = async () => {
      try {
        const storedFarvorData = await AsyncStorage.getItem('farvors');
        if (storedFarvorData) {
          const farvors: Product[] = JSON.parse(storedFarvorData);
          const isLiked = farvors.some((fav: Product) => fav.id === product.id);
          setLike(isLiked);
        }
      } catch (error) {
        console.error('Error retrieving data from local storage: ', error);
      }
    };

    fetchFarvorData();
  }, []);

  return (
    <SafeAreaView>
      <StatusBar />
      <View style={{ backgroundColor: '#FFFFFF', height: Dimensions.get('window').height }}>
        <Image
          source={{ uri: product.images ? product.images[currentImageIndex] : product.image }}
          style={{ width: '100%', height: '60%' }}
        />
        {product.images && (
          <View style={{ position: 'absolute', zIndex: 1, flexDirection: 'row', justifyContent: 'center', width: '100%', top: '55%' }}>
            {product.images.map((image, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleImagePress(index)}
                style={{
                  width: index === currentImageIndex ? 35 : 20,
                  height: 10,
                  backgroundColor: index === currentImageIndex ? 'gray' : 'lightgray',
                  marginHorizontal: 5,
                  borderRadius: 10,
                }}
              />
            ))}
          </View>
        )}
        <View style={{  position: 'absolute', zIndex: 5, width: 12, height: 12, top: '5%', left: '5%', borderRadius: 15 }}>
          <CustomButtonIconProps backgroundColor="#FFFFFF" logo={require('../../assets/return.png')} text='' onPressIcon={() => navigation.navigate('Home')} />
        </View>
        <View style={{  position: 'absolute', zIndex: 5, width: 12, height: 12, top: '8%', left: '75%', borderRadius: 15 }}>
        {like ? (
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <CustomButtonIconProps backgroundColor="#F0F0F0" logo={require('../../assets/favorS.png')} text='' onPressIcon={handleSearchIconPress}  />
              </View>
            ) : (
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'  }}>
                <CustomButtonIconProps backgroundColor="#F0F0F0" logo={require('../../assets/favor.png')} text='' onPressIcon={handleSearchIconPress}  />
              </View>
            )}
        </View>
        <View style={{ backgroundColor: '#FFFFFF', position: 'absolute', zIndex: 5, width: '100%', height: 30, top: '58%', borderRadius: 15 }}></View>
        <View style={{ padding: 30 }}>
          <Text style={{fontSize:20}}>{products[route.params.idProduit].title}</Text>
          <Text style={{fontSize:20,fontWeight:'bold'}}>{products[route.params.idProduit].price}</Text>
          <Text style={{marginTop:5}}>{products[route.params.idProduit].description}</Text>

          <CustomButtonProps 
            color="white" 
            backgroundColor="#4F63AC" 
            text="Contact Seller" 
            textInput="go !"
            fontSize={20}
            onPress={() => navigation.navigate('Login')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
