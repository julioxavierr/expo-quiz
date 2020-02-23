import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import ROUTES, { RootStackParamList } from 'app/config/routes';
import { Flex, Container, Text, Button } from 'app/components/common';
import { colors } from 'app/config/theme';
import texts from 'app/config/texts';

type ResultScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

type Props = {
  navigation: ResultScreenNavigationProp;
};

const HomeScreen = ({ navigation }: Props) => {
  return (
    <Container>
      <Flex pl="48px">
        <Text bold color={colors.text.white} size="big">
          {texts.home.welcome}
        </Text>
        <Text color={colors.text.white} opacity={0.6} mt="10px">
          {texts.home.startQuestion}
        </Text>
        <Button
          onPress={() => navigation.navigate(ROUTES.QUIZ)}
          mt="25px"
          width="30%"
        >
          {texts.home.start}
        </Button>
      </Flex>
    </Container>
  );
};

export default HomeScreen;
