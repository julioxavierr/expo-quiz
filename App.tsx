import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import { useBackHandler } from '@react-native-community/hooks';
import { useResources } from 'app/hooks';
import store from 'app/store';
import { HomeScreen, QuizScreen, ResultScreen } from 'app/components/screens';
import ROUTES, { RootStackParamList } from 'app/config/routes';
import { colors } from 'app/config/theme';

const Stack = createStackNavigator<RootStackParamList>();

const stackOptions: StackNavigationOptions = {
  title: null,
  headerTransparent: true,
  headerTintColor: colors.headerContent,
  headerLeft: null,
  gestureEnabled: false,
};

const MainStack = () => (
  <Stack.Navigator initialRouteName={ROUTES.HOME} screenOptions={stackOptions}>
    <Stack.Screen name={ROUTES.HOME} component={HomeScreen} />
    <Stack.Screen name={ROUTES.QUIZ} component={QuizScreen} />
    <Stack.Screen name={ROUTES.RESULT} component={ResultScreen} />
  </Stack.Navigator>
);

export default function App() {
  const isLoadingResources = useResources();

  // always disable default action of back button
  useBackHandler(() => {
    return true;
  });

  if (isLoadingResources) return null;

  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </Provider>
  );
}
