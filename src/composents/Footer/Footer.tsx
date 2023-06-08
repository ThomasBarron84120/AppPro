import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomButtonIcon from '../../composents/Button/CustomButtonIcon';

type FooterProps = {
  page: string;
};

export default function TextInputComponent(props: FooterProps) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <CustomButtonIcon
        backgroundColor='#FFFFFF'
        logo={props.page === 'home' ? require('../../assets/homeS.png') : require('../../assets/home.png')}
        text=''
        onPressIcon={() => navigation.navigate('Home')}
      />
      <CustomButtonIcon
        backgroundColor='#FFFFFF'
        logo={props.page === 'favor' ? require('../../assets/favorS.png') : require('../../assets/favor.png')}
        text=''
        onPressIcon={() => navigation.navigate('favor')}
      />
      <CustomButtonIcon
        backgroundColor='#FFFFFF'
        logo={props.page === 'acount' ? require('../../assets/acountS.png') : require('../../assets/acount.png')}
        text=''
        onPressIcon={() => navigation.navigate('acount')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    alignContent: 'space-around',
    flexDirection: 'row',
  },
});





