import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './src/pages/LoginPage';
import HomePage from './src/pages/HomePage';
import UsersPage from './src/pages/UsersPage';
import AddUserPage from './src/pages/AddUserPage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{ title: 'Login' }}
        />
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{ title: 'Home' }}
        />
        <Stack.Screen
          name='Users'
          component={UsersPage}
          options={{ title: 'Usuários' }}
        />
        <Stack.Screen
          name="AddUser"
          component={AddUserPage}
          options={{ title: 'Criar Usuário' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}