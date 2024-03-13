export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const USER_REGISTER_REQUEST = 'USER_REGISTER_REQUEST';
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';
export const USER_REGISTER_FAILURE = 'USER_REGISTER_FAILURE';

export const loginRequest = () => ({
  type: LOGIN_REQUEST
});

export const loginSuccess = (loggedUser) => ({
  type: LOGIN_SUCCESS,
  payload: loggedUser
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error
});

export const userRegisterRequest = () => ({
    type: USER_REGISTER_REQUEST
  });
  
export const userRegisterSuccess = (token, message, country) => ({
    type: USER_REGISTER_SUCCESS,
    payload: token, message, country
  });
  
  export const userRegisterFailure = (error) => ({
    type: USER_REGISTER_FAILURE,
    payload: error
  });