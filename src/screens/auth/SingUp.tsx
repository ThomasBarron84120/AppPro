import React, {useState} from 'react';
import TextInput from '../../composents/Input/TextInput';
import CustomButtonProps from '../../composents/Button/CustomButtonProps';
import CustomButtonGoogle from '../../composents/Button/CustomButtonImg';
import CheckBox from '../../composents/Checkbox/CheckBox';
import TextInputPassword from '../../composents/Input/TextInputPassword';
import LigneHorizontaleInfos from '../../composents/Other/LigneHorizontaleInfo';
import {
  View,
  Dimensions,
} from 'react-native';

export default function SingUp({ navigation }: { navigation: any }) { 
    const [inputValueName, setInputValueName] = useState('');
    const [inputValueEmail, setInputValueEmail] = useState('');


    const handleInputChangeName = (value: string) => {
        setInputValueName(value);
    };
    const handleInputChangeEmail = (value: string) => {
        setInputValueEmail(value);
    };
    const handleCheckBoxChange = (checked: boolean) => {
      console.log('CheckBox value:', checked);
    };
  
    return (
      <View style={{backgroundColor:'#FFFFFF', height: Dimensions.get('window').height}}>
        <TextInput
          titre="Name"
          value="..."
          onValueChange={handleInputChangeName}
        />
        <TextInput
          titre="E-mail"
          value="..."
          onValueChange={handleInputChangeEmail}
        />
        <TextInputPassword
          titre="Password"
          onValueChange={handleInputChangeEmail}
        />
        <CheckBox label="I agree with Terms & Privacy" onChange={handleCheckBoxChange} />
        <CustomButtonProps 
          color="white" 
          backgroundColor="#4F63AC" 
          text="Sign Up" 
          textInput="Yes Sign Up !"
          fontSize={20}
          onPress={() => navigation.navigate('Home')}
        />
        <LigneHorizontaleInfos 
          textInput="Or sign in with"
        />
        <CustomButtonGoogle
          backgroundColor="#3F4A59" 
          logo={require('../../assets/Vector.png')}
          onPress={() => navigation.navigate('Home')}
          
        />
        <CustomButtonProps 
          color="#4F63AC" 
          backgroundColor="white" 
          text="Already have an account? Sign In" 
          textInput="go !"
          fontSize={15}
          onPress={() => navigation.navigate('Singin')}
        />
      </View>
    );
  }