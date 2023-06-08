/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, { createContext, useEffect, useState } from 'react';
import Login from './src/screens/auth/Login';
import Home from './src/screens/page/Home';
import favor from './src/screens/page/Favorites';
import Listings from './src/screens/page/Listings'
import acount from './src/screens/page/acount';
import Product from './src/screens/page/product';
import newProduct from './src/screens/page/newProduct';
import Singin from './src/screens/auth/SingIn';
import SingUp from './src/screens/auth/SingUp';
import Settings from './src/screens/page/Settings';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
export const UserContext = createContext({});
export default function App() {

    const [user, setUser] = useState();

    useEffect(() => {
      console.log('user : ', user);
    }, [user]);
    
    return (
      <UserContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} options={{ 
              headerShown: false ,
            }}
          />
          <Stack.Screen name="Home" component={Home}   options={{ 
              headerShown: false 
              }} 
          />
          <Stack.Screen name="Singin" component={Singin}    
            options={{
              headerTintColor: '#4F63AC',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen name="SingUp" component={SingUp}    
            options={{
              headerTintColor: '#4F63AC',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen name="newProduct" component={newProduct}  />
          <Stack.Screen name="favor" component={favor} options={{ headerShown: false }} />
          <Stack.Screen name="acount" component={acount} options={{ headerShown: false  }} />
          <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false  }} />
          <Stack.Screen name="Listings" component={Listings} options={{ headerShown: false  }} />
          <Stack.Screen name="Product" component={Product} options={{ headerShown: false  }} />
        </Stack.Navigator>
      </NavigationContainer>
      </UserContext.Provider>
    );
  }




