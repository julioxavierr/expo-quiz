import { default as reducer, QuizzesActions, IQuiz } from '../quizzes';
import MockDate from 'mockdate';
import mockStore from 'app/test/utils/mockStore';
import api, { Difficulty } from 'app/services/api';
import mockApiResponse from './mockApiResponse.json';

jest.mock('app/services/api');

MockDate.set('02/22/2020');

const MOCK_ID = 'MOCK_ID';
const MOCK_QUESTION_ID = 'MOCK_QUESTION_ID';

const mockQuiz: IQuiz = {
  id: MOCK_ID,
  endDate: null,
  difficulty: Difficulty.Hard,
  questions: {
    MOCK_QUESTION_ID: {
      id: MOCK_QUESTION_ID,
      difficulty: Difficulty.Hard,
      text: 'MOCK_TEXT',
      correctAnswer: true,
    },
  },
};

describe('fetchQuiz', () => {
  it('should emit thunk lifecycle success actions', async () => {
    api.get.mockResolvedValueOnce(mockApiResponse);
    const action = QuizzesActions.fetchQuiz();

    const store = mockStore({});
    return store.dispatch(action).then(() => {
      const [pending, fulfilled] = store.getActions();

      // check types
      expect(pending.type).toEqual('quizzes/fetchQuiz/pending');
      expect(fulfilled.type).toEqual('quizzes/fetchQuiz/fulfilled');

      // shallow test
      // TODO: match response parsed
      expect(!!fulfilled.payload).toBeTruthy();
    });
  });

  it('should emit thunk lifecycle failure actions', async () => {
    const message = 'Mock error in API';
    api.get.mockRejectedValueOnce(new Error(message));

    const action = QuizzesActions.fetchQuiz();

    const store = mockStore({});
    return store.dispatch(action).then(() => {
      const [pending, failure] = store.getActions();

      // check types
      expect(pending.type).toEqual('quizzes/fetchQuiz/pending');
      expect(failure.type).toEqual('quizzes/fetchQuiz/rejected');

      expect(failure.error.message).toEqual(message);
    });
  });

  it('should emit thunk lifecycle failure actions on invalid response code', async () => {
    api.get.mockResolvedValueOnce({ response_code: 2 });
    const action = QuizzesActions.fetchQuiz();

    const store = mockStore({});
    return store.dispatch(action).then(() => {
      const [pending, failure] = store.getActions();

      // check types
      expect(pending.type).toEqual('quizzes/fetchQuiz/pending');
      expect(failure.type).toEqual('quizzes/fetchQuiz/rejected');

      expect(failure.error.message).toEqual('An error ocurred.');
    });
  });
});

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
