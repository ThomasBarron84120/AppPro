import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';

type CardSettings = {
  title: string;
  text: string;
};

export default function CardSettings(props: CardSettings) {


  const styles = StyleSheet.create({
    card: {
        width: '90%',
        height: 70,
        backgroundColor: '#FFFFFF',
        margin:15,
        padding:10
    },
    press: {
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between',
      padding:10
    },
    text : {
      color:'#4F63AC',
      fontWeight: 'bold' ,
      fontSize:12, 
      margin:5 
    }
  });

  return (
    
    <View style={styles.card}>
          <Text>{props.title}</Text>
          <Text style={styles.text}>{props.text}</Text>
    </View>

  );
}
