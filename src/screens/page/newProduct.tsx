import React, { useState } from 'react';
import { View, Dimensions, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TextInput from '../../composents/Input/TextInput';
import TextInputSelect from '../../composents/Input/TextInputSelect';
import CustomButtonProps from '../../composents/Button/CustomButtonProps';
import { products } from '../../data/products';
import { listings } from '../../data/listings';

interface Product {
  id: number;
  title: string;
  image: string;
  category: number;
  price: string;
  description: string;
}

export default function NewProduct({ navigation }: { navigation: any }) {
  const [imageUrl, setImageUrl] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(1);
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const handleImageUrlChange = (text: string) => {
    setImageUrl(text);
  };

  const handleTitleChange = (text: string) => {
    setTitle(text);
  };

  const handleCategoryChange = (value: number) => {
    setCategory(value);
  };

  const handlePriceChange = (text: string) => {
    setPrice(text);
  };

  const handleDescriptionChange = (text: string) => {
    setDescription(text);
  };

  const handleSubmit = async () => {
    if (!imageUrl || !title || !price || !description) {
      return Alert.alert('Erreur', 'Veuillez remplir tous les champs');
    }

    try {
      await AsyncStorage.setItem('products', JSON.stringify(products));
      await AsyncStorage.setItem('listings', JSON.stringify(listings));

      const newProduct: Product = {
        id: products.length + 1,
        title: title,
        image: imageUrl,
        category: category,
        price: price,
        description: description,
      };

      products.push(newProduct);
      listings.push(newProduct);

      await AsyncStorage.setItem('products', JSON.stringify(products));
      await AsyncStorage.setItem('listings', JSON.stringify(listings));

      const storedFarvorData = await AsyncStorage.getItem('products');
      console.log(storedFarvorData);

      Alert.alert('Succès', 'Le produit a été ajouté avec succès !');

      navigation.navigate('Listings');
    } catch (error) {
      console.log("Erreur lors de l'ajout du produit :", error);
    }
  };

  return (
    <View style={{ backgroundColor: '#FFFFFF', height: Dimensions.get('window').height }}>
      <TextInput titre="Upload photos url" value={imageUrl} onValueChange={handleImageUrlChange} />
      <TextInput titre="Titre" value={title} onValueChange={handleTitleChange} />
      <TextInputSelect
        title="Category"
        selectedValue={category}
        onValueChange={handleCategoryChange}
      />
      <TextInput titre="Price" value={price} onValueChange={handlePriceChange} />
      <TextInput titre="Description" value={description} onValueChange={handleDescriptionChange} />
      <CustomButtonProps
        color="white"
        backgroundColor="#4F63AC"
        text="Creat Product"
        textInput="yes Creat Product !"
        fontSize={20}
        onPress={() => handleSubmit()}
      />
    </View>
  );
}
