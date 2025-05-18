import React from 'react';
import { View } from 'react-native';
import Form from './screens/Form';
import Search from './screens/Search';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Tab = createBottomTabNavigator();

function App(): React.JSX.Element {

  return (
    <GestureHandlerRootView style={{flex:1, backgroundColor:'white'}}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name='Enter company' component={Form} options={{ headerShown: false }}/>
          <Tab.Screen name='Search company' component={Search} options={{ headerShown: false }}/>
        </Tab.Navigator>
      </NavigationContainer>
      </GestureHandlerRootView>
  );
}

export default App;
