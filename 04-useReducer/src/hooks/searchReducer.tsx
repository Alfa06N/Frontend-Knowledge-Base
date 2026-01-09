export interface SearchState {
  results: string[];
  loading: boolean;
  error: string | null;
}

export type SearchAction =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: string[] }
  | { type: "FETCH_ERROR"; payload: string };

export default function searchReducer(
  state: SearchState,
  action: SearchAction
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
