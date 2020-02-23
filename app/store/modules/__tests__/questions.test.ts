import { default as reducer } from '../questions';
import { Difficulty } from 'app/services/api';
import { QuestionsActions } from '../questions';

const mockQuestionA = {
  id: 'ID_A',
  difficulty: Difficulty.Hard,
  text: 'MOCK_TEXT',
  correctAnswer: true,
  userAnswer: true,
};

const mockQuestionB = {
  id: 'ID_B',
  difficulty: Difficulty.Hard,
  text: 'MOCK_TEXT',
  correctAnswer: true,
  userAnswer: true,
};

describe('questions/addGroup', () => {
  it('should generate an action to add a group of questions', () => {
    const action = QuestionsActions.addGroup([mockQuestionA, mockQuestionB]);

    expect(action.type).toEqual('questions/addGroup');
    expect(action.payload).toEqual([mockQuestionA, mockQuestionB]);
  });

  it('should add a group of questions to the store', () => {
    const action = QuestionsActions.addGroup([mockQuestionA, mockQuestionB]);

    const initialState = {};

    const expectedState = {
      [mockQuestionA.id]: mockQuestionA,
      [mockQuestionB.id]: mockQuestionB,
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });
});

describe('questions/answerQuestion', () => {
  it('should generate an action to add a group of questions', () => {
    const payload = {
      questionId: mockQuestionA.id,
      userAnswer: true,
      date: Date.now(),
    };
    const action = QuestionsActions.answerQuestion(payload);

    expect(action.type).toEqual('questions/answerQuestion');
    expect(action.payload).toEqual(payload);
  });

  it('should answer a question on the store', () => {
    const payload = {
      questionId: mockQuestionA.id,
      userAnswer: true,
      date: Date.now(),
    };
    const action = QuestionsActions.answerQuestion(payload);

    const initialState = {
      [mockQuestionA.id]: {
        ...mockQuestionA,
        userAnswer: null,
      },
    };

    const expectedState = {
      [mockQuestionA.id]: {
        ...mockQuestionA,
        userAnswer: payload.userAnswer,
      },
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });
});
