/**
 * Ponto de entrada do aplicativo
 */
import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { setupDI } from './src/core/Container';
import { AppNavigator } from './src/navigation/AppNavigator';

setupDI();

function App(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0D9488" />
      <AppNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
});

export default App;
