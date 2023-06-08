import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';

type CustomButtonProfil = {
  title: string;
  text: string;
  margin: number;
  onPress: () => void;
};

export default function CustomButtonProfil(props: CustomButtonProfil) {
  const [pressed, setPressed] = useState(false);

  const handlePress = () => {
    setPressed(!pressed);
    props.onPress();
  };

  const styles = StyleSheet.create({
    card: {
        width: '90%',
        height: 65,
        backgroundColor: '#FFFFFF',
        margin:props.margin
    },
    press: {
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between',
      padding:10
    },
    title : {
      color:'#4F63AC',
      fontWeight: 'bold' ,
      fontSize:18, 
      margin:5
    }
  });

  return (
    
    <View style={styles.card}>
      <Pressable onPress={handlePress} style={styles.press}>
        <View>
          <Text style={styles.title}>{props.title}</Text>
          <Text>{props.text}</Text>
        </View>
        <View style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
          <Image source={require('../../assets/arro.png')} style={{ width: 10, height: 10 }} />
        </View>
      </Pressable>
    </View>

  );
}
