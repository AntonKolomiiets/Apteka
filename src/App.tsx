import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import 'react-native-gesture-handler';
import {SafeAreaView, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from './Screens/HomeScreen';
import DetailsScreen from './Screens/DetailsScreen';
import {SelectProvider} from '@mobile-reality/react-native-select-pro';
import {useStore} from './store/Store';
import {observer} from 'mobx-react-lite';
import AptekaShop from './Screens/AptekaShop';
import NavigationStack from './navigation/NavigationContainer';

const Stack = createNativeStackNavigator();
const store = useStore();

const App = observer(() => {
  return (
    <SelectProvider>
      <NavigationStack />
    </SelectProvider>
  );
});

const styles = StyleSheet.create({});

export default App;
