export const ActionTypes = {
  FetchStart: "FETCH_START",
  FetchSuccess: "FETCH_SUCCESS",
  FetchError: "FETCH_ERROR",
} as const;

export type ActionTypeKeys = (typeof ActionTypes)[keyof typeof ActionTypes];

// actions can be used as a param of dispatch, instead of objects
export const actions = {
  fetchStart: () => ({ type: ActionTypes.FetchStart } as const),
  fetchSuccess: (payload: string[]) =>
    ({
      type: ActionTypes.FetchSuccess,
      payload,
    } as const),
  fetchError: (payload: string) =>
    ({
      type: ActionTypes.FetchError,
      payload,
    } as const),
};

export type SearchAction = ReturnType<(typeof actions)[keyof typeof actions]>;
