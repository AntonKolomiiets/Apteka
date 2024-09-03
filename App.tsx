import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import 'react-native-gesture-handler';
import {SafeAreaView, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from './Screens/HomeScreen';
import DetailsScreen from './Screens/DetailsScreen';
import { SelectProvider } from '@mobile-reality/react-native-select-pro';
import { useStore } from './store/Store';
import { observer } from 'mobx-react-lite';
import AptekaShop from './Screens/AptekaShop';

const Stack = createNativeStackNavigator();
const store = useStore()

const App = observer(() => {
  return (
    <SelectProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ title: 'Аптеки'}} />
        <Stack.Screen 
        name="Details" 
        component={DetailsScreen}
        options={{ title: 'Порівняти ціни',
          headerTitleStyle: {
            fontFamily: "Montserrat-Bold",
            fontSize: 16,
          },
          headerShown: true,
          headerBackTitleVisible: false,
          headerSearchBarOptions: {
            placeholder: 'Пошук',
            hideNavigationBar: false,
            hideWhenScrolling: false,
            autoFocus: true,
            onChangeText: (event: any) => store.setSearchString(event.nativeEvent.text),
          },
        }}  />
        <Stack.Screen 
        name='AptekaShop'
        component={AptekaShop}
        options={{ title: ''}}/>
      </Stack.Navigator>
    </NavigationContainer>
    </SelectProvider>
  );
})

const styles = StyleSheet.create({});

export default App;
