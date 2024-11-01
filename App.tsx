import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginPage from './src/pages/LoginPage';
import HomePage from './src/pages/HomePage';
import UsersPage from './src/pages/UsersPage';
import AddUserPage from './src/pages/AddUserPage';
import ProductsPage from './src/pages/ProductsPage';
import MovementsPage from './src/pages/MovementsPage';
import AddMovementPage from './src/pages/AddMovementPage';
import DriverMovementsPage from './src/pages/DriverMovementsPage';
import MapaPage from './src/pages/MapaPage';
import ProfilePage from './src/pages/ProfilePage';
import { View, ActivityIndicator } from 'react-native';

const Stack = createStackNavigator();

export default function App() {
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    const initializeApp = async () => {
      await AsyncStorage.removeItem('user');

      setInitialRoute('Login');
    };

    initializeApp();
  }, []);

  if (!initialRoute) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#508D4E" />
      </View>
    );
  }

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
          name='Usuarios'
          component={UsersPage}
          options={{ title: 'Usuários' }}
        />
        <Stack.Screen
          name="AddUser"
          component={AddUserPage}
          options={{ title: 'Criar Usuário' }}
        />
        <Stack.Screen
          name="Produtos"
          component={ProductsPage}
          options={{ title: 'Estoque' }}
        />
        <Stack.Screen
          name="Movimentacoes"
          component={MovementsPage}
          options={{ title: 'Movimentacoes' }}
        />
        <Stack.Screen
          name="AddMovement"
          component={AddMovementPage}
          options={{ title: 'Nova Movimentacao' }}
        />
        <Stack.Screen
          name="DriverMovements"
          component={DriverMovementsPage}
          options={{ title: 'Movimentações do Motorista' }}
        />
        <Stack.Screen
          name="MapaPage"
          component={MapaPage}
          options={{ title: 'Mapa de Entrega' }}
        />
        <Stack.Screen
          name="ProfilePage"
          component={ProfilePage}
          options={{ title: 'Perfil' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}