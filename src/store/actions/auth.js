import * as actionTypes from './actionTypes'

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId
  }
}

export const logout = () => {
  return {
    type: actionTypes.AUTH_INITIATE_LOGOUT
  }
}

export const logoutSucceed = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  }
}

export const checkAuthTimeout = expirationOnTime => {
  return {
    type: actionTypes.AUTH_CHECK_TIMEOUT,
    expirationOnTime
  }
}

export const auth = (email, password, isSignUp) => {
  return { type: actionTypes.AUTH_USER, email, password, isSignUp }
}

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path
  }
}

export const authCheckState = () => {
  return { type: actionTypes.AUTH_CHECK_STATE }
}
