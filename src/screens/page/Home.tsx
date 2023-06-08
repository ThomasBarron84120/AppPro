import React, { useState, useEffect } from 'react';
import { ScrollView, SafeAreaView, StatusBar, StyleSheet, Text, useColorScheme, View, Image, Pressable, Dimensions, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationProp } from '@react-navigation/native';
import Login from '../auth/Login';
import CustomButtonImg from '../../composents/Button/CustomButtonImg';
import CustomButtonIcon from '../../composents/Button/CustomButtonIcon';
import CustomButtonProps from '../../composents/Button/CustomButtonProps';
import ItemProduct from '../../composents/Item/ItemProduct';
import Footer from '../../composents/Footer/Footer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { categories } from '../../data/categories';

interface Product {
  id: number;
  title: string;
  image: string;
  category: number;
  price: string;
  description?: string;
}

interface Category {
  id: number;
  title: string;
  image: string;
}

export default function Home({ navigation }: { navigation: any }) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchMode, setSearchMode] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [storedProducts, setStoredProducts] = useState<string>('');

  const handleSearchIconPress = () => {
    setSearchMode(!searchMode);
    setSearchValue('');
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const storedProducts = await AsyncStorage.getItem('products');

        if (storedProducts) {
          setStoredProducts(storedProducts);
        } else {
          // Handle the case when data is not available in local storage
        }
      } catch (error) {
        console.error('Error retrieving data from local storage: ', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, [storedProducts]);

  return (
    <SafeAreaView>
      <StatusBar />
      <View style={{ backgroundColor: '#FFFFFF', height: Dimensions.get('window').height }}>
        <View style={{ display: 'flex', alignItems: 'center', alignContent: 'flex-start', flexDirection: 'row', padding: 25 }}>
          {searchMode ? (
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <TextInput
                style={{ flex: 1, backgroundColor: '#F5F5F5', marginLeft: 10, paddingHorizontal: 10, borderRadius: 5 }}
                placeholder="Search"
                value={searchValue}
                onChangeText={(text) => setSearchValue(text)}
              />
              <Pressable onPress={handleSearchIconPress}>
                <Image source={{ uri: 'https://img.icons8.com/ios-filled/50/cancel.png' }} style={{ width: 24, height: 24 }} />
              </Pressable>
            </View>
          ) : (
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <CustomButtonImg
                backgroundColor="#00000"
                logo={require('../../assets/sherch.png')}
                onPress={handleSearchIconPress}
              />
              <Text style={{ width: 240, fontWeight: 'bold', fontSize: 18 }}>Find All You Need</Text>
            </View>
          )}
        </View>
        <View style={{ flexDirection: 'row', padding: 5 }}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ height: 70 }}>
            {categories.map((category: Category) => (
              <CustomButtonIcon
                key={category.id}
                backgroundColor={selectedCategoryId === category.id ? '#F5F5F5' : '#303030'}
                logo={category.image}
                text={category.title}
                onPressIcon={() => setSelectedCategoryId(category.id)}
              />
            ))}
          </ScrollView>
        </View>
        <View style={{ height: "65%", marginTop: 10 }} >
          <ScrollView
            style={{ flex: 0.6, overflow: 'hidden', }}
            showsVerticalScrollIndicator={true}
          >
            <View style={{ paddingTop: 20, paddingBottom: 25, display: 'flex', justifyContent: 'space-around', alignContent: 'space-around', flexDirection: 'row', flexWrap: 'wrap' }}>
              {searchMode
                ? products
                  .filter((product: Product) => product.title.toLowerCase().includes(searchValue.toLowerCase()))
                  .map((product: Product) => (
                    <ItemProduct
                      key={product.id}
                      id={product.id}
                      image={product.image}
                      title={product.title}
                      category={product.category}
                      price={product.price}
                      onPress={() => navigation.navigate('Product', { idProduit: product.id - 1 })}
                    />
                  ))
                : selectedCategoryId === 0
                  ? products.map((product: Product) => (
                    <ItemProduct
                      key={product.id}
                      id={product.id}
                      image={product.image}
                      title={product.title}
                      category={product.category}
                      price={product.price}
                      onPress={() => navigation.navigate('Product', { idProduit: product.id - 1 })}
                    />
                  ))
                  : products
                    .filter((product: Product) => product.category === selectedCategoryId)
                    .map((product: Product) => (
                      <ItemProduct
                        key={product.id}
                        id={product.id}
                        image={product.image}
                        title={product.title}
                        category={product.category}
                        price={product.price}
                        onPress={() => navigation.navigate('Product', { idProduit: product.id - 1 })}
                      />
                    ))}
            </View>
          </ScrollView>
        </View>
        <Footer page='home' />
      </View>
    </SafeAreaView>
  );
}
