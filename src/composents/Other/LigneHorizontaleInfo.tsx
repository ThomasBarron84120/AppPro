/**
 * Sample React Native Login
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, {useState} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  Pressable,
} from 'react-native';

type CustomProps = {
  textInput: string;
};

export default function separ(props: CustomProps) {


    const styles = StyleSheet.create({
    button: {
        width: 303,
        height: 60,
        borderRadius: 8,
        padding: 10,
        marginLeft: 'auto',
        marginRight: 'auto', 
    },
    textButton: {
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: 20,
    },
    });

    return (
        <View style={{display:'flex',alignItems:'center',justifyContent:'space-around',flexDirection:'row',padding:25}}>
            <View style={{height:0.5,width:100,borderColor:'#DADADA',borderWidth:2,backgroundColor:'#DADADA'}}></View>
            <View ><Text style={{color:'#4F63AC'}}>{props.textInput}</Text></View>
            <View style={{height:0.5,width:100,borderColor:'#DADADA',borderWidth:2,backgroundColor:'#DADADA'}}></View>
        </View>
        
  );
}


