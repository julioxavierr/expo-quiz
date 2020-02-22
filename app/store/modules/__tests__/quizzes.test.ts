import { default as reducer, QuizzesActions, IQuiz } from '../quizzes';
import MockDate from 'mockdate';

MockDate.set('02/22/2020');

const MOCK_ID = 'MOCK_ID';
const MOCK_QUESTION_ID = 'MOCK_QUESTION_ID';

const mockQuiz: IQuiz = {
  id: MOCK_ID,
  endDate: null,
  difficulty: 'hard',
  questions: {
    MOCK_QUESTION_ID: {
      id: MOCK_QUESTION_ID,
      difficulty: 'hard',
      text: 'MOCK_TEXT',
      correctAnswer: true,
    },
  },
};

describe('quizzes/add', () => {
  it('should generate an action to add a quiz', () => {
    const action = QuizzesActions.add(mockQuiz);

    expect(action.type).toEqual('quizzes/add');
    expect(action.payload).toEqual(mockQuiz);
  });

  it('should add a quizz to store', () => {
    const action = QuizzesActions.add(mockQuiz);

    expect(reducer({}, action)).toEqual({ [mockQuiz.id]: mockQuiz });
  });
});

describe('quizzes/finish', () => {
  it('should generate an action to finish a quiz', () => {
    const action = QuizzesActions.finish(mockQuiz.id);

    expect(action.type).toEqual('quizzes/finish');
    expect(action.payload).toEqual(mockQuiz.id);
  });

  it('should set an `endDate` for quizz', () => {
    const action = QuizzesActions.finish(mockQuiz.id);

    const initialState = { [mockQuiz.id]: mockQuiz };
    const expectedState = {
      [mockQuiz.id]: {
        ...mockQuiz,
        endDate: Date.now(),
      },
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });
});

describe('quizzes/remove', () => {
  it('should generate an action to remove a quiz', () => {
    const action = QuizzesActions.remove(mockQuiz.id);

    expect(action.type).toEqual('quizzes/remove');
    expect(action.payload).toEqual(mockQuiz.id);
  });

  it('should remove a quiz from the store', () => {
    const action = QuizzesActions.remove(mockQuiz.id);

    const initialState = { [mockQuiz.id]: mockQuiz };
    expect(reducer(initialState, action)).toEqual({});
  });
});
