import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit';
import { sample, last } from 'lodash';
import memoize from 'memoize-state';
import shortid from 'shortid';
import he from 'he';
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

const getCurrentQuiz = ({
  quizzes,
}: RootState | Partial<RootState>): IQuiz | null => {
  const { quizzesById } = quizzes;

  const lastQuizId = last(Object.keys(quizzesById));

  if (!lastQuizId || quizzesById[lastQuizId].endDate) return null;

  return quizzesById[lastQuizId];
};

const getQuizById = (state: RootState, id: string): IQuiz | null => {
  return state.quizzes.quizzesById[id];
};

const getAllCompletedQuizzesIds = (state: RootState): string[] => {
  const { quizzesById } = state.quizzes;

  const completedQuizzes = Object.keys(quizzesById).filter(
    id => quizzesById[id].endDate,
  );
  return completedQuizzes;
};

export const QuizzesSelectors = {
  getCurrentQuiz: memoize(getCurrentQuiz),
  getQuizById: memoize(getQuizById),
  getAllCompletedQuizzesIds: memoize(getAllCompletedQuizzesIds),
};

// ACTIONS

// TODO: replace by `createAsyncAction` when it's stable
// see: https://github.com/reduxjs/redux-toolkit/issues/389
const fetchQuizPending = createAction('quizzes/fetchQuiz/pending');
const fetchQuizFulfilled = createAction<IQuiz>('quizzes/fetchQuiz/fulfilled');
const fetchQuizRejected = createAction<string>('quizzes/fetchQuiz/rejected');

/**
 * Fetch quiz if needed
 */
const fetchQuiz = () => async (dispatch, getState) => {
  // do not fetch quiz if there is one in progress
  const current = getCurrentQuiz(getState());
  if (current) return;

  dispatch(fetchQuizPending());

  // pick one difficulty randomly
  const difficulty = sample(Object.values(Difficulty));
  const params = {
    difficulty,
    amount: QUESTIONS_AMOUNT,
    type: 'boolean',
  };

  let response;

  try {
    response = await api.get('', { params });

    if (response.data?.response_code !== ResponseCode.Success) {
      dispatch(fetchQuizRejected(texts.shared.generalError));
      return;
    }
  } catch (error) {
    dispatch(fetchQuizRejected(error.toString()));
    return;
  }

  // create and dispatch questions
  const questions = response.data.results.map(question => ({
    id: shortid.generate(),
    difficulty: question.difficulty,
    text: he.decode(question.question),
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
  reducers: {},
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
