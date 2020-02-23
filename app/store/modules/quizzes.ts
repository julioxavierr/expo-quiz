import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { sample, last } from 'lodash';
import api, { Difficulty, ResponseCode } from 'app/services/api';
import { RootState } from 'app/store';
import memoize from 'memoize-state';
import shortid from 'shortid';
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

  if (!lastQuizId) return null;

  return quizzesById[lastQuizId];
};

const getCurrentQuizMemoized = memoize(getCurrentQuiz);

export const QuizzesSelectors = {
  getCurrentQuiz,
  getCurrentQuizMemoized,
};

// ACTIONS

const fetchQuiz = createAsyncThunk(
  'quizzes/fetchQuiz',
  async (): Promise<IQuiz> => {
    // pick one difficulty randomly
    const difficulty = sample(Object.values(Difficulty));
    const params = {
      amount: QUESTIONS_AMOUNT,
      type: 'boolean',
    };

    const response = await api.get('', { params });

    if (response?.response_code !== ResponseCode.Success) {
      throw new Error('An error ocurred.');
    }

    const questions = response.results.map(question => ({
      id: shortid.generate(),
      difficulty: question.difficulty,
      text: question.question,
      correctAnswer: question.correct_answer === 'True',
      userAnswer: null,
    }));

    QuestionsActions.addGroup(questions);

    return {
      id: shortid.generate(),
      endDate: null,
      difficulty,
      questionsIds: questions.map(({ id }) => id),
    };
  },
);

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
    [fetchQuiz.pending.type]: state => {
      state.isLoading = true;
      state.error = null;
    },
    [fetchQuiz.fulfilled.type]: (state, { payload }: PayloadAction<IQuiz>) => {
      // only allow one active quiz
      const current = getCurrentQuiz({ quizzes: state });
      if (current) return;

      state.quizzesById[payload.id] = payload;
      state.isLoading = false;
      state.error = null;
    },
    [fetchQuiz.rejected.type]: state => {
      state.isLoading = false;
      state.error = 'An error ocurred';
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
