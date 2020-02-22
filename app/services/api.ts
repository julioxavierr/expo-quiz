import axios from 'axios';

// for now only one api is used
const api = axios.create({
  baseURL: 'https://opentdb.com/api.php',
});

export enum ResponseCode {
  Success = 0,
  NoResults = 1,
  InvalidParameter = 2,
  InvalidToken = 3,
  TokenEmpty = 4,
}

export enum Difficulty {
  Hard = 'hard',
  Medium = 'medium',
  Easy = 'easy',
}

export default api;
