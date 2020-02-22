import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { useResources } from 'app/hooks';
import store from 'app/store';
import Fonts from './assets/fonts';

export default function App() {
  const isLoadingResources = useResources();

  if (isLoadingResources) return null;

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Text style={{ fontFamily: Fonts.CIRCULAR_STD_BOLD }}>
          Open up App.tsx to start working on your app!
        </Text>
      </View>
    </Provider>
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
