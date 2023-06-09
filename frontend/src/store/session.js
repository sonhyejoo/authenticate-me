import csrfFetch from "./csrf";
const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

export const logout = () => async (dispatch) => {
  const response = await csrfFetch("/api/session", {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(removeUser());
  }
  return response;
};

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch("/api/session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
  }
};

export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch("/api/session");
  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data.user));
  }
  return response;
};

export const signUp = (user) => async (dispatch) => {
  const { username, email, password } = user;
  const response = await csrfFetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data.user));
  }
  return response;
};

const initialState = {
  user: null,
};

const sessionReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case SET_USER:
      const user = action.payload;
      newState = {
        ...state,
        user: { ...user },
      };

      return newState;
    case REMOVE_USER:
      newState = {
        ...state,
        user: null,
      };
      return newState;
    default:
      return state;
  }
};
export default sessionReducer;
