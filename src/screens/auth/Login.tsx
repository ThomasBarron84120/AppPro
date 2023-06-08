import React, {useState} from 'react';
import CustomButtonProps from '../../composents/Button/CustomButtonProps'
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  Dimensions ,
} from 'react-native';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';


export default function Login({ navigation }: { navigation: any }) {

  const isDarkMode = useColorScheme() === 'dark';
  const [pressed, setPressed] = useState(false);
  const [pressed2, setPressed2] = useState(false);

  const handlePress = () => {
    setPressed(!pressed);
  };
  const handlePress2 = () => {
    setPressed2(!pressed2);
  };
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor:'#FFFFFF', height: Dimensions.get('window').height
          }}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: 'https://s3-alpha-sig.figma.com/img/050d/3f1f/0406dac650e421b986a0c9fa9244dc48?Expires=1684108800&Signature=HlRHlQy7w4JqSsNDtOgI0~TsC~8AFmXia8kM8WTfWggDPopgApJ1MTe3wrVuoI-CBpEUmWbT75oWpannLCphlkN9I74cagHdsTsZygh2jPy6lurw3grhsxOCMbc8C4Y82By0ruyfEbugtgkuQoQIwQnjvZKcfX3YGTaJ1sJSa4j7n8pxz92cXeXil7Rrx5W3eweHJouDNe79PzFDmLqRE0BXi96L6lhe7wZm0QnrBNC0hFLlFlCD7QB0nz1x8E6dZdN1af6~KKnleaAb~Qy5K9fZyoyIoJCTBkj~rrnX0t7K7AM9WdtMWjlwlk5Lh~e1hjWXLTfId77ZBBfW1Wm7kA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
          }}
        />
        <Text style={styles.text} >You’ll Find</Text>
        <Text style={styles.text2} >All you need</Text>
        <Text style={styles.text3} >Here!</Text>
        <CustomButtonProps 
          color="white" 
          backgroundColor="#4F63AC" 
          text="Sign Up" 
          textInput="Yes Sign Up !"
          fontSize={20}
          onPress={() => navigation.navigate('SingUp')}
        />
        <CustomButtonProps 
          color="#4F63AC" 
          backgroundColor="white" 
          text="Sign In" 
          textInput="Yes Sign In !"
          fontSize={20}
          onPress={() => navigation.navigate('Singin')}
        />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  textContainer: {
    position: 'absolute',
    width: 247,
    height: 147,
    left: 64,
    top: 406,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'DM Sans',
    fontWeight: '700',
    fontSize: 40,
    lineHeight: 50,
    textAlign: 'center',
    color: '#303030',
    marginTop: 50,
  },
  text2: {
    fontFamily: 'DM Sans',
    fontWeight: '700',
    fontSize: 40,
    lineHeight: 50,
    textAlign: 'center',
    color: '#FCA34D',
    textDecorationLine: 'underline'
  },
  text3: {
    fontFamily: 'DM Sans',
    fontWeight: '700',
    fontSize: 40,
    lineHeight: 50,
    textAlign: 'center',
    color: '#303030',
    marginBottom: 50,
  },
  tinyLogo: {
    width: '100%',
    height: 200,
    marginTop: 150,
  },
});


