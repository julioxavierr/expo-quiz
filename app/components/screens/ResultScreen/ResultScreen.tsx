import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'app/config/routes';
import { Container, Flex, Text, Button } from 'app/components/common';
import texts from 'app/config/texts';
import { colors } from 'app/config/theme';
import Answer from './components/Answer';
import { FlatList } from 'react-native-gesture-handler';

type ResultScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Result'
>;

type Props = {
  navigation: ResultScreenNavigationProp;
};

const ResultScreen = ({ navigation }: Props) => {
  return (
    <Container>
      <Flex
        flex={1}
        backgroundColor="white"
        borderTopRightRadius="50px"
        p="30px"
      >
        <Text size="big" bold>
          You scored 3 of 10
        </Text>
        <FlatList
          data={['mocked', 'mocked']}
          renderItem={() => (
            <Flex my="10px">
              <Answer />
            </Flex>
          )}
        />
        <Flex mt="auto">
          <Button
            mt="15px"
            backgroundColor={colors.button.blue}
            textColor={colors.text.white}
            onPress={() => navigation.popToTop()}
          >
            {texts.result.playAgain}
          </Button>
        </Flex>
      </Flex>
    </Container>
  );
};

export default ResultScreen;
