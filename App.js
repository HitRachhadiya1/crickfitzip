import React, { useState } from 'react';
import Home from './src/screens/Home';
import Splash from './src/screens/Splash';
import Navigator from './src/navigation/navigator';
import MyTabs from './src/navigation/navigator';
import { BottomMenu } from './src/navigation/BottomMenu';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';

export const App = () => <Navigator />
export default App