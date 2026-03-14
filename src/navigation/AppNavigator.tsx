/**
 * Navegação do app - React Navigation (Stack Navigator)
 * Design Pattern: Configuração centralizada das rotas
 */
import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../presentation/screens/HomeScreen/HomeScreen';
import { AddExpenseScreen } from '../presentation/screens/AddExpenseScreen/AddExpenseScreen';
import { SummaryScreen } from '../presentation/screens/SummaryScreen/SummaryScreen';

const Stack = createNativeStackNavigator();

const navTheme = {
  dark: false,
  colors: {
    primary: '#0D9488',
    background: '#F5F7FA',
    card: '#ffffff',
    text: '#333333',
    border: '#e0e0e0',
    notification: '#d32f2f',
  },
  fonts: {
    regular: { fontFamily: 'System', fontWeight: '400' as const },
    medium: { fontFamily: 'System', fontWeight: '600' as const },
    bold: { fontFamily: 'System', fontWeight: '700' as const },
    heavy: { fontFamily: 'System', fontWeight: '800' as const },
  },
};

export function AppNavigator() {
  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: 'transparent' },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 22,
            fontWeight: '700',
          },
          headerBackground: () => (
            <View
              style={{
                flex: 1,
                backgroundColor: '#0D9488',
                borderBottomLeftRadius: 24,
                borderBottomRightRadius: 24,
                overflow: 'hidden',
              }}
            />
          ),
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Controle de Gastos' }}
        />
        <Stack.Screen
          name="AddExpense"
          component={AddExpenseScreen}
          options={{ title: 'Adicionar Gasto' }}
        />
        <Stack.Screen
          name="Summary"
          component={SummaryScreen}
          options={{ title: 'Resumo' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
