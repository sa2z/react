export default function createAsyncDispatcher(type, promiseFn) {
  const SUCCESS = `${type}_SUCCESS`;
  const ERROR = `${type}_ERROR`;

  async function actionHandler(dispatch, ...rest) {
    dispatch({ type });
    try {
      const data = await promiseFn(...rest);
      dispatch({
        type: SUCCESS,
        data
      });
    } catch (e) {
      dispatch({
        type: ERROR,
        error: e
      });
    }
  }

  return actionHandler;
}

// 로딩중일 때 값
const loadingState = {
  loading: true,
  data: null,
  error: null
};

export const initialAsyncState = {
  loading: false,
  data: null,
  error: null
};

const success = (data) => ({
  loading: false,
  data,
  error: null
});

const error = (e) => ({
  loading: false,
  data: null,
  error: e
});

export function createAsyncHandler(type, key) {
  // action type, state key
  const SUCCESS = `${type}_SUCCESS`;
  const ERROR = `${type}_ERROR`;

  return function handler(state, action) {
    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: loadingState
        };
      case SUCCESS:
        return {
          ...state,
          [key]: success(action.data)
        };
      case ERROR:
        return {
          ...state,
          [key]: error(action.error)
        };

      default:
        return state;
    }
  };
  // return handler;
}
