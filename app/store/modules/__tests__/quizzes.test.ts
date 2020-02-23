import { default as reducer, QuizzesActions, IQuiz } from '../quizzes';
import mockStore from 'app/test/utils/mockStore';
import api, { Difficulty } from 'app/services/api';
import mockApiResponse from './mockApiResponse.json';

jest.mock('app/services/api');

const MOCK_ID = 'MOCK_ID';
const MOCK_QUESTION_ID = 'MOCK_QUESTION_ID';

const mockQuiz: IQuiz = {
  id: MOCK_ID,
  endDate: null,
  difficulty: Difficulty.Hard,
  questionsIds: [MOCK_QUESTION_ID],
};

describe('fetchQuiz', () => {
  it('should emit thunk lifecycle success actions', async () => {
    api.get.mockResolvedValueOnce(mockApiResponse);
    const action = QuizzesActions.fetchQuiz();

    const store = mockStore({});
    return store.dispatch(action).then(() => {
      const [pending, addGroup, fulfilled] = store.getActions();

      // check types
      expect(pending.type).toEqual('quizzes/fetchQuiz/pending');
      expect(addGroup.type).toEqual('questions/addGroup');
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
      const [pending, rejected] = store.getActions();

      // check types
      expect(pending.type).toEqual('quizzes/fetchQuiz/pending');
      expect(rejected.type).toEqual('quizzes/fetchQuiz/rejected');

      expect(rejected.payload.message).toEqual(message);
    });
  });

  it('should emit thunk lifecycle rejected actions on invalid response code', async () => {
    api.get.mockResolvedValueOnce({ response_code: 2 });
    const action = QuizzesActions.fetchQuiz();

    const store = mockStore({});
    return store.dispatch(action).then(() => {
      const [pending, rejected] = store.getActions();

      // check types
      expect(pending.type).toEqual('quizzes/fetchQuiz/pending');
      expect(rejected.type).toEqual('quizzes/fetchQuiz/rejected');

      expect(rejected.payload.message).toEqual('An error ocurred.');
    });
  });

  it('should update store on quizzes/fetchQuiz/pending', async () => {
    const action = { type: 'quizzes/fetchQuiz/pending' };

    const initialState = {
      isLoading: false,
      error: 'Something',
      quizzesById: {},
    };

    const expectedState = {
      ...initialState,
      isLoading: true,
      error: null,
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should update store on quizzes/fetchQuiz/fulfilled', async () => {
    const action = {
      type: 'quizzes/fetchQuiz/fulfilled',
      payload: mockQuiz,
    };

    const initialState = {
      isLoading: true,
      error: null,
      quizzesById: {},
    };

    const expectedState = {
      isLoading: false,
      error: null,
      quizzesById: {
        [mockQuiz.id]: mockQuiz,
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

    const initialState = {
      isLoading: false,
      error: null,
      quizzesById: {
        [mockQuiz.id]: mockQuiz,
      },
    };

    const expectedState = {
      ...initialState,
      quizzesById: {},
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });
});
