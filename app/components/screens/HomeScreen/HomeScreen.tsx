import React from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import ROUTES, { RootStackParamList } from 'app/config/routes';

type ResultScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

type Props = {
  navigation: ResultScreenNavigationProp;
};

const HomeScreen = ({ navigation }: Props) => {
  return (
    <View>
      <Text>Home</Text>
      <Button title="Quiz" onPress={() => navigation.navigate(ROUTES.QUIZ)} />
    </View>
  );
};

export default HomeScreen;
