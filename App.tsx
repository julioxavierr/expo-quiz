import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useResources } from './app/hooks';
import Fonts from './assets/fonts';

export default function App() {
  const isLoadingResources = useResources();

  if (isLoadingResources) return null;

  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: Fonts.CIRCULAR_STD_BOLD }}>
        Open up App.tsx to start working on your app!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
