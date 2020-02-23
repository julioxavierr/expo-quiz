import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit';
import { sample, last } from 'lodash';
import memoize from 'memoize-state';
import shortid from 'shortid';
import api, { Difficulty, ResponseCode } from 'app/services/api';
import texts from 'app/config/texts';
import { RootState } from 'app/store';
import { QuestionsActions, AnswerQuestionPayload } from './questions';

const QUESTIONS_AMOUNT = 10;

export interface IQuiz {
  id: string;
  /**
   * timestamp quiz was finished
   * if null, was not finished yet
   * */
  endDate: number | null;
  /** quiz has its own difficulty, due that it's possible to have quizzes with random difficulties in the future */
  difficulty: Difficulty | 'random';
  questionsIds: [string];
}

interface IQuizzes {
  isLoading: boolean;
  error: string | null;
  quizzesById: {
    [id: string]: IQuiz;
  };
}

// SELECTORS

const getCurrentQuiz = ({ quizzes }: Partial<RootState>): IQuiz | null => {
  const { quizzesById } = quizzes;

  const lastQuizId = last(Object.keys(quizzesById));

  if (!lastQuizId || quizzesById[lastQuizId].endDate) return null;

  return quizzesById[lastQuizId];
};

const getCurrentQuizMemoized = memoize(getCurrentQuiz);

export const QuizzesSelectors = {
  getCurrentQuiz,
  getCurrentQuizMemoized,
};

// ACTIONS

// TODO: replace by `createAsyncAction` when it's stable
// see: https://github.com/reduxjs/redux-toolkit/issues/389
const fetchQuizPending = createAction('quizzes/fetchQuiz/pending');
const fetchQuizFulfilled = createAction<IQuiz>('quizzes/fetchQuiz/fulfilled');
const fetchQuizRejected = createAction<Error>('quizzes/fetchQuiz/rejected');

const fetchQuiz = () => async dispatch => {
  dispatch(fetchQuizPending());

  // pick one difficulty randomly
  const difficulty = sample(Object.values(Difficulty));
  const params = {
    amount: QUESTIONS_AMOUNT,
    type: 'boolean',
  };

  let response;

  try {
    response = await api.get('', { params });

    if (response?.response_code !== ResponseCode.Success) {
      throw new Error(texts.shared.generalError);
    }
  } catch (error) {
    dispatch(fetchQuizRejected(error));
    return;
  }

  // create and dispatch questions
  const questions = response.results.map(question => ({
    id: shortid.generate(),
    difficulty: question.difficulty,
    text: question.question,
    correctAnswer: question.correct_answer === 'True',
    userAnswer: null,
  }));
  dispatch(QuestionsActions.addGroup(questions));

  // create and dispatch quiz
  const quiz = {
    id: shortid.generate(),
    endDate: null,
    difficulty,
    questionsIds: questions.map(({ id }) => id),
  };
  dispatch(fetchQuizFulfilled(quiz));
};

// SLICE

const initialState: IQuizzes = {
  isLoading: false,
  error: null,
  quizzesById: {},
};

const { actions, reducer } = createSlice({
  name: 'quizzes',
  initialState,
  reducers: {
    remove: (state, { payload }: PayloadAction<string>) => {
      delete state.quizzesById[payload];
    },
  },
  extraReducers: {
    [fetchQuizPending.type]: state => {
      state.isLoading = true;
      state.error = null;
    },
    [fetchQuizFulfilled.type]: (state, { payload }: PayloadAction<IQuiz>) => {
      // only allow one active quiz
      const current = getCurrentQuiz({ quizzes: state });
      if (current) return;

      state.quizzesById[payload.id] = payload;
      state.isLoading = false;
      state.error = null;
    },
    [fetchQuizRejected.type]: state => {
      state.isLoading = false;
      state.error = texts.shared.generalError;
    },
    [QuestionsActions.answerQuestion.type]: (
      state,
      { payload }: PayloadAction<AnswerQuestionPayload>,
    ) => {
      const { questionId, date } = payload;

      const current = getCurrentQuiz({ quizzes: state });
      if (!current) return;

      const lastQuestionId = last(state.quizzesById[current.id].questionsIds);

      if (questionId === lastQuestionId) {
        state.quizzesById[current.id].endDate = date;
      }
    },
  },
});

export const QuizzesActions = {
  ...actions,
  fetchQuiz,
};

export default reducer;
