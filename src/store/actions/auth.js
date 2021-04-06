import axios from 'axios'

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

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  }
}
export const auth = (email, password, isSignUp) => {
  return dispatch => {
    dispatch(authStart())
    const authData = {
      email,
      password,
      returnSecureToken: true
    }
    let url =
      'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyArh3jABPr0m1sWLDgSHwlygUi6ON1dzUQ'
    if (!isSignUp) {
      url =
        'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyArh3jABPr0m1sWLDgSHwlygUi6ON1dzUQ'
    }
    axios
      .post(url, authData)
      .then(response => {
        console.log(response)
        dispatch(authSuccess(response.data.idToken, response.data.localId))
      })
      .catch(error => {
        console.log(error)
        dispatch(authFail(error))
      })
  }
}
