export interface SearchState {
  results: string[];
  loading: boolean;
  error: string | null;
}

export const ActionTypes = {
  FetchStart: "FETCH_START",
  FetchError: "FETCH_ERROR",
  FetchSuccess: "FETCH_SUCCESS",
} as const;

export type ActionTypeKeys = (typeof ActionTypes)[keyof typeof ActionTypes];

export const actions = {
  fetchStart: () => ({ type: ActionTypes.FetchStart }) as const,
  fetchSuccess: (payload: string[]) =>
    ({
      type: ActionTypes.FetchSuccess,
      payload,
    }) as const,
  fetchError: (payload: string) =>
    ({
      type: ActionTypes.FetchError,
      payload,
    }) as const,
};

export type SearchAction = ReturnType<(typeof actions)[keyof typeof actions]>;

export default function searchReducer(
  state: SearchState,
  action: SearchAction,
): SearchState {
  switch (action.type) {
    case "FETCH_START":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        results: action.payload,
      };
    case "FETCH_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
