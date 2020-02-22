import { default as reducer, QuizzesActions, IQuiz } from '../quizzes';

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
